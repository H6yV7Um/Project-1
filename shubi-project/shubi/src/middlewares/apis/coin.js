/**
 * coin
 * @param SERVER 服务器地址
 */
export const coin = SERVER => {
  return {
    /**
     * 验证用户邮箱
     * @param email 用户邮箱
     */
    APP_VERIFY_MAILBOX: `${SERVER}/verify/email`
  }
}
