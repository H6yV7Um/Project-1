import {CALL_API} from 'middlewares/fetch'
import API from '../../../middlewares/api'
import keyMirror from 'keymirror'
import CONFIG from 'config/app'
import dd from 'utils/dingding'

export const ACTION_TYPES = keyMirror({
    // 获取会议使用情况
    APP_MEETING_ROOM_STATUS_GET_MEETING: null,
    // 新增会议申请
    APP_ADD_MEETING: null,
    // 切换日期
    APP_CHANGE_DATE: null,
    // 更改本地新会议
    APP_CHANGE_NEW_MEETING: null,
})

/**
 * 获取使用记录
 * @param {string} condition 分页和条件
 * @returns {Object}
 */
export const getMeetings = (condition) => {
    return {
        [CALL_API]: {
            type: ACTION_TYPES.APP_MEETING_ROOM_STATUS_GET_MEETING,
            url: `${API.APP_MEETING}${condition}`,
            method: 'GET'
        }
    }
}

export const changeDate = (condition) => {
    return {
        type: ACTION_TYPES.APP_CHANGE_DATE,
        newDate: condition
    }
}

export const changeNewMeeting = (condition) => {
    return {
        type: ACTION_TYPES.APP_CHANGE_NEW_MEETING,
        newMeeting: condition
    }
}

/**
 * 新增会议申请
 * @param {Object} data 新增会议的详细信息
 * @param {string} data.meetingTheme 会议主题
 * @param {number} data.startTime  申请的开始时间，时间戳
 * @param {number} data.endTime  申请的结束时间，时间戳
 * @param {string} data.meetingRoom  申请的会议室
 * @param {Array} data.meetingSponsor  会议发起人
 * @param {Array} data.host  会议主持人
 * @param {string} data.remarks  会议备注
 * @param {Array} data.participants  参会人员
 * @return {Object}
 */
export const addMeeting = (meeting, success) => {
    return (dispatch) => {
        // 获取临时授权码
        dd.runtime.permission.requestOperateAuthCode({
            corpId: CONFIG.DD_CORP_ID,
            agentId: CONFIG.DD_GET_AGENT_ID(),
            onSuccess: data => {
                dispatch({
                    [CALL_API]: {
                        type: ACTION_TYPES.APP_ADD_MEETING,
                        url: API.APP_MEETING,
                        data: {
                            ...meeting,
                            code: data.code,
                            agentid: CONFIG.DD_GET_AGENT_ID(),
                            // 跳转路由
                            url: 'meeting/check'
                        },
                        method: 'POST',
                        success
                    }
                })
            },
            onFail: e => {
                console.log(e)
            }
        })
    }
}
