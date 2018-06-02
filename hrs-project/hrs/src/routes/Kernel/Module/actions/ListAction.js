import keyMirror from 'keymirror'
import {save as saveMiddleware, list as listMiddleware} from '../middlewares/ListMiddleware'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "MODULE_LIST": 'MODULE_LIST',
    "MODULE_LIST_LOADING": 'MODULE_LIST_LOADING',
    "MODULE_LIST_ERROR": 'MODULE_LIST_ERROR',
    "MODULE_SAVE": 'MODULE_SAVE',
    "MODULE_SAVE_NEW": 'MODULE_SAVE_NEW',
    "MODULE_SAVE_ERROR": 'MODULE_SAVE_ERROR',
    "MODULE_SAVE_LOADING": 'MODULE_SAVE_LOADING',
    "MODULE_SAVE_NEW_LOADING": 'MODULE_SAVE_NEW_LOADING'

});


// ------------------------------------
// Actions
// ------------------------------------
/**
 * 获取模块列表
 * @returns {function(*, *)}
 */
export const getList = () =>
listMiddleware()

export const setError = (message) => ({
    "type": ACTIONS.MODULE_SAVE_ERROR,
    message
})
// ------------------------------------
// Actions
// ------------------------------------
/**
 * 保存模块列表
 * @returns {function(*, *)}
 */
export const save = (key, name, namespace, version, permission) =>
saveMiddleware(key, name, namespace, version, permission)

