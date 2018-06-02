import keyMirror from 'keymirror'
import {list, add as _add, update as _update} from '../middlewares/OrganizationMiddleware'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "ORGANIZATION_LIST": "ORGANIZATION_LIST",
    "ORGANIZATION_LIST_LOADING": "ORGANIZATION_LIST_LOADING",
    "ORGANIZATION_LIST_ERROR": "ORGANIZATION_LIST_ERROR",
    "ORGANIZATION_ADD_STATUS": "ORGANIZATION_ADD_STATUS",
    "ORGANIZATION_ADD_PARENTID": "ORGANIZATION_ADD_PARENTID",
    "ORGANIZATION_ADD_UPDATE": "ORGANIZATION_ADD_UPDATE",
    "ORGANIZATION_ADD": "ORGANIZATION_ADD",
    "ORGANIZATION_ADD_ERROR": "ORGANIZATION_ADD_ERROR",
    "ORGANIZATION_ADD_LOADING": "ORGANIZATION_ADD_LOADING",
    "ORGANIZATION_UPDATE_CURRENT": "ORGANIZATION_UPDATE_CURRENT",
    "ORGANIZATION_UPDATE": "ORGANIZATION_UPDATE",
    "ORGANIZATION_UPDATE_ERROR": "ORGANIZATION_UPDATE_ERROR",
    "ORGANIZATION_UPDATE_LOADING": "ORGANIZATION_UPDATE_LOADING"


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
export const toggle = (status) => ({
    "type": ACTIONS.ORGANIZATION_ADD_STATUS,
    status
})
export const setParentID = (_id) => ({
    "type": ACTIONS.ORGANIZATION_ADD_PARENTID,
    "parentID": _id
})
export const setNewDepartment = (newDepartment) => (
    {
        "type": ACTIONS.ORGANIZATION_ADD_UPDATE,
        newDepartment
    }
)
export const add = (name, parentid, create_dept_group) => _add(name, parentid, create_dept_group)
export const setCurrentDepartment = (currentDepartment) => (
    {
        "type": ACTIONS.ORGANIZATION_UPDATE_CURRENT,
        currentDepartment
    }
)
export const update = (_id, name, parentid, manager) => _update(_id, name, parentid, manager)