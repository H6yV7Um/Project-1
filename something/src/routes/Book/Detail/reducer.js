import {ACTION_TYPES} from './action';
import {addStr, deleteStr, deleteArray} from 'utils/array';

const initialState = {
    // 书
    book                    : null,
    // 相似书
    akinBooks               : null,

    // 书评 (精彩书评 + 普通书评)
    reviews                 : null,
    // 已获取精彩书评ID集合
    wonderfulReviewGotIds   : null,
    // 已获取普通书评ID集合
    commonReviewGotIds      : null,
    // 是否还有精彩书评未取
    hasWonderfulReviews     : false,
    // 是否还有普通书评未取
    hasCommonReviews        : false,
    // 精彩书评总条数
    wonderfulReviewCount    : 0,
    // 普通书评总条数
    commonReviewCount       : 0
}

export default (state = initialState, action) => {
    let newState = state;
    let tempState = {};
    switch (action.type)
    {
        // 获取详情
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_GET_DETAIL}`:
            newState.fetchGetDetail = true;
            newState.book = null;
            break;
        case `FAIL_${ACTION_TYPES.BOOK_DETAIL_GET_DETAIL}`:
            newState.fetchGetDetail = false;
            break;
        case ACTION_TYPES.BOOK_DETAIL_GET_DETAIL:
            newState.fetchGetDetail = false;
            newState.book = action.data;
            newState.book.forward_users = [];
            newState.book.collection_users = [];
            newState.book.like_users = [];
            break;

        // 获取相似书
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_GET_AKIN}`:
            newState.fetchGetAkin = true;
            newState.akinBooks = null;
            break;
        case `FAIL_${ACTION_TYPES.BOOK_DETAIL_GET_AKIN}`:
            newState.fetchGetAkin = false;
            break;
        case ACTION_TYPES.BOOK_DETAIL_GET_AKIN:
            newState.fetchGetAkin = false;
            newState.akinBooks = action.data.books;
            break;

        // 获取书sns信息
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_GET_SNS}`:
            newState.fetchGetSns = true;
            newState.book.forward_users = [];
            newState.book.collection_users = [];
            newState.book.like_users = [];
            break;
        case `FAIL_${ACTION_TYPES.BOOK_DETAIL_GET_SNS}`:
            newState.fetchGetSns = false;
            break;
        case ACTION_TYPES.BOOK_DETAIL_GET_SNS:
            newState.fetchGetSns = false;
            newState.book.forward_users = action.data.forward_users;
            newState.book.forward_num = action.data.forward_users.length;
            newState.book.collection_users = action.data.collection_users;
            newState.book.collection_num = action.data.collection_users.length;
            newState.book.like_users = action.data.like_users;
            newState.book.like_num = action.data.like_users.length;
            break;

        // 提交评分
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_SAVE_SCORE}`:
            if(!newState.book.my_score)
            {
                newState.book.score_num += 1;
            }
            newState.book.my_score = action.request.score.score;
            break;

        // 点赞书
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_OPEN_LIKE}`:
            newState.book.is_liked = 1;
            newState.book.like_num += 1;
            newState.book.like_users.push(action.request.userInfo);
            break;

        // 取消点赞书
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_CLOSE_LIKE}`:
            newState.book.is_liked = 0;
            newState.book.like_num -= 1;
            newState.book.like_users = deleteArray(newState.book.like_users, 'user_id', action.request.userInfo.user_id)[0];
            break;

        // 收藏书
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_OPEN_COLLECTION}`:
            newState.book.is_collected = 1;
            newState.book.collection_num += 1;
            newState.book.collection_users.push(action.request.userInfo);
            break;

        // 取消收藏书
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_CLOSE_COLLECTION}`:
            newState.book.is_collected = 0;
            newState.book.collection_num -= 1;
            newState.book.collection_users = deleteArray(newState.book.collection_users, 'user_id', action.request.userInfo.user_id)[0];
            break;

        // 转发书
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_OPEN_FORWARD}`:
            newState.book.is_forwarded = 1;
            newState.book.forward_num += 1;
            newState.book.forward_users.push(action.request.userInfo);
            break;
        case ACTION_TYPES.BOOK_DETAIL_OPEN_FORWARD:
            newState.commonReviewGotIds = addStr(newState.commonReviewGotIds, action.data.book_review_id)[0];
            newState.reviews.push(action.data);
            newState.commonReviewCount += 1;
            break;

        // 取消转发书
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_CLOSE_FORWARD}`:
            newState.book.is_forwarded = 0;
            newState.book.forward_num -= 1;
            newState.book.forward_users = deleteArray(newState.book.forward_users, 'user_id', action.request.userInfo.user_id)[0];
            break;

        // 获取展示书评
        case ACTION_TYPES.BOOK_DETAIL_GET_SHOW_REVIEW:
            newState.reviews = action.data.reviews;
            newState.wonderfulReviewGotIds = action.data.wonderful_review_got_ids;
            newState.commonReviewGotIds = action.data.common_review_got_ids;
            newState.hasWonderfulReviews = action.data.wonderful_review_is_end ? false : true;
            newState.hasCommonReviews = action.data.common_review_is_end ? false : true;
            newState.wonderfulReviewCount = action.data.wonderful_review_count;
            newState.commonReviewCount = action.data.common_review_count;
            break;

        // 获取精彩书评
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_GET_WONDERFUL_REVIEW}`:
            newState.fetchGetWonderfulReviews = true;
            break;
        case `FAIL_${ACTION_TYPES.BOOK_DETAIL_GET_WONDERFUL_REVIEW}`:
            newState.fetchGetWonderfulReviews = false;
            break;
        case ACTION_TYPES.BOOK_DETAIL_GET_WONDERFUL_REVIEW:
            newState.fetchGetWonderfulReviews = false;
            newState.reviews = newState.reviews.concat(action.data.reviews);
            newState.wonderfulReviewGotIds = action.data.got_ids;
            newState.hasWonderfulReviews = action.data.is_end ? false : true;
            newState.wonderfulReviewCount = action.data.count;
            break;

        // 获取普通书评
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_GET_COMMON_REVIEW}`:
            newState.fetchGetCommonReviews = true;
            break;
        case `FAIL_${ACTION_TYPES.BOOK_DETAIL_GET_COMMON_REVIEW}`:
            newState.fetchGetCommonReviews = false;
            break;
        case ACTION_TYPES.BOOK_DETAIL_GET_COMMON_REVIEW:
            newState.fetchGetCommonReviews = false;
            newState.reviews = newState.reviews.concat(action.data.reviews);
            newState.commonReviewGotIds = action.data.got_ids;
            newState.hasCommonReviews = action.data.is_end ? false : true;
            newState.commonReviewCount = action.data.count;
            break;

        // 清空普通书评
        case ACTION_TYPES.BOOK_DETAIL_CLEAR_COMMON_REVIEW:
            tempState.reviews = [];
            newState.reviews.map((v, k) => {
                if(v.wonderful)
                {
                    tempState.reviews.push(v);
                }
            });
            newState.reviews = tempState.reviews;
            newState.commonReviewGotIds = '';
            newState.hasCommonReviews = true;
            break;

        // 点赞书评
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_OPEN_REVIEW_LIKE}`:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.request.bookReviewId)
                {
                    newState.reviews[k].is_liked = 1;
                    newState.reviews[k].like_num += 1;
                    newState.reviews[k].like_users.push(action.request.userInfo);
                    return false;
                }
            });
            break;

        // 取消点赞书评
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_CLOSE_REVIEW_LIKE}`:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.request.bookReviewId)
                {
                    newState.reviews[k].is_liked = 0;
                    newState.reviews[k].like_num -= 1;
                    newState.reviews[k].like_users = deleteArray(newState.reviews[k].like_users, 'user_id', action.request.userInfo.user_id)[0];
                    return false;
                }
            });
            break;

        // 关注书评
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_OPEN_REVIEW_FOLLOW}`:
            newState.book.is_followed_review = 1;
            newState.book.follow_review_num += 1;
            break;

        // 取消关注书评
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_CLOSE_REVIEW_FOLLOW}`:
            newState.book.is_followed_review = 0;
            newState.book.follow_review_num -= 1;
            break;

        // 提交书评
        case ACTION_TYPES.BOOK_DETAIL_SAVE_REVIEW:
            newState.gotReviewIds = addStr(newState.gotReviewIds, action.data.book_review_id)[0];
            newState.reviews.push(action.data);
            newState.commonReviewCount += 1;
            break;

        // 删除书评
        case ACTION_TYPES.BOOK_DETAIL_DELETE_REVIEW:
            newState.gotReviewIds = deleteStr(newState.gotReviewIds, action.request.bookReviewId)[0];
            newState.reviews = deleteArray(newState.reviews, 'book_review_id', action.request.bookReviewId)[0];
            if(action.request.isWonderful)
            {
                newState.wonderfulReviewCount -= 1;
            }
            else
            {
                newState.commonReviewCount -= 1;
            }
            break;

        // 转发书评
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_OPEN_REVIEW_FORWARD}`:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.request.bookReviewId)
                {
                    newState.reviews[k].is_forwarded = 1;
                    newState.reviews[k].forward_user_ids = addStr(newState.reviews[k].forward_user_ids, action.request.userInfo.user_id)[0];
                    newState.reviews[k].forward_users.push(action.request.userInfo);
                    return false;
                }
            });
            break;
        case ACTION_TYPES.BOOK_DETAIL_OPEN_REVIEW_FORWARD:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.request.bookReviewId)
                {
                    newState.reviews[k].reply_list.replies.push(action.data);
                    newState.reviews[k].reply_list.got_reply_ids = addStr(newState.reviews[k].reply_list.got_reply_ids, action.data.book_reply_id)[0];
                    return false;
                }
            });
            break;

        // 取消转发书评
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_CLOSE_REVIEW_FORWARD}`:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.request.bookReviewId)
                {
                    newState.reviews[k].is_forwarded = 0;
                    newState.reviews[k].forward_user_ids = deleteStr(newState.reviews[k].forward_user_ids, action.request.userInfo.user_id)[0];
                    newState.reviews[k].forward_users = deleteArray(newState.reviews[k].forward_users, 'user_id', action.request.userInfo.user_id)[0];
                    return false;
                }
            });
            break;

        // 提交书评回复
        case ACTION_TYPES.BOOK_DETAIL_SUBMIT_REPLY:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.data.book_review_id)
                {
                    newState.reviews[k].reply_list.got_reply_ids = addStr(newState.reviews[k].reply_list.got_reply_ids, action.data.book_reply_id)[0];
                    newState.reviews[k].reply_list.replies.push(action.data);
                    return false;
                }
            });
            break;

        // 删除书评回复
        case ACTION_TYPES.BOOK_DETAIL_DELETE_REPLY:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.request.bookReviewId)
                {
                    newState.reviews[k].reply_list.got_reply_ids = deleteStr(newState.reviews[k].reply_list.got_reply_ids, action.request.bookReplyId)[0];
                    newState.reviews[k].reply_list.replies = deleteArray(newState.reviews[k].reply_list.replies, 'book_reply_id', action.request.bookReplyId)[0];
                    return false;
                }
            });
            break;

        // 获取书评回复列表
        case `REQUEST_${ACTION_TYPES.BOOK_DETAIL_GET_REPLIES}`:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.request.bookReviewId)
                {
                    newState.reviews[k].reply_list.is_getting = true;
                    return false;
                }
            });
            break;
        case `FAIL_${ACTION_TYPES.BOOK_DETAIL_GET_REPLIES}`:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.request.bookReviewId)
                {
                    newState.reviews[k].reply_list.is_getting = false;
                    return false;
                }
            });
            break;
        case ACTION_TYPES.BOOK_DETAIL_GET_REPLIES:
            newState.reviews.map((v, k) => {
                if(v.book_review_id == action.request.bookReviewId)
                {
                    newState.reviews[k].reply_list.is_getting = false;
                    newState.reviews[k].reply_list.got_reply_ids = action.data.got_reply_ids;
                    newState.reviews[k].reply_list.is_end = action.data.is_end;
                    action.data.replies.map((v2, k2) => {
                        newState.reviews[k].reply_list.replies.push(v2);
                    });
                    return false;
                }
            });
            break;

        // 清空数据
        case ACTION_TYPES.BOOK_DETAIL_CLEAR:
            newState.book = null;
            newState.akinBooks = null;
            newState.reviews = null;
            newState.wonderfulReviewGotIds = null;
            newState.commonReviewGotIds = null;
            newState.hasWonderfulReviews = false;
            newState.hasCommonReviews = false;
            newState.wonderfulReviewCount = 0;
            newState.commonReviewCount = 0;
            break;
    }

    return {...newState};
}