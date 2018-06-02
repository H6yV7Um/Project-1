const router = require('koa-router')();
const User = require('./controllers/User');
const Cv = require('./controllers/Cv');
const CrawlingCv = require('./controllers/CrawlingCv');
const WechatUser = require('./controllers/WechatUser');
const Department = require('./controllers/Department');
router.prefix('/user');

/**
 * 微信用户
 */
// 获取微信用户列表
router.post('/pass/get_wechat_user', WechatUser.getWechatUser);
// 查询微信用户
router.get('/pass/find_wechat_user_by_name', WechatUser.findWechatUserByName)
// 签到修改状态
router.post('/pass/check_in', WechatUser.checkIn);
// 签到修改状态
router.post('/pass/un_check_in', WechatUser.unCheckIn);
// 查询用户是否签到
router.get('/pass/is_check_in', WechatUser.isCheckIn);
// 改变用户状态
router.post('/pass/change_state', WechatUser.changeState);

// ts
router.get('/pass/change_to_timestamp', WechatUser.changeToTimeStamp);

/**
 * 简历
 */
// 获取简历
router.post('/pass/get_cv', Cv.getCv);
// 更新简历
router.post('/pass/update_cv', Cv.updateCv)
// 新增简历
router.post('/pass/add_cv', Cv.addCv);
// 在线爬取简历
router.post('/pass/crawling_cv/is_new', CrawlingCv.isNew);
router.post('/pass/crawling_cv/update', CrawlingCv.update);
router.post('/pass/crawling_cv/get_cv', CrawlingCv.getCv);
router.post('/pass/crawling_cv/get_cv_by_id',CrawlingCv.getCvById);
router.post('/pass/crawling_cv/get_cv_by_condition',CrawlingCv.getCvByConditon)
// router.post('/pass/add_crawling_cv', CrawlingCv.addCrawlingCv);


/**
 * 钉钉成员
 */
// 获取成员信息
router.post('/get_info_for_dd', User.getUserInfo);
// 钉钉登录
router.post('/pass/login_for_dd', User.loginForDd);
// 获取成员列表
router.post('/get_users', User.get);

/**
 * 部门
 */
// 获取部门列表
router.post('/get_departments', Department.get);

module.exports = router;