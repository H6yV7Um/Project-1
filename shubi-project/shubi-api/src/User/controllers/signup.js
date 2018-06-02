const Response = require('../../utils/Response');
const Request = require('../../utils/Request');
import User from '../models/User';
import { getCodeParams } from "../../utils/index";
import CODE from '../../code';
import { getReqTypeInfo, TYPE } from '../../utils'

/**
 * 注册
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
export const signup = async function (ctx, next, { redirect, cb } = {}) {
  const typeInfo = getReqTypeInfo(ctx.request.body);
  if (!typeInfo) {
    return Response.error(ctx, CODE.COMMON.ARGS);
  }
  const { TYPE_NAME, type, name, code } = typeInfo;

  let user = await User.findOne({ [`${type}.name`]: name });

  // 未注册手机号/邮箱
  if (!user) {
    const codeInfo = CODE.VERIFY[TYPE_NAME].NOT_SEND_CODE;
    if (redirect) return ctx.redirect(cb                            + getCodeParams(codeInfo));
    return Response.error(ctx, codeInfo)
  }

  // 验证码不匹配
  if (!code || (+user[type].code !== +code)) {
    const codeInfo = CODE.VERIFY[TYPE_NAME].ERR_CODE;
    if (redirect) return ctx.redirect(cb + getCodeParams(codeInfo));
    return Response.error(ctx, codeInfo);
  }

  // 已注册过的手机号/邮箱
  if (user[type].code_verified) {
    const codeInfo = CODE.VERIFY[TYPE_NAME].EXIST;
    if (redirect) return ctx.redirect(cb + getCodeParams(codeInfo));
    return Response.error(ctx, codeInfo)
  }

  // 验证码已验证
  user[type].code_verified = true;
  await user.save();

  // 是否页面跳转
  if (redirect) return ctx.redirect(cb + getCodeParams());
  return Response.success(ctx)
};


