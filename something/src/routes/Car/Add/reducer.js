import {ACTION_TYPES} from './action';

const initialState = {

}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 新增
        case `REQUEST_${ACTION_TYPES.CAR_ADD_ADD}`:
            newState.fetchAdd = true;
            break;
        case `FAIL_${ACTION_TYPES.CAR_ADD_ADD}`:
            newState.fetchAdd = false;
            break;
        case ACTION_TYPES.CAR_ADD_ADD:
            newState.fetchAdd = false;
            break;
    }

    return {...newState};
}