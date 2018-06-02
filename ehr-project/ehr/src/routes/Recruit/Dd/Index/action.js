import {CALL_API} from 'middlewares/fetch';
import API from '../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 添加简历
    RECRUIT_RECRUITLIST_ADD_CV                  :   null,
    // 获取职位
    RECRUIT_RECRUITLIST_GET_JOB                 :   null,
    // 通过公众号发送消息
    RECRUIT_RECRUITLIST_SEND_MSG                :   null,
    // 修改状态为签到
    PERSONALCENTER_CHECK_IN                     :   null,
    // 修改状态为未签到
    PERSONALCENTER_UN_CHECK_IN                  :   null,
    // 获取用户列表
    RECRUIT_RECRUITLIST_GET_WECHAT_USER         :   null,
    // 模糊查询微信用户
    RECRUIT_RECRUITLIST_FIND_WECHAT_USER_BY_NAME:   null
});

/**
 * 新增简历
 * @param resumeData 简历数据
 * @param WechatData 微信数据
 */
export const addCv = (resumeData, wechatData) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_RECRUITLIST_ADD_CV,
            url : API.CV_ADD_CV,
            data : {resumeData : resumeData, wechatData: wechatData}
        }
    }
}

/**
 * 获取所有职位
 */
export const getJob = success => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_RECRUITLIST_GET_JOB,
            method : 'GET',
            url : API.RECRUIT_GET_JOB,
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
            type : ACTION_TYPES.RECRUIT_RECRUITLIST_SEND_MSG,
            url : API.WECHAT_SEND_MSG,
            data : {queryData : queryData},
            success,
            fail
        }
    }
}

/**
 * 获取所有的用户基本信息
 */
export const getWechatUser = success => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_RECRUITLIST_GET_WECHAT_USER,
            method : 'GET',
            url : API.USER_GET_WECHAT_USER,
            success
        }
    }
}

/**
 * 模糊查询微信用户
 * @param keyword 模糊查询微信用户
 */
export const findWechatUserByName = (keyword, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_RECRUITLIST_FIND_WECHAT_USER_BY_NAME,
            method : 'GET',
            data : {keyword : keyword},
            url : API.RECRUIT_FIND_WECHAT_USER_BY_NAME,
            success
        }
    }
}

/**
 * 获取列表
 * @param name 姓名
 * @param phone 电话号码
 * @param position 职位
 * @param success 成功回调函数
 * @param error 错误回调函数
 */
export const checkIn = (name, phone, position, success, error) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERSONALCENTER_CHECKIN_RECORD_ADD,
            url : API.DINGDING_SEND_ROBOT_MESSAGE,
            data : {name: name, phone: phone, position: position},
            success,
            error
        }
    }
}

/**
 * 修改签到状态为已签到
 * @param openid 微信用户唯一标识
 */
export const unCheckIn = (openid) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERSONALCENTER_UN_CHECK_IN,
            url : API.RECRUIT_UN_CHECK_IN,
            data : {openid: openid}
        }
    }
}






