const Koa = require('koa')
const app = new Koa()
const CONFIG = require('./config/app')
const DATABASE = require('./config/database')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const koaStatic = require('koa-static')
const path = require('path')
const Q = require('bluebird')
import  routers from './src/routers'
import core from './middlewares/core'
import errorHandle from './middlewares/errorHandle'
// import permission from './middlewares/Permission'
// import jwt from './middlewares/jwt'
// error handler
onerror(app)
// middleware
// 全局变量配置
app.use(async (ctx, next) => {
  global.user = {}
  await next()
})
app.use(logger())
    .use(bodyparser({
      enableTypes: ['json', 'form', 'text'],
      multipart: true
    }))
    .use(json())
    // 配置静态资源
    .use(koaStatic(path.join(__dirname, './static')))
    // 跨域相关设置
    .use(core)
    // jwt错误处理
    .use(errorHandle)
    /**
     * secret用来生成Signature的密钥
     * unless 忽略不需要用到JWT验证的路由
     */
    // .use(jwt)
    // .use(permission.run)
// 路由
routers.forEach(router => app.use(router.routes(), router.allowedMethods()))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})
// 数据库
mongoose.Promise = Q
const msg = `mongodb://${DATABASE.USERNAME ? `${DATABASE.USERNAME}:${DATABASE.PASSWORD}@` : ''}${DATABASE.URI}:${DATABASE.PORT}/${DATABASE.NAME}`
console.log('msg', msg)
mongoose.connect(msg,{useMongoClient: true})

// listen
app.listen(CONFIG.PORT)
console.log(`starting at port ${CONFIG.PORT}`)
module.exports = app

