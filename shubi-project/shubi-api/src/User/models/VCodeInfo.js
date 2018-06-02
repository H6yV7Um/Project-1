import mongoose from 'mongoose';

export default new mongoose.Schema({
  // id:  手机号、邮箱、Google认证
  name: String,
  // 类型: 手机号、邮箱、Google认证
  type: String,
  // 发送的验证码
  code: String,
  // 验证码发送
  code_sent: Boolean,
  // 已验证
  code_verified: Boolean,
  // 失效时间
  code_expire_time: Number
});