import {ACTION_TYPES} from './action';

const initialState = {
    // 书
    book : null,
    // 推荐
    recommend : null,
    // 评分
    score : null
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 获取推荐信息
        case `REQUEST_${ACTION_TYPES.BOOK_RECOMMEND_GET_INFO}`:
            newState.fetchGet = true;
            newState.book = null;
            break;
        case `FAIL_${ACTION_TYPES.BOOK_RECOMMEND_GET_INFO}`:
            newState.fetchGet = false;
            newState.book = {name: action.request.name, author: action.request.author};
            newState.recommend = null;
            newState.score = null;
            break;
        case ACTION_TYPES.BOOK_RECOMMEND_GET_INFO:
            newState.fetchGet = false;
            newState.book = action.data.book;
            newState.recommend = action.data.recommend;
            newState.score = action.data.score;
            break;

        // 推荐
        case `REQUEST_${ACTION_TYPES.BOOK_RECOMMEND_SAVE}`:
            newState.fetchRecommend = true;
            break;
        case `FAIL_${ACTION_TYPES.BOOK_RECOMMEND_SAVE}`:
            newState.fetchRecommend = false;
            break;
        case ACTION_TYPES.BOOK_RECOMMEND_SAVE:
            newState.fetchRecommend = false;
            break;

        // 清空数据
        case ACTION_TYPES.BOOK_RECOMMEND_CLEAR:
            newState.book = null;
            newState.recommend = null;
            newState.score = null;
            break;
    }

    return {...newState};
}