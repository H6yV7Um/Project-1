import {ACTION_TYPES} from './action';

const initialState = {
    feedbackStatus : null,
    isFetch : null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUIT_OFFER_INFO_ADD:
            newState.isFetch = false;
            newState.feedbackStatus = action.data;
            break;
        case `REQUEST_${ACTION_TYPES.RECRUIT_OFFER_INFO_ADD}`:
            newState.isFetch = true;
            break;
        case `FAIL_${ACTION_TYPES.RECRUIT_OFFER_INFO_ADD}`:
            newState.isFetch = false;
            break;
    }
    return {...newState};
}
