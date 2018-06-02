import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    RECRUITMENT_INDEX_GET_JOBSTYPES          :   null
});

/**
 * 获取列表
 * @param type [1: 所有, 2: 社招, 3: 校招, 4: 实习]
 */
export const getJobsTypes = (_type = 3) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUITMENT_INDEX_GET_JOBSTYPES,
            url : API.RECRUITMENT_JOB_TYPES_GET,
            data : {type : _type}
        }
    }
}






