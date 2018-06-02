var router = require('koa-router')();
var user_router = require('./User/user_router');

router.prefix('/api')

router.use('/user', user_router.routes(), user_router.allowedMethods());

module.exports = router;