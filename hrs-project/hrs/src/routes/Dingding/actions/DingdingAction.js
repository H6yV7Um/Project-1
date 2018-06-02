import keyMirror from 'keymirror'
import {DINGDING, SERVER_NAME} from 'config'
import {getSignature} from '../middlewares/DingdingMiddleware'
import {ACTIONS as LAYOUT_ACTIONS} from 'layouts/NormalLayout/Action'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({})

// ------------------------------------
// Actions
// ------------------------------------
/**
 * 登录
 * @returns {function(*, *)}
 */
export const login = (isLogin = true) => (dispatch, getState) => {
    dispatch({"type": LAYOUT_ACTIONS.LOADING_START})
    return getSignature().then((r) => r.json()).then((json) => {
        dispatch({"type": LAYOUT_ACTIONS.LOADING_STOP})
        if (json.errno === 0) {
            const data = json.data
            DINGDING.timeStamp = data.timestamp
            DINGDING.nonceStr = data.noncestr
            DingTalkPC.config({DINGDING})
            DingTalkPC.runtime.permission.requestAuthCode({
                "corpId": DINGDING.corpId,
                "onSuccess": (data) => {
                        // Test
                    if (!isLogin) {
                        console.log(data)
                    } else {
                        DingTalkPC.biz.util.openLink({"url": `${SERVER_NAME}hrs?code=${data.code}`})
                    }
                },
                "onFail": (e) => {
                    console.log(e)
                }
            })
        }
    }).catch((e) => {
        console.log(e)
    })
}

export const localLogin = (isLogin = true) => (dispatch, getState) => {
    dispatch({"type": LAYOUT_ACTIONS.LOADING_START})
    return getSignature().then((r) => r.json()).then((json) => {
        dispatch({"type": LAYOUT_ACTIONS.LOADING_STOP})
        if (json.errno === 0) {
            const data = json.data
            DINGDING.timeStamp = data.timestamp
            DINGDING.nonceStr = data.noncestr
            DingTalkPC.config({DINGDING})
            DingTalkPC.runtime.permission.requestAuthCode({
                "corpId": DINGDING.corpId,
                "onSuccess": (data) => {
                    if (!isLogin) {
                    } else {
                        DingTalkPC.biz.util.openLink({"url": `http://localhost:3000/hrs/login?code=${data.code}`})
                    }
                },
                "onFail": (e) => {
                    console.log(e)
                }
            })
        }
    }).catch((e) => {
        console.log(e)
    })
}

