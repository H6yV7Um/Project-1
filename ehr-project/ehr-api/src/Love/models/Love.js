const mongoose = require('mongoose');
const Utils = require('../../../utils/Time');

/**
 * people love流程
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
    // LOVE
    loves : [
        {
            // 目标
            objective : String,
            // 关键结果 (暂无)
            krs : [String],
        }
    ],
    // 反馈
    feedbacks : [
        {
            // 阶段  (暂仅1阶段)
            stage : {
                type : Number,
                default : 1
            },
            // LOVE反馈 (暂无)
            loves : [String],
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
            // 调研情况
            surveys : [
                new mongoose.Schema({
                    // 调研人
                    user_id : String,
                    // 描述
                    describe : String,
                    // 附件
                    files : [String],
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
            // 组织述职
            work : {
                // 描述
                describe : String,
                // 附件
                files : [String],
            },
            // 评价信息
            comment_info : {
                // 评价列表
                comments : [
                    new mongoose.Schema({
                        // 评价人
                        user_id : String,
                        // 评分
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
                // 评分
                score : Number,
                // 系数
                coefficient : Number,
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

module.exports = mongoose.model('love', Schema);