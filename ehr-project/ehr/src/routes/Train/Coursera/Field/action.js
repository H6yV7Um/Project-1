import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 新增
    TRAIN_COURSERA_ADD : null,
    TRAIN_COURSERA_SEARCH_NAME:null,
    TRAIN_COURSERA_GET_PERSONAL_DEPARTMENT: null,
    TRAIN_COURSERA_ZE_URL:null,
    TRAIN_COURSERA_GET_COURSERA_JSON: null
});

export const add = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_ADD,
            url : API.TRAIN_COURSERA_ADD,
            data,
            success,
            fail
        }
    }
}

export const searchName = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_SEARCH_NAME,
            url : API.TRAIN_COURSERA_SEARCH_NAME,
            data,
            success,
            fail
        }
    }
}

export const getPersonalDepartment = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_GET_PERSONAL_DEPARTMENT,
            url : API.TRAIN_COURSERA_GET_PERSONAL_DEPARTMENT,
            data,
            success,
            fail
        }
    }
}

export const zeURL = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_ZE_URL,
            url : API.TRAIN_COURSERA_ZE_URL,
            data,
            success,
            fail
        }
    }
}

export const getCourseraJson = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_GET_COURSERA_JSON,
            url : API.TRAIN_COURSERA_CROSSS_DOMAIN,
            data,
            success,
            fail
        }
    }
}



