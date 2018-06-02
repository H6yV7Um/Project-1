import {ACTION_TYPES} from './action';

const initialState = {

}

export default (state = initialState, action) => {
    switch (action.type)
    {
        // 登录
        case `REQUEST_${ACTION_TYPES.USER_LOGIN_LOGIN}`:
            break;
        case `FAIL_${ACTION_TYPES.USER_LOGIN_LOGIN}`:
            state = {...state, message : action.status.message};
            break;
        case ACTION_TYPES.USER_LOGIN_LOGIN:
            break;
    }

    return state;
}