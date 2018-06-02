/**
 * Created by luowen on 2018/1/15.
 */

import { signup } from '../../User/controllers/signup';
import CODE from '../../code';
import { BASE64_DECODE, getTokenCB } from "../../utils/index";
const Response = require('../../utils/Response');

export const verifyToken = async (ctx, next) => {
  const { t } = ctx.request.query;

  // 恢复 token
  let token;
  try{
    token = JSON.parse(BASE64_DECODE(t))
  } catch (e) {
    token = {}
  }
  const { email, code } = token;
  if (!email || !code) {
    return Response.error(ctx, CODE.COMMON.ARGS);
  }

  const cb = getTokenCB(ctx);

  ctx.request.body = {
    email,
    code
  };
  return signup(ctx, next, { redirect: true, cb });
};