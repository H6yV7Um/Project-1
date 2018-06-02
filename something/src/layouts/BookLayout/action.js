import {CALL_API} from 'middlewares/fetch';
import API from '../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 设置默认layout
    BOOK_LAYOUT_SET_DEFAULT_LAYOUT : null,
    // 设置layout
    BOOK_LAYOUT_SET_LAYOUT : null
});

// 设置默认layout
export const setDefaultLayout = () => {
    return {
        type : ACTION_TYPES.BOOK_LAYOUT_SET_DEFAULT_LAYOUT
    }
}

// 设置layout  {title, footer}
export const setLayout = layout => {
    return {
        type : ACTION_TYPES.BOOK_LAYOUT_SET_LAYOUT,
        data : layout
    }
}