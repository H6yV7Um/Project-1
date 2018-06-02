import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 新增
    ADD : null,
    SEARCH_NAME:null,
    GET_PERSONAL_DEPARTMENT: null,
    ZE_URL:null,
    GET_COURSERA_JSON: null
});

export const add = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.ADD,
            url : API.ADD,
            data,
            success,
            fail
        }
    }
}

export const searchName = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.SEARCH_NAME,
            url : API.SEARCH_NAME,
            data,
            success,
            fail
        }
    }
}

export const getPersonalDepartment = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.GET_PERSONAL_DEPARTMENT,
            url : API.GET_PERSONAL_DEPARTMENT,
            data,
            success,
            fail
        }
    }
}

export const zeURL = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.ZE_URL,
            url : API.ZE_URL,
            data,
            success,
            fail
        }
    }
}

export const getCourseraJson = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.GET_COURSERA_JSON,
            url : API.CROSSS_DOMAIN,
            data,
            success,
            fail
        }
    }
}



