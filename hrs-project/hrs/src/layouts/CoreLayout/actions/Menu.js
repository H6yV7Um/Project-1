import keyMirror from 'keymirror'
import {getMenus as _getMenus} from '../middlewares/UserMiddleware'
// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "CORE_ERROR": "CORE_ERROR",
    "CORE_LOAD": "CORE_LOAD",
    "CORE_LOADING": "CORE_LOADING"
})

// ------------------------------------
// Actions
// ------------------------------------
export const getMenus = () => _getMenus()