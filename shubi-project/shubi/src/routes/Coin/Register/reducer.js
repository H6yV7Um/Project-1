import {ACTION_TYPES} from './action'
const initialState = {
  verifyMailboxMessage: '',
  verifyMailboxLoading: false,
}
export default (state = initialState, action) => {
  let newState = state
  switch (action.type) {
    // 发起请求获取验证码同时验证用户是否已经注册
    case `REQUEST_${ACTION_TYPES.APP_VERIFY_MAILBOX}`:
      newState.verifyMailboxLoading = true
      break
    case `FAIL_${ACTION_TYPES.APP_VERIFY_MAILBOX}`:
      newState.verifyMailboxLoading = false
      newState.verifyMailboxMessage = action.status
      break
    case ACTION_TYPES.APP_VERIFY_MAILBOX:
      newState.verifyMailboxLoading = false
      newState.verifyMailboxMessage = ''
      break
    case ACTION_TYPES.CLEAR_VERIFY_MAILBOX_MESSAGE:
      newState.verifyMailboxMessage = ''
      break
  }
  return {...newState}
}
