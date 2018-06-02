const mongoose = require('mongoose')
// 保存最原始的数据
const Schema = new mongoose.Schema({
    // 币的英文名 eg: Bitcoin
    name: {
        type: String,
        required: true
    },
    // 代码
    token: {
        type: String,
        required: true
    },
    // 币的coinmarketcap id
    tokenId: {
        type: String,
        required: true
    },
    ranking: {
        type: Number
    },
    slug: {
        type: String
    }
})
module.exports = mongoose.model('coinmarketcap_token', Schema)