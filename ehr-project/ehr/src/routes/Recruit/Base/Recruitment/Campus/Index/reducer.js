import {ACTION_TYPES} from './action';

const initialState = {
    // 招聘类型数据
    jobTypes            :   []
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUITMENT_CAMPUS_INDEX_GET_JOBSTYPES:
            newState.jobTypes = action.data;
            break;
        case `FAIL_${ACTION_TYPES.RECRUITMENT_CAMPUS_INDEX_GET_JOBSTYPES}`:
            newState.jobTypes = [];
            break;
    }

    return {...newState};
}