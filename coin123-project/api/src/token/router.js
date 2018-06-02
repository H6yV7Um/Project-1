const router = require('koa-router')()
const product = require('./controllers/product')
router.prefix('/v1')
/**
 * 股票搜索接口
 */
router.get('/stock/list', product.stockList)
/**
 * 币搜索接口
 */
router.get('/token/list', product.tokenList)
module.exports = router