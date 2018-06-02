import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';

/**
 * 获取阿米巴详情
 * @param departmentIds 部门ID列表
 * @param 时段 [起始年, 终止年] || -1:全部
 * @param success 成功回调
 * @returns {{}}
 */
export const getAmoeba = (departmentIds, date, success) => {
    return {
        [CALL_API] : {
            url : API.AMOEBA_GET,
            data : {departmentIds, date, sort : {expected_time : 'asc', department_id : 'desc'}},
            success
        }
    }
}







