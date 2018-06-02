import {ACTION_TYPES} from './action';

const initialState = {
    // 获取图书推荐
    book_recommend          :   [],
    hasRecommendData   :   false,
    fetchGetRecommend  :   false,
    gotBookIds         :   null
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 获取Tap4fun推荐
        case `REQUEST_${ACTION_TYPES.BOOK_LIKELIST_GET_RECOMMEND}`:
            newState.fetchGetRecommend = true;
            break;
        case `FAIL_${ACTION_TYPES.BOOK_LIKELIST_GET_RECOMMEND}`:
            newState.fetchGetRecommend = false;
            break;
        case ACTION_TYPES.BOOK_LIKELIST_GET_RECOMMEND:
            newState.fetchGetRecommend = false;
            newState.book_recommend = newState.book_recommend.concat(action.data.books);
            newState.gotBookIds = action.data.got_ids;
            newState.hasRecommendData = action.data.is_end ? false : true;
            break;
    }

    return {...newState};
}