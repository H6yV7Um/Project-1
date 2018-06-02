import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';

/**
 * 获取成员列表
 * @param isLeader 是否只选管理成员 (true时将只可选自己管理部门成员(包括子部门成员))
 * @param success 成功回调
 * @returns {{}}
 */
export const getUsers = (isLeader, success) => {
    return {
        [CALL_API] : {
            url : API.USER_GET_USERS,
            data : {isLeader},
            success
        }
    }
}







