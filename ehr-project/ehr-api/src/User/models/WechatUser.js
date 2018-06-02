const mongoose = require('mongoose');
// 员工基本信息
const WechatUserSchema = new mongoose.Schema({
    // 微信唯一标识id
    openid : {
        type : String,
        required : true,
        unique : true
    },
    // 名字
    name : {
        type : String,
        required : true
    },
    // 性别
    gender : {
        type : String
    },
    // 头像
    headimgurl : {
        type : String,
        default : ''
    },
    // 毕业院校
    university : {
        type : String,
        default : ''
    },
    // 学历
    education : {
        type : String,
        default : ''
    },
    // 所学专业
    profession : {
        type : String,
        default : ''
    },
    // 求职意向
    willingposition : {
        type : String,
        default : ''
    },
    // 职位类别
    jobTypeId : {
        type : String,
        default : ''
    },
    // 电话
    phone : {
        type : String,
        default : ''
    },
    // 邮箱
    email : {
        type : String,
        default : ''
    },
    // access_token
    access_token : {
        type : String,
        default : ''
    },
    // access_token过期时间
    access_token_time : {
        type : Number,
        default : ''
    },
    // 开发access_token
    development_access_token : {
        type : String,
        default : ''
    },
    // 最后登录时间
    login_time : {
        type : Number,
        default : ''
    },
    // 当前用户状态
    state : {
        type : Number,
        // [待面试邀请, 待技术面试, 待综合面试, 待小项目, 待终面, 待发放offer, 已发offer, 待确认offer, 待入职];
        // 目前的状态 [未通过, 待面试邀请, 待技术面试, 待综合面试, 待终面, 已入职];
        // enum : [0 ,10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        enum : [0, 10, 20, 30, 40, 50],
        default : 10
    },
    // 面试结束时间
    interview_end_time : {
        type : String,
        default : ''
    },
    // 可用性状态
    status : {
        type : Number,
        // [删除, 无效, 有效]
        enum : [-100, 0, 100],
        default : 0
    },
    // 简历ObjectId
    resume_id : {
        type : String
    },
    // 简历投递时间
    delivery_time : {
        type : Number
    },
    // 是否已经签到
    isChecked : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('wechat_user', WechatUserSchema);
