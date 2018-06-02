import moment from "moment/moment";

/**
 * Created by luowen on 2018/1/11.
 */
const ccap = require('ccap')();
// home.get('/home', (ctx, next) => {
//   return next().then(() => {
//     ctx.body = ctx.session.captcha;
//   });
// });

const Response = require('../../utils/Response');
const Request = require('../../utils/Request');
const MD5 = require("crypto-js/md5");

/**
 * 验证码
 */
export const captcha = async (ctx, next) => {


  return next().then(() => {
    let ary = ccap.get();
    let txt = ary[0];
    let buf = ary[1];
    ctx.body = buf;
    ctx.type = 'image/png';
    ctx.expireTime = moment().add(1, 'm').toDate().getTime();
    ctx.captcha = txt;

    // const tokenInfo = {
    //   txt,
    //   // TODO MORE
    // };
    //
    // ctx.cookies.set('accessToken', MD5(JSON.stringify(tokenInfo)));
    // ctx.session.captcha = txt;
  });
};

