var http = require('http');
var qs = require('querystring');
var moment = require('moment');

// 修改为您的短信账号
var un = "N4432525";
// 修改为您的短信密码
var pw = "9Nd2Hl1o5E18dd";
// 修改您要发送的手机号码，多个号码用逗号隔开
var phone = "15208205269";
// 短信域名地址
var sms_host = 'sms.253.com';
// 发送短信地址
var send_sms_uri = '/msg/send';
// 查询余额地址
var query_balance_uri = '/msg/balance';

// send_sms(send_sms_uri, un, pw, phone, msg);

// query_blance(query_balance_uri, un, pw);

export async function startSendSMS(phone, code) {
  // // msg code
  // let code = 0, cnt = 0;
  // const len = Math.pow(10, 6);
  // const SAFE_CNT = 10;
  // do {
  //   code = ~~(Math.random() * len);
  //   cnt++;
  //   if (cnt > SAFE_CNT) {
  //     code = 325123;
  //     break;
  //   }
  // } while (code <= len);


  // 修改为您要发送的短信内容
  const msg = `您的验证码是${code}。如非本人操作，请忽略。`;
  console.log('msg', msg);
  const ret = await send_sms(send_sms_uri, un, pw, phone, msg);
  return {
    code,
    ret
  }
}

// 发送短信方法
async function send_sms(uri, un, pw, phone, msg) {

  var post_data = { // 这是需要提交的数据
    'un': un,
    'pw': pw,
    'phone': phone,
    'msg': msg,
    'rd': '1',
  };
  var content = qs.stringify(post_data);
  return await post(uri, content, sms_host);

}

// 查询余额方法
function query_blance(uri, content, host) {

  var post_data = { // 这是需要提交的数据
    'un': un,
    'pw': pw,
  };
  var content = qs.stringify(post_data);
  post(uri, content, sms_host);
}

function post(uri, content, host) {
  return new Promise((resolve, reject) => {
    var options = {
      hostname: host,
      port: 80,
      path: uri,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': content.length
      }
    };
    var req = http.request(options, function (res) {
      console.log('STATUS: ' + res.statusCode);

      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        resolve(true)
      });
    });
    req.write(content);
    req.end();
  })
}


