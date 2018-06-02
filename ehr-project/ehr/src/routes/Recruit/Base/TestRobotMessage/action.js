import {CALL_API} from 'middlewares/fetch';
import API from '../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 发送面试通知机器人消息
    RECRUIT_BASE_TEST_ROBOT_MESSAGE                 :   null
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
            type : ACTION_TYPES.RECRUIT_BASE_TEST_ROBOT_MESSAGE,
            url : API.DINGDING_SEND_ROBOT_MESSAGE,
            data : {name: name, phone: phone, position: position, hrContact: hrContact},
            success,
            error
        }
    }
}

export const sendRobotMessageCv = (name, phone, position, success, error) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_SEND_MSG,
            url : API.DINGDING_SEND_ROBOT_MESSAGE_CV,
            data : {name: name, phone: phone, position: position},
            success,
            error
        }
    }
}





