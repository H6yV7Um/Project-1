const router = require('koa-router')()
const rate = require('./controllers/rate')
router.prefix('/v1')
/**
 * 代币搜索列表接口
 */
router.get('/rate', rate.rate)
module.exports = router