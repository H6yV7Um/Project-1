import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 新增
    // TRAIN_COURSERA_ADD : null,
    TRAIN_COURSERA_MANAGEMENT_GET_DEPARTMENT: null,
    TRAIN_COURSERA_MANAGEMENT_SAVE_MANAGEMENT: null

});

export const getDepartment = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_MANAGEMENT_GET_DEPARTMENT,
            url : API.TRAIN_COURSERA_GET_DEPARTMENT,
            data,
            success,
            fail
        }
    }
}

export const saveManagement = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_MANAGEMENT_SAVE_MANAGEMENT,
            url : API.TRAIN_COURSERA_MANAGEMENT_SAVE_MANAGEMENT,
            data,
            success,
            fail
        }
    }
}






