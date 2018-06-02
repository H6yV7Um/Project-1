import {ACTION_TYPES} from './action';

const initialState = {
    // 标题 (null: 默认)
    title : null,
    // 底部 (null: 默认, false: 隐藏)
    footer : null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
        // 设置默认layout
        case ACTION_TYPES.BOOK_LAYOUT_SET_DEFAULT_LAYOUT:
            newState.title = null;
            newState.footer = null;
            break;

        // 设置layout
        case ACTION_TYPES.BOOK_LAYOUT_SET_LAYOUT:
            newState = {...newState, ...action.data};
            break;
    }

    return {...newState};
}