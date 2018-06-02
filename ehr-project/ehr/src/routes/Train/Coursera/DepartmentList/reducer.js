import {ACTION_TYPES} from './action';
import browserAttr from 'utils/browserAttr';
let ismobile = browserAttr.versions.mobile;//判断设备类型
const initialState = {
    fetchSearchCourseraByDepartment: false,
    itemList: [],
    departmentUsers: []


}
export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
        case `REQUEST_${ACTION_TYPES.TRAIN_SEARCH_COURSERA_BY_DEPARTMENT}`:
            if(!ismobile)
            {
                newState.itemList = []
                newState.departmentUsers = []
            }
            newState.fetchSearchCourseraByDepartment = true;
            // 重置列表
            break;
        case `FAIL_${ACTION_TYPES.TRAIN_SEARCH_COURSERA_BY_DEPARTMENT}`:
            newState.fetchSearchCourseraByDepartment = false;
            break;
        case ACTION_TYPES.TRAIN_SEARCH_COURSERA_BY_DEPARTMENT:
            newState.fetchSearchCourseraByDepartment = false;
            newState.itemList = action.data.data;
            newState.departmentUsers = action.data.user;
            break;
        // 是否清空reducer
        case ACTION_TYPES.TRAIN_COURSERA_DEPARTMENT_LIST_PERSONAL_CLEAR:
            newState.itemList = [];
            newState.searchPage = [];
            newState.searchIsEnd = false;
            newState.tableTotalCount = 1;
            break;
    }
    return {...newState};
}