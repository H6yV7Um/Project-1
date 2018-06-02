import {CALL_API} from 'middlewares/fetch';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    PERFORMANCE_SET_SELECT_DATA : null
});

/**
 * 设置筛选数据
 * @param selectData 筛选数据
 * @param okrSelectData 获取OKR筛选数据
 */
export const setSelectData = selectData => {
    return {
        type : ACTION_TYPES.PERFORMANCE_SET_SELECT_DATA,
        data : {selectData}
    }
}







