import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';
export const ACTION_TYPES = keyMirror({
    GET_ALL_COURSERA_LIST : null,
    CHART_GET_DEPARTMENT: null,
    CHART_CHANGE_TYPE: null,
    CHART_CLEAR: null
});
export const getAllCourseraList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.GET_ALL_COURSERA_LIST,
            url : API.GET_ALL_COURSERA_LIST,
            data,
            success,
            fail
        }
    }
};
export const getDepartment = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.CHART_GET_DEPARTMENT,
            url : API.GET_DEPARTMENT,
            data,
            success,
            fail
        }
    }
};
export const changeType = (index) => {
    return {
        type: ACTION_TYPES.CHART_CHANGE_TYPE,
        index: index
    }
};

export const isClear = ()=>{
    return {
        type: ACTION_TYPES.CHART_CLEAR,
    }
}



