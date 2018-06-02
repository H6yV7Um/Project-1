const router = require('koa-router')();
const Baidu = require('./controllers/Baidu');

router.prefix('/baidu');

// 获取公众号签名
router.get('/pass/get_signature', Baidu.getSignature);

module.exports = router;