/**
 * response 成功
 * @param ctx
 * @param data 数据
 * @param code 错误代码
 * @param message 错误描述
 */
exports.success = (ctx, data, code = 0, message = 'Success') => {
  ctx.body = {
    code,
    message,
  }
  if (data) {
    ctx.body.data = data
  }
}
/**
 * response 异常
 * @param ctx
 * @param code 错误码
 * @param message 错误描述
 */
exports.error = (ctx, code = 1, message = 'Error', data) => {
  let body = {
    code,
    message
  }
  if (data) {
    body.data = data
  }
  ctx.body = body
}