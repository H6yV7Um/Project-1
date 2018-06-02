/**
 * Created by luowen on 2018/1/15.
 */

const nodemailer = require('nodemailer');
const config = require('../email.config');
let smtpTransport = require('nodemailer-smtp-transport');

smtpTransport = nodemailer.createTransport(smtpTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject, html) {
  return new Promise((resolve, reject) => {
    smtpTransport.sendMail({
      from: config.email.user,
      to: recipient,
      subject: subject,
      html: html

    }, function (error, response) {
      if (error) {
        console.log(error);
        resolve(false)
      } else {
        console.log('send success')
        resolve(true)
      }
    });
  })

}

var startSendMail = async function (recipient, code) {
  let ret = await sendMail(recipient, 'https://hox.com Verification Code', `Hi, your verification code is  <b>${code}</b>`);
  return { ret }
}

module.exports = startSendMail;



