const mongoose = require('mongoose');

// okr评价
const Schema = new mongoose.Schema({
    // 状态
    status : {
        type : Number,
        // [删除, 无效, 有效]
        enum : [-100, 0, 100]
    }
});

module.exports = mongoose.model('okr.evaluation', Schema);
