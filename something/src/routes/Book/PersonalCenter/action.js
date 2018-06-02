import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取我的书架
    BOOK_PERSONALCENTER_GET_MYBOOKS         :   null
});

/**
 * 获取热门推荐
 * @param limit     条数
 * @param success
 * @returns {{}}
 */
export const getMyBooks = (limit, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_INDEX_GET_RECOMMEND,
            url : API.BOOK_BOOKS_GET,
            data : {type : 1, limit, isGetDetail : false},
            success
        }
    }
}