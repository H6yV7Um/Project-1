const Response = require('../../Response');
const Request = require('../../../utils/Request');
const Meetings = require('../models/Meetings');
const API = require('../../../config/api');
const Dd = require('../../Dd/controllers/Dd');
const config = require('../../../config/app');
const Time = require('../../../utils/Time');
/**
 * 申请会议室
 * @param ctx | data:数据
 */
exports.add = async (ctx, next) => {
    let data = ctx.request.body;
    // 添加时验证已经存在的申请记录是否有冲突
    const existeMeeting = await  Meetings.find({"$or": [
            {meetingRoom: data.meetingRoom, startTime: {$lt: `${data.startTime}`}, endTime: {$gt: `${data.startTime}`},status: {"$in":["1","3"]}},
            {meetingRoom: data.meetingRoom, startTime: {$lt: `${data.endTime}`}, endTime: {$gt: `${data.endTime}` },status:{"$in":["1","3"]}}
            ]},(err,meeting) => {
                if(err){
                    console.log(err)
                    Response.error()
                    return
                } else {
                    return meeting
                }
    })
    if(existeMeeting.length){
        Response.success(ctx, [])
        return
    }
    data.createTime = Date.parse(new Date())
    const meeting = await Meetings.create(data,(err,meeting)=>{
        if(err){
            console.log(err)
            Response.error()
            return
        }
        else {
            return meeting
        }
    });

    // 获取钉钉token
    const token = await Dd.getToken()

    // 向审批群发送审批通知
    const res = await Request.post({
        chatid : config.VERIFY_CHAT_ID,
        msgtype : 'action_card',
        action_card: {
            title: `会议室申请 - ${data.meetingTheme}`,
            markdown: `会议室申请 - ${data.meetingTheme}`,
            single_title : '审批',
            single_url : `${ctx.request.header.origin}/${data.url}/${meeting._id}?s=${Math.random()}`
        }
    }, `https://oapi.dingtalk.com/chat/send?access_token=${token}`);

    Response.success(ctx, meeting);
}

/**
 * 获取会议室使用记录，包活条件筛选，分页
 * @param ctx
 */
exports.get = async (ctx,next) => {
    let {id, meetingRoom, date, status,page, limit} = ctx.request.query, condition = {};
    limit = Number(limit);
    page = Number(page);
    // 主键
    if(id) {
        condition._id = id;
    }
    // 会议筛选条件
    if(meetingRoom){
        condition.meetingRoom ={$in: meetingRoom};
    }
    // 日期筛选条件
    if(date){
        // 计算时间字符串一天开始和结束的时间戳
        let time = date,
            dayStart = Date.parse(new Date(time)),
            dayEnd = (new Date()).setTime((dayStart/1000+24*60*60-1)*1000);
        condition.startTime = { $gte: `${dayStart}`, $lte: `${dayEnd}`};
        condition.status = {$in: [1,3]};
    }
    // 审批状态筛选条件
    if(status){
        condition.status = {$in: status};
    }
    // 查询、分页、排序
    let res = null;
    if(page && limit) {
        let meetings = await Meetings.find(condition, (err, docs) => {
            if(err) {
                console.log(err);
            }else {
                return docs.length == 0 ? null : docs;
            }
        })
        .sort({'createTime': -1})
        .skip(limit * (page - 1))
        .limit(limit)
        .exec()
        // 计算查询总条数
        let total = await Meetings.count(condition);
        res = {
            page: page,
            limit: limit,
            total: total,
            meetings: meetings
        };
    }
    // 查询
    else {
        res = await Meetings.findOne(condition);
    }

    // 返回数据
    Response.success(ctx, res);
}

/**
 * 批量更新会议室的使用状态
 * @param ctx
 * @param next
 */
exports.put = async (ctx, next) => {
    let data = ctx.request.body;
    let {nextStatus, ids, passMessage} = data;

    const meetings = await Meetings.find({_id : {$in : ids}})
    let condition = {_id : {$in : ids}}

    switch (parseInt(nextStatus)) {
        // 通过
        case 1:
        // 未通过
        case 2:
            // 非审核人
            if (global.app.user.status < 200) {
                Response.error(ctx)
                return;
            }
            break;
        // 取消
        case 4:
            condition.meetingSponsors = {$elemMatch : {emplId : global.app.user.user_id}}
            break;
    }
    let newData = {status : nextStatus, checkerEmplId : global.app.user.user_id}
    if (passMessage) {
        newData.passMessage = passMessage
    }

    await Meetings.updateMany(condition, {$set : newData})

    // 获取钉钉token
    const token = await Dd.getToken();

    // 向发起人员发送审批通知
    let content = null;
    const time = Time.convertTime(Date.now(), true);
    switch (parseInt(nextStatus)) {
        // 通过
        case 1:
            content = `你申请的会议已审批通过    ${time}`;
            break;
        // 未通过
        case 2:
            content = `很抱歉！你申请的会议没有通过审批    ${time}`;
            break;
    }
    if(content) {
        let meetingSponsors = [];
        for(const meeting of meetings) {
            if(meeting.status != nextStatus) {
                for(const meetingSponsor of meeting.meetingSponsors) {
                    if(meetingSponsors.indexOf(meetingSponsor.emplId) == -1) {
                        meetingSponsors.push(meetingSponsor.emplId);
                    }
                }
            }
        }

        if(meetingSponsors.length > 0) {
            const res = await Request.post({
                touser: meetingSponsors.join('|'),
                agentid: data.agentid,
                code: data.code,
                msgtype: 'text',
                text: {content}
            }, `https://oapi.dingtalk.com/message/sendByCode?access_token=${token}`);
        }
    }

    Response.success(ctx, '');
}
