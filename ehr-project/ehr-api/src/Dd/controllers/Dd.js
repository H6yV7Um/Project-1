const Response = require('../../Response');
const dd = require('../../../config/dd');
const User = require('../../User/controllers/User');
const Department = require('../../User/controllers/Department');
const Request = require('../../../utils/Request');
const Time = require('../../../utils/Time');
const sha1 = require('sha1');
const Job = require('../../Recruit/models/Job');
const ObjectId = require('mongodb').ObjectId;

/**
 * 获取access_token
 */
const getToken = async () => {
    if(global.ehr.dd.access_token)
    {
        return global.ehr.dd.access_token;
    }
    else
    {
        const accessToken = await Request.post(dd.getToken);
        global.ehr.dd.access_token = accessToken.data.access_token
        return global.ehr.dd.access_token;
    }
}

/**
 * 获取ticket
 */
const getTicket = async () => {
    if(global.ehr.dd.ticket)
    {
        return global.ehr.dd.ticket;
    }
    else
    {
        global.ehr.dd.ticket = (await Request.post(dd.getTicket)).data.ticket;
        return global.ehr.dd.ticket;
    }
}

/**
 * 获取signature
 * @param ctx
 * @param next
 */
exports.getSignature = async (ctx, next) => {
    // const ticket = await getTicket();
    // const pageUrl = ctx.url;
    // const nonceStr = Math.random();
    // const timeStamp = Date.now();
    // const signature = sha1(`jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timeStamp}&url=${pageUrl}`);
    //
    // Response.success(ctx, {
    //     // 签名
    //     signature,
    //     // 签名时间戳
    //     timeStamp,
    //     // 签名随机字符串
    //     nonceStr
    // });

    // const signature = await Request.post(dd.getSignature);
    // console.log(signature)
}

/**
 * 登录
 * @param ctx
 * @param code
 */
exports.login = async (ctx, code) => {
    const access_token = await getToken();
    const userStatus = await getUserStatus(code, access_token);
    const userInfo = await this.getUserInfo(userStatus.userid, access_token);
    return userInfo;
}

/**
 * 获取成员身份
 * @param code  免登code
 * @param access_token 钉钉access_token
 */
const getUserStatus = async (code, access_token) => {
    return await Request.get({code, access_token}, dd.getUserStatus);
}

/**
 * 获取成员信息
 * @param userid
 * @param access_token
 */
exports.getUserInfo = async (userid, access_token=null) => {
    if(!access_token)
    {
        access_token = await getToken();
    }
    return await Request.get({userid, access_token}, dd.getUserInfo);
}

/**
 * 同步成员系统
 * @param ctx
 */
exports.synchronizeUser = async ctx => {
    const access_token = await getToken();
    // 获取部门列表
    const departmentList = (await Request.get({access_token}, dd.getDepartmentList)).department;
    let users = [];
    let userIds = [];

    for(const department of departmentList)
    {
        const userList = (await Request.get({access_token, department_id : department.id}, dd.getUserSimpleList)).userlist;
        for(let user of userList)
        {
            if(userIds.indexOf(user.userid) == -1)
            {
                userIds.push(user.userid);
                user = await this.getUserInfo(user.userid, access_token);
                user = await User.updateUserInfo(user);
                users.push(user);
            }
        }
    }

    Response.success(ctx, users);
}

/**
 * 获取指定成员的所有上级父部门路径
 * @param ctx ctx | data:数据
 * @param userId 成员ID
 */
exports.getListParentDepts = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    const access_token = await getToken();
    const list = (await Request.get({access_token, userId : data.userId}, dd.getListParentDepts)).department;

    if(ctx.app)
    {
        Response.success(ctx, list);
    }
    else
    {
        return list;
    }
}

/**
 * 同步部门
 * @param ctx | data:数据
 * @param departmentId 部门ID
 */
exports.synchronizeDepartment = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    // 部门详情
    const department = await this.getDepartmentInfo({departmentId : data.departmentId});
    // 父级部门
    const departmentParentIds = await this.getDepartmentParentIds({departmentId : data.departmentId});
    // 更新部门
    let departmentData = {
        // 部门ID
        department_id : data.departmentId,
        // 部门名
        name : department.name
    };
    // 父部门ID
    if(department.parentid) departmentData.parent_department_id = department.parentid;
    // 父部门ID列表
    if(departmentParentIds) departmentData.parent_department_ids = departmentParentIds;
    // 部门等级
    departmentData.grade = departmentParentIds.length + 1;
    // 主管ID列表
    if(department.deptManagerUseridList) departmentData.manager_user_ids = department.deptManagerUseridList.split('|');
    departmentInfo = await Department.update(departmentData);

    if(ctx.app)
    {
        Response.success(ctx, departmentInfo);
    }
    else
    {
        return departmentInfo;
    }
}

/**
 * 获取部门详情
 * @param ctx | data:数据
 * @param departmentId 部门ID
 */
exports.getDepartmentInfo = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    const access_token = await getToken();
    const departmentInfo = await Request.get({access_token, id : data.departmentId}, dd.getDepartmentInfo);

    if(ctx.app)
    {
        Response.success(ctx, departmentInfo);
    }
    else
    {
        return departmentInfo;
    }
}

/**
 * 获取部门的所有上级父部门路径
 * @param ctx | data:数据
 * @param departmentId 部门ID
 */
exports.getDepartmentParentIds = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    const access_token = await getToken();
    let departmentParentIds = (await Request.get({access_token, id : data.departmentId}, dd.getDepartmentParents)).parentIds;
    departmentParentIds = departmentParentIds.splice(1, departmentParentIds.length - 1);
    if(ctx.app)
    {
        Response.success(ctx, departmentParentIds);
    }
    else
    {
        return departmentParentIds;
    }
}

/**
 * 发送机器人面试消息
 * @param ctx
 * @param next
 */
exports.sendRobotMessage = async (ctx, next) => {
    let queryData = ctx.request.body,
        atPhone = [];
    // @发送面试邀请的hr
    atPhone.push(queryData.hrContact);

    let data = {
        "msgtype": "text",
        "text": {
            "content": `尼毕鲁星电报:\n有新的同学正在等待面试!!!!!!\n姓名: 【${queryData.name}】\n电话: 【${queryData.phone}】\n岗位: 【${queryData.position}】\n时间: 【${Time.convertTime(new Date().getTime(), true)}】`
        },
        "at": {
            "atMobiles": atPhone,
            "isAtAll": false
        }
    };
    let headers = {
        'content-type': 'application/json'
    }
    let res = await Request.post(data, dd.robotMessage, headers);
    Response.success(ctx, res);
}

exports.sendRobotMessageCvSuccess = async (ctx, next) => {
    let queryData = ctx.request.body,
        JobList = null,
        isError = false,
        id = queryData.position;
        atPhone = [];
    // 查找 job by id
    console.log(queryData.position);
    // console.log("step1")
    // 查询是否有该数据
    JobList = await Job.find({_id : ObjectId(queryData.position[0])}, (err, docs) => {
        if(err) {
            isError = true;
        }else {
            if(docs.length != 0) {
                console.log(docs.name)
                return docs;
            }
        }
    });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        queryData.position = JobList[0].name
        // console.log("step2")
    }
    let data = {
        "msgtype": "text",
        "text": {
            "content": `尼毕鲁星电报:\n有新的同学提交了简历！！\n姓名: 【${queryData.name}】 \n电话: 【${queryData.phone}】 \n岗位: 【${queryData.position}】\n时间: 【${Time.convertTime(new Date().getTime(), true)}】`
        }
    };
    let headers = {
        'content-type': 'application/json'
    }
    let res = await Request.post(data, dd.robotMessageNewCv, headers);
    Response.success(ctx, res);
}