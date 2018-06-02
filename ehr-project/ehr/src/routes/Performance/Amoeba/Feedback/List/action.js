import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取阿米巴
    PERFORMANCE_AMOEBA_FEEDBACK_LIST_GET_AMB : null,
    // 设置阿米巴筛选数据
    PERFORMANCE_AMOEBA_FEEDBACK_LIST_SET_SELECT_DATA : null,
    // 设置滚动位置
    PERFORMANCE_AMOEBA_FEEDBACK_LIST_SET_SCROLL_TOP : null
});
/**
 * 获取阿米巴
 * @param userIds 成员ID
 * @param 时段 [起始年, 终止年] || -1:全部
 * @param page 页数
 * @param isRefresh 是否刷新
 * @returns {{}}
 */
export const getAmoeba = (departmentIds, date, page, isRefresh) =>{
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERFORMANCE_AMOEBA_FEEDBACK_LIST_GET_AMB,
            url : API.AMOEBA_GET,
            data : {departmentIds, date, sort : {expected_time : 'desc', department_id : 'desc'}, page, limit : 20, isGetFeedbackDetail : true, isGetUserInfo : true, isRefresh}
        }
    }
}

/**
 * 设置阿米巴筛选数据
 * @param amoebaSelectData 获取AMB筛选数据
 */
export const setAmoebaSelectData = amoebaSelectData => {
    return {
        type : ACTION_TYPES.PERFORMANCE_AMOEBA_FEEDBACK_LIST_SET_SELECT_DATA,
        data : {amoebaSelectData}
    }
}

/**
 * 设置滚动位置
 * @param scrollTop 滚动位置
 */
export const setScrollTop = scrollTop => {
    return {
        type : ACTION_TYPES.PERFORMANCE_AMOEBA_FEEDBACK_LIST_SET_SCROLL_TOP,
        data : {scrollTop}
    }
}











