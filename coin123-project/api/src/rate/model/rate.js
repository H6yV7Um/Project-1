const mongoose = require('mongoose')
/**
 * 汇率表
 */
const Schema = new mongoose.Schema({
  // 美元对人名币汇率
  usdcny: {
    type: Number
  },
  // 港币对人民币汇率
  hkdcny: {
    type: Number
  },
  updateAt: {
    type: Number
  }
})
module.exports = mongoose.model('rate', Schema)
