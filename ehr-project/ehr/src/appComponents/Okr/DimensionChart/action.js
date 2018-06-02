import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';

/**
 * 获取okr详情
 * @param userIds 成员ID列表
 * @param 时段 [起始年, 终止年] || -1:全部
 * @param success 成功回调
 * @returns {{}}
 */
export const getOkr = (userIds, date, success) => {
    return {
        [CALL_API] : {
            url : API.OKR_GET,
            data : {userIds, date, sort : {expected_time : 'asc', user_id : 'desc'}},
            success
        }
    }
}







