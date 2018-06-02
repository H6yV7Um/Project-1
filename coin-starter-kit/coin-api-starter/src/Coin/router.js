const router = require('koa-router')();
const Coin = require('./controllers/anycoin');
router.prefix('/');

/**
 * test路由
 */
router.get('/', Coin.authenticate);


module.exports = router;