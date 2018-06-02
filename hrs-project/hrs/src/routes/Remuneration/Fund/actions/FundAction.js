import keyMirror from 'keymirror'
import {save as _save,
        remove as _remove,
        getList as _getList} from '../middlewares/FundMiddleware.js'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "REMUNERATION_FUND": "REMUNERATION_FUND",
    "REMUNERATION_FUND_ERROR": "REMUNERATION_FUND_ERROR",
    "REMUNERATION_FUND_LOADING": "REMUNERATION_FUND_LOADING",

    "REMUNERATION_FUND_REMOVE": "REMUNERATION_FUND_REMOVE",
    "REMUNERATION_FUND_REMOVE_ERROR": "REMUNERATION_FUND_REMOVE_ERROR",
    "REMUNERATION_FUND_REMOVE_LOADING": "REMUNERATION_FUND_REMOVE_LOADING",

    "REMUNERATION_FUND_SAVE": "REMUNERATION_FUND_SAVE",
    "REMUNERATION_FUND_SAVE_ERROR": "REMUNERATION_FUND_SAVE_ERROR",
    "REMUNERATION_FUND_SAVE_LOADING": "REMUNERATION_FUND_SAVE_LOADING",
    "REMUNERATION_FUND_SWITCH": "REMUNERATION_FUND_SWITCH",

    "REMUNERATION_FUND_CURRENTRECORD": "REMUNERATION_FUND_CURRENTRECORD"
})

// ------------------------------------
// Actions
// ------------------------------------
export const switchStatus = (status) => ({
    "type": "REMUNERATION_FUND_SWITCH",
    status
})

export const getList = () => _getList()
export const save = (_id, name, company_rate, personal_rate, lower, higher) => _save(_id, name, company_rate, personal_rate, lower, higher)
export const remove = (_id) => _remove(_id)
export const setCurrentRecord = (currentRecord) => ({
    "type": "REMUNERATION_FUND_CURRENTRECORD",
    currentRecord
})