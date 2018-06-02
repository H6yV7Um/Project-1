import keyMirror from 'keymirror'
import {save as _save,
        remove as _remove,
        getList as _getList,
        findSetting as _findSetting,
        updateSetting as _updateSetting
        } from '../middlewares/SalaryMiddleware.js'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "REMUNERATION_SALARY": "REMUNERATION_SALARY",
    "REMUNERATION_SALARY_ERROR": "REMUNERATION_SALARY_ERROR",
    "REMUNERATION_SALARY_LOADING": "REMUNERATION_SALARY_LOADING",

    "REMUNERATION_SALARY_REMOVE": "REMUNERATION_SALARY_REMOVE",
    "REMUNERATION_SALARY_REMOVE_ERROR": "REMUNERATION_SALARY_REMOVE_ERROR",
    "REMUNERATION_SALARY_REMOVE_LOADING": "REMUNERATION_SALARY_REMOVE_LOADING",

    "REMUNERATION_SALARY_SAVE": "REMUNERATION_SALARY_SAVE",
    "REMUNERATION_SALARY_SAVE_ERROR": "REMUNERATION_SALARY_SAVE_ERROR",
    "REMUNERATION_SALARY_SAVE_LOADING": "REMUNERATION_SALARY_SAVE_LOADING",
    "REMUNERATION_SALARY_SWITCH": "REMUNERATION_SALARY_SWITCH",

    "REMUNERATION_SALARY_SETTING": "REMUNERATION_SALARY_SETTING",
    "REMUNERATION_SALARY_SETTING_ERROR": "REMUNERATION_SALARY_SETTING_ERROR",
    "REMUNERATION_SALARY_SETTING_LOADING": "REMUNERATION_SALARY_SETTING_LOADING",
    "REMUNERATION_SALARY_SETTING_UPDATE": "REMUNERATION_SALARY_SETTING_UPDATE",
    "REMUNERATION_SALARY_SETTING_UPDATE_ERROR": "REMUNERATION_SALARY_SETTING_UPDATE_ERROR",
    "REMUNERATION_SALARY_SETTING_UPDATE_LOADING": "REMUNERATION_SALARY_SETTING_UPDATE_LOADING",
    
    "REMUNERATION_SALARY_CURRENTRECORD": "REMUNERATION_SALARY_CURRENTRECORD"
})

// ------------------------------------
// Actions
// ------------------------------------
export const switchStatus = (status) => ({
    "type": "REMUNERATION_SALARY_SWITCH",
    status
})

export const getList = () => _getList()
export const save = (_id, name, salaries, subsidy) => _save(_id, name, salaries, subsidy)
export const remove = (_id) => _remove(_id)
export const findSetting = () => _findSetting()
export const updateSetting = (cycle) => _updateSetting(cycle)
export const setCurrentRecord = (currentRecord) => ({
    "type": "REMUNERATION_SALARY_CURRENTRECORD",
    currentRecord
})