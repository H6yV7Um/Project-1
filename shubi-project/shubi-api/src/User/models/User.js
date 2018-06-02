/**
 * Created by luowen on 2018/1/11.
 */

import mongoose from 'mongoose';
import VCodeInfo from './VCodeInfo';


const userSchema = new mongoose.Schema({
  // 手机号
  phone: VCodeInfo,
  // 邮箱
  email: VCodeInfo,
  // 国家
  country: String,
  // 地区
  region: String,
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);