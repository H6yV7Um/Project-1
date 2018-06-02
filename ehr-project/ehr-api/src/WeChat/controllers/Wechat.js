const Response = require('../../Response');
const Request = require('../../../utils/Request');
const code = require('../code');
const wechat = require('../../../config/wechat');
const appConfig = require('../../../config/app');
const sha1 = require('sha1');
const NodeCache = require('node-cache');
const Cache = new NodeCache({stdTTL : appConfig.accessTokenTime, checkperiod : 120});
// 控制器
const Recruit = require('../../Recruit/controllers/Recruit')
// 模型层
// const WechatUser = require('../../User/models/WechatUser');

// 获取微信access_token
getAccessToken = async(ctx, next) => {
    let data = {
            grant_type : wechat.grant_type,
            appid : wechat.appid,
            secret : wechat.secret
        },
        url = wechat.access_token_url,
        res = null,
        access_token = null,
        cache_access_token = await getCache("global_access_token");
    if (!cache_access_token) {
        // 需要重新获取access_token
        res = await Request.get(data, url);
        Cache.set('global_access_token', res.access_token, res.expires_in);
        access_token = res.access_token;
    } else {
        access_token = await getCache("global_access_token");
    }
    return access_token;
}

// 获取openID和access_token
exports.getSignature = async(ctx, next) => {
    let data = {
            grant_type : 'authorization_code',
            appid : wechat.appid,
            secret : wechat.secret,
            code : ctx.query.code
        },
        res = null,
        url = wechat.page_access_token_url,
        cacheUserInfo = await getCache("userInfo"),
        access_token = null,
        openid = null;
    res = await Request.get(data, url);
    Cache.set('userInfo', res);
    access_token = res.access_token;
    openid = res.openid;
    // if(!cacheUserInfo) {
    //     // 需要重新获取access_token
    //     // res = JSON.parse(await https.get(data, url));
    //     res = await Request.get(data, url);
    //     Cache.set('userInfo', res, res.expires_in);
    //     access_token = res.access_token;
    //     openid = res.openid;
    // }else {
    //     let info = await getCache("userInfo");
    //     access_token = info.access_token;
    //     openid = info.openid;
    // }
    // 此时已经获取到access_token openid 开始获取用户基本信息 基于UnionID机制
    // let global_access_token = await getAccessToken();
    let _data = {
        access_token : access_token,
        openid : openid,
        lang : 'zh-CN'
    }
    _url = wechat.get_user_info_url,
        userInfo = null;
    userInfo = await Request.get(_data, _url);
    testData = {
        user : res,
        _userInfo : userInfo
    }
    if (userInfo.errcode) {
        Response.error(ctx, code.UNKNOW_ERROR);
    } else {
        Response.success(ctx, userInfo);
    }
}

// 发送消息
exports.sendMsg = async(ctx, next) => {
    let queryData = ctx.request.body.queryData,
        wechatMsgRequest = null,
        global_access_token = await getAccessToken(),
        wechatRequestData = Object.assign(queryData, {token : global_access_token}),
        sendRequest = null;
    wechatMsgRequest = await Recruit.sendWechatMsg(wechatRequestData);

    Response.success(ctx, sendRequest);
}

// 验证服务器资源
exports.verification = (ctx, next) => {
    var _config = {
        wechat : {
            token : wechat.token
        }
    }

    var token = _config.wechat.token
    var signature = ctx.query.signature
    var nonce = ctx.query.nonce
    var timestamp = ctx.query.timestamp
    var echostr = ctx.query.echostr
    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)

    // if (sha == signature) {
    //     ctx.body = echostr + '';
    // } else {
    //     ctx.body = 'wrong';
    // }
    ctx.body = echostr + '';

}

getCache = key => {
    return new Promise((resolve, reject) => {
        Cache.get(key, (err, value) => {
            resolve(value);
        })
    })
}

parseFormData = (paramName, obj) => {
    let data = {};
    for (let key in obj) {
        let _key = key.replace(paramName, '').replace('[', '').replace(']', '');
        data[_key] = obj[key];
    }
    return data;
}