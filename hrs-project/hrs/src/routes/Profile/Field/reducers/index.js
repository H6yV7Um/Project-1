import {ACTIONS} from '../actions/FieldAction'
const initialState = {
    "addFieldError": "",
    "addFieldLoading": false,
    "addGroupError": "",
    "addGroupLoading": false,
    "removeFieldError": "",
    "removeFieldLoading": false,
    "removeGroupError": "",
    "removeGroupLoading": false,
    "fields": [
    ],
    "error": "",
    "loading": false,


    "getDepartmentError": '',
    "getDepartmentLoading": false,
    "departments": [],

    "getUsersError": '',
    "getUsersLoading": false,
    'users': []
}

/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ACTIONS.PROFILE_FIELD_ERROR:
        return {
            ...state,
            "error": action.message,
            "loading": false
        }

    case ACTIONS.PROFILE_FIELD_LOADING:
        return {
            ...state,
            "error": "",
            "loading": true
        }
    case ACTIONS.PROFILE_FIELD_ADD_GROUP_LOADING:
        return {
            ...state,
            "addGroupError": "",
            "addGroupLoading": true
        }

    case ACTIONS.PROFILE_FIELD_LIST_GROUP:
        let data = []

        if (action.data) {
            data = action.data
        }

        return {
            ...state,
            "fields": data,
            "error": "",
            "loading": false
        }

    case ACTIONS.PROFILE_FIELD_ADD_GROUP_ERROR:
        return {
            ...state,
            "addGroupError": action.message,
            "addGroupLoading": false
        }

    case ACTIONS.PROFILE_FIELD_ADD_GROUP:
        return addGroup(state, action)
    case ACTIONS.PROFILE_FIELD_UPDATE_GROUP:
        return updateGroup(state, action)
    case ACTIONS.PROFILE_FIELD_ADD_FIELD_ERROR:
        return {
            ...state,
            "addFieldError": action.message,
            "addFieldLoading": false
        }
    case ACTIONS.PROFILE_FIELD_ADD_FIELD_LOADING:
        return {
            ...state,
            "addFieldError": "",
            "addFieldLoading": true
        }
    case ACTIONS.PROFILE_FIELD_ADD_FIELD:
        return addField(state, action)

    case ACTIONS.PROFILE_FIELD_UPDATE_FIELD:
        return updateField(state, action)

    case ACTIONS.PROFILE_FIELD_REMOVE_GROUP_ERROR:
        return {
            ...state,
            "removeGroupError": action.message,
            "removeGroupLoading": false
        }
    case ACTIONS.PROFILE_FIELD_REMOVE_GROUP_LOADING:
        return {
            ...state,
            "removeGroupError": "",
            "removeGroupLoading": true
        }
    case ACTIONS.PROFILE_FIELD_REMOVE_FIELD_ERROR:
        return {
            ...state,
            "removeFieldError": action.message,
            "removeFieldLoading": false
        }
    case ACTIONS.PROFILE_FIELD_REMOVE_FIELD_LOADING:
        return {
            ...state,
            "removeFieldError": "",
            "removeFieldLoading": true
        }
    case ACTIONS.PROFILE_FIELD_REMOVE_GROUP:
        return removeGroup(state, action)
    case ACTIONS.PROFILE_FIELD_REMOVE_FIELD:
        return removeField(state, action)
    case ACTIONS.DEPARTMENT_LOADING:
        return {
            ...state,
            "getDepartmentLoading": true
        }
    case ACTIONS.DEPARTMENT_ERROR:
        return {
            ...state,
            "getDepartmentError": action.message,
            "getDepartmentLoading": false
        }
    case ACTIONS.DEPARTMENT:
        return {
            ...state,
            "getDepartmentError": '',
            "getDepartmentLoading": false,
            "departments": action.departmentData

        }
    case ACTIONS.DEPARTMENT_REMOVE_ERROR:
        return {
            ...state,
            "getDepartmentError": action.message,
            "getDepartmentLoading": false
        }

    /** ************************************************/
    case ACTIONS.USERS_LOADING:
        return {
            ...state,
            "getUsersLoading": true
        }
    case ACTIONS.USERS_ERROR:
        return {
            ...state,
            "getUsersError": action.message,
            "getUsersLoading": false
        }
    case ACTIONS.USERS:
        return {
            ...state,
            "getUsersError": '',
            "getUsersLoading": false,
            'users': action.usersData.users
        }
    case ACTIONS.USERS_REMOVE_ERROR:
        return {
            ...state,
            "getUsersError": action.message,
            "getUsersLoading": false
        }
    default:
        return {...state}
    }
}
const addField = (state, action) => {
    const fields = state.fields

    for (let i = 0; i < fields.length; i++) {
        if (fields[i]._id.$oid == action.groupid.$oid) {
            switch (action._type) {
            case "input":
                fields[i].fields.push({
                    "_id": action._id,
                    "groupid": action.groupid,
                    "type": action._type,
                    "name": action.name,
                    "namespace": action.namespace,
                    "require": action.require,
                    "modify": action.modify,
                    "check": action.check,
                    "fill": action.fill,
                    "regex": action.regex,
                    "warning": action.warning,
                    "unique": action.unique,
                    "remark": action.remark
                })
                break
            case "select":
                fields[i].fields.push({
                    "_id": action._id,
                    "groupid": action.groupid,
                    "type": action._type,
                    "name": action.name,
                    "namespace": action.namespace,
                    "require": action.require,
                    "modify": action.modify,
                    "check": action.check,
                    "fill": action.fill,
                    "remark": action.remark,
                    "options": action.options
                })
                break
            case "file":
                fields[i].fields.push({
                    "_id": action._id,
                    "groupid": action.groupid,
                    "type": action._type,
                    "name": action.name,
                    "namespace": action.namespace,
                    "require": action.require,
                    "modify": action.modify,
                    "check": action.check,
                    "fill": action.fill,
                    "filetype": action.filetype,
                    "size": action.size,
                    "maximum": action.maximum,
                    "remark": action.remark
                })
                break
            case "date":
                fields[i].fields.push({
                    "_id": action._id,
                    "groupid": action.groupid,
                    "type": action._type,
                    "name": action.name,
                    "namespace": action.namespace,
                    "require": action.require,
                    "modify": action.modify,
                    "check": action.check,
                    "fill": action.fill,
                    "remark": action.remark
                })
                break
            case "department":
                fields[i].fields.push({
                    "_id": action._id,
                    "groupid": action.groupid,
                    "type": action._type,
                    "name": action.name,
                    "namespace": action.namespace,
                    "require": action.require,
                    "modify": action.modify,
                    "check": action.check,
                    "fill": action.fill,
                    "remark": action.remark,
                    "multiple": action.multiple,
                    "treeCheckStrictly": action.treeCheckStrictly
                })
                break
            case "member":
                fields[i].fields.push({
                    "_id": action._id,
                    "groupid": action.groupid,
                    "type": action._type,
                    "name": action.name,
                    "namespace": action.namespace,
                    "require": action.require,
                    "modify": action.modify,
                    "check": action.check,
                    "fill": action.fill,
                    "remark": action.remark,
                    "multiple": action.multiple
                })
                break
            }
            break
        }
    }

    return {
        ...state,
        "addFieldError": "",
        "addFieldLoading": false,
        fields
    }
}
const updateField = (state, action) => {
    const fields = state.fields

    for (let i = 0; i < fields.length; i++) {
        if (fields[i]._id.$oid == action.groupid.$oid) {
            for (let u = 0; u < fields[i].fields.length; u++) {
                if (fields[i].fields[u]._id.$oid == action._id.$oid) {
                    switch (action._type) {
                    case "input":
                        fields[i].fields[u] = {
                            "_id": action._id,
                            "groupid": action.groupid,
                            "type": action._type,
                            "name": action.name,
                            "namespace": action.namespace,
                            "require": action.require,
                            "modify": action.modify,
                            "check": action.check,
                            "fill": action.fill,
                            "regex": action.regex,
                            "warning": action.warning,
                            "unique": action.unique,
                            "remark": action.remark
                        }
                        break
                    case "select":
                        fields[i].fields[u] = {
                            "_id": action._id,
                            "groupid": action.groupid,
                            "type": action._type,
                            "name": action.name,
                            "namespace": action.namespace,
                            "require": action.require,
                            "modify": action.modify,
                            "check": action.check,
                            "fill": action.fill,
                            "remark": action.remark,
                            "options": action.options
                        }
                        break
                    case "file":
                        fields[i].fields[u] = {
                            "_id": action._id,
                            "groupid": action.groupid,
                            "type": action._type,
                            "name": action.name,
                            "namespace": action.namespace,
                            "require": action.require,
                            "modify": action.modify,
                            "check": action.check,
                            "fill": action.fill,
                            "filetype": action.filetype,
                            "size": action.size,
                            "maximum": action.maximum,
                            "remark": action.remark
                        }
                        break
                    case "date":
                        fields[i].fields[u] = {
                            "_id": action._id,
                            "groupid": action.groupid,
                            "type": action._type,
                            "name": action.name,
                            "namespace": action.namespace,
                            "require": action.require,
                            "modify": action.modify,
                            "check": action.check,
                            "fill": action.fill,
                            "remark": action.remark
                        }
                        break
                    case "department":
                        fields[i].fields[u] = {
                            "_id": action._id,
                            "groupid": action.groupid,
                            "type": action._type,
                            "name": action.name,
                            "namespace": action.namespace,
                            "require": action.require,
                            "modify": action.modify,
                            "check": action.check,
                            "fill": action.fill,
                            "remark": action.remark,
                            "multiple": action.multiple,
                            "treeCheckStrictly": action.treeCheckStrictly
                        }
                        break
                    case "member":
                        fields[i].fields[u] = {
                            "_id": action._id,
                            "groupid": action.groupid,
                            "type": action._type,
                            "name": action.name,
                            "namespace": action.namespace,
                            "require": action.require,
                            "modify": action.modify,
                            "check": action.check,
                            "fill": action.fill,
                            "remark": action.remark,
                            "multiple": action.multiple
                        }
                        break
                    }
                    break
                }
            }
            break
        }
    }

    return {
        ...state,
        "addFieldError": "",
        "addFieldLoading": false,
        fields
    }
}
const addGroup = (state, action) => {
    const data = state.fields

    data.push(action.model)

    return {
        ...state,
        "addGroupError": "",
        "addGroupLoading": false,
        "fields": data
    }
}
const updateGroup = (state, action) => {
    const data = state.fields

    for (let i = 0; i < data.length; i++) {
        if (data[i]._id.$oid == action._id.$oid) {
            data[i].name = action.name
        }
    }

    return {
        ...state,
        "addGroupError": "",
        "addGroupLoading": false,
        "fields": data
    }
}
const removeGroup = (state, action) => {
    const data = state.fields

    for (let i = 0; i < data.length; i++) {
        if (data[i]._id.$oid == action._id.$oid) {
            data.splice(i, 1)
            break
        }
    }

    return {
        ...state,
        "removeGroupError": "",
        "removeGroupLoading": false,
        "fields": data
    }
}
const removeField = (state, action) => {
    const data = state.fields

    for (let i = 0; i < data.length; i++) {
        for (let u = 0; u < data[i].fields.length; u++) {
            if (data[i].fields[u]._id.$oid == action._id.$oid) {
                data[i].fields.splice(u, 1)
                break
            }
        }
    }

    return {
        ...state,
        "removeFieldError": "",
        "removeFieldLoading": false,
        "fields": data
    }
}

export default reducer