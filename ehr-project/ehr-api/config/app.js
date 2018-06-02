module.exports = {
    // 应用端口
    port : process.env.NODE_ENV == 'development' ? 3003 : 3003,
    // 跨域白名单
    allowOrigin : [
        'http://ehr.tap4fun.com',
        'http://172.20.120.36:3002',
        'http://172.20.70.71:3002',
        'http://172.20.70.69:3002',
        'http://192.168.0.11:3002',
        'http://172.20.70.62:3002',
        'http://172.20.150.71:3002',
        'http://172.20.150.84:3002',
    ],
    // access_token有效时间(ms)
    accessTokenTime : 1000 * 60 * 60 * 2,
};