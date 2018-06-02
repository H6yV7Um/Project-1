import {ACTION_TYPES} from './action';

const initialState = {
    // 筛选数据
    selectData : null
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 设置筛选数据
        case ACTION_TYPES.PERFORMANCE_SET_SELECT_DATA:
            newState.selectData = {...action.data.selectData};
            break;
    }

    return {...newState};
}