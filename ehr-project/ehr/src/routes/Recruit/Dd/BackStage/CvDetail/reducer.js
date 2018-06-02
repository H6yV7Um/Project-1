import {ACTION_TYPES} from './action';

const initialState = {
    // HR联系方式列表
    cvInfo      :   null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUIT_RECRUITLIST_GET_CRAWLING_CV_BY_ID:
            newState.cvInfo = action.data;
            break;
    }

    return {...newState};
}