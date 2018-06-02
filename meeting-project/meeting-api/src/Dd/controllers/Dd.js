const Response = require('../../Response');
const API = require('../../../config/api');
const Request = require('../../../utils/Request');

/**
 * 获取access_token
 */
exports.getToken = async (ctx, next) => {
    let accessToken = null;
    if(global.app.dd.access_token)
    {
        accessToken = global.app.dd.access_token;
    }
    else
    {
        accessToken = await Request.post({access_token : global.app.ctx.cookies.get('access_token')}, API.DD_GET_TOKEN, API.HEADER);
        global.app.dd.access_token = accessToken.data;
        accessToken = global.app.dd.access_token;
    }
    if(ctx && ctx.app)
    {
        Response.success(ctx, accessToken);
    }
    else
    {
        return accessToken;
    }
}

/**
 * 获取signature
 * @param ctx
 * @param next
 */
exports.getSignature = async (ctx, next) => {
    const signature = (await Request.post({url : ctx.request.header.referer, access_token : ctx.cookies.get('access_token')}, API.DD_GET_SIGNATURE, API.HEADER)).data;

    if(ctx && ctx.app)
    {
        Response.success(ctx, signature);
    }
    else
    {
        return signature;
    }
}