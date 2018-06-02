import {ACTION_TYPES} from './action'

const initialState = {
   // 新增loading
    addMeetingLoading: false,
    // 请求loading
    getMeetingsLoading: false,
    // 会议使用记录
    meetings: [],
    // 使用记录使用条数，用于分页
    total: 1,
    // 当前页码
    page: 1,
    // 更新会议室使用状态loading
    updateMeetingsLoading: false
}

export default (state = initialState, action) => {
    let newState = state
    switch (action.type) {
        // 获取会议使用记录
    case `REQUEST_${ACTION_TYPES.APP_USE_RECORD_GET_MEETING}`:
        newState.getMeetingsLoading = true
        break
    case `FAIL_${ACTION_TYPES.APP_USE_RECORD_GET_MEETING}`:
        newState.getMeetingsLoading = false
        break
    case ACTION_TYPES.APP_USE_RECORD_GET_MEETING:
        newState.getMeetingsLoading = false
        newState.meetings = action.data.meetings
        newState.total = action.data.total
        newState.page = action.data.page
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
        // 更新meetings
    case ACTION_TYPES.APP_USE_RECORD_UPDATE_MEETINGS:
        newState.meetings = action.meetings
        break
    }
    return {...newState}
}
