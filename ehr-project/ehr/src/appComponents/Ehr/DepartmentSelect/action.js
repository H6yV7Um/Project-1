import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';

/**
 * 获取部门列表
 * @param isLeader 是否只选管理部门 (true时将只可选自己管理部门(包括子部门))
 * @param success 成功回调
 * @returns {{}}
 */
export const getDepartments = (isLeader, success) => {
    return {
        [CALL_API] : {
            url : API.USER_GET_DEPARTMENTS,
            data : {isLeader},
            success
        }
    }
}







