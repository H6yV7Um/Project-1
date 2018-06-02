const router = require('koa-router')();
const User = require('./controllers/User');
const Department = require('./controllers/Department');
router.prefix('/user');

// 获取成员信息
router.post('/get_user_info', User.getUserInfo);
// 登录
router.post('/pass/login', User.login);
// 获取成员列表
router.post('/get_users', User.get);
// 同步组织架构
router.get('/synchronize_users', User.synchronizeUsers);

// 获取部门列表
router.post('/get_departments', Department.get);

module.exports = router;