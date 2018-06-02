import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 新增
    COURSERA_ADD_ADD : null
});

/**
 * 新增
 * @param data  @param data [num, photo, parking, color, frequency]
 * @param success   成功回调
 * @param fail   失败回调
 * @returns {{}}
 */
export const add = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.COURSERA_ADD_ADD,
            url : API.COURSERA_ADD,
            data,
            success,
            fail
        }
    }
}
