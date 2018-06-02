import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    RECRUITMENT_CAMPUS_RECRUITMENTDETAIL_GET_JOBSDETAIL         :   null
});

/**
 * 获取详情
 * @param jobId 职位ID
 */
export const getDetail = (id, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUITMENT_CAMPUS_RECRUITMENTDETAIL_GET_JOBSDETAIL,
            url : API.RECRUITMENT_JOB_GET,
            data : {jobId : id},
            success
        }
    }
}




