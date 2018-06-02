/**
 * jwt 鉴权失败处理
 */
const response = require('../utils/response')
export default async (ctx, next) => {
  return await next().catch((err) => {
    if (err.status === 401) {
      response.error(ctx,[1,"请登录"])
    } else {
      throw err
    }
  })
}
