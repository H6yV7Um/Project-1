import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取简历列表
    RECRUIT_RECRUITLIST_GET_CRAWLING_CV_BY_ID      :   null,
});

/**
 * 获取所有职位类型
 */
export const getCvById = (id,success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_RECRUITLIST_GET_CRAWLING_CV_BY_ID ,
            method : 'POST',
            data : {id:id},
            url : API.RECRUIT_GET_CRAWLING_CV_BY_ID ,
            success
        }
    }
}

