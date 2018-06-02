import keyMirror from 'keymirror'
import { getList as _getList} from '../middlewares/MyCalendarMiddleware.js'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "ATTENDANCE_MYCALENDAR_CURRENTMONTH": "ATTENDANCE_MYCALENDAR_CURRENTMONTH",
    "ATTENDANCE_MYCALENDAR": "ATTENDANCE_MYCALENDAR",
    "ATTENDANCE_MYCALENDAR_LOADING": "ATTENDANCE_MYCALENDAR_LOADING",
    "ATTENDANCE_MYCALENDAR_CURRENTRECORD": "ATTENDANCE_MYCALENDAR_CURRENTRECORD"

})
export const getList = (start_time, end_time) => _getList(start_time, end_time)

export const setCurrentRecord = (currentRecord) => ({
    "type": "ATTENDANCE_MYCALENDAR_CURRENTRECORD",
    currentRecord
})

export const setCurrentMonth = (currentMonth) => ({
    "type": "ATTENDANCE_MYCALENDAR_CURRENTMONTH",
    currentMonth
})
