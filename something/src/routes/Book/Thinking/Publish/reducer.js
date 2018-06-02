import {ACTION_TYPES} from './action';

const initialState = {

}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 发表
        case `REQUEST_${ACTION_TYPES.BOOK_THINKING_PUBLISH_PUBLISH}`:
            newState.fetchPublish = true;
            break;
        case `FAIL_${ACTION_TYPES.BOOK_THINKING_PUBLISH_PUBLISH}`:
            newState.fetchPublish = false;
            break;
        case ACTION_TYPES.BOOK_THINKING_PUBLISH_PUBLISH:
            newState.fetchPublish = false;
            break;
    }

    return {...newState};
}