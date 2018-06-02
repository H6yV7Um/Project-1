const nodemailer = require('nodemailer')
/**
 * 向用户发送认证邮件
 * @param key
 * @param email
 */
exports.sendEmail = (key,email,link)=>{
  let stmpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
      user:"hox.service@gmail.com", //你的邮箱帐号,
      pass:"Hox5240!"//你的邮箱授权码
    }
  })
  console.log(link)
  const mailOptions = {
    from:"Fred Foo <272535439@qq.com>",//标题
    to: email,//收件人
    subject: "Hello world", // 标题
    html:  `
        <br/>
        Welcome to <b>hox.com</b> <br/>
        <br/>
        Please click on the address below to verify your account: <br/>
        <br/>
        <a href="${link}">${link}</a>
        `
  }
  stmpTransport.sendMail(mailOptions,(error,response)=>{
    if(error){
      console.log('error',error);
    }else{
      console.log("Message sent:"+response.message)
    }
    stmpTransport.close()
  })
}