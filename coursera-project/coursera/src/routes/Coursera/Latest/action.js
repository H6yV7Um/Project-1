import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';
export const ACTION_TYPES = keyMirror({
    // 新增
    GET_LATEST_COURSERA_LIST : null,
    DELETE: null
});

/**
 * 获取新提交的coursera列表
 * @param condition.page 页码
 * @returns {{}}
 */
export const getAllLatestCourseraList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.GET_LATEST_COURSERA_LIST,
            url : API.GET_LATEST_COURSERA_LIST,
            data,
            success,
            fail
        }
    }
}


export const courseraDelete = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.DELETE,
            url : API.DELETE,
            data,
            success,
            fail
        }
    }
}

