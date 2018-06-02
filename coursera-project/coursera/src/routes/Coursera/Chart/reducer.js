import {ACTION_TYPES} from './action';
const initialState = {
    itemList: [],
    fetchGetAllCourseraList: false,
    fetchGetDepartment: false,
    count: 0,
    department: [],
    type: 0,
    isclear: true
}
export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
        // 获取列表
        case `REQUEST_${ACTION_TYPES.GET_ALL_COURSERA_LIST}`:
            newState.fetchGetAllCourseraList = true;
            if(newState.isclear)
            {
                newState.count = 0;
                newState.type = 0;
                newState.itemList = [];
            }
            newState.isclear = true
            // 重置列表
            break;
        case `FAIL_${ACTION_TYPES.GET_ALL_COURSERA_LIST}`:
            newState.fetchGetAllCourseraList = false;
            break;
        case ACTION_TYPES.GET_ALL_COURSERA_LIST:
            newState.fetchGetAllCourseraList = false;
            newState.itemList = action.data.data;
            newState.count = action.data.count;
            break;
         // 获取所有部门
        case `REQUEST_${ACTION_TYPES.CHART_GET_DEPARTMENT}`:
            newState.fetchGetDepartment = true;
            // newState.department = []
            break;
        case `FAIL_${ACTION_TYPES.CHART_GET_DEPARTMENT}`:
            newState.fetchGetDepartment = false;
            break;
        case ACTION_TYPES.CHART_GET_DEPARTMENT:
            newState.fetchGetDepartment = false;
            newState.department = action.data;
            break;
        // 更改type
        case ACTION_TYPES.CHART_CHANGE_TYPE:
            newState.type = action.index;
            break;
        // 是否清空reducer
        case ACTION_TYPES.CHART_CLEAR:
            newState.isclear = false;
            break;
    }
    return {...newState};
}