import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 新增
    // ADD : null,
    MANAGEMENT_GET_DEPARTMENT: null,
    MANAGEMENT_SAVE_MANAGEMENT: null

});

export const getDepartment = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.MANAGEMENT_GET_DEPARTMENT,
            url : API.GET_DEPARTMENT,
            data,
            success,
            fail
        }
    }
}

export const saveManagement = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.MANAGEMENT_SAVE_MANAGEMENT,
            url : API.MANAGEMENT_SAVE_MANAGEMENT,
            data,
            success,
            fail
        }
    }
}






