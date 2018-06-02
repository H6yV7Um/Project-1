const router = require('koa-router')();
const Job = require('./controllers/Job');
const Recruit = require('./controllers/Recruit');
const Offer = require('./controllers/Offer');

router.prefix('/recruit');

/**
 * 职位
 */
// 获取职位列表
router.get('/pass/get_job', Job.getJob);
// 根据职位Id获取职位
router.get('/pass/get_job_by_id', Job.getJobById);
// 添加职位
router.post('/pass/add_job', Job.addJob);
// 删除职位
router.post('/pass/delete_job', Job.deleteJob);
// 获取职位分类列表
router.get('/pass/get_job_type', Job.getJobType);
// 获取职位分类列表
router.post('/pass/delete_job_type', Job.deleteJobType);
// 添加职位分类列表
router.post('/pass/add_job_type', Job.addJobType);

/**
 * 招聘
 */
// 获取hr联系方式
router.get('/pass/get_hr_contact', Recruit.getHrContact);
// 添加hr联系方式
router.post('/pass/add_hr_contact', Recruit.addHrContact);
// 删除hr联系方式
router.post('/pass/delete_hr_contact', Recruit.deleteHrContact);

/**
 * offer
 */
//得到offer相关信息
router.post('/offer/add_offer_info', Offer.addOfferInfo);

// 测试时间转换函数的接口
router.get('/pass/get_time', Recruit.getConvertTime);


module.exports = router;