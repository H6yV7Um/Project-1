import {ACTION_TYPES} from './action'
const initialState = {
    // 会议室使用记录
    meetings : null,
    // 更新会议室使用状态loading
    updateMeetingsLoading: false
}

export default (state = initialState, action) => {
    let newState = state
    switch (action.type) {
    case ACTION_TYPES.APP_MEETING_CHECK_GET_SINGLE_DATA:
        newState.getMeetingsLoading = false
        newState.meetings = action.data
        break
    case `REQUEST_${ACTION_TYPES.APP_MEETING_CHECK_GET_SINGLE_DATA}`:
        newState.getMeetingsLoading = true
        break
    case `FAIL_${ACTION_TYPES.APP_MEETING_CHECK_GET_SINGLE_DATA}`:
        newState.getMeetingsLoading = false
        break
    // 取消会议申请记录
    case `REQUEST_${ACTION_TYPES.APP_USE_RECORD_UPDATE_MEETING_STATUS}`:
        newState.updateMeetingsLoading = true
        break
    case `FAIL_${ACTION_TYPES.APP_USE_RECORD_UPDATE_MEETING_STATUS}`:
        newState.updateMeetingsLoading = false
        break
    case ACTION_TYPES.APP_USE_RECORD_UPDATE_MEETING_STATUS:
        newState.updateMeetingsLoading = false
        break
    }
    return {...newState}
}
