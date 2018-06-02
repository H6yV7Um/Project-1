import { CALL_API } from '../../../middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';
export const ACTION_TYPES = keyMirror({
  APP_VERIFY_MAILBOX : null,
  CLEAR_VERIFY_MAILBOX_MESSAGE: null,
})
/**
 * 注册发送邮箱进行邮箱验证
 * @param email
 * @return {{}}
 */
export const verifyMailbox = (email,success,fail) => {
  return {
    [CALL_API] : {
      type : ACTION_TYPES.APP_VERIFY_MAILBOX,
      url : API.APP_VERIFY_MAILBOX,
      method : 'GET',
      data : {email : email},
      success,
      fail
    }
  }
}
/**
 * 清除redux的验证信息
 */
export const clearErifyMailboxMessage = () => {
  return {
      type : ACTION_TYPES.CLEAR_VERIFY_MAILBOX_MESSAGE,
  }
}

