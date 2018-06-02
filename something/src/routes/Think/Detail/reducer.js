import {ACTION_TYPES} from './action';
import {addStr, deleteStr, deleteArray} from 'utils/array';

const initialState = {
    // 是否正在获取想法
    fetchGetThink           :   false,
    // 想法
    think                   :   null,

    // 是否正在获取评论列表
    fetchGetReviews         :   false,
    // 评论列表
    reviews                 :   null,
    // 已获取评论ID集合
    gotThinkReviewIds       :   null,
    // 是否还有评论未取
    hasReview               :   false
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 获取详情
        case `REQUEST_${ACTION_TYPES.THINK_DETAIL_GET_THINK}`:
            newState.fetchGetThink = true;
            newState.think = null;
            newState.reviews = null;
            newState.gotThinkReviewIds = null;
            newState.hasReview = false;
            break;
        case `FAIL_${ACTION_TYPES.THINK_DETAIL_GET_THINK}`:
            newState.fetchGetThink = false;
            break;
        case ACTION_TYPES.THINK_DETAIL_GET_THINK:
            newState.fetchGetThink = false;
            newState.think = action.data;
            break;

        // 保存评论
        case ACTION_TYPES.THINK_DETAIL_SAVE_REVIEW:
            newState.gotThinkReviewIds = addStr(newState.gotThinkReviewIds, action.data.think_review_id)[0];
            newState.reviews.push(action.data);
            newState.think.review_num += 1;
            newState.think.is_review = true;
            break;

        // 获取评论
        case `REQUEST_${ACTION_TYPES.THINK_DETAIL_GET_REVIEWS}`:
            newState.fetchGetReviews = true;
            if(action.request.gotThinkReviewIds == null)
            {
                newState.reviews = null;
                newState.gotThinkReviewIds = null;
                newState.hasReview = false;
            }
            break;
        case `FAIL_${ACTION_TYPES.THINK_DETAIL_GET_REVIEWS}`:
            newState.fetchGetReviews = false;
            break;
        case ACTION_TYPES.THINK_DETAIL_GET_REVIEWS:
            newState.fetchGetReviews = false;
            newState.reviews = newState.reviews ? newState.reviews.concat(action.data.reviews) : action.data.reviews;
            newState.gotThinkReviewIds = action.data.got_ids;
            newState.hasReview = !action.data.is_end;
            break;

        // 删除评论
        case `REQUEST_${ACTION_TYPES.THINK_DETAIL_DELETE_REVIEW}`:
            newState.gotThinkReviewIds = deleteStr(newState.gotThinkReviewIds, action.request.thinkReviewId)[0];
            newState.reviews = deleteArray(newState.reviews, 'think_review_id', action.request.thinkReviewId)[0];
            newState.think.review_num -= 1;
            break;
        case ACTION_TYPES.THINK_DETAIL_DELETE_REVIEW:
            newState.think.is_review = action.data.is_review;
            break;

        // 点赞评论
        case `REQUEST_${ACTION_TYPES.THINK_DETAIL_OPEN_REVIEW_LIKE}`:
            newState.reviews.map((v, k) => {
                if(v.think_review_id == action.request.thinkReviewId)
                {
                    newState.reviews[k].is_liked = true;
                    newState.reviews[k].like_num += 1;
                    newState.reviews[k].like_users.push(action.request.userInfo);
                    return false;
                }
            });
            break;

        // 取消点赞评论
        case `REQUEST_${ACTION_TYPES.THINK_DETAIL_CLOSE_REVIEW_LIKE}`:
            newState.reviews.map((v, k) => {
                if(v.think_review_id == action.request.thinkReviewId)
                {
                    newState.reviews[k].is_liked = false;
                    newState.reviews[k].like_num -= 1;
                    newState.reviews[k].like_users = deleteArray(newState.reviews[k].like_users, 'user_id', action.request.userInfo.user_id)[0];
                    return false;
                }
            });
            break;

        // 保存评论回复
        case ACTION_TYPES.THINK_DETAIL_SAVE_REPLY:
            newState.reviews.map((v, k) => {
                if(v.think_review_id == action.data.think_review_id)
                {
                    newState.reviews[k].reply.got_reply_ids = addStr(newState.reviews[k].reply.got_reply_ids, action.data.think_reply_id)[0];
                    newState.reviews[k].reply.replies.push(action.data);
                    return false;
                }
            });
            break;

        // 删除评论回复
        case `REQUEST_${ACTION_TYPES.THINK_DETAIL_DELETE_REPLY}`:
            newState.reviews.map((v, k) => {
                if(v.think_review_id == action.request.thinkReviewId)
                {
                    newState.reviews[k].reply.got_reply_ids = deleteStr(newState.reviews[k].reply.got_reply_ids, action.request.thinkReplyId)[0];
                    newState.reviews[k].reply.replies = deleteArray(newState.reviews[k].reply.replies, 'think_reply_id', action.request.thinkReplyId)[0];
                    return false;
                }
            });
            break;
    }

    return {...newState};
}