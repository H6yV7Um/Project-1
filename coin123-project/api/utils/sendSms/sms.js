/**
 * 检查验证码 -> 下发短信
 */
const Response = require('../Response');
const Request = require('../Request');
import _ from 'lodash'
import { startSendSMS } from './lib/sms.lib'

/**
 * 发送验证码
 */
exports.sms = async (phoneNumber) => {
  // 生成验证码
  let code = generateDynCode()
  await startSendSMS(phoneNumber,code)
  return code

}
/**
 * 生成动态验证码
 * @returns {number|*|WordArray}
 */
const generateDynCode = () => {
  // 生成验证码
  const len = Math.pow(10, 5)
  const code = _.random(len, len * 10 - 1)
  return code
}
