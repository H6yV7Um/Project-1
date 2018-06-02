import {ACTION_TYPES} from './action';
const initialState = {
  	fetchGetLatestCourseraList: false,
  	data:[],
  	count: 0
}

export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
          // 获取搜索列表
        case `REQUEST_${ACTION_TYPES.GET_LATEST_COURSERA_LIST}`:
            newState.fetchGetLatestCourseraList= true;
            // 重置列表
            break;
        case `FAIL_${ACTION_TYPES.GET_LATEST_COURSERA_LIST}`:
            newState.fetchGetLatestCourseraList= false;
            break;
        case ACTION_TYPES.GET_LATEST_COURSERA_LIST:
        	newState.data = action.data.data
        	newState.count = action.data.count
            newState.fetchGetLatestCourseraList= false
            break;
    }

    return {...newState};
}