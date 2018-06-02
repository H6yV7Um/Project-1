let DATABASE = null;
if (process.env.NODE_ENV === 'development') {
    DATABASE = require('./local').DATABASE;
}

let database = null
// 开发环境本地数据库配置
if(process.env.NODE_ENV === 'development') {
    database = {...DATABASE}
}
// 生产环境数据库配置
else {
    database = {
        // 数据库
        NAME : 'meeting',
        // 用户名 (无用户名为空字符串)
        USERNAME : 'tap4fun',
        // 密码 (无用户名为空字符串)
        PASSWORD : '59cb0ae35c61a906e7caf6f8',
        // uri
        URI : 'localhost',
        // 端口
        PORT : 27017,
    }
}

module.exports = database;
