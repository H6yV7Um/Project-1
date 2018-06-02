import {ACTION_TYPES} from './action';

const initialState = {

}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 获取
        case `REQUEST_${ACTION_TYPES.CAR_EDIT_GET}`:
            newState.fetchGet = true;
            newState.data = null;
            break;
        case `FAIL_${ACTION_TYPES.CAR_EDIT_GET}`:
            newState.fetchGet = false;
            break;
        case ACTION_TYPES.CAR_EDIT_GET:
            newState.fetchGet = false;
            newState.data = action.data;
            break;

        // 编辑
        case `REQUEST_${ACTION_TYPES.CAR_EDIT_EDIT}`:
            newState.fetchEdit = true;
            break;
        case `FAIL_${ACTION_TYPES.CAR_EDIT_EDIT}`:
            newState.fetchEdit = false;
            break;
        case ACTION_TYPES.CAR_EDIT_EDIT:
            newState.fetchEdit = false;
            break;
    }

    return {...newState};
}