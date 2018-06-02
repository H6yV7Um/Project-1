import {CALL_API} from 'middlewares/fetch';
import API from '../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 设置默认layout
    LAYOUT_EHR_SET_DEFAULT_LAYOUT : null,
    // 设置layout
    LAYOUT_EHR_SET_LAYOUT : null,
    // 完成设置layout
    LAYOUT_EHR_SET_LAYOUT_FINISH : null,

    // 设置界面页数  [select, main, menu]
    LAYOUT_EHR_SET_PAGE : null
});

// 设置默认layout
export const setDefaultLayout = () => {
    return {
        type : ACTION_TYPES.LAYOUT_EHR_SET_DEFAULT_LAYOUT
    }
}

// 设置layout  {title, header, footer, leftBody}
export const setLayout = layout => {
    return {
        type : ACTION_TYPES.LAYOUT_EHR_SET_LAYOUT,
        data : layout
    }
}

// 完成设置layout
export const setLayoutFinish = () => {
    return {
        type : ACTION_TYPES.LAYOUT_EHR_SET_LAYOUT_FINISH
    }
}

/**
 * 设置界面页数
 * @param page  [select, main, menu]
 * @returns {{type: null, data: *}}
 */
export const setPage = page => {
    return {
        type : ACTION_TYPES.LAYOUT_EHR_SET_PAGE,
        data : {page}
    }
}