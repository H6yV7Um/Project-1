import {ACTION_TYPES} from './action';

const initialState = {
    // 用户信息
    userInfo : null,

    // 是否显示软键盘
    isShowKeyboard : false,
    // 是否显示模态层
    isShowModal : false
}

export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
        // 登录
        case ACTION_TYPES.CORE_LAYOUT_LOGIN:
            newState.userInfo = action.data;
            break;

        // 获取用户信息
        case ACTION_TYPES.CORE_LAYOUT_GET_USER_INFO:
            newState.userInfo = action.data;
            break;

        // 显示软键盘
        case ACTION_TYPES.CORE_LAYOUT_SHOW_KEYBOARD:
            newState.isShowKeyboard = true;
            break;

        // 隐藏软键盘
        case ACTION_TYPES.CORE_LAYOUT_HIDE_KEYBOARD:
            newState.isShowKeyboard = false;
            break;

        // 显示模态层
        case ACTION_TYPES.CORE_LAYOUT_SHOW_MODAL:
            newState.isShowModal = true;
            break;

        // 隐藏模态层
        case ACTION_TYPES.CORE_LAYOUT_HIDE_MODAL:
            newState.isShowModal = false;
            break;
    }

    return {...newState};
}