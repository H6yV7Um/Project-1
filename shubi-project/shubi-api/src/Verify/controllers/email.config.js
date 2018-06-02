/**
 * Created by luowen on 2018/1/15.
 */

module.exports = {
  //邮件配置
  email: {
    service: 'Gmail',
    user: 'hox.service@gmail.com',
    pass: 'Hox5240!',
    templ (recipient, link) {
      return `
        Hi ${recipient.replace(/@.*$/, '')}, <br/>
        <br/>
        Welcome to <b>hox.com</b> <br/>
        <br/>
        Please click on the address below to verify your account: <br/>
        <br/>
        <a href="${link}">${link}</a>
      `
    }
  }
}
