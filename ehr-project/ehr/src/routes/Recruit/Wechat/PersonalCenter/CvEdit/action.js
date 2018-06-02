import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 添加简历
    SUBSCRIPTION_PERSONALCENTER_ADD_CV          :   null,
    // 简历是否存在
    SUBSCRIPTION_PERSONALCENTER_GET_CV          :   null,
    // 更新简历
    SUBSCRIPTION_PERSONALCENTER_UPDATE_CV       :   null,
    // 获取所有的职位
    SUBSCRIPTION_PERSONALCENTER_GET_JOB         :   null
});

/**
 * 新增简历
 * @param resumeData 简历数据
 * @param WechatData 微信数据
 */
export const addCv = (cvData, wechatData, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_ADD_CV,
            url : API.RECRUIT_ADD_CV,
            data : {cvData : cvData, wechatData: wechatData},
            success
        }
    }
}

/**
 * 获取简历详情
 * @param openid 微信用户唯一身份标识
 */
export const getCv = (openid) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_GET_CV,
            url : API.RECRUIT_GET_CV,
            data : {openid : openid}
        }
    }
}

/**
 * 更新简历
 * @param openid  加密后的微信号
 * @param resumeData 简历数据
 */
export const updateCv = (openid, resumeData, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_UPDATE_CV,
            url : API.RECRUIT_UPDATE_CV,
            data : {openid : openid, resumeData : resumeData},
            success
        }
    }
}

/**
 * 获取所有职位
 */
export const getJob = () => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_GET_JOB,
            method : 'GET',
            url : API.RECRUIT_GET_JOB
        }
    }
}


