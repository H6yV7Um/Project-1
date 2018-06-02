import {CALL_API} from 'middlewares/fetch';
import API from '../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取签名鉴权
    WECHAT_LOGIN_LAYOUT_GET_SIGNATURE : null
});

/**
 * 获取微信签名
 * @param code 微信免登code
 */
export const getSignature = (code, fail) => {
    return (dispatch, getState) => {
        dispatch({
            [CALL_API] : {
                type : ACTION_TYPES.WECHAT_LOGIN_LAYOUT_GET_SIGNATURE,
                url : API.WECHAT_GET_SIGNATURE,
                data : {code : code},
                method : 'GET',
                fail
            }
        });
    }
}

// 显示软键盘
export const showKeyboard = () => {
    return {
        type : ACTION_TYPES.CORE_LAYOUT_SHOW_KEYBOARD
    }
}

// 隐藏软键盘
export const hideKeyboard = () => {
    return {
        type : ACTION_TYPES.CORE_LAYOUT_HIDE_KEYBOARD
    }
}