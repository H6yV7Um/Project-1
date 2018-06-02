/**
 * Created by luowen on 2018/1/15.
 */

var config = require('../email.config');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: 'key-3f632cb56f930cb72fdf126b0e9cacef',
    domain: 'mx.hox.com'
  },
  // proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject, html) {
  return new Promise((resolve, reject) => {
    nodemailerMailgun.sendMail({
      from: 'service@hox.com',
      to: recipient, // An array if you have multiple recipients.
      // cc: 'second@domain.com',
      // bcc: 'secretagent@company.gov',
      subject: subject,
      // 'h:Reply-To': 'reply2this@company.com',
      //You can use "html:" to send HTML email content. It's magic!
      html: html,
      //You can use "text:" to send plain-text content. It's oldschool!
      // text: 'Mailgun rocks, pow pow!'
    }, function (err, info) {
      if (err) {
        console.log('Error: ' + err);
        resolve(false)
      }
      else {
        // console.log('Response: ' + info);
        resolve(true)
      }
    });
  })
}


var startSendMail = async function (recipient, link) {
  let ret = await sendMail(recipient, 'Verification', config.email.templ(recipient, link));
  return { ret }
}

module.exports = startSendMail;


// startSendMail('luowen@nibirutech.com', 'xxx')
