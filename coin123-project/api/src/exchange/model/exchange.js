const mongoose = require('mongoose')
/**
 * 币交易所
 */
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nameCn: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  updateAt: {
    type: Number
  }
})
module.exports = mongoose.model('exchange', Schema)
