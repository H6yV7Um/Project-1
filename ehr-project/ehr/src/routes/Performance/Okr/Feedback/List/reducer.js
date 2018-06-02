import {ACTION_TYPES} from './action';

const initialState = {
    // 获取OKR筛选数据
    okrSelectData : null,
    // 是否正在获取OKR
    okrIsFetch : false,
    // OKR列表
    okrList : [],
    // OKR列表页数
    okrPage : 0,
    // OKR列表是否已获取完
    okrIsGetAll : false
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 获取okr
        case `REQUEST_${ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_LIST_GET_OKR}`:
            newState.okrIsFetch = true;
            newState.okrPage = action.request.page;
            if(action.request.isRefresh)
            {
                newState.okrList = [];
            }
            break;
        case `FAIL_${ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_LIST_GET_OKR}`:
            newState.okrIsFetch = false;
            break;
        case ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_LIST_GET_OKR:
            newState.okrIsFetch = false;
            newState.okrIsGetAll = action.data.isGetAll;
            newState.okrList = action.request.isRefresh ? action.data.okrs : newState.okrList.concat(action.data.okrs);
            break;

        // 设置筛选数据
        case ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_LIST_SET_SELECT_DATA:
            newState.okrSelectData = {...action.data.okrSelectData};
            break;

        // 设置滚动位置
        case ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_LIST_SET_SCROLL_TOP:
            newState.scrollTop = action.data.scrollTop;
            break;
    }

    return {...newState};
}