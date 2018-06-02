import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';

/**
 * 获取okr
 * @param userId 成员ID
 * @param 时段 [起始年, 终止年] || -1:全部
 * @param success 成功回调
 * @returns {{}}
 */
export const getOkr = (userId, date, success) => {
    return {
        [CALL_API] : {
            url : API.OKR_GET,
            data : {userId, date, sort : {expected_time : 'asc', user_id : 'desc'}},
            success
        }
    }
}







