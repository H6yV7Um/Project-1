import {CALL_API} from '../../../middlewares/fetch'
import API from '../../../middlewares/api'
import keyMirror from 'keymirror'

export const ACTION_TYPES = keyMirror({
    // 登录
    USER_LOGIN: null
})

export const login = (code, success) => {
    return {
        [CALL_API]: {
            type: ACTION_TYPES.USER_LOGIN,
            url: API.USER_LOGIN,
            data: {code},
            success
        }
    }
}

