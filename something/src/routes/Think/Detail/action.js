import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取想法详情
    THINK_DETAIL_GET_THINK          :   null,
    // 保存评论
    THINK_DETAIL_SAVE_REVIEW        :   null,
    // 获取评论列表
    THINK_DETAIL_GET_REVIEWS        :   null,
    // 删除评论
    THINK_DETAIL_DELETE_REVIEW      :   null,
    // 点赞评论
    THINK_DETAIL_OPEN_REVIEW_LIKE   :   null,
    // 取消点赞评论
    THINK_DETAIL_CLOSE_REVIEW_LIKE  :   null,
    // 保存评论回复
    THINK_DETAIL_SAVE_REPLY         :   null,
    // 删除评论回复
    THINK_DETAIL_DELETE_REPLY       :   null,
});

/**
 * 获取想法详情
 * @param thinkId   想法ID
 * @param fail      失败回调
 * @returns {{}}
 */
export const getThink = (thinkId, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_DETAIL_GET_THINK,
            url : API.THINK_GET,
            data : {thinkId},
            fail
        }
    }
}

/**
 * 保存评论
 * @param review        评论
 * @returns {{}}
 */
export const saveReview = review => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_DETAIL_SAVE_REVIEW,
            url : API.THINK_REVIEW_SAVE,
            data : {review}
        }
    }
}

/**
 * 获取评论列表
 * @param thinkId       想法ID
 * @param gotThinkReviewIds 已获取评论ID集合
 * @param limit         获取条数
 * @param order         排序(desc: 降序 asc: 升序)
 * @returns {{}}
 */
export const getReviews = (thinkId, gotThinkReviewIds, limit, order) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_DETAIL_GET_REVIEWS,
            url : API.THINK_REVIEW_GET,
            data : {thinkId, gotThinkReviewIds, limit, order}
        }
    }
}

/**
 * 删除评论
 * @param thinkReviewId  评论ID
 * @returns {{}}
 */
export const deleteReview = thinkReviewId => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_DETAIL_DELETE_REVIEW,
            url : API.THINK_REVIEW_DELETE,
            data : {thinkReviewId}
        }
    }
}

/**
 * 点赞评论
 * @param thinkReviewId 评论ID
 * @param userInfo      用户信息
 * @returns {{}}
 */
export const openReviewLike = (thinkReviewId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_DETAIL_OPEN_REVIEW_LIKE,
            url : API.THINK_REVIEW_OPEN_LIKE,
            data : {thinkReviewId, userInfo}
        }
    }
}

/**
 * 取消点赞评论
 * @param thinkReviewId 评论ID
 * @param userInfo      用户信息
 * @returns {{}}
 */
export const closeReviewLike = (thinkReviewId, userInfo) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_DETAIL_CLOSE_REVIEW_LIKE,
            url : API.THINK_REVIEW_CLOSE_LIKE,
            data : {thinkReviewId, userInfo}
        }
    }
}

/**
 * 保存评论回复
 * @param replyObjId 回复对象ID
 * @param replyObjType 回复对象类型 [review, reply]
 * @param reply 回复内容
 * @returns {{}}
 */
export const saveReply = (replyObjId, replyObjType, reply) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_DETAIL_SAVE_REPLY,
            url : API.THINK_REPLY_SAVE,
            data : {replyObjId, replyObjType, reply}
        }
    }
}

/**
 * 删除评论回复
 * @param thinkReplyId  评论回复ID
 * @param thinkReviewId  评论ID
 * @returns {{}}
 */
export const deleteReply = (thinkReplyId, thinkReviewId) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_DETAIL_DELETE_REPLY,
            url : API.THINK_REPLY_DELETE,
            data : {thinkReplyId, thinkReviewId}
        }
    }
}






