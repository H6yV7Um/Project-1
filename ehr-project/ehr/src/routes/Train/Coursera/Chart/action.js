import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';
export const ACTION_TYPES = keyMirror({
    TRAIN_COURSERA_GET_ALL_COURSERA_LIST : null,
    TRAIN_COURSERA_CHART_GET_DEPARTMENT: null,
    TRAIN_COURSERA_CHART_CHANGE_TYPE: null,
    TRAIN_COURSERA_CHART_CLEAR: null
});
export const getAllCourseraList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_GET_ALL_COURSERA_LIST,
            url : API.TRAIN_COURSERA_GET_ALL_COURSERA_LIST,
            data,
            success,
            fail
        }
    }
};
export const getDepartment = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_CHART_GET_DEPARTMENT,
            url : API.TRAIN_COURSERA_GET_DEPARTMENT,
            data,
            success,
            fail
        }
    }
};
export const changeType = (index) => {
    return {
        type: ACTION_TYPES.TRAIN_COURSERA_CHART_CHANGE_TYPE,
        index: index
    }
};

export const isClear = ()=>{
    return {
        type: ACTION_TYPES.TRAIN_COURSERA_CHART_CLEAR,
    }
}



