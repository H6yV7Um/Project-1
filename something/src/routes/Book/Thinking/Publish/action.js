import {CALL_API} from 'middlewares/fetch';
import API from '../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 发表心得
    BOOK_THINKING_PUBLISH_PUBLISH     : null
});

/**
 * 发表心得
 * @param thinking  心得
 * @param remind    提醒
 * @param success   成功回调
 * @param fail      失败回调
 * @returns {{}}
 */
export const publish = (thinking, remind, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_THINKING_PUBLISH_PUBLISH,
            url : API.BOOK_THINKING_SAVE,
            data : {thinking, remind},
            success,
            fail
        }
    }
}





