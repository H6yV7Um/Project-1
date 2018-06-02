const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    // 职位名称
    name: {
        type: String,
        unique: true,
        require: true
    },
    // 职位分类ID
    job_type_id: {
        type: String
    },
    // 职位描述
    job_description: {
        type: String
    },
    // 责任集合(分隔符;;;)
    responsibilities: {
        type: String
    },
    // 要求集合(分隔符;;;)
    requirements: {
        type: String
    },
    // 胜任力(分隔符;;;)
    competencies: {
        type: String
    },
    // 薪酬福利(分隔符;;;)
    emoluments: {
        type: String
    },
    // 优先考虑(分隔符;;;)
    priority: {
        type: String
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

module.exports = mongoose.model('Job', JobSchema);
