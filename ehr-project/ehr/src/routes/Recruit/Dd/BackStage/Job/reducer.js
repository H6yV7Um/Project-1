import {ACTION_TYPES} from './action';

const initialState = {
    // 职位列表
    jobs        :   null,
    // 用户列表
    jobType       :   null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_GET_JOB:
            newState.jobs = action.data;
            break;
        case ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_GET_JOB_TYPE:
            newState.jobType = action.data;
            break;
    }

    return {...newState};
}