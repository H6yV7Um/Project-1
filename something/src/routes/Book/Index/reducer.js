import {ACTION_TYPES} from './action';

const initialState = {
    // Tap4fun推荐
    recommend       :   null,
    // 猜你喜欢
    like            :   null
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 获取Tap4fun推荐
        case ACTION_TYPES.BOOK_INDEX_GET_RECOMMEND:
            newState.recommend = action.data.books;
            break;

        // 获取猜你喜欢
        case ACTION_TYPES.BOOK_INDEX_GET_LIKE:
            newState.like = action.data.books;
            break;
    }

    return {...newState};
}