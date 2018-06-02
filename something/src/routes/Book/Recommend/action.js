import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取推荐信息
    BOOK_RECOMMEND_GET_INFO     : null,
    // 推荐
    BOOK_RECOMMEND_SAVE         : null,
    // 清空数据
    BOOK_RECOMMEND_CLEAR        : null
});

/**
 * 获取推荐书信息
 * @param name      书名
 * @param author    书作者
 * @param success   成功回调
 * @param fail      失败回调
 */
export const getRecommendInfo = (name, author, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_RECOMMEND_GET_INFO,
            url : API.BOOK_RECOMMEND_GET_INFO,
            data : {name, author},
            success,
            fail
        }
    }
}

/**
 * 推荐
 * @param book          书
 * @param recommend     推荐
 * @param score         评分
 * @param remind        提醒
 * @param success       成功回调
 * @param fail          失败回调
 * @returns {{}}
 */
export const recommend = (book, recommend, score, remind, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_RECOMMEND_SAVE,
            url : API.BOOK_RECOMMEND_SAVE,
            data : {book, recommend, score, remind},
            success,
            fail
        }
    }
}

/**
 * 清空数据
 */
export const clear = () => {
    return {
        type : ACTION_TYPES.BOOK_RECOMMEND_CLEAR
    }
}





