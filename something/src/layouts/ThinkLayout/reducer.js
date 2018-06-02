import {ACTION_TYPES} from './action';

const initialState = {
    // 是否设置layout
    isSetLayout : false,
    // 标题 (null: 默认)
    title : null,
    // 头部 (null: 默认, false: 隐藏)
    header : null,
    // 底部 (null: 默认, false: 隐藏)
    footer : null,
    // 界面页数
    page : null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
        // 设置默认layout
        case ACTION_TYPES.THINK_LAYOUT_SET_DEFAULT_LAYOUT:
            newState.title = null;
            newState.header = null;
            newState.footer = null;
            newState.isSetLayout = true;
            break;

        // 设置layout
        case ACTION_TYPES.THINK_LAYOUT_SET_LAYOUT:
            newState = {...newState, ...action.data, isSetLayout : true};
            break;

        // 完成设置layout
        case ACTION_TYPES.THINK_LAYOUT_SET_LAYOUT_FINISH:
            newState.isSetLayout = false;
            break;

        // 设置界面页数  [1=>admin, 2=>website, 3=>home]
        case ACTION_TYPES.THINK_LAYOUT_SET_PAGE:
            newState.page = action.data.page;
            break;
    }

    return {...newState};
}