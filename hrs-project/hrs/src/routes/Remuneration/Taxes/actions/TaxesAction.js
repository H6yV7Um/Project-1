import keyMirror from 'keymirror'
import {save as _save,
        remove as _remove,
        getList as _getList} from '../middlewares/TaxesMiddleware.js'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "REMUNERATION_TAXES": "REMUNERATION_TAXES",
    "REMUNERATION_TAXES_ERROR": "REMUNERATION_TAXES_ERROR",
    "REMUNERATION_TAXES_LOADING": "REMUNERATION_TAXES_LOADING",

    "REMUNERATION_TAXES_REMOVE": "REMUNERATION_TAXES_REMOVE",
    "REMUNERATION_TAXES_REMOVE_ERROR": "REMUNERATION_TAXES_REMOVE_ERROR",
    "REMUNERATION_TAXES_REMOVE_LOADING": "REMUNERATION_TAXES_REMOVE_LOADING",

    "REMUNERATION_TAXES_SAVE": "REMUNERATION_TAXES_SAVE",
    "REMUNERATION_TAXES_SAVE_ERROR": "REMUNERATION_TAXES_SAVE_ERROR",
    "REMUNERATION_TAXES_SAVE_LOADING": "REMUNERATION_TAXES_SAVE_LOADING",
    "REMUNERATION_TAXES_SWITCH": "REMUNERATION_TAXES_SWITCH",
    "REMUNERATION_TAXES_CURRENTRECORD": "REMUNERATION_TAXES_CURRENTRECORD"
})

// ------------------------------------
// Actions
// ------------------------------------
export const switchStatus = (status) => ({
    "type": "REMUNERATION_TAXES_SWITCH",
    status
})

export const getList = () => _getList()
export const save = (_id, name, threshold, levels) => _save(_id, name, threshold, levels)
export const remove = (_id) => _remove(_id)
export const setCurrentRecord = (currentRecord) => ({
    "type": "REMUNERATION_TAXES_CURRENTRECORD",
    currentRecord
})