import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取
    CAR_EDIT_GET : null,
    // 编辑
    CAR_EDIT_EDIT : null
});

/**
 * 获取
 * @param carId    车ID
 * @returns {{}}
 */
export const get = carId => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.CAR_EDIT_GET,
            url : API.CAR_GET,
            data : {carId}
        }
    }
}

/**
 * 编辑
 * @param carId    车ID
 * @param data [num, photo, parking, color, frequency]
 * @param success   成功回调
 * @param fail   失败回调
 * @returns {{}}
 */
export const edit = (carId, data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.CAR_EDIT_EDIT,
            url : API.CAR_EDIT,
            data : {carId, ...data},
            success,
            fail
        }
    }
}



