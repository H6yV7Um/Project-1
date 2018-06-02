import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';
export const ACTION_TYPES = keyMirror({
    TRAIN_COURSERA_DEPARTMENT_LIST_PERSONAL_SEARCH_LIST : null,
    TRAIN_COURSERA_DEPARTMENT_LIST_PERSONAL_CLEAR: null,
    TRAIN_SEARCH_COURSERA_BY_DEPARTMENT: null
});

export const searchPersonalList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_DEPARTMENT_LIST_PERSONAL_SEARCH_LIST,
            url : API.TRAIN_COURSERA_GET_SEARCH_PERSONAL_LIST,
            data,
            success,
            fail
        }
    }
}
export const clear = () => {
    return {
        type : ACTION_TYPES.TRAIN_COURSERA_DEPARTMENT_LIST_PERSONAL_CLEAR,
    }
}

export const searchCourseraByDepartment = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_SEARCH_COURSERA_BY_DEPARTMENT,
            url : API.TRAIN_SEARCH_COURSERA_BY_DEPARTMENT,
            data,
            success,
            fail
        }
    }
}