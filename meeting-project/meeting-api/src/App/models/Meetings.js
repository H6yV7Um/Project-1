const mongoose = require('mongoose');
// 新增会议室
const Schema = new mongoose.Schema({
    // 会议主题
    meetingTheme: {
        type : String,
        required : true
    },
    // 会议内容
    meetingContent: {
        type: String,
        required: true
    },
    // 备注信息
    remarks: {
        type: String,
        default : ''
    },
    // 预定开始时间
    startTime: {
        type: String,
        required: true
    },
    // 预定结束时间
    endTime: {
        type: String,
        required: true
    },
    // 预定的会议室
    meetingRoom: {
        type: String,
        required: true
    },
    // 会议的发起人
    meetingSponsors: [
        {
            // 成员ID
            emplId: String,
            // 头像
            avatar: String,
            // 名字
            name: String
        }
    ],
    // 会议的主持人
    host: [
        {
            // 成员ID
            emplId: String,
            // 头像
            avatar: String,
            // 名字
            name: String
        }
    ],
    // 参会人员
    participants: [
        {
            // 成员ID
            emplId: String,
            // 头像
            avatar: String,
            // 名字
            name: String
        }
    ],
    // 会议发起申请的时间
    createTime: {
        type: Number
    },
    // 审核人ID
    checkerEmplId: String,
    // 未通过理由
    passMessage: String,
    // 状态
    status : {
        type : Number,
        // [通过, 未通过, 审批中, 已取消]
        enum : [1,2,3,4],
        default : 3
    },
});

module.exports = mongoose.model('meetings', Schema);
