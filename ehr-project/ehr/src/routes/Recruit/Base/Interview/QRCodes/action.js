import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    PERSONALCENTER_CHECKIN_RECORD_ADD           :   null,
    // 查询用户是否签到
    PERSONALCENTER_QRCODES_IS_CHECK_IN          :   null
});

/**
 * 获取列表
 * @param name 姓名
 * @param phone 电话号码
 * @param position 职位
 * @param success 成功回调函数
 * @param error 错误回调函数
 */
export const establishWSConnect = () => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERSONALCENTER_QRCODES_ESTABLISHWSCONNECT,
            url : API.DINGDING_ESTABLISHWSCONNECT
        }
    }
}

/**
 * 获取列表
 * @param openid 微信用户唯一标识
 */
export const isCheckIn = (openid, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERSONALCENTER_QRCODES_IS_CHECK_IN,
            method : 'GET',
            url : API.RECRUIT_IS_CHECK_IN,
            data : {openid: openid},
            success
        }
    }
}






