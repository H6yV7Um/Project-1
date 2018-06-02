import {ACTION_TYPES} from './action';

const initialState = {

}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        //设置love图表筛选的参数
        case ACTION_TYPES.PERFORMANCE_DEPARTMENTS_SET_LOVE_ARGUMENTS:
            newState.loveArguments = {...action.data.loveArguments}
            break;
    }

    return {...newState};
}