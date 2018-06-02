import {ACTION_TYPES} from './action'

const initialState = {
    // 请求loading
    getMeetingsLoading: false,
    // 会议使用记录
    meetings: null,
    // 新增loading
    addMeetingLoading: false,
    // 日期
    date: new Date(),
    // 新增会议
    newMeeting: null,
    isChangeDate: false,
    addMeetingStatus: true
}

export default (state = initialState, action) => {
    let newState = state
    switch (action.type) {
        // 获取会议使用记录
    case `REQUEST_${ACTION_TYPES.APP_MEETING_ROOM_STATUS_GET_MEETING}`:
        newState.getMeetingsLoading = true
        break
    case `FAIL_${ACTION_TYPES.APP_MEETING_ROOM_STATUS_GET_MEETING}`:
        newState.getMeetingsLoading = false
        break
    case ACTION_TYPES.APP_MEETING_ROOM_STATUS_GET_MEETING:
        newState.getMeetingsLoading = false
        newState.isChangeDate = true
        newState.meetings = action.data.meetings
        break
        // 新增申请
    case `REQUEST_${ACTION_TYPES.APP_ADD_MEETING}`:
        newState.addMeetingLoading = true
        newState.addMeetingStatus = true
        break
    case `FAIL_${ACTION_TYPES.APP_ADD_MEETING}`:
        newState.addMeetingLoading = false
        newState.addMeetingStatus = false
        break
    case ACTION_TYPES.APP_ADD_MEETING:
        newState.addMeetingLoading = false
        newState.addMeetingStatus = true
        newState.newMeeting = null
        break
    case ACTION_TYPES.APP_CHANGE_DATE:
        newState.date = action.newDate
        newState.isChangeDate = true
        break
    case ACTION_TYPES.APP_CHANGE_NEW_MEETING:
        newState.newMeeting = action.newMeeting
        break
    }

    return {...newState}
}
