const router = require('koa-router')()
const exchange = require('./controllers/exchange')
router.prefix('/v1')
/**
 * 代币搜索列表接口
 */
router.get('/exchange_list', exchange.list)
module.exports = router