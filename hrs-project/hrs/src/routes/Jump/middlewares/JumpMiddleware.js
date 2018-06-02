import {SERVER, HTTP_HEADER} from 'config'
import {DINGDING, SERVER_NAME} from 'config'
const GET_SIGNATURE = 'http://ding.tap4fun.com/client/signature'
const getSignature = () => fetch(GET_SIGNATURE, {
    ...HTTP_HEADER,
    "method": 'GET',
    "headers": {
        'content-type': 'application/x-www-form-urlencoded',
        'Ding-Appname': 'okrs'
    }
})
export const login = (url) => (dispatch, getState) => {
    dispatch({"type": "JUMP_LOGIN_LOADING"})
    return getSignature().then((r) => r.json()).then((json) => {
        if (json.errno === 0) {
            const data = json.data
            DINGDING.timeStamp = data.timestamp
            DINGDING.nonceStr = data.noncestr
            DingTalkPC.config({DINGDING})
            DingTalkPC.runtime.permission.requestAuthCode({
                "corpId": DINGDING.corpId,
                "onSuccess": (data) => {
                    DingTalkPC.biz.util.openLink({"url": url})
                    DingTalkPC.biz.navigation.quit({
					    message: " ",
					    onSuccess : function(result) {
					        /**/
					    },
					    onFail : function() {}
					})
                },
                "onFail": (e) => {
    				dispatch({"type": "JUMP_LOGIN_FAIL"})
                }
            })
        }
    }).catch((e) => {
        dispatch({"type": "JUMP_LOGIN_ERROR"})
    })
}
