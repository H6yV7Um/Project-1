import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取职位列表
    RECRUIT_DD_BACKSTAGE_JOB_GET_JOB            :   null,
    // 获取职位类型列表
    RECRUIT_DD_BACKSTAGE_JOB_GET_JOB_TYPE       :   null,
    // 删除职位类型
    RECRUIT_DD_BACKSTAGE_JOB_DELETE_JOB_TYPE    :   null,
    // 添加职位类型
    RECRUIT_DD_BACKSTAGE_JOB_ADD_JOB_TYPE       :   null,
    // 添加职位
    RECRUIT_DD_BACKSTAGE_JOB_ADD_JOB            :   null,
    // 删除职位
    RECRUIT_DD_BACKSTAGE_JOB_DELETE_JOB         :   null
});

/**
 * 添加职位类型
 *        data
 * @param name        职位名称
 * @param job_type_id 职位类别id
 */
export const addJob = (data, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_ADD_JOB,
            data : {data : data},
            url : API.RECRUIT_ADD_JOB,
            success
        }
    }
}

/**
 * 删除职位
 * @param _id 数据库中的id
 */
export const deleteJob = (_id, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_DELETE_JOB,
            data : {_id : _id},
            url : API.RECRUIT_DELETE_JOB,
            success
        }
    }
}


/**
 * 获取所有职位
 */
export const getJob = success => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_GET_JOB,
            method : 'GET',
            url : API.RECRUIT_GET_JOB,
            success
        }
    }
}

/**
 * 获取所有职位类型
 */
export const getJobType = success => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_GET_JOB_TYPE,
            method : 'GET',
            url : API.RECRUIT_GET_JOB_TYPE,
            success
        }
    }
}

/**
 * 添加职位类型
 * @param name 类别名称
 */
export const addJobType = (name, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_ADD_JOB_TYPE,
            data : {name : name},
            url : API.RECRUIT_ADD_JOB_TYPE,
            success
        }
    }
}

/**
 * 删除职位类型
 * @param _id 数据库中的id
 */
export const deleteJobType = (_id, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_DELETE_JOB_TYPE,
            data : {_id : _id},
            url : API.RECRUIT_DELETE_JOB_TYPE,
            success
        }
    }
}


