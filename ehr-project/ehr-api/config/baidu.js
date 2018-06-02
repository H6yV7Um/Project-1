module.exports = {
    // 获取access_token的参数类型
    grant_type : 'client_credentials',
    // 百度开发者id
    client_id : process.env.NODE_ENV == 'development' ? '9BeNmrDYoWDDoEE2GwzPjGWp' : '9BeNmrDYoWDDoEE2GwzPjGWp',
    // 百度开发者密码
    client_secret : process.env.NODE_ENV == 'development' ? 'ZXNAuyW5EgH8XocvlNIYIvxaojr8Oe5q' : 'ZXNAuyW5EgH8XocvlNIYIvxaojr8Oe5q',
    // 获取access_token链接
    access_token_url : 'https://aip.baidubce.com/oauth/2.0/token'
};