import {ACTION_TYPES} from './action';

const initialState = {
    userInfo : null,
    isFetch : false
}

export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
        case ACTION_TYPES.WECHAT_LOGIN_LAYOUT_GET_SIGNATURE:
            newState.userInfo = action.data;
            newState.isFetch = true;
            break;
        case `FAIL_${ACTION_TYPES.WECHAT_LOGIN_LAYOUT_GET_SIGNATURE}`:
            newState.isFetch = true;
            break;
    }

    return {...newState};
}