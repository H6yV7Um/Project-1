import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    PERSONALCENTER_CHECKIN_RECORD_ADD           :   null
});

/**
 * 获取列表
 * @param name 姓名
 * @param phone 电话号码
 * @param position 职位
 * @param success 成功回调函数
 * @param error 错误回调函数
 */
export const checkIn = (name, phone, position, success, error) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERSONALCENTER_CHECKIN_RECORD_ADD,
            url : API.DINGDING_SEND_ROBOT_MESSAGE,
            data : {name: name, phone: phone, position: position},
            success,
            error
        }
    }
}






