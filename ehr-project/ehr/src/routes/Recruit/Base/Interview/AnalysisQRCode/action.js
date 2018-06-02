import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 发送钉钉机器人消息
    PERSONALCENTER_SEND_ROBOT_MESSAGE           :   null,
    // 修改用户签到状态
    PERSONALCENTER_CHECK_IN                     :   null
});

/**
 * 获取列表
 * @param name 姓名
 * @param phone 电话号码
 * @param position 职位
 * @param success 成功回调函数
 * @param error 错误回调函数
 */
export const sendRobotMessage = (name, phone, position, hrContact, success, error) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERSONALCENTER_SEND_ROBOT_MESSAGE,
            url : API.DINGDING_SEND_ROBOT_MESSAGE,
            data : {name: name, phone: phone, position: position, hrContact: hrContact},
            success,
            error
        }
    }
}

/**
 * 修改签到状态为已签到
 * @param openid 微信用户唯一标识
 */
export const checkIn = (openid) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERSONALCENTER_CHECK_IN,
            url : API.RECRUIT_CHECK_IN,
            data : {openid: openid}
        }
    }
}






