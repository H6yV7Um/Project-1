const mongoose = require('mongoose');

const JobTypeSchema = new mongoose.Schema({
    // 职位分类名
    name: {
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

module.exports = mongoose.model('Job_type', JobTypeSchema);
