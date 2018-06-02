import {ACTION_TYPES} from './action'
const initialState = {
    MeetingcancelLoading: false
}

export default (state = initialState, action) => {
    let newState = state
    switch (action.type) {
        // 获取会议使用记录
    case `REQUEST_${ACTION_TYPES.APP_MEETING_DETAILS_UPDATE_MEETING_STATUS}`:
        newState.MeetingcancelLoading = true
        break
    case `FAIL_${ACTION_TYPES.APP_MEETING_DETAILS_UPDATE_MEETING_STATUS}`:
        newState.MeetingcancelLoading = false
        break
    case ACTION_TYPES.APP_MEETING_DETAILS_UPDATE_MEETING_STATUS:
        newState.MeetingcancelLoading = false
        break
    }

    return {...newState}
}
