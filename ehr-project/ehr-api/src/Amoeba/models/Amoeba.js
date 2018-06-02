const mongoose = require('mongoose');

/**
 * 阿米巴
 */
const Schema = new mongoose.Schema({
    // 部门ID
    department_id : {
        type : String,
        required : true
    },
    // 部门名
    name : {
        type : String,
        required : true
    },
    // 发布人ID
    user_id : {
        type : String,
        required : true
    },
    // 属性
    attr : {
        // 年份
        year : {
            type : Number,
            required : true
        },
        // 阶段
        stage : Number
    },
    // 目标
    objective : {
        // 收入
        income : Number,
        // 利润
        profit : Number
    },
    // 反馈
    feedback : {
        // 描述
        describe : String,
        // 问题
        questions : [
            {
                // 描述
                describe : String,
                // 图片
                images : [String]
            }
        ],
        // 收入
        income : Number,
        // 收入增幅
        income_increases : Number,
        // 利润
        profit : Number,
        // 利润增幅
        profit_increases : Number,
        // 系数
        coefficient : Number
    },
    // 新增时间
    create_time : {
        type : Number,
        required : true
    },
    // 编辑时间
    update_time : Number,
    // 期望反馈时间
    expected_time : {
        type : Number,
        required : true
    },
    // 实际反馈时间
    completed_time : Number,
    // 状态
    status : {
        type : Number,
        // [删除, 无效, 有效]
        enum : [-100, 0, 100],
        default : 100
    }
});

module.exports = mongoose.model('amoeba', Schema);