import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    RECRUITMENT_CAMPUS_RECRUITMENTLIST_GET_JOBSLIST           :   null
});

/**
 * 获取列表
 * @param jobTypeId 职位分类ID
 */
export const getJobsList = (id, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUITMENT_CAMPUS_RECRUITMENTLIST_GET_JOBSLIST,
            url : API.RECRUITMENT_JOBS_GET,
            data : {jobTypeId : id},
            success,
            fail
        }
    }
}

/**
 * 清空数据
 */
export const clear = () => {
    return {
        type : ACTION_TYPES.RECRUITMENT_CAMPUS_RECRUITMENTLIST_JOBS_LIST_CLEAR
    }
}