module.exports = {
    // 获取access_token的参数类型
    grant_type : 'client_credential',
    // 微信开发者id
    appid : process.env.NODE_ENV == 'development' ? 'wx3b96ced225ff8eb0' : 'wx2ed7b6878a6226f5',
    // 微信开发者密码
    secret : process.env.NODE_ENV == 'development' ? '9eadee0fb2c162e78496f504a89e5dea' : '72d6381ae41e0ab754e90c105fbe5219',
    // 获取access_token链接
    access_token_url : 'https://api.weixin.qq.com/cgi-bin/token',
    // 获取页面access_token链接
    page_access_token_url : 'https://api.weixin.qq.com/sns/oauth2/access_token',
    // 获取用户详细信息链接
    get_user_info_url : 'https://api.weixin.qq.com/sns/userinfo',
    // 服务器资源验证token
    token : process.env.NODE_ENV == 'development' ? 'detectiveHLH' : 'nibirutechtap4fun',
    // 发送模板消息连接
    send_template_message_url : 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token',
    // 微信模板ID
    templateID : process.env.NODE_ENV == 'development' ? 'SV_JtWrmYLuZyEpPgTfzjmWYj5-xRG5pTbOtU0nh9uY' : 'wmJ7wW8rPjSi9yKQgxc12aaN89ySi8R2f80bTqxbgQI',
};