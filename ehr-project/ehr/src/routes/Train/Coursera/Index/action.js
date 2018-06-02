import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    TRAIN_COURSERA_GET_CONRSERA_LIST: null,
    TRAIN_COURSERA_GET_SEARCH_LIST: null,
    TRAIN_COURSERA_INDEX_GET_DEPARTMENT: null,
    TRAIN_COURSERA_FILTER: null,
    TRAIN_COURSERA_INDEX_CLEAR: null,
    TRAIN_COURSERA_INDEX_GET_SCHOOL: null,
    TRAIN_COURSERA_INDEX_RESET_DB_COURSERA: null,
    TRAIN_COURSERA_GET_GO_BACK_TRAIN: null
});

export const getCourseraList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_GET_CONRSERA_LIST,
            url : API.TRAIN_COURSERA_GET_CONRSERA_LIST,
            data,
            success,
            fail
        }
    }
}

export const searchList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_GET_SEARCH_LIST,
            url : API.TRAIN_COURSERA_GET_SEARCH_LIST,
            data,
            success,
            fail
        }
    }
}

export const getDepartment = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_INDEX_GET_DEPARTMENT,
            url : API.TRAIN_COURSERA_GET_DEPARTMENT,
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
            type : ACTION_TYPES.TRAIN_COURSERA_FILTER,
            url : API.TRAIN_COURSERA_FILTER,
            data,
            success,
            fail
        }
    }
}

export const clear = () => {
    return {
        type : ACTION_TYPES.TRAIN_COURSERA_INDEX_CLEAR,
    }
}


export const getSchool = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_INDEX_GET_SCHOOL,
            url : API.TRAIN_COURSERA_GET_SCHOOL,
            data,
            success,
            fail
        }
    }
}

export const resetDbCoursera = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_INDEX_RESET_DB_COURSERA,
            url : API.TRAIN_COURSERA_RESET_DB_COURSERA,
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




