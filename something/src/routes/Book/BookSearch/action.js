import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取Tap4fun推荐
    BOOK_RECOMMENDLIST_GET_RECOMMEND        :   null,
});

/**
 * 获取Tap4fun推荐
 * @param limit        条数
 * @param gotBookIds   已经获取到的数据的id
 * @returns {{}}
 */
export const getRecommend = (limit, gotBookIds) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_RECOMMENDLIST_GET_RECOMMEND,
            url : API.BOOK_BOOKS_GET,
            data : {type : 1, gotBookIds, limit, isGetDetail : false}
        }
    }
}