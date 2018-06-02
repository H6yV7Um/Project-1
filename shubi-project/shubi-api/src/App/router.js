const router = require('koa-router')();
const App = require('./controllers/anycoin');
router.prefix('/');

/**
 * test路由
 */
router.get('/', App.authenticate);


module.exports = router;