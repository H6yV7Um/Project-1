/**
 * 检查验证码 -> 下发短信
 */
const Response = require('../../utils/Response');
const Request = require('../../utils/Request');
import _ from 'lodash'
import { BASE64_ENCODE } from "../../utils/index";
import { plainObj, getReqTypeInfo, TYPE } from "../../utils";
import CODE from '../../code';
import User from '../../User/models/User'
import { startSendSMS } from './lib/sms.lib'
import startSendEmail from './lib/mail.hox.lib'

export const email = async (ctx, next) => {
  return await commonAction(ctx, next)
};

/**
 * 检查验证码 -> 下发邮件
 */
export const sms = async (ctx, next) => {
  return await commonAction(ctx, next)
};

/**
 * 公用方法
 * @param ctx
 * @param next
 * @returns {Promise.<*>}
 */
async function commonAction(ctx, next) {
  const typeInfo = getReqTypeInfo(ctx.request.query);
  if (!typeInfo) {
    return Response.error(ctx, CODE.COMMON.ARGS)
  }

  return await verification(ctx, typeInfo);
};

/**
 * 发送验证码
 * @param ctx
 * @param TYPE_NAME
 * @param type
 * @param name
 * @returns {Promise.<void>}
 */
async function verification(ctx, { TYPE_NAME, type, name }) {
  // 验证手机号
  if (type === TYPE.PHONE && isNaN(name)) {
    return Response.error(ctx, CODE.VERIFY[TYPE_NAME].INVALID);
  }
  // 验证手机号
  if (type === TYPE.EMAIL && !isEmail(name)) {
    return Response.error(ctx, CODE.VERIFY[TYPE_NAME].INVALID);
  }

  // 验证用户
  let user = await User.findOne({ [`${type}.name`]: name });
  if (!user) {
    const userInfo = {
      [type]: {
        name,
      },
      // TODO
      //country: 'cn'
      //region: 'sichuan'
    };
    user = await User.create(userInfo)

    // 手机号已注册
  } else if (user[type].code_verified) {
    return Response.error(ctx, CODE.VERIFY[TYPE_NAME].EXIST);
  }

  const code = generateDynCode();

  let ret;
  if (type === TYPE.PHONE) {
    // 发送短信
    const result = await startSendSMS(name, code);
    ret = result.ret;
  } else if (type === TYPE.EMAIL) {
    // 发送邮件
    const token = BASE64_ENCODE(JSON.stringify({ email: name, code }));
    const link = `${generateOrigin(ctx)}/verify/token?t=${token}`;
    const result = await startSendEmail(name, link);
    ret = result.ret;
  }
  if (!ret) {
    return Response.error(ctx, CODE.VERIFY[TYPE_NAME].SEND_FAIL);
  }

  // 更新验证码状态
  const newUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        [type]: {
          ...plainObj(user)[type],
          code,
          code_sent: true
        }
      }
    }
  );
  if (!newUser) {
    return Response.error(ctx, CODE.VERIFY[TYPE_NAME].UPDATE_STATUS)
  }

  Response.success(ctx);
}

/**
 * 发布时使用 https
 * @param ctx
 */
function generateOrigin(ctx) {
  let { origin } = ctx.request;
  if (origin.match(/hox/)) {
    origin = origin.replace(/http/, 'https')
  }
  return origin
}

/**
 * 生成动态验证码
 * @returns {number|*|WordArray}
 */
function generateDynCode() {
  // 生成验证码
  const len = Math.pow(10, 5);
  const code = _.random(len, len * 10 - 1);
  return code;
}

/**
 * 是否有效的邮箱
 * @param email
 * @returns {boolean}
 */
function isEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}