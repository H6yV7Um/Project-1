import {ACTION_TYPES} from './action';

const initialState = {
    // 获取筛选数据
    amoebaSelectData :  null,
    // 是否正在获取AMB
    amoebaIsFetch : false,
    // 获取AMB列表
    amoebaList : [],
    // 获取列表页数
    amoebaPage : 0,
    // AMB列表是否已经获取完
    amoebaIsGetAll : false
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        //获取amoeba
        case `REQUEST_${ACTION_TYPES.PERFORMANCE_AMOEBA_FEEDBACK_LIST_GET_AMB}`:
            newState.amoebaIsFetch = true;
            newState.amoebaPage = action.request.page;
            if(action.request.isRefresh)
            {
                newState.amoebaList = [];
            }
            break;
        case `FAIL_${ACTION_TYPES.PERFORMANCE_AMOEBA_FEEDBACK_LIST_GET_AMB}`:
            newState.amoebaIsFetch = false;
            break;
        case ACTION_TYPES.PERFORMANCE_AMOEBA_FEEDBACK_LIST_GET_AMB:
            newState.amoebaIsFetch = false;
            newState.amoebaIsGetAll = action.data.isGetAll;
            newState.amoebaList = action.request.isRefresh ? action.data.amoebas : newState.amoebaList.concat(action.data.amoebas);
            break;

        // 设置筛选数据
        case ACTION_TYPES.PERFORMANCE_AMOEBA_FEEDBACK_LIST_SET_SELECT_DATA:
            newState.amoebaSelectData = {...action.data.amoebaSelectData};
            break;

        // 设置滚动位置
        case ACTION_TYPES.PERFORMANCE_AMOEBA_FEEDBACK_LIST_SET_SCROLL_TOP:
            newState.scrollTop = action.data.scrollTop;
            break;

    }

    return {...newState};
}