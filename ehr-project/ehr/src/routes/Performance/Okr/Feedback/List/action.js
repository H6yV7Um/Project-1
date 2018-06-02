import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取okr
    PERFORMANCE_OKR_FEEDBACK_LIST_GET_OKR : null,
    // 设置OKR筛选数据
    PERFORMANCE_OKR_FEEDBACK_LIST_SET_SELECT_DATA : null,
    // 设置滚动位置
    PERFORMANCE_OKR_FEEDBACK_LIST_SET_SCROLL_TOP : null
});

/**
 * 获取okr
 * @param userIds 成员ID
 * @param 时段 [起始年, 终止年] || -1:全部
 * @param page 页数
 * @param isRefresh 是否刷新
 * @returns {{}}
 */
export const getOkr = (userIds, date, page, isRefresh) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_LIST_GET_OKR,
            url : API.OKR_GET,
            data : {userIds, date, sort : {expected_time : 'desc', user_id : 'desc'}, page, limit : 5, isGetFeedbackDetail : true, isGetUserInfo : true, isRefresh}
        }
    }
}

/**
 * 设置OKR筛选数据
 * @param okrSelectData 获取OKR筛选数据
 */
export const setOkrSelectData = okrSelectData => {
    return {
        type : ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_LIST_SET_SELECT_DATA,
        data : {okrSelectData}
    }
}

/**
 * 设置滚动位置
 * @param scrollTop 滚动位置
 */
export const setScrollTop = scrollTop => {
    return {
        type : ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_LIST_SET_SCROLL_TOP,
        data : {scrollTop}
    }
}







