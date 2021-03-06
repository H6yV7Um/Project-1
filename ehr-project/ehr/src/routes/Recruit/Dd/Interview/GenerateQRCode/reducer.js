import {ACTION_TYPES} from './action';

const initialState = {
    // 招聘类型数据
    result          :   []
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.PERSONALCENTER_CHECKIN_RECORD_ADD:
            newState.result = action.data;
            break;
    }

    return {...newState};
}