const response = require('../utils/response')
const WechatUser = require('./Wechat/User/controllers/wechatUser')
const MobileAppUser = require('./MobileApp/User/controllers/user')
/**
 * 用户鉴权
 * @param ctx
 * @param next
 */
exports.run = async (ctx, next) => {
  let  isAuthorization = noAuthorization(ctx)
  if(ctx.request.path === '/favicon.ico'){
    return
  }
  // 判断是否需要进行鉴权
  if(!isAuthorization){
    await next()
  }
  else if (ctx.header.authorization) {
    // 鉴权
    let token = ctx.header.authorization.split(' ')[1]
    const wechatUser = await WechatUser.getUserByToken(token)
    // getUserByToken
    const mobileAppUser = await MobileAppUser.getUserByToken(token)
    if (wechatUser) {
      global.user = wechatUser
      await next()
    }
    else if(mobileAppUser){
      global.user = mobileAppUser
      await next()
    }
    else {
      return response.error(ctx, {},-1,"请登录")
    }
  }
  else {
    // 未登录
    return response.error(ctx, {},-1,"请登录")
  }
}
const noAuthorization = (ctx) => {
  let url = ctx.request.path.split('/')[2]
  if(url === "signup" || url === "signin" || url === "verifyemail" || url === "login" || url === "sendSms" || url === "appLogin"){
    return false
  }
  else {
    return true
  }
}