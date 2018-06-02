import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';

/**
 * 获取love
 * @param departmentId 部门ID
 * @param 时段 [起始年, 终止年] || -1:全部
 * @param success 成功回调
 * @returns {{}}
 */
export const getLove = (departmentId, date, success) => {
    return {
        [CALL_API] : {
            url : API.LOVE_GET,
            data : {departmentId, date, sort : {expected_time : 'asc', department_id : 'desc'}},
            success
        }
    }
}







