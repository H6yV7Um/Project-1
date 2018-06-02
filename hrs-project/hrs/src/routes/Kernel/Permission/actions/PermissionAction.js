import keyMirror from 'keymirror'
import {list, updateGroup as _updateGroup, updatePermission as _updatePermission} from '../middlewares/PermissionMiddleware'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "PERMISSION_LIST": "PERMISSION_LIST",
    "PERMISSION_LIST_LOADING": "PERMISSION_LIST_LOADING",
    "PERMISSION_LIST_ERROR": "PERMISSION_LIST_ERROR",
    "PERMISSION_UPDATE_GROUP": "PERMISSION_UPDATE_GROUP",
    "PERMISSION_UPDATE_GROUP_LOADING": "PERMISSION_UPDATE_GROUP_LOADING",
    "PERMISSION_UPDATE_GROUP_ERROR": "PERMISSION_UPDATE_GROUP_ERROR",
    "PERMISSION_UPDATE_PERMISSION": "PERMISSION_UPDATE_PERMISSION",
    "PERMISSION_UPDATE_PERMISSION_LOADING": "PERMISSION_UPDATE_PERMISSION_LOADING",
    "PERMISSION_UPDATE_PERMISSION_ERROR": "PERMISSION_UPDATE_PERMISSION_ERROR"
})


// ------------------------------------
// Actions
// ------------------------------------
/*
 * 获取数据
 * @param
 * @returns {function(*, *)}
 */
export const getList = () => list()

export const updateGroup = (_id, group) => _updateGroup(_id, group)
export const updatePermission = (_id, permission, group) => _updatePermission(_id, permission, group)
export const setError = (message) => ({
    "type": ACTIONS.PERMISSION_UPDATE_GROUP_ERROR,
    message
})