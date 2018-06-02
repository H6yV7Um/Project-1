const cors = require('koa2-cors')
const CONFIG = require('../config/app')
export default cors({
  origin: ctx => CONFIG.ALLOW_ORIGIN.findIndex(v => v === ctx.request.header.origin) === -1 ? false : ctx.request.header.origin,
  // origin:  "*",
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE','PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Access-Control-Allow-Credentials'],
})