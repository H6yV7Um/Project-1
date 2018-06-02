import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取所有的用户基本信息
    RECRUIT_DD_INTERVIEW_USERLIST_GET_WECHATUSER                    :   null,
    // 获取所有的职位数据
    RECRUIT_DD_INTERVIEW_USERLIST_GET_JOBS                          :   null,
    // 获取hr联系方式
    RECRUIT_DD_INTERVIEW_USERLIST_GET_HRCONTACT                     :   null,
    // 发送微信面试消息
    RECRUIT_DD_INTERVIEW_USERLIST_SEND_MSG                          :   null,
    // 修改签到状态为未签到
    RECRUIT_DD_INTERVIEW_USERLIST_UNCHECK_IN                        :   null,
    // 修改用户的流程状态
    RECRUIT_DD_INTERVIEW_USERLIST_CHANGE_STATE                      :   null,
    // 获取所有的职位分类数据
    RECRUIT_DD_INTERVIEW_USERLIST_GET_JOB_TYPE                      :   null
});

/**
 * 获取所有的用户基本信息
 * @param condition
 */
export const getWechatUser = (condition, success, fail, isClear) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_WECHATUSER,
            data : {condition, isClear},
            url : API.USER_GET_WECHAT_USER,
            success,
            fail
        }
    }
}

/**
 * 获取所有职位
 */
export const getJob = success => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_JOBS,
            method : 'GET',
            url : API.RECRUIT_GET_JOB,
            success
        }
    }
}

/**
 * 获取HR所有的联系方式
 */
export const getHrContact = success => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_HRCONTACT,
            method : 'GET',
            url : API.RECRUIT_GET_HR_CONTACT,
            success
        }
    }
}

/**
 * 微信公众号内发送模板消息
 * @param queryData 模板信息
 */
export const sendMsg = (queryData, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_SEND_MSG,
            url : API.WECHAT_SEND_MSG,
            data : {queryData},
            success,
            fail
        }
    }
}

/**
 * 修改签到状态为未签到
 * @param openid 微信用户唯一标识
 */
export const unCheckIn = (openid, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_UNCHECK_IN,
            url : API.RECRUIT_UN_CHECK_IN,
            data : {openid},
            success,
            fail
        }
    }
}

/**
 * 修改用户的流程状态
 * @param openid 微信用户唯一标识
 * @param state 需要修改到的状态
 */
export const changeState = (openid, state) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_CHANGE_STATE,
            url : API.RECRUIT_CHANGE_STATE,
            data : {openid, state}
        }
    }
}

/**
 * 获取所有职位类型
 */
export const getJobType = success => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_JOB_TYPE,
            method : 'GET',
            url : API.RECRUIT_GET_JOB_TYPE,
            success
        }
    }
}


