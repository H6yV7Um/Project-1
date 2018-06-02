const router = require('koa-router')();
const Dd = require('./controllers/Dd');
const appPrefix = require('../../config/app').APP_PREFIX
router.prefix(appPrefix + '/dd');

/**
 * 获取signature
 */
router.post('/get_signature', Dd.getSignature);

module.exports = router;