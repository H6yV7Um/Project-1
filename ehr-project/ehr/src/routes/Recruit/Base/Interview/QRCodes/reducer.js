import {ACTION_TYPES} from './action';

const initialState = {
    // 招聘类型数据
    result          :   [],
    // 是否签到
    isChecked       :   null
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.PERSONALCENTER_QRCODES_ESTABLISHWSCONNECT:
            newState.result = action.data;
            break;
        case ACTION_TYPES.PERSONALCENTER_QRCODES_IS_CHECK_IN:
            newState.isChecked = action.data.isChecked;
            break;
    }

    return {...newState};
}