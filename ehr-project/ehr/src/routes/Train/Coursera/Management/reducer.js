import {ACTION_TYPES} from './action';
const initialState = {

}
export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {

        // 获取搜索列表
        // case `REQUEST_${ACTION_TYPES.TRAIN_COURSERA_ADD}`:
        //     newState.fetchAdd= true;
        //     break;
        // case `FAIL_${ACTION_TYPES.TRAIN_COURSERA_ADD}`:
        //     newState.fetchAdd= false;
        //     break;
        // case ACTION_TYPES.TRAIN_COURSERA_ADD:
        //     newState.fetchAdd= false
        //     break;

    }
    return {...newState};
}