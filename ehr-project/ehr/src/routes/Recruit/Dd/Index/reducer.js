import {ACTION_TYPES} from './action';

const initialState = {
    // 职位列表
    jobs        :   null,
    // 用户列表
    users       :   null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUIT_RECRUITLIST_GET_JOB:
            newState.jobs = action.data;
            break;
        case ACTION_TYPES.RECRUIT_RECRUITLIST_GET_WECHAT_USER:
            newState.users = action.data;
            break;
        case ACTION_TYPES.RECRUIT_RECRUITLIST_FIND_WECHAT_USER_BY_NAME:
            newState.searchResult = action.data;
            break;
    }

    return {...newState};
}