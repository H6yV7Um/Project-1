const mongoose = require('mongoose')
// 保存最原始的数据
const Schema = new mongoose.Schema({
  // 排名
  ranking: {
    type: Number,
    required: true
  },
  // 币的英文名 eg: Bitcoin
  name: {
    type: String,
    required: true
  },
  // 币的中文名
  nameCn: {
    type: String
  },
  // 代币简称
  token: {
    type: String,
    required: true
  },
  exchangeName: {
    type: String,
    required: true
  },
  exchangeNameCn: {
    type: String,
  },
  // coinmarketCup id
  tokenId: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('token', Schema)
