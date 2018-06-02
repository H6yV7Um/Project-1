const router = require('koa-router')();
const { signup } = require('./controllers/signup');
router.prefix('/user');

/**
 * test路由
 */
router.post('/signup', signup);


module.exports = router;