import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取详情
    BOOK_DETAIL_GET_DETAIL              : null,
    // 获取相似书
    BOOK_DETAIL_GET_AKIN                : null,
    // 获取书sns信息
    BOOK_DETAIL_GET_SNS                 : null,
    // 点赞书
    BOOK_DETAIL_OPEN_LIKE               : null,
    // 取消点赞书
    BOOK_DETAIL_CLOSE_LIKE              : null,
    // 收藏书
    BOOK_DETAIL_OPEN_COLLECTION         : null,
    // 取消收藏书
    BOOK_DETAIL_CLOSE_COLLECTION        : null,
    // 获取展示书评
    BOOK_DETAIL_GET_SHOW_REVIEW         : null,
    // 获取精彩书评
    BOOK_DETAIL_GET_WONDERFUL_REVIEW    : null,
    // 获取普通书评
    BOOK_DETAIL_GET_COMMON_REVIEW       : null,
    // 清空普通书评
    BOOK_DETAIL_CLEAR_COMMON_REVIEW     : null,
    // 保存评分
    BOOK_DETAIL_SAVE_SCORE              : null,
    // 转发
    BOOK_DETAIL_OPEN_FORWARD            : null,
    // 取消转发
    BOOK_DETAIL_CLOSE_FORWARD           : null,
    // 点赞书评
    BOOK_DETAIL_OPEN_REVIEW_LIKE        : null,
    // 取消点赞书评
    BOOK_DETAIL_CLOSE_REVIEW_LIKE       : null,
    // 关注书评
    BOOK_DETAIL_OPEN_REVIEW_FOLLOW      : null,
    // 取消关注书评
    BOOK_DETAIL_CLOSE_REVIEW_FOLLOW     : null,
    // 保存书评
    BOOK_DETAIL_SAVE_REVIEW             : null,
    // 删除书评
    BOOK_DETAIL_DELETE_REVIEW           : null,
    // 转发书评
    BOOK_DETAIL_OPEN_REVIEW_FORWARD     : null,
    // 取消转发书评
    BOOK_DETAIL_CLOSE_REVIEW_FORWARD    : null,
    // 提交书评回复
    BOOK_DETAIL_SUBMIT_REPLY            : null,
    // 删除书评回复
    BOOK_DETAIL_DELETE_REPLY            : null,
    // 获取书评回复列表
    BOOK_DETAIL_GET_REPLIES             : null,
    // 清空数据
    BOOK_DETAIL_CLEAR                   : null
});

/**
 * 获取详情
 * @param bookId    书ID
 * @param success   成功回调
 * @param fail      失败回调
 * @returns {{}}
 */
export const getDetail = (bookId, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_GET_DETAIL,
            url : API.BOOK_GET_DETAIL,
            data : {bookId},
            success,
            fail
        }
    }
}

/**
 * 获取相似书
 * @param bookId    书ID
 * @param limit     获取条数
 * @returns {{}}
 */
export const getAkin = (bookId, limit) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_GET_AKIN,
            url : API.BOOK_GET_AKIN,
            data : {bookId, limit}
        }
    }
}

/**
 * 获取书sns信息
 * @param bookId    书ID
 * @returns {{}}
 */
export const getSns = bookId => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_GET_SNS,
            url : API.BOOK_GET_SNS,
            data : {bookId}
        }
    }
}

/**
 * 点赞书
 * @param bookId        书ID
 * @param userInfo      用户信息
 * @returns {{}}
 */
export const openLike = (bookId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_OPEN_LIKE,
            url : API.BOOK_OPEN_LIKE,
            data : {bookId, userInfo}
        }
    }
}

/**
 * 取消点赞书
 * @param bookId        书ID
 * @param userInfo      用户信息
 * @returns {{}}
 */
export const closeLike = (bookId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_CLOSE_LIKE,
            url : API.BOOK_CLOSE_LIKE,
            data : {bookId, userInfo}
        }
    }
}

/**
 * 收藏书
 * @param bookId        书ID
 * @param userInfo      用户信息
 * @returns {{}}
 */
export const openCollection = (bookId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_OPEN_COLLECTION,
            url : API.BOOK_OPEN_COLLECTION,
            data : {bookId, userInfo}
        }
    }
}

/**
 * 取消收藏书
 * @param bookId        书ID
 * @param userInfo      用户信息
 * @returns {{}}
 */
export const closeCollection = (bookId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_CLOSE_COLLECTION,
            url : API.BOOK_CLOSE_COLLECTION,
            data : {bookId, userInfo}
        }
    }
}

/**
 * 保存评分
 * @param bookId    书ID
 * @param score     评分
 * @returns {{}}
 */
export const saveScore = (bookId, score) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_SAVE_SCORE,
            url : API.BOOK_SCORE_SAVE,
            data : {score : {book_id : bookId, score}}
        }
    }
}

/**
 * 转发
 * @param bookId         书ID
 * @param forward        转发书评
 * @param userInfo       用户信息
 * @returns {{}}
 */
export const openForward = (bookId, forward, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_OPEN_FORWARD,
            url : API.BOOK_OPEN_FORWARD,
            data : {bookId, forward, userInfo}
        }
    }
}

/**
 * 取消转发
 * @param bookId        书ID
 * @param userInfo      用户信息
 */
export const closeForward = (bookId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_CLOSE_FORWARD,
            url : API.BOOK_CLOSE_FORWARD,
            data : {bookId, userInfo}
        }
    }
}

/**
 * 获取展示书评 (初始展示精彩和其他)
 * @param bookId    书ID
 * @returns {{}}
 */
export const getShowReview = bookId => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_GET_SHOW_REVIEW,
            url : API.BOOK_REVIEW_GET_SHOW,
            data : {bookId}
        }
    }
}

/**
 * 获取精彩书评
 * @param bookId    书ID
 * @param gotBookReviewIds  已获取书评ID集合
 * @returns {{}}
 */
export const getWonderfulReview = (bookId, gotBookReviewIds) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_GET_WONDERFUL_REVIEW,
            url : API.BOOK_REVIEW_GET_WONDERFUL,
            data : {bookId, gotBookReviewIds, limit : 30}
        }
    }
}

/**
 * 获取普通书评
 * @param bookId    书ID
 * @param gotBookReviewIds  已获取书评ID集合
 * @param order 排序 [desc: 降序 asc: 升序]
 * @returns {{}}
 */
export const getCommonReview = (bookId, gotBookReviewIds, order) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_GET_COMMON_REVIEW,
            url : API.BOOK_REVIEW_GET_COMMON,
            data : {bookId, gotBookReviewIds, order, limit : 30}
        }
    }
}

/**
 * 清空普通书评
 */
export const clearCommonReview = () => {
    return {
        type : ACTION_TYPES.BOOK_DETAIL_CLEAR_COMMON_REVIEW
    }
}

/**
 * 点赞书评
 * @param bookReviewId  书评ID
 * @param userInfo      用户信息
 * @returns {{}}
 */
export const openReviewLike = (bookReviewId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_OPEN_REVIEW_LIKE,
            url : API.BOOK_REVIEW_OPEN_LIKE,
            data : {bookReviewId, userInfo}
        }
    }
}

/**
 * 取消点赞书评
 * @param bookReviewId  书评ID
 * @param userInfo      用户信息
 * @returns {{}}
 */
export const closeReviewLike = (bookReviewId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_CLOSE_REVIEW_LIKE,
            url : API.BOOK_REVIEW_CLOSE_LIKE,
            data : {bookReviewId, userInfo}
        }
    }
}

/**
 * 关注书评
 * @param bookId        书ID
 * @returns {{}}
 */
export const openReviewFollow = bookId => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_OPEN_REVIEW_FOLLOW,
            url : API.BOOK_REVIEW_OPEN_FOLLOW,
            data : {bookId}
        }
    }
}

/**
 * 取消关注书评
 * @param bookId        书ID
 * @returns {{}}
 */
export const closeReviewFollow = bookId => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_CLOSE_REVIEW_FOLLOW,
            url : API.BOOK_REVIEW_CLOSE_FOLLOW,
            data : {bookId}
        }
    }
}

/**
 * 保存书评
 * @param bookId    书ID
 * @param review    书评
 * @param remindUserIds 提醒用户IDS
 * @param success   成功回调
 * @returns {{}}
 */
export const saveReview = (bookId, review, remindUserIds, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_SAVE_REVIEW,
            url : API.BOOK_REVIEW_SAVE,
            data : {review : {book_id : bookId, review, remind_user_ids : remindUserIds}},
            success
        }
    }
}

/**
 * 删除书评
 * @param bookReviewId   书评ID
 * @param isWonderful    是否是精彩书评
 * @returns {{}}
 */
export const deleteReview = (bookReviewId, isWonderful) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_DELETE_REVIEW,
            url : API.BOOK_REVIEW_DELETE,
            data : {bookReviewId, isWonderful}
        }
    }
}

/**
 * 转发书评
 * @param bookReviewId   书评ID
 * @param forward        转发回复
 * @param userInfo       用户信息
 * @returns {{}}
 */
export const openReviewForward = (bookReviewId, forward, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_OPEN_REVIEW_FORWARD,
            url : API.BOOK_REVIEW_OPEN_FORWARD,
            data : {bookReviewId, forward, userInfo}
        }
    }
}

/**
 * 取消转发书评
 * @param bookReviewId  书评ID
 * @param userInfo      用户信息
 */
export const closeReviewForward = (bookReviewId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_CLOSE_REVIEW_FORWARD,
            url : API.BOOK_REVIEW_CLOSE_FORWARD,
            data : {bookReviewId, userInfo}
        }
    }
}

/**
 * 提交书评回复
 * @param replyObjId    回复对象ID
 * @param replyObjType  回复对象类型 [review, reply]
 * @param reply         回复内容
 * @returns {{}}
 */
export const submitReply = (replyObjId, replyObjType, reply) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_SUBMIT_REPLY,
            url : API.BOOK_REPLY_SUBMIT,
            data : {replyObjId, replyObjType, reply}
        }
    }
}

/**
 * 删除书评回复
 * @param bookReplyId   回复ID
 * @param bookReviewId  书评ID
 * @returns {{}}
 */
export const deleteReply = (bookReplyId, bookReviewId) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_DELETE_REPLY,
            url : API.BOOK_REPLY_DELETE,
            data : {bookReplyId, bookReviewId}
        }
    }
}

/**
 * 获取书评回复列表
 * @param bookReviewId  书评ID
 * @param gotReplyIds   已获取回复ID集合
 */
export const getReplies = (bookReviewId, gotReplyIds) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.BOOK_DETAIL_GET_REPLIES,
            url : API.BOOK_REPLIES_GET,
            data : {bookReviewId, gotReplyIds, limit : 20}
        }
    }
}

/**
 * 清空数据
 */
export const clear = () => {
    return {
        type : ACTION_TYPES.BOOK_DETAIL_CLEAR
    }
}






