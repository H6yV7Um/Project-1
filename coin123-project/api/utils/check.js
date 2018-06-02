const validator = require('validator')
const crypto = require('crypto')
const Response  = require('./Response')
const md5 = require('md5')
/**
 * 用户注册校验
 * @param ctx
 * @param next
 */
exports.checkRegister = async (ctx,next)=> {
  let body = ctx.request.body,flash = null
  if(!body.email || !validator.isEmail(body.email)){
    flash = {error:'请填写正确的邮箱地址'}
  }else if(!body.password){
    flash = {error:'请填写密码'}
  }else if(body.password != body.repassword){
    flash = {error:'两次密码不一致'}
  }
  if(flash){
    Response.error(ctx, [1, flash.error])
    return
  }
  ctx.request.body.email = validator.trim(body.email)
  ctx.request.body.activeKey = md5(body.email)
  ctx.request.body.password = md5(validator.trim(body.password))
  await next()
}
/**
 * 登录验证
 * @param ctx
 * @param next
 */
exports.checkLogin = async (ctx,next) =>{
  const body = ctx.request.body
  let  flash = null
  if(!body.email || !validator.isEmail(body.email)){
    flash = {error:'请填写正确的邮箱地址'}
  }else if(!body.password){
    flash = {error:'请填写密码'}
  }
  if(flash){
    return Response.error(ctx,[1,flash.error])
  }
  body.email = validator.trim(body.email)
  body.password = md5(validator.trim(body.password))
  await next()
}

