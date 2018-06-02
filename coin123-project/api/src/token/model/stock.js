const mongoose = require('mongoose')
/**
 * 缓存股票的实时信息
 */
const Schema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    // 股票代码
    token: {
        type: String,
        required: true
    },
    // 股票当前价格
    price: {
        type: Number,
        required: true
    },
    // 当日变化率
    '1dayProfitRate': {
        type: Number,
        required: true
    },
    // 更新时间
    updatedAt: Number
})
module.exports = mongoose.model('stock', Schema)

