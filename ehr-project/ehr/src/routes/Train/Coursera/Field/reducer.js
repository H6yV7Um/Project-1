import {ACTION_TYPES} from './action';
const initialState = {
    departments: [],
    fetchAdd:  false,
    fetchCourseraJson: false,
    isCourseraUrl: true
}
export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
        case ACTION_TYPES.TRAIN_COURSERA_GET_PERSONAL_DEPARTMENT:
        	newState.departments = action.data
            break;
          // 获取搜索列表
        case `REQUEST_${ACTION_TYPES.TRAIN_COURSERA_ADD}`:
            newState.fetchAdd= true;
            break;
        case `FAIL_${ACTION_TYPES.TRAIN_COURSERA_ADD}`:
            newState.fetchAdd= false;
            break;
        case ACTION_TYPES.TRAIN_COURSERA_ADD:
            newState.fetchAdd= false
            break;
        case `REQUEST_${ACTION_TYPES.TRAIN_COURSERA_GET_COURSERA_JSON}`:
            newState.fetchCourseraJson= true;
            newState.isCourseraUrl = true
            break;
        case `FAIL_${ACTION_TYPES.TRAIN_COURSERA_GET_COURSERA_JSON}`:
            newState.fetchCourseraJson= false;
            newState.isCourseraUrl = false
            break;
        case ACTION_TYPES.TRAIN_COURSERA_GET_COURSERA_JSON:
            newState.fetchCourseraJson= false
            // 如果没有匹配成功
            if(action.data.errorCode)
            {
                newState.isCourseraUrl = false
            }
            else
            {
                newState.isCourseraUrl = true
            }
            break;
    }
    return {...newState};
}