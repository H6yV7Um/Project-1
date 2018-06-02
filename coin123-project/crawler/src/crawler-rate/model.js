const mongoose = require('mongoose')
/**
 * 汇率表
 */
const Schema = new mongoose.Schema({
  // 美元对人名币汇率
  usdcny: {
    type: Number,
    required: true
  },
  // 港币对人民币汇率
  hkdcny: {
    type: Number,
    required: true
  },
  updateAt: {
    type: Number,
    required: true,
    default: Date.now()
  }
})
module.exports = mongoose.model('rate', Schema)
