import {CALL_API} from 'middlewares/fetch';
import API from '../../middlewares/api';
import keyMirror from 'keymirror';
import {corpId, getAgentId} from 'config/app';
import dd from 'utils/dingding';

export const ACTION_TYPES = keyMirror({
    // 登录
    CORE_LAYOUT_LOGIN : null,
    // 获取用户信息(Cookie)
    CORE_LAYOUT_GET_USER_INFO : null,
    // 获取签名鉴权
    CORE_LAYOUT_GET_SIGNATURE : null,

    // 显示软键盘
    CORE_LAYOUT_SHOW_KEYBOARD : null,
    // 隐藏软键盘
    CORE_LAYOUT_HIDE_KEYBOARD : null,
    // 显示模态层
    CORE_LAYOUT_SHOW_MODAL : null,
    // 隐藏模态层
    CORE_LAYOUT_HIDE_MODAL : null
});

/**
 * 登录
 * @param success   登录成功回调
 * @param fail      登录失败回调
 * @returns {function(*, *)}
 */
export const login = (success, fail) => {
    return (dispatch, getState) => {
        // 获取免登code
        dd.runtime.permission.requestAuthCode({
            corpId,
            onSuccess : data =>
            {
                console.log(data.code);

                // 登录
                dispatch({
                    [CALL_API] : {
                        type : ACTION_TYPES.CORE_LAYOUT_LOGIN,
                        url : API.USER_LOGIN,
                        data : {code : data.code},
                        success,
                        fail
                    }
                });
            },
            onFail : e => {console.log(e);}
        })
    }
}

// 获取用户信息(Cookie)
export const getUserInfo = (success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.CORE_LAYOUT_GET_USER_INFO,
            url : API.USER_GET_INFO,
            success,
            fail
        }
    }
}

/**
 * 获取钉钉js_api签名
 * @param   app名 路由一级名
 * @returns {function(*=, *)}
 */
export const getSignature = appName => {
    return (dispatch, getState) => {
        dispatch({
            [CALL_API] : {
                type : ACTION_TYPES.CORE_LAYOUT_GET_SIGNATURE,
                url : API.COMMON_GET_SIGNATURE,
                success : data => {
                    // 钉钉配置
                    dd.config({
                        // 微应用ID
                        agentId : getAgentId(appName),
                        // 企业ID
                        corpId,
                        // 生成签名的时间戳
                        timeStamp : data.timeStamp,
                        // 生成签名的随机串
                        nonceStr : data.nonceStr,
                        // 签名
                        signature : data.signature,
                        // 微应用的jsapi
                        type : 0,
                        // 需要使用的jsapi列表
                        jsApiList : [ 'runtime.info', 'biz.contact.choose', 'biz.contact.complexChoose', 'biz.chat.openSingleChat',
                            'device.notification.confirm', 'device.notification.alert', 'biz.customContact.choose',
                            'device.notification.prompt', 'biz.ding.post', 'biz.util.open', 'biz.contact.departmentsPicker',
                            'biz.util.openLink', 'biz.telephone.call', 'biz.telephone.showCallMenu' ]
                    });
                    dd.ready(res => {})
                }
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

// 显示模态层
export const showModal = () => {
    return {
        type : ACTION_TYPES.CORE_LAYOUT_SHOW_MODAL
    }
}

// 隐藏模态层
export const hideModal = () => {
    return {
        type : ACTION_TYPES.CORE_LAYOUT_HIDE_MODAL
    }
}