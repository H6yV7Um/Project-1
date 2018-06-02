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
    // 排名数据
    ranking: {
        trype: Number
    },
    // 缓存数据
    cache: {
        type: Array,
        required: true
    }
})
module.exports = mongoose.model('cache_token', Schema)