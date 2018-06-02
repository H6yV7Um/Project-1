import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取HR联系方式
    RECRUIT_DD_BACKSTAGE_GET_HRCONTACT          :   null,
    // 添加HR
    RECRUIT_DD_BACKSTAGE_ADD_HRCONTACT          :   null,
    // 删除HR
    RECRUIT_DD_BACKSTAGE_DELETE_HRCONTACT       :   null
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
 * 获取HR所有的联系方式
 */
export const getHrContact = success => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_BACKSTAGE_GET_HRCONTACT,
            method : 'GET',
            url : API.RECRUIT_GET_HR_CONTACT,
            success
        }
    }
}

/**
 * 添加HR联系方式
 */
export const AddHrContact = (hrData, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_BACKSTAGE_ADD_HRCONTACT,
            data : {hrData : hrData},
            url : API.RECRUIT_ADD_HR_CONTACT,
            success
        }
    }
}

/**
 * 删除hr
 * @param _id 数据库中的id
 */
export const deleteHrContact = (_id, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_BACKSTAGE_DELETE_HRCONTACT,
            data : {_id : _id},
            url : API.RECRUIT_DELETE_HR_CONTACT,
            success
        }
    }
}






