import {ACTION_TYPES} from './action';

const initialState = {
    jobs : []
}

export default (state = initialState, action) => {
    let newState = state;
    let isPush = true;
    let data = null;

    switch (action.type)
    {
        case ACTION_TYPES.RECRUITMENT_CAMPUS_RECRUITMENTLIST_GET_JOBSLIST:
            data = {
                id : action.request.jobTypeId,
                detail : action.data
            }
            newState.jobs.map(v => {
                v.id == data.id ? isPush = false : '';
            })
            isPush ? newState.jobs.push(data) : '';
            break;
        case `FAIL_${ACTION_TYPES.RECRUITMENT_CAMPUS_RECRUITMENTLIST_GET_JOBSLIST}`:
            data = {
                id : action.request.jobTypeId,
                detail : null
            }
            newState.jobs.map(v => {
                v.id == data.id ? isPush = false : '';
            });
            isPush ? newState.jobs.push(data) : '';
            break;
    }

    return {...newState};
}