const router = require('koa-router')();
const Dd = require('./controllers/Dd');
router.prefix('/dd');

// 获取用户信息
router.post('/get_signature', Dd.getSignature);
// 同步用户系统
router.get('/synchronize_user', Dd.synchronizeUser);
// 发送机器人面试消息
router.post('/pass/send_robot_message', Dd.sendRobotMessage);
// 发送机器人消息提醒简历创建了
router.post('/pass/send_robot_message_cv', Dd.sendRobotMessageCvSuccess);

module.exports = router;