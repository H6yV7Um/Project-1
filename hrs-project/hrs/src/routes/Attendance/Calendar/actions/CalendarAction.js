import keyMirror from 'keymirror'
import {save as _save, getList as _getList, remove as _remove} from '../middlewares/CalendarMiddleware.js'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "ATTENDANCE_CALENDAR_CURRENTMONTH": "ATTENDANCE_CALENDAR_CURRENTMONTH",
    "ATTENDANCE_CALENDAR": "ATTENDANCE_CALENDAR",
    "ATTENDANCE_CALENDAR_LOADING": "ATTENDANCE_CALENDAR_LOADING",
    "ATTENDANCE_CALENDAR_SAVE": "ATTENDANCE_CALENDAR_SAVE",
    "ATTENDANCE_CALENDAR_SAVE_LOADING": "ATTENDANCE_CALENDAR_SAVE_LOADING",
    "ATTENDANCE_CALENDAR_CURRENTRECORD": "ATTENDANCE_CALENDAR_CURRENTRECORD"
})
export const getList = (start_time, end_time) => _getList(start_time, end_time)
export const save = (_id, date, vacation, title, remark, attendance_time, closing_time) => _save(_id, date, vacation, title, remark, attendance_time, closing_time)
export const remove = (_id) => _remove(_id)
export const setCurrentRecord = (currentRecord) => ({
    "type": "ATTENDANCE_CALENDAR_CURRENTRECORD",
    currentRecord
})

export const setCurrentMonth = (currentMonth) => ({
    "type": "ATTENDANCE_CALENDAR_CURRENTMONTH",
    currentMonth
})
