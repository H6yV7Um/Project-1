import {CALL_API} from 'middlewares/fetch';
import API from '../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取详情
    BOOK_THINKING_DETAIL_GET_DETAIL          :  null,
});

/**
 * 获取详情
 * @param bookThinkingId  心得ID
 * @param remind    提醒
 * @param success   成功回调
 * @param fail      失败回调
 * @returns {{}}
 */
export const getDetail = (bookThinkingId, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_THINKING_DETAIL_GET_DETAIL,
            url : API.BOOK_THINKING_GET_DETAIL,
            data : {bookThinkingId},
            success,
            fail
        }
    }
}





