import {ACTION_TYPES} from './action';

const initialState = {
    job : []
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUITMENT_CAMPUS_RECRUITMENTDETAIL_GET_JOBSDETAIL:
            let isPush = true;
            let data = {
                id : action.request.jobId,
                detail : action.data
            }
            newState.job.map(v => {
                v.id == data.id ? isPush = false : '';
            })
            isPush ? newState.job.push(data) : '';
            break;
    }

    return {...newState};
}