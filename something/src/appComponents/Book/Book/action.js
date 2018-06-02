import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取所有书标签
    APPCOMPONENT_BOOK_BOOK_TAG_GET_ALL : null
});

export const getTags = success => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.APPCOMPONENT_BOOK_BOOK_TAG_GET_ALL,
            url : API.BOOK_TAG_GET_ALL,
            success
        }
    }
}





