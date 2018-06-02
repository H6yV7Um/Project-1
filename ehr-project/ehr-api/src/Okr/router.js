const router = require('koa-router')();
const Okr = require('./controllers/Okr');
router.prefix('/okr');

// 导入OKR流程
router.post('/import', Okr.import);
// 获取OKR
router.post('/get', Okr.get);
router.post('/getScore', Okr.getScore);

module.exports = router;