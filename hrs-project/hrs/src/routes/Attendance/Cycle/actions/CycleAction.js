import keyMirror from 'keymirror'
import {save as _save,
        remove as _remove,
        getList as _getList} from '../middlewares/CycleMiddleware.js'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "ATTENDANCE_CYCLE": "ATTENDANCE_CYCLE",
    "ATTENDANCE_CYCLE_ERROR": "ATTENDANCE_CYCLE_ERROR",
    "ATTENDANCE_CYCLE_LOADING": "ATTENDANCE_CYCLE_LOADING",

    "ATTENDANCE_CYCLE_REMOVE": "ATTENDANCE_CYCLE_REMOVE",
    "ATTENDANCE_CYCLE_REMOVE_ERROR": "ATTENDANCE_CYCLE_REMOVE_ERROR",
    "ATTENDANCE_CYCLE_REMOVE_LOADING": "ATTENDANCE_CYCLE_REMOVE_LOADING",

    "ATTENDANCE_CYCLE_SAVE": "ATTENDANCE_CYCLE_SAVE",
    "ATTENDANCE_CYCLE_SAVE_ERROR": "ATTENDANCE_CYCLE_SAVE_ERROR",
    "ATTENDANCE_CYCLE_SAVE_LOADING": "ATTENDANCE_CYCLE_SAVE_LOADING",
    "ATTENDANCE_CYCLE_SWITCH": "ATTENDANCE_CYCLE_SWITCH",

    "ATTENDANCE_CYCLE_CURRENTRECORD": "ATTENDANCE_CYCLE_CURRENTRECORD"
})

// ------------------------------------
// Actions
// ------------------------------------
export const switchStatus = (status) => ({
    "type": "ATTENDANCE_CYCLE_SWITCH",
    status
})

export const getList = () => _getList()
export const save = (_id, start_time, end_time, lunch_start_time, lunch_end_time, overtime_start_time) => _save(_id, start_time, end_time, lunch_start_time, lunch_end_time, overtime_start_time)
export const remove = (_id) => _remove(_id)
export const setCurrentRecord = (currentRecord) => ({
    "type": "ATTENDANCE_CYCLE_CURRENTRECORD",
    currentRecord
})