const Response = require('../../Response');
const code = require('../code');
const ObjectId = require('mongodb').ObjectId;
const Request = require('../../../utils/Request');
const wechat = require('../../../config/wechat');
// 引入模型层
const HrContact = require('../models/HrContact');
const WechatUser = require('../../User/models/WechatUser');
// 引入工具函数
const Time = require('../../../utils/Time');

// 获取hr联系方式列表
exports.getHrContact = async (ctx, next) => {
    let HrContactList = null,
        isError = false;
    // 查询是否有该数据
    HrContactList = await HrContact.find({}, (err, docs) => {
        if(err) {
            isError = true;
        }else {
            if(docs.length != 0) {
                return docs;
            }
        }
    });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, HrContactList);
    }
}

// 添加hr联系方式
exports.addHrContact = async (ctx, next) => {
    let data = ctx.request.body.hrData,
        newHrContact = new HrContact(data),
        HrContactData = null,
        isError = false;
    HrContactData = await newHrContact.save((err, docs) => {
        if(err) {
            isError = true;
        }else {
            return docs;
        }
    });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, HrContactData);
    }
}

// 删除指定的hr
exports.deleteHrContact = async (ctx, next) => {
    let data = ctx.request.body,
        isError = false,
        HrContactList = null;
    // 查询是否有该数据
    HrContactList = await HrContact.remove({_id : data._id}, (err, docs) => {
        if(err) {
            isError = true;
        }else {
            if(docs.length != 0) {
                return docs;
            }
        }
    });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, HrContactList);
    }
}

/**
 * 发送微信公众号内面试邀请
 * @param ctx
 * @param next
 */
exports.sendWechatMsg = async ctx => {
    let queryData = ctx,
        url = `${wechat.send_template_message_url}=${queryData.token}`,
        sendRequest = null;
    let template = {
        "touser":queryData.openid,
        "template_id":wechat.templateID,
        "url":queryData.link,
        "data":{
            "first": {
                "value": `您好,欢迎参加tap4fun的面试\n`,
                "color": "#173177"
            },
            "keyword1": {
                "value": queryData.interviewposition,
                "color": "#173177"
            },
            "keyword2": {
                "value": queryData.interviewtype,
                "color": "#173177"
            },
            "keyword3": {
                "value": queryData.interviewdate,
                "color": "#173177"
            },
            "keyword4": {
                "value": queryData.interviewaddress,
                "color": "#173177"
            },
            "keyword5": {
                "value": `${queryData.phone}\n`,
                "color": "#173177"
            },
            "remark": {
                "value": "请点击\"详情\"获取您的专属签到二维码,在面试时出示进行扫码签到,祝您面试成功",
                "color": "#173177"
            }
        }
    };
    console.log(queryData);
    sendRequest = await Request.post(template, url);

    // 修改用户当前状态
    let _state = null;
    switch (queryData.interviewtype) {
        case '技术面试':
            _state = 20;
            break;
        case '综合面试':
            _state = 30;
            break;
        case '终面':
            _state = 40;
            break;
    }
    let result = await WechatUser.update(
        {openid : queryData.openid},
        {state : _state},
        (err, docs) => {
            if (err) {
                console.log(err);
            } else {
                return docs.length > 0 ? docs : []
            }
        });
    return queryData;
}

exports.getConvertTime = async (ctx, next) => {
    let HrContactList = null,
        isError = false;
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, Time.convertTime(new Date().getTime(), true));
    }
}