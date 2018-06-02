const mongoose = require('mongoose');

// 招聘评论
const Schema = new mongoose.Schema({
    // 状态
    status : {
        type : Number,
        // [删除, 无效, 有效]
        enum : [-100, 0, 100]
    }
});

module.exports = mongoose.model('recruit.review', Schema);
