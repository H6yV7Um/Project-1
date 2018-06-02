const router = require('koa-router')();
const Meetings = require('./controllers/Meetings')
const appPrefix = require('../../config/app').APP_PREFIX
router.prefix(appPrefix + '/');

/**
 * 新增会议室申请
 */
router.post('/meetings', Meetings.add);
/**
 * 获取会议室使用记录
 */
router.get('/meetings', Meetings.get);
/**
 * 更新会议室状态，用于取消申请、通过审批、拒绝审批
 */
router.put('/meetings', Meetings.put);

module.exports = router;