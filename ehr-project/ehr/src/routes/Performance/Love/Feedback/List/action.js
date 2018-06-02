import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取love
    PERFORMANCE_LOVE_FEEDBACK_LIST_GET_LOVE : null,
    // 设置love筛选数据
    PERFORMANCE_LOVE_FEEDBACK_LIST_SET_SELECT_DATA : null,
    // 设置滚动位置
    PERFORMANCE_LOVE_FEEDBACK_LIST_SET_SCROLL_TOP : null
});
/**
 * 获取love
 * @param userIds 成员ID
 * @param 时段 [起始年, 终止年] || -1:全部
 * @param page 页数
 * @param isRefresh 是否刷新
 * @returns {{}}
 */
export const getLove = (departmentIds, date, page, isRefresh) =>{
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_LIST_GET_LOVE,
            url : API.LOVE_GET,
            data : {departmentIds, date, sort : {expected_time : 'desc', department_id : 'desc'}, page, limit : 20, isGetFeedbackDetail : true, isGetUserInfo : true, isRefresh}
        }
    }
}

/**
 * 设置LOVE筛选数据
 * @param loveSelectData 获取LOVE筛选数据
 */
export const setLoveSelectData = loveSelectData => {
    return {
        type : ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_LIST_SET_SELECT_DATA,
        data : {loveSelectData}
    }
}

/**
 * 设置滚动位置
 * @param scrollTop 滚动位置
 */
export const setScrollTop = scrollTop => {
    return {
        type : ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_LIST_SET_SCROLL_TOP,
        data : {scrollTop}
    }
}











