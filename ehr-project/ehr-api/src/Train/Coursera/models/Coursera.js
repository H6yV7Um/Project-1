const user = require('../../.././User/models/User');
const department = require('./Department');
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    // 员工ID
    user_id : {
        type : String
    },
    // 获取证书时间
    date:{
        type: Number
    },
    // 提交时间
    create_date:{
        type: Number,
    },
    school:{
        type: String
    },
    courseraname:{
        type: String
    },
    certificate:{
        type: String
    },
    // 编辑时间
    update_time : Number,
    // 状态
    status : {
        type : Number,
        // [删除, 无效, 有效]
        enum : [-100, 0, 100],
        default : 100
    },
    // 关联user表
    user: {
        type: Object,
        default:{}
    },
    // 关联自定义部门列表
    department: {
        type: Array,
        default: []
    },
    coursera_id: {
        type: String,
    },
    coursera_key: {
        type: String
    },
    // 证书路径
    certificate_path: {
        type: String
    }
})
module.exports = mongoose.model('coursera', Schema);
