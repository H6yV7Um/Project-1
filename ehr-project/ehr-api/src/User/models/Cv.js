const mongoose = require('mongoose');

const CvSchema = new mongoose.Schema({
    // 姓名
    name: {
        type: String,
        unique: true,
        require: true
    },
    // 性别
    gender: {
        type: String,
        // require: true
    },
    // 身份证号码
    idcard: {
        type: String,
        // unique: true,
        // require: true
        default : ''
    },
    // 电话号码
    phone: {
        type: String,
        unique: true,
        require: true
    },
    // 邮箱
    email: {
        type: String,
        // unique: true,
        default : ''
        // require: true
    },
    // 家庭住址
    address: {
        type: String,
        default : ''
        // require: true
    },
    // 学历
    education: {
        type: String,
        default : ''
        // require: true
    },
    // 毕业院校
    university: {
        type: String,
        default : ''
        // require: true
    },
    // 专业
    profession: {
        type: String,
        default : ''
        // require: true
    },
    // 入学日期
    attenddate: {
        type: String,
        default : ''
        // require: true
    },
    // 毕业日期
    graduatedate: {
        type: String,
        default : ''
        // require: true
    },
    // 是否在职
    isduty: {
        type: String,
        require: false,
        default : ''
    },
    // 所在公司
    company: {
        type: String,
        require: false,
        default : ''
    },
    // 职位
    position: {
        type: String,
        require: false,
        default : ''
    },
    // 职责
    duty: {
        type: String,
        require: false,
        default : ''
    },
    // 专业技能
    skills: {
        type: String,
        require: false,
        default : ''
    },
    // 入职时间
    starttime: {
        type: String,
        require: false,
        default : ''
    },
    // 离职时间
    endtime: {
        type: String,
        require: false,
        default : ''
    },
    // 求职意向
    willingposition : {
        type : String,
        default : ''
    },
    token: {
        type: String
    }
});

module.exports = mongoose.model('user_cv', CvSchema);
