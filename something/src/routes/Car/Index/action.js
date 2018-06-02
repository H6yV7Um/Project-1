import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取列表
    CAR_INDEX_GET_LIST : null,
    // 删除
    CAR_INDEX_DELETE : null
});

/**
 * 获取列表
 * @returns {{}}
 */
export const getList = (success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.CAR_INDEX_GET_LIST,
            url : API.CAR_GET_LIST,
            success
        }
    }
}

/**
 * 删除
 * @param carId ID
 * @returns {{}}
 */
export const deleteCar = carId => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.CAR_INDEX_DELETE,
            url : API.CAR_DELETE,
            data : {carId}
        }
    }
}



