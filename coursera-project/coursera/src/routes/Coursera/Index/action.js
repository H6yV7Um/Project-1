import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    GET_CONRSERA_LIST: null,
    GET_SEARCH_LIST: null,
    INDEX_GET_DEPARTMENT: null,
    FILTER: null,
    INDEX_CLEAR: null,
    INDEX_GET_SCHOOL: null,
    INDEX_RESET_DB_COURSERA: null,
    GET_GO_BACK_TRAIN: null
});

export const getCourseraList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.GET_CONRSERA_LIST,
            url : API.GET_CONRSERA_LIST,
            data,
            success,
            fail
        }
    }
}

export const searchList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.GET_SEARCH_LIST,
            url : API.GET_SEARCH_LIST,
            data,
            success,
            fail
        }
    }
}

export const getDepartment = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.INDEX_GET_DEPARTMENT,
            url : API.GET_DEPARTMENT,
            data,
            success,
            fail
        }
    }
}
/**
 * 获取筛选列表
 * @param data.condition 筛选的条件
 * @returns {{}}
 */
export const filter = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.FILTER,
            url : API.FILTER,
            data,
            success,
            fail
        }
    }
}

export const clear = () => {
    return {
        type : ACTION_TYPES.INDEX_CLEAR,
    }
}


export const getSchool = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.INDEX_GET_SCHOOL,
            url : API.GET_SCHOOL,
            data,
            success,
            fail
        }
    }
}

export const resetDbCoursera = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.INDEX_RESET_DB_COURSERA,
            url : API.RESET_DB_COURSERA,
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




