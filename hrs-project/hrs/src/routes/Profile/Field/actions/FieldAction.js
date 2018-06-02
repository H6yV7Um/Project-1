import keyMirror from 'keymirror'
import {saveGroup as _saveGroup,
        listGroup as _listGroup,
        sortGroup as _sortGroup,
        saveInputField as _saveInputField,
        saveSelectField as _saveSelectField,
        saveFileField as _saveFileField,
        saveDateField as _saveDateField,
        saveDepartmentField as _saveDepartmentField,
        saveMemberField as _saveMemberField,
        sortField as _sortField,
        removeGroup as _removeGroup,
        removeField as _removeField,
        getDepartment as _getDepartment,
        getUsers as _getUsers} from '../middlewares/FieldMiddleware'


// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "DEPARTMENT": "DEPARTMENT",
    "DEPARTMENT_ERROR": "DEPARTMENT_ERROR",
    "DEPARTMENT_LOADING": "DEPARTMENT_LOADING",
    "DEPARTMENT_REMOVE_ERROR": 'DEPARTMENT_REMOVE_ERROR',
    "PROFILE_FIELD_ADD_FIELD": "PROFILE_FIELD_ADD_FIELD",
    "PROFILE_FIELD_ADD_FIELD_ERROR": "PROFILE_FIELD_ADD_FIELD_ERROR",
    "PROFILE_FIELD_ADD_FIELD_LOADING": "PROFILE_FIELD_ADD_FIELD_LOADING",
    "PROFILE_FIELD_ADD_GROUP": "PROFILE_FIELD_ADD_GROUP",
    "PROFILE_FIELD_ADD_GROUP_ERROR": "PROFILE_FIELD_ADD_GROUP_ERROR",
    "PROFILE_FIELD_ADD_GROUP_LOADING": "PROFILE_FIELD_ADD_GROUP_LOADING",
    "PROFILE_FIELD_ERROR": "PROFILE_FIELD_ERROR",
    "PROFILE_FIELD_LIST_GROUP": "PROFILE_FIELD_LIST_GROUP",
    "PROFILE_FIELD_LOADING": "PROFILE_FIELD_LOADING",
    "PROFILE_FIELD_REMOVE_FIELD": "PROFILE_FIELD_REMOVE_FIELD",
    "PROFILE_FIELD_REMOVE_FIELD_ERROR": "PROFILE_FIELD_REMOVE_FIELD_ERROR",
    "PROFILE_FIELD_REMOVE_FIELD_LOADING": "PROFILE_FIELD_REMOVE_FIELD_LOADING",
    "PROFILE_FIELD_REMOVE_GROUP": "PROFILE_FIELD_REMOVE_GROUP",
    "PROFILE_FIELD_REMOVE_GROUP_ERROR": "PROFILE_FIELD_REMOVE_GROUP_ERROR",
    "PROFILE_FIELD_REMOVE_GROUP_LOADING": "PROFILE_FIELD_REMOVE_GROUP_LOADING",
    "PROFILE_FIELD_SORT_FIELD": "PROFILE_FIELD_SORT_FIELD",
    "PROFILE_FIELD_SORT_GROUP": "PROFILE_FIELD_SORT_GROUP",
    "PROFILE_FIELD_UPDATE_FIELD": "PROFILE_FIELD_UPDATE_FIELD",
    "PROFILE_FIELD_UPDATE_GROUP": "PROFILE_FIELD_UPDATE_GROUP",
    "USERS": "USERS",
    "USERS_ERROR": "USERS_ERROR",
    "USERS_LOADING": "USERS_LOADING",
    "USERS_REMOVE_ERROR": 'USERS_REMOVE_ERROR'
})

export const saveGroup = (_id, name) => _saveGroup(_id, name)
export const listGroup = () => _listGroup()
export const sortGroup = (_id, oldIndex, newIndex) => _sortGroup(_id, oldIndex, newIndex)
export const saveInputField = (_id, groupid, type, name, namespace, require, modify, check, fill, regex, warning, unique, remark) => _saveInputField(_id, groupid, type, name, namespace, require, modify, check, fill, regex, warning, unique, remark)
export const saveSelectField = (_id, groupid, type, name, namespace, require, modify, check, fill, remark, options) => _saveSelectField(_id, groupid, type, name, namespace, require, modify, check, fill, remark, options)
export const saveFileField = (_id, groupid, type, name, namespace, require, modify, check, fill, filetype, size, maximum, remark) => _saveFileField(_id, groupid, type, name, namespace, require, modify, check, fill, filetype, size, maximum, remark)
export const saveDateField = (_id, groupid, type, name, namespace, require, modify, check, fill, remark) => _saveDateField(_id, groupid, type, name, namespace, require, modify, check, fill, remark)
export const saveDepartmentField = (_id, groupid, type, name, namespace, require, modify, check, fill, remark, multiple, treeCheckStrictly) => _saveDepartmentField(_id, groupid, type, name, namespace, require, modify, check, fill, remark, multiple, treeCheckStrictly)
export const saveMemberField = (_id, groupid, type, name, namespace, require, modify, check, fill, remark, multiple) => _saveMemberField(_id, groupid, type, name, namespace, require, modify, check, fill, remark, multiple)
export const sortField = (_id, oldIndex, newIndex) => _sortField(_id, oldIndex, newIndex)
export const removeGroup = (_id) => _removeGroup(_id)
export const removeField = (_id) => _removeField(_id)
export const getDepartment = () => _getDepartment()

export const setErrorGetDepartment = (message) => ({
    message,
    "type": ACTIONS.DEPARTMENT_REMOVE_ERROR
})

export const getUsers = () => _getUsers()

export const setErrorGetUsers = (message) => ({
    message,
    "type": ACTIONS.USERS_REMOVE_ERROR
})

