const mongoose = require('mongoose');
const Utils = require('../../../utils/Time');

/**
 * okr流程
 */
const Schema = new mongoose.Schema({
    // 发布人ID
    user_id : {
        type : String,
        required : true
    },
    // 发布人名字
    name : {
        type : String,
        required : true
    },
    // 发布人头像
    avatar : String,
    // 发布人部门ID
    department_ids : {
        type : [String],
        required : true
    },
    // 可见部门ID集合
    authority_department_ids : {
        type : [String],
        required : true
    },
    // 属性
    attr : {
        // 分类
        type : {
            type : Number,
            // [年, 半年, 季度, 月]
            enum : [10, 20, 30, 40],
            default : 20
        },
        // 年份
        year : {
            type : Number,
            required : true
        },
        // 阶段
        stage : Number
    },
    // OKR
    okrs : [
        {
            // 目标
            objective : String,
            // 关键结果
            krs : [String],
        }
    ],
    // 反馈
    feedbacks : [
        {
            // 阶段
            stage : Number,
            // OKR反馈
            okrs : [String],
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
            // 成果
            achievements : [
                {
                    // 描述
                    describe : String,
                    // 图片
                    images : [String]
                }
            ],
            // 评价信息
            comment_info : {
                // 评价列表
                comments : [
                    new mongoose.Schema({
                        // 评价人
                        user_id : String,
                        // 工作成果得分
                        achievement_score : Number,
                        // 工作过程得分
                        process_score : Number,
                        // 综合得分
                        composite_score : Number,
                        // 最后得分
                        score : Number,
                        // 评论
                        comment : String,
                        // 新增时间
                        create_time : {
                            type : Number,
                            get : v => Utils.convertTime(v)
                        },
                        // 编辑时间
                        update_time : {
                            type : Number,
                            get : v => Utils.convertTime(v)
                        }
                    }, {toJSON : {getters : true}})
                ],
                // 工作成果得分
                achievement_score : Number,
                // 工作过程得分
                process_score : Number,
                // 综合得分
                composite_score : Number,
                // 最后得分
                score : Number,
                // 最后评价时间
                update_time : Number
            },
            // 期望反馈时间
            expected_time : {
                type : Number,
                required : true
            },
            // 实际反馈时间
            completed_time : Number
        }
    ],
    // 新增时间
    create_time : {
        type : Number,
        required : true
    },
    // 编辑时间
    update_time : Number,
    // 期望完成时间
    expected_time : {
        type : Number,
        required : true
    },
    // 实际完成时间
    completed_time : Number,
    // 状态
    status : {
        type : Number,
        // [删除, 无效, 准备, 确定, 公示, 待完成, 完成, 提前完成, 延时完成]
        enum : [-100, 0, 10, 20, 30, 100, 200, 300, 400],
        default : 100
    }
});

module.exports = mongoose.model('okr', Schema);
