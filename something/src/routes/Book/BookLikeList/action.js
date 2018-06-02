import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取图书推荐
    BOOK_LIKELIST_GET_RECOMMEND        :   null,
});

/**
 * 获取相似书
 * @param bookId 书ID
 * @param limit 获取条数
 * @param isGetOwn 是否获取自己操作过的(推荐、赞、收藏、转发)
 */
export const getBookRecommend = (bookId, limit, isGetOwn) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_LIKELIST_GET_RECOMMEND,
            url : API.BOOK_GET_AKIN,
            data : {bookId : bookId, limit, isGetOwn : true}
        }
    }
}