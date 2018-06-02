const Response = require('../../Response');
const Request = require('../../../utils/Request');
const code = require('../code');
const baidu = require('../../../config/baidu');
const appConfig = require('../../../config/app');
const request = require('request');
const BaiduCache = require('node-cache');
const Cache = new BaiduCache({stdTTL: appConfig.accessTokenTime, checkperiod: 120});


// 获取百度access_token(给其他项目组使用)
exports.getBaiduAccessToken = async (ctx, next) => {
    let res = await getToken();
    if(isError) {
        Response.error(ctx, code.UNKNOW_ERROR);
    }else{
        Response.success(ctx, res);
    }
}

// 获取openID和access_token
exports.getSignature = async (ctx, next) => {
    let isError = false;
    let res = await getToken();
    if(isError) {
        Response.error(ctx, code.UNKNOW_ERROR);
    }else{
        Response.success(ctx, res);
    }
}

getToken = async () => {
    let data = {
            grant_type : baidu.grant_type,
            client_id : baidu.client_id,
            client_secret : baidu.client_secret
        },
        url = baidu.access_token_url,
        res = null,
        access_token = null,
        baidu_access_token = await getBaiduCache("baidu_access_token");
    if(baidu_access_token) {
        // 不用重新获取
        access_token = baidu_access_token;
    }else {
        //  重新获取
        res = await Request.get(data, url);
        Cache.set('baidu_access_token', res.access_token, res.expires_in);
        access_token = res.access_token;
    }
    return res
}


getBaiduCache = key => {
    return new Promise((resolve, reject) => {
        Cache.get(key, (err, value) => {
            resolve(value);
        })
    })
}

parseFormData = (paramName, obj) => {
    let data = {};
    for(let key in obj){
        let _key = key.replace(paramName,'').replace('[','').replace(']','');
        data[_key] = obj[key];
    }
    return data;
}