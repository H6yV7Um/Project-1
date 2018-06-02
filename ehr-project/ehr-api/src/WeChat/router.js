const router = require('koa-router')();
const Wechat = require('./controllers/Wechat');

router.prefix('/wechat');

// 获取公众号签名
router.get('/pass/get_signature', Wechat.getSignature);
// 发送模板消息
router.post('/pass/send_msg', Wechat.sendMsg);
// 验证服务器资源
router.post('/pass/verification', Wechat.verification);
// 验证服务器资源
router.get('/pass/verification', Wechat.verification);

module.exports = router;