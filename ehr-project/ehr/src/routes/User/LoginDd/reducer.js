import {ACTION_TYPES} from './action';

const initialState = {
    loginMessage : null
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 登录
        case ACTION_TYPES.USER_LOGINDD_LOGIN:
            newState.loginMessage = '登录成功~';
            break;
        case `FAIL_${ACTION_TYPES.USER_LOGINDD_LOGIN}`:
            newState.loginMessage = action.status.message;
            break;
    }

    return {...newState};
}