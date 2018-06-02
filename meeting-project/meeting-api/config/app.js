let WEB = null;
if (process.env.NODE_ENV === 'development') {
    WEB = require('./local').WEB;
}

module.exports = {
    // 应用端口
    PORT: 3008,
    // api
    APP_PREFIX: process.env.NODE_ENV === 'development' ? '' : process.env.APP_PREFIX || '/api',
    // 跨域白名单
    ALLOW_ORIGIN : process.env.NODE_ENV === 'development' ? [WEB] : ['http://meeting.tap4fun.com'],

    // 申请审批会话ID
    VERIFY_CHAT_ID : process.env.NODE_ENV === 'development'
        ?  'chat5747d86df6dff3776fc331ddb935366c'
        :  'chat0e5f07460cf8b40df51f2c6ecb354f1d',

    // 申请审批人ID (实际审批人不依赖此配置,这只是作为一个初始或默认)
    VERIFY_USERS_ID : process.env.NODE_ENV === 'development'
        // 先宇, 李寒阳, 杨梦青, 齐彤
        ?   ['manager5052', '036743151326181743', '080063071326308820', '14095947161288724']
        // 先宇, 李寒阳, 李琪菲, 朱丹
        :   ['0146532327668479', '036743151326181743', '050914663826370262', '106935001790']
};