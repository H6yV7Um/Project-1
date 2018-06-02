import {ACTION_TYPES} from './action';

const initialState = {
    // 心得
    thinking    :   null
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 发表
        case `REQUEST_${ACTION_TYPES.BOOK_THINKING_DETAIL_GET_DETAIL}`:
            newState.fetchGetDetail = true;
            break;
        case `FAIL_${ACTION_TYPES.BOOK_THINKING_DETAIL_GET_DETAIL}`:
            newState.fetchGetDetail = false;
            break;
        case ACTION_TYPES.BOOK_THINKING_DETAIL_GET_DETAIL:
            newState.fetchGetDetail = false;
            newState.thinking = action.data;
            break;
    }

    return {...newState};
}