import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取热门推荐
    BOOK_INDEX_GET_RECOMMEND        :   null,
    // 获取猜你喜欢
    BOOK_INDEX_GET_LIKE             :   null
});

/**
 * 获取热门推荐
 * @param limit     条数
 * @param success
 * @returns {{}}
 */
export const getRecommend = (limit, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_INDEX_GET_RECOMMEND,
            url : API.BOOK_BOOKS_GET,
            data : {type : 1, limit, isGetDetail : false},
            success
        }
    }
}

/**
 * 获取猜你喜欢
 * @param $gotBookIds   已获取书ID集合
 * @param limit         条数
 * @param success
 * @returns {{}}
 */
export const getLike = (gotBookIds, limit) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_INDEX_GET_LIKE,
            url : API.BOOK_BOOKS_GET_LIKE,
            data : {gotBookIds, limit, isGetDetail : false}
        }
    }
}





