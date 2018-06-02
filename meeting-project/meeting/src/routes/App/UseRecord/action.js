import {CALL_API} from 'middlewares/fetch'
import API from '../../../middlewares/api'
import CONFIG from 'config/app'
import dd from 'utils/dingding'
import keyMirror from 'keymirror'

export const ACTION_TYPES = keyMirror({
    APP_USE_RECORD_GET_MEETING: null,
    APP_USE_RECORD_UPDATE_MEETING_STATUS: null,
    APP_USE_RECORD_UPDATE_MEETINGS: null
})
/**
 * 获取使用记录
 * @param {string} condition 分页和条件
 * @returns {Object}
 */
export const getMeetings = (condition) => {
    return {
        [CALL_API]: {
            type: ACTION_TYPES.APP_USE_RECORD_GET_MEETING,
            url: `${API.APP_MEETING}${condition}`,
            method: 'GET'
        }
    }
}
/**
 * 更新会议室的状态
 * @param {Object}  data
 * @param {number} nextStatus 会议室将要变成的状态
 * @return {Array} data.ids 数据库中会议使用记录文档的id集合
 */
export const updateMeetingStatus = (meeting, success) => {
    return (dispatch, getState) => {
        dd.runtime.permission.requestOperateAuthCode({
            corpId: CONFIG.DD_CORP_ID,
            agentId: CONFIG.DD_GET_AGENT_ID(),
            onSuccess: data => {
                dispatch({
                    [CALL_API]: {
                        type: ACTION_TYPES.APP_USE_RECORD_UPDATE_MEETING_STATUS,
                        url: API.APP_UPDATE_MEETING_STATUS,
                        data: {
                            ...meeting,
                            code: data.code,
                            agentid: CONFIG.DD_GET_AGENT_ID()
                        },
                        method: 'PUT',
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
/**
 * 更新本地meetings内容
 * @param {array} meetings 更新后的会议申请记录
 * @returns {Object}
 */
export const updateMeetings = (meetings) => ({
    type: ACTION_TYPES.APP_USE_RECORD_UPDATE_MEETINGS,
    meetings: meetings
})
