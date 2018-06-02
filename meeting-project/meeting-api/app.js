const Koa = require('koa');
const app = new Koa();
const CONFIG = require('./config/app');
const DATABASE = require('./config/database');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const cors = require('koa2-cors');
const static = require('koa-static');
const path = require('path');
const permission = require('./src/Permission');

// 引入钉钉模块路由
const Dd = require('./src/Dd/router');
// 引入成员模块路由
const User = require('./src/User/router');
// 引入会议模版路由
const Meeting = require('./src/App/router');
// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
    multipart: true
}));

app.use(json());

// 配置静态资源
app.use(static(path.join( __dirname, './static')));

// 跨域相关设置
app.use(cors({
    origin: ctx => CONFIG.ALLOW_ORIGIN.findIndex(v => v == ctx.request.header.origin) == -1 ? false : ctx.request.header.origin,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 全局变量配置
app.use(async (ctx, next) => {
    global.app = {ctx, dd : {}, user : {}};
    await next();
});

// 鉴权
app.use(permission.run);

// 路由
app.use(Dd.routes(), Dd.allowedMethods());
app.use(User.routes(), User.allowedMethods());
app.use(Meeting.routes(), Meeting.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
// 数据库
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${DATABASE.USERNAME ? `${DATABASE.USERNAME}:${DATABASE.PASSWORD}@` : ''}${DATABASE.URI}:${DATABASE.PORT}/${DATABASE.NAME}`, {useMongoClient: true});

// listen
app.listen(CONFIG.PORT);
console.log(`starting at port ${CONFIG.PORT}`);

module.exports = app;