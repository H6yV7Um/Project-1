import keyMirror from 'keymirror'
import {current} from '../middlewares/UserMiddleware'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    // 获取授权
    "CORE_CURRENT": "CORE_CURRENT",
    "ACCESS_DENIED": "ACCESS_DENIED",
    "NETWORK_ERROR": "NETWORK_ERROR"
})

// ------------------------------------
// Actions
// ------------------------------------
/**
 * 获取授权数据
 * @returns {function(*, *)}
 */
export const getCurrent = () => async (dispatch) => dispatch(await current())
export const setNetworkError = () => ({
    "type": "NETWORK_ERROR"
})