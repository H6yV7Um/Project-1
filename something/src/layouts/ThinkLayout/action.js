import {CALL_API} from 'middlewares/fetch';
import API from '../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 设置默认layout
    THINK_LAYOUT_SET_DEFAULT_LAYOUT : null,
    // 设置layout
    THINK_LAYOUT_SET_LAYOUT : null,
    // 完成设置layout
    THINK_LAYOUT_SET_LAYOUT_FINISH : null,

    // 设置界面页数  [1=>admin, 2=>website, 3=>home]
    THINK_LAYOUT_SET_PAGE : null
});

// 设置默认layout
export const setDefaultLayout = () => {
    return {
        type : ACTION_TYPES.THINK_LAYOUT_SET_DEFAULT_LAYOUT
    }
}

// 设置layout  {title}
export const setLayout = layout => {
    return {
        type : ACTION_TYPES.THINK_LAYOUT_SET_LAYOUT,
        data : layout
    }
}

// 完成设置layout
export const setLayoutFinish = () => {
    return {
        type : ACTION_TYPES.THINK_LAYOUT_SET_LAYOUT_FINISH
    }
}

/**
 * 设置界面页数
 * @param page  [1=>admin, 2=>website, 3=>home]
 * @returns {{type: null, data: *}}
 */
export const setPage = page => {
    return {
        type : ACTION_TYPES.THINK_LAYOUT_SET_PAGE,
        data : {page}
    }
}