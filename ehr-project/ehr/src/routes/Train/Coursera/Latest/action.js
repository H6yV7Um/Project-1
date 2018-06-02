import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';
export const ACTION_TYPES = keyMirror({
    // 新增
    TRAIN_COURSERA_GET_LATEST_COURSERA_LIST : null,
    TRAIN_COURSERA_DELETE: null
});

/**
 * 获取新提交的coursera列表
 * @param condition.page 页码
 * @returns {{}}
 */
export const getAllLatestCourseraList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_GET_LATEST_COURSERA_LIST,
            url : API.TRAIN_COURSERA_GET_LATEST_COURSERA_LIST,
            data,
            success,
            fail
        }
    }
}


export const courseraDelete = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_DELETE,
            url : API.TRAIN_COURSERA_DELETE,
            data,
            success,
            fail
        }
    }
}

