import {ACTION_TYPES} from './action';

const initialState = {
    // 简历数据
    cv      :   null,
    // 是否完成
    isFetch     :   false,
    // 职位列表
    jobs        :   null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_GET_CV:
            if(action.data.length > 0) {
                newState.cv = action.data[0];
                newState.isFetch = true;
            }
            break;
        case `FAIL_${ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_GET_CV}`:
            newState.isFetch = true;
            break;
        case ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_ADD_CV:
            if(action.data.length > 0) {
                newState.cv = action.data[0];
                newState.isFetch = true;
            }
            break;
        case ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_GET_JOB:
            newState.jobs = action.data;
            break;
    }

    return {...newState};
}