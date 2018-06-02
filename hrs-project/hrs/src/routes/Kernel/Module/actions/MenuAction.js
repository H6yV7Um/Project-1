import keyMirror from 'keymirror'
import {save as saveMiddleware, saveChild as saveChildMiddleware} from '../middlewares/MenuMiddleware'
// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "MODULE_SAVE_MENU": 'MODULE_SAVE_MENU',
    "MODULE_SAVE_CHILD_LOADING": 'MODULE_SAVE_CHILD_LOADING',
    "MODULE_SAVE_CHILD_MENU": 'MODULE_SAVE_CHILD_MENU',
    "MODULE_SAVE_MENU_LOADING": 'MODULE_SAVE_MENU_LOADING',
    "MODULE_SAVE_NEW_CHILD_LOADING": 'MODULE_SAVE_NEW_CHILD_LOADING',
    "MODULE_SAVE_NEW_MENU_LOADING": 'MODULE_SAVE_NEW_MENU_LOADING'

})
export const save = (id, name, icon, moduleid) => saveMiddleware(id, name, icon, moduleid)
export const saveChild = (id, parentid, name, url, icon, moduleid, permission) =>
saveChildMiddleware(id, parentid, name, url, icon, moduleid, permission)

