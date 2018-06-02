const mongoose = require('mongoose');
// 引入工具函数
const Utils = require('../../../utils/Utils');

const HRContactSchema = new mongoose.Schema({
    // 姓名
    name: {
        type: String,
        require: true
    },
    // 联系方式
    phone: {
        type: String,
        unique: true,
        require: true
    },
    // 创建时间
    create_time: {
        type: String,
        default: Date.now
    },
    // 更新时间
    update_time: {
        type: String,
        default: Date.now
    },
    // 是否有效
    status: {
        type: String,
        default: '100'
    }
});


module.exports = mongoose.model('hr_contact', HRContactSchema);
