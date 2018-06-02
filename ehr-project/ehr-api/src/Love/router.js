const router = require('koa-router')();
const Love = require('./controllers/Love');
router.prefix('/love');

// 导入PEOPLE LOVE流程
router.post('/import', Love.import);
// 获取PEOPLE LOVE
router.post('/get', Love.get);

module.exports = router;