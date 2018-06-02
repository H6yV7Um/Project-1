import {ACTION_TYPES} from './action';

const initialState = {
    // HR联系方式列表
    jobType        :   null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOBTYPE_GET_JOB_TYPE:
            newState.jobType = action.data;
            break;
    }

    return {...newState};
}