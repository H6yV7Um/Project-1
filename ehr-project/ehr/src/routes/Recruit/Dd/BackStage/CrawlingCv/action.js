import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取简历列表
    RECRUIT_RECRUITLIST_GET_CRAWLING_CV      :   null,
    RECRUIT_RECRUITLIST_GET_CRAWLING_CV_BY_CONDITION : null
});

/**
 * 获取所有简历
 */
export const getCv =(data, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_RECRUITLIST_GET_CRAWLING_CV ,
            method : 'POST',
            url : API.RECRUIT_GET_CRAWLING_CV,
            success
        }
    }
}

/**
 * 根据输入进行模糊查询
 * @param 字段
 */
export const getCvByCondition = (data, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_RECRUITLIST_GET_CRAWLING_CV_BY_CONDITION,
            data : {val : data},
            url : API.RECRUIT_GET_CRAWLING_CV_BY_CONDITION,
            success
        }
    }
}



