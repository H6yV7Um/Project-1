const Koa = require('koa');
const app = new Koa();
const config = require('./config/app');
const database = require('./config/database');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const cors = require('koa2-cors');
const static = require('koa-static')   //静态资源服务插件
const path = require('path')           //路径管理
const permission = require('./src/Permission');

const User = require('./src/User/router');
const Coursera = require('./src/Coursera/router');

// error handler
onerror(app);
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
    multipart: true
}));
app.use(json());
// 配置静态资源
app.use(static(path.join( __dirname, './static')))
// 跨域相关设置
app.use(cors({
    origin: ctx => config.allowOrigin.findIndex(v => v == ctx.request.header.origin) == -1 ? false : ctx.request.header.origin,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 全局变量配置
app.use(async (ctx, next) => {
    global.coursera = {ctx, user : {}};
    await next();
});

// 鉴权
// app.use(permission.run);

// 路由
app.use(User.routes(), User.allowedMethods());
app.use(Coursera.routes(), Coursera.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

// 数据库
mongoose.Promise = global.Promise;
// mongoose.connect(`mongodb://${database.username}:${database.password}@${database.uri}:${database.port}/${database.name}`, {useMongoClient: true});
mongoose.connect('mongodb://172.20.70.69:27017/ehr',{useMongoClient: true});
mongoose.connection.on('error',function (err) {
      console.log('Mongoose connection error: ' + err);
});
// listen
app.listen(config.port);
console.log(`start-quick is starting at port ${config.port}`);

module.exports = app;