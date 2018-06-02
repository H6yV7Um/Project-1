const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    // 员工ID
    user_id : {
        type : String
    },
    coursera : [ {
        // 获取证书时间
        date : {
            type : Number
        },
        // 提交时间
        create_at : {
            type : Number,
        },
        // 学校
        school : {
            type : String
        },
        // 课程名称
        coursera_name : {
            type : String
        },
        certificate : {
            type : String
        },
        coursera_id : {
            type : String,
        },
        coursera_key : {
            type : String
        },
        // 证书路径
        certificate_path : {
            type : String
        }
    } ],
    // 状态
    status : {
        type : Number,
        // [删除, 无效, 有效]
        enum : [ -100, 0, 100 ],
        default : 100
    }
})
module.exports = mongoose.model('coursera', Schema);
