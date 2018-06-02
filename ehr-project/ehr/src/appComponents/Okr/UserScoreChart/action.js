import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';

/**
 * 获取okr分数
 * @param userId 成员ID
 * @param period 时段 [年份, 阶段1, 阶段2]
 * @param success 成功回调
 * @returns {{}}
 */
export const getOkrScore = (userId, period, success) => {
    return {
        [CALL_API] : {
            url : API.OKR_SCORE_GET,
            data : {userId, period},
            success
        }
    }
}