import {ACTION_TYPES} from './action';

const initialState = {
    // 招聘类型数据
    jobTypes            :   [],
    isFetch             :   false
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUITMENT_INDEX_GET_JOBSTYPES:
            newState.jobTypes = action.data;
            newState.isFetch = true;
            break;
        case `FAIL_${ACTION_TYPES.RECRUITMENT_INDEX_GET_JOBSTYPES}`:
            newState.isFetch = false;
            braek;
        case `REQUEST_${ACTION_TYPES.RECRUITMENT_INDEX_GET_JOBSTYPES}`:
            newState.isFetch = false;
            break;
    }

    return {...newState};
}