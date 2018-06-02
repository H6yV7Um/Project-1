import keyMirror from 'keymirror'
import {getList as _getList, getPerformanceList as _getPerformanceList, save as _save,remove as _remove } from '../middlewares/PreferencesMiddleware'
// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "PERFORMANCE_GETLIST_LOADING": "PERFORMANCE_GETLIST_LOADING",
    "PERFORMANCE_GETLIST_REMOVE_ERROR": "PERFORMANCE_GETLIST_REMOVE_ERROR",
    'PERFORMANCE_GETLIST_ERROR':'PERFORMANCE_GETLIST_ERROR',
    "PERFORMANCE_GETLIST": "PERFORMANCE_GETLIST",

    "PERFORMANCE_GETPERFORMANCELIST_LOADING": "PERFORMANCE_GETPERFORMANCELIST_LOADING",
    "PERFORMANCE_GETPERFORMANCELIST_ERROR": "PERFORMANCE_GETPERFORMANCELIST_ERROR",
    "PERFORMANCE_GETPERFORMANCELIST_REMOVE_ERROR": "PERFORMANCE_GETPERFORMANCELIST_REMOVE_ERROR",
    "PERFORMANCE_GETPERFORMANCELIST": "PERFORMANCE_GETPERFORMANCELIST",

    "PERFORMANCE_SAVE_LOADING": "PERFORMANCE_SAVE_LOADING",
    "PERFORMANCE_SAVE_ERROR": "PERFORMANCE_SAVE_ERROR",
    "PERFORMANCE_SAVE_REMOVE_ERROR": "PERFORMANCE_SAVE_REMOVE_ERROR",
    "PERFORMANCE_SAVE": "PERFORMANCE_ADD",

    "EDIT":"EDIT",
    "REMOVE":"REMOVE",
    "TOGGLE":"TOGGLE",
    "PERFORMANCE_REMOVE_LOADING":"PERFORMANCE_REMOVE_LOADING",
    "PERFORMANCE_REMOVE_ERROR":"PERFORMANCE_REMOVE_ERROR",
    "PERFORMANCE_REMOVE_REMOVE_ERROR":"PERFORMANCE_REMOVE_REMOVE_ERROR",
    "PERFORMANCE_REMOVE":"PERFORMANCE_REMOVE"
})
// ------------------------------------
// Actions
// ------------------------------------

export const getList = () => _getList()

export const save = (_id, title, remark, cycle, start, end, avoid, objects, options, performanceType) => {return _save(_id, title, remark, cycle, start, end, avoid, objects, options, performanceType)}

export const getPerformanceList = ()=>_getPerformanceList()

export const setErrorGetlist = (message) => ({
    "type": ACTIONS.PERFORMANCE_GETLIST_REMOVE_ERROR,
    message
})

export const setErrorGetPerformancelist = (message) => ({
    "type": ACTIONS.PERFORMANCE_GETPERFORMANCELIST_REMOVE_ERROR,
    message
})

export const setErrorSave = (message) => ({
    "type": ACTIONS.PERFORMANCE_SAVE_ERROR,
    message
})

export const setErrorRemove =(message) => ({
    "type":ACTIONS.PERFORMANCE_REMOVE_REMOVE_ERROR,
    message
})

export const edit = (eState) => {
    console.log(eState.key)
    return {
        "type": ACTIONS.EDIT,
        "key":eState.key
    }
}
export const remove = (rState) => _remove(rState)


export const toggle = (status) => {
    return {
        "type": ACTIONS.TOGGLE,
        "status":status
    }
}