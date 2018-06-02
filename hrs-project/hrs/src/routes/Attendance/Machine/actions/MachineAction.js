import keyMirror from 'keymirror'
import {save as _save,
        remove as _remove,
        getList as _getList} from '../middlewares/MachineMiddleware.js'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "ATTENDANCE_MACHINE": "ATTENDANCE_MACHINE",
    "ATTENDANCE_MACHINE_ERROR": "ATTENDANCE_MACHINE_ERROR",
    "ATTENDANCE_MACHINE_LOADING": "ATTENDANCE_MACHINE_LOADING",

    "ATTENDANCE_MACHINE_REMOVE": "ATTENDANCE_MACHINE_REMOVE",
    "ATTENDANCE_MACHINE_REMOVE_ERROR": "ATTENDANCE_MACHINE_REMOVE_ERROR",
    "ATTENDANCE_MACHINE_REMOVE_LOADING": "ATTENDANCE_MACHINE_REMOVE_LOADING",

    "ATTENDANCE_MACHINE_SAVE": "ATTENDANCE_MACHINE_SAVE",
    "ATTENDANCE_MACHINE_SAVE_ERROR": "ATTENDANCE_MACHINE_SAVE_ERROR",
    "ATTENDANCE_MACHINE_SAVE_LOADING": "ATTENDANCE_MACHINE_SAVE_LOADING",
    "ATTENDANCE_MACHINE_SWITCH": "ATTENDANCE_MACHINE_SWITCH",

    "ATTENDANCE_MACHINE_CURRENTRECORD": "ATTENDANCE_MACHINE_CURRENTRECORD"
})

// ------------------------------------
// Actions
// ------------------------------------
export const switchStatus = (status) => ({
    "type": "ATTENDANCE_MACHINE_SWITCH",
    status
})

export const getList = () => _getList()
export const save = (_id, serial_number, ip_address, location) => _save(_id, serial_number, ip_address, location)
export const remove = (_id) => _remove(_id)
export const setCurrentRecord = (currentRecord) => ({
    "type": "ATTENDANCE_MACHINE_CURRENTRECORD",
    currentRecord
})