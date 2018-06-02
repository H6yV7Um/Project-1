module.exports = {
    // 数据库
    name : 'ehr',
    // 用户名
    username : process.env.NODE_ENV == 'development' ? 'xianyu' : 'tap4fun',
    // 密码
    password : process.env.NODE_ENV == 'development' ? '19891006' : '59cb0ae35c61a906e7caf6f8',
    // uri
    uri : 'localhost',
    // 端口
    port : 27017
};