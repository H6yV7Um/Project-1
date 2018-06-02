const jwt = require('koa-jwt')
export default jwt({
  secret:'wsd'
}).unless({path: [/\/signup/, /\/signin/, /\/verifyemail/, /\/login/,/\/sendSms/,/\/appLogin/]})
