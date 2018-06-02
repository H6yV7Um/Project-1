import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 车牌号查询用户
    CAR_LAYOUT_FOOTER_FIND_USER_FOR_CAR_NUM : null
});

/**
 * 车牌号查询用户
 * @param num   车牌号
 * @param success   成功回调
 * @param fail   失败回调
 * @returns {{}}
 */
export const findUserForCarNum = (num, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.CAR_LAYOUT_FOOTER_FIND_USER_FOR_CAR_NUM,
            url : API.USER_FIND_FOR_CAR_NUM,
            data : {num},
            success,
            fail
        }
    }
}