const router = require('koa-router')();
const Coursera = require('./controllers/Coursera');
const Department = require('./controllers/Department');
router.prefix('/train/coursera');
router.post('/get_courseralist', Coursera.getCourseraList);
router.post('/get_allcourseralist', Coursera.getAllCourseraList);
router.post('/filter', Coursera.filter);
router.post('/search_list', Coursera.searchList);
router.post('/get_file', Coursera.getFile);
router.post('/get_department', Department.getDepartment);
router.post('/get_school', Coursera.getSchool);
router.post('/get_latestcourseralist', Coursera.getAllLatestCourseraList);
router.post('/reset_dbcoursera', Coursera.resetDbCoursera);
router.post('/search_personallist', Coursera.searchPersonalList);
router.post('/cross_domain', Coursera.crossDomain);
router.post('/get_personal_department', Department.getPersonalDepartment);
router.post('/savemanagement', Department.saveManagement);
router.post('/search_coursera_by_department', Coursera.searchCourseraByDepartment);


router.post('/delete', Coursera.delete);
module.exports = router;
