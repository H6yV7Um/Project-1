import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    PERFORMANCE_OKR_FEEDBACK_DETAIL_GET : null
});


/**
 * 获取信息
 * @param feedbackId  反馈id
 */
export const getOkr = feedbackId => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_DETAIL_GET,
            url : API.OKR_GET,
            data : {feedbackId, isGetFeedbackDetail : true, isGetUserInfo : true},
        }
    }
}








