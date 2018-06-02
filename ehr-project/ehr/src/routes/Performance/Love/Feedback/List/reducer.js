import {ACTION_TYPES} from './action';

const initialState = {
    // 获取LOVE筛选数据
    loveSelectData :  null,
    // 是否正在获取LOVE
    loveIsFetch : false,
    // 获取love列表
    loveList : [],
    // 获取列表页数
    lovePage : 0,
    // LOVE列表是否已经获取完
    loveIsGetAll : false
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        //获取love
        case `REQUEST_${ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_LIST_GET_LOVE}`:
            newState.loveIsFetch = true;
            newState.lovePage = action.request.page;
            if(action.request.isRefresh)
            {
                newState.loveList = [];
            }
            break;
        case `FAIL_${ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_LIST_GET_LOVE}`:
            newState.loveIsFetch = false;
            break;
        case ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_LIST_GET_LOVE:
            newState.loveIsFetch = false;
            newState.loveIsGetAll = action.data.isGetAll;
            newState.loveList = action.request.isRefresh ? action.data.loves : newState.loveList.concat(action.data.loves);
            break;

        // 设置筛选数据
        case ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_LIST_SET_SELECT_DATA:
            newState.loveSelectData = {...action.data.loveSelectData};
            break;

        // 设置滚动位置
        case ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_LIST_SET_SCROLL_TOP:
            newState.scrollTop = action.data.scrollTop;
            break;

    }

    return {...newState};
}