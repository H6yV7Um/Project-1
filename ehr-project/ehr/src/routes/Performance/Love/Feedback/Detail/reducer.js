import {ACTION_TYPES} from './action';

const initialState = {
    data : {},
    isFetch : null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_DETAIL_GET:
            newState.isFetch = false;
            newState.data = action.data;
            break;
        case `REQUEST_${ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_DETAIL_GET}`:
            newState.isFetch = true;
            break;
        case `FAIL_${ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_DETAIL_GET}`:
            newState.isFetch = false;
            break;
    }
    return {...newState};
}