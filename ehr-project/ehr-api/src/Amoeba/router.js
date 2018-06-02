const router = require('koa-router')();
const Amoeba = require('./controllers/Amoeba');
router.prefix('/amoeba');

// 导入阿米巴流程
router.post('/import', Amoeba.import);
// 获取阿米巴
router.post('/get', Amoeba.get);

module.exports = router;