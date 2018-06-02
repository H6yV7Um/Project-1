import {ACTION_TYPES} from './action';

const initialState = {
    // 简历列表
    crawlingcv       :   null,
    selectcv   :   null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUIT_RECRUITLIST_GET_CRAWLING_CV:
            newState.crawlingcv = action.data;
            break;
        case ACTION_TYPES.RECRUIT_RECRUITLIST_GET_CRAWLING_CV_BY_CONDITION:
            newState.selectcv = action.data;
            break;
    }

    return {...newState};
}