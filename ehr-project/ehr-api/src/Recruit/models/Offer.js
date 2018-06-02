const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    // 员工ID
    user_id : {
        type : String,
        required : true
    },
    // 员工邮箱
    user_email : {
        type : String,
        required : true
    },
    //员工邮箱密码
    user_email_pass : {
        type : String,
        required : true
    },
    // 新增时间
    create_time : {
        type : Number,
        required : true
    },
    // 编辑时间
    update_time : Number,
    // 状态
    status : {
        type : Number,
        // [删除, 无效, 有效]
        enum : [-100, 0, 100],
        default : 100
    }
});

module.exports = mongoose.model('offer', OfferSchema);
