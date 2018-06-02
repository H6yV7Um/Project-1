import {ACTION_TYPES} from './action';
import {deleteArray} from 'utils/array';

const initialState = {
    // 车列表
    list    :   null
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 获取列表
        case `REQUEST_${ACTION_TYPES.CAR_INDEX_GET_LIST}`:
            newState.fetchGetList = true;
            newState.list = null;
            break;
        case `FAIL_${ACTION_TYPES.CAR_INDEX_GET_LIST}`:
            newState.fetchGetList = false;
            break;
        case ACTION_TYPES.CAR_INDEX_GET_LIST:
            newState.fetchGetList = false;
            newState.list = action.data;
            break;

        // 删除
        case `REQUEST_${ACTION_TYPES.CAR_INDEX_DELETE}`:
            newState.list = deleteArray(newState.list, 'car_id', action.request.carId)[0];
            break;
    }

    return {...newState};
}