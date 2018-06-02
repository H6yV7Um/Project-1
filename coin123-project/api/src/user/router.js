const router = require('koa-router')()
const userAsset = require('./controllers/userAsset')
const userFavorite = require('./controllers/userFavorite')
router.prefix('/v1')
/**
 * 添加资产接口
 */
router.post('/asset', userAsset.add)
/**
 * 删除资产接口
 */
router.delete('/asset', userAsset.delOne)
/**
 * 删除同类资产接口
 */
router.delete('/assets', userAsset.del)
/**
 * 编辑资产
 */
router.put('/asset', userAsset.edit)
/**
 * 获取用户资产列表
 */
router.get('/asset', userAsset.list)
/**
 * 获取用户资产详情列表
 */
router.get('/asset_detail_list', userAsset.detail)
/**
 * 获取资产历史数据接口
 */
router.get('/asset/statistics', userAsset.statistics)
/**
 * 添加自选接口
 */
router.post('/favorite', userFavorite.add)
/**
 * 自选列表接口
 */
router.get('/favorite_list', userFavorite.list)

/**
 * 删除单条自选接口
 */
router.delete('/favorite', userFavorite.delOne)

/**
 *  删除同类型自选
 */
router.delete('/favorites', userFavorite.del)

module.exports = router