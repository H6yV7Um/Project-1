const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    // 币简称
    token: {
        type: String,
        required: true
    },
    // logo图标
    icon: String,
    // 当前的价格
    price: Number,
    // 今日变化率
    '1dayProfitRate': Number,
    // 更新时间
    updatedAt: Number
})
module.exports = mongoose.model('tokenPrice', Schema)

