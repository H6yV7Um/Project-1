const mongoose = require('mongoose');

// 员工基本信息
const Schema = new mongoose.Schema({
    user_id : { // 员工ID
        type : String,
        required : true
    },
    name : { // 名字
        type : String,
        required : true
    },
    avatar : String, // 头像
    mobile : String, // 电话
    email : String, // 邮箱
    // 所属部门
    department : {
        department_id : { // 部门ID
            type : Number,
            required : true
        },
        name : { // 部门名
            type : String,
            required : true
        },
    },
    coursera : [ {
        date : Number,// 获取证书时间
        create_at : Number,// 提交时间
        school : String,// 学校
        coursera_name : String,// 课程名称
        certificate : String,
        coursera_id : String,
        coursera_key : String,
        certificate_path : String // 证书路径
    } ],
    access_token : String,// access_token
    access_token_time : Number,// access_token过期时间
});

module.exports = mongoose.model('user', Schema);
