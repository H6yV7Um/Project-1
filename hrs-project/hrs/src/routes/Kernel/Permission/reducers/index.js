import {ACTIONS} from '../actions/PermissionAction'

const initialState =
    {
        "list_loading": false,
        "list_error": false,
        "update_group_loading": false,
        "update_group_error": false,
        "update_permission_loading": false,
        "update_permission_error": false,
        "data": {}
    }

/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ACTIONS.PERMISSION_LIST:
        return permissionGetList(state, action)
    case ACTIONS.PERMISSION_UPDATE_GROUP:
        return permissionUpdateGroup(state, action)
    case ACTIONS.PERMISSION_UPDATE_PERMISSION:
        return permissionUpdatePermission(state, action)
    case ACTIONS.PERMISSION_LIST_LOADING:
        return {
            ...state,
            "list_loading": true
        }
    case ACTIONS.PERMISSION_LIST_ERROR:
        return {
            ...state,
            "list_error": action.message
        }
    case ACTIONS.PERMISSION_UPDATE_GROUP_LOADING:
        return {
            ...state,
            "update_group_loading": true
        }
    case ACTIONS.PERMISSION_UPDATE_GROUP_ERROR:
        return {
            ...state,
            "update_group_error": action.message
        }
    case ACTIONS.PERMISSION_UPDATE_PERMISSION_LOADING:
        return {
            ...state,
            "update_permission_loading": true
        }
    case ACTIONS.PERMISSION_UPDATE_permission_ERROR:
        return {
            ...state,
            "update_permission_error": action.message
        }
    }

    return {...state}
}


const permissionGetList = (state, action) => {
    const data = {...action.data}
    return {
        ...state,
        data,
        "list_error": '',
        "list_loading": false
    }
}
const permissionUpdateGroup = (state, action) => {
    const data = {...state.data}
    for (let i = 0; i < data.organization.length; i++) {
        data.organization[i].children = _permissionUpdateSubGroup(data.organization[i].children, action, data.module)
        for (let userIndex = 0; userIndex < data.organization[i].members.length; userIndex++) {
            if (data.organization[i].members[userIndex]._id.$oid === action._id) {
                data.organization[i].members[userIndex].group = action.group
                data.organization[i].members[userIndex].permission = _permissionUpdatePermission(action._id, action.group, data.module)
                break
            }
        }
    }
    return {
        ...state,
        data,
        "update_group_loading": false,
        "update_group_error": ''
    }
}
const _permissionUpdateSubGroup = (sub, action, modules) => {
    for (let i = 0; i < sub.length; i++) {
        sub[i].children = _permissionUpdateSubGroup(sub[i].children, action, modules)
        for (let userIndex = 0; userIndex < sub[i].members.length; userIndex++) {
            if (sub[i].members[userIndex]._id.$oid === action._id) {
                sub[i].members[userIndex].group = action.group
                sub[i].members[userIndex].permission = _permissionUpdatePermission(action._id, action.group, modules)
            }
        }
    }
    return sub
}
const _permissionUpdatePermission = (_id, group, modules) => {
    const permission = []
    const permissionModules = []
    for (let i = 0; i < modules.length; i++) {
        if (group == "0" && modules[i].permission == "0") {
            permissionModules.push(modules[i])
        }
        if (group == "1" && (modules[i].permission == "0" || modules[i].permission == "1")) {
            permissionModules.push(modules[i])
        }
        if (group == "2") {
            permissionModules.push(modules[i])
        }
    }
    for (let i = 0; i < permissionModules.length; i++) {
        let permissionModule = {}

        switch (group) {
        case "0":
            if (permissionModules[i].permission == '0') {
                permissionModule = {
                    "menus": [],
                    "moduleid": permissionModules[i]._id
                }
            }
            break
        case "1":
            if (permissionModules[i].permission == '0' || permissionModules[i].permission == '1') {
                permissionModule = {
                    "menus": [],
                    "moduleid": permissionModules[i]._id
                }
            }
            break
        case "2":
            permissionModule = {
                "menus": [],
                "moduleid": permissionModules[i]._id
            }
            break
        }
        for (let u = 0; u < permissionModules[i].menus.length; u++) {
            for (let p = 0; p < permissionModules[i].menus[u].sub.length; p++) {
                switch (group) {
                case "0":
                    if (permissionModules[i].menus[u].sub[p].permission == '0') {
                        permissionModule.menus.push(
                            {
                                "menuid": permissionModules[i].menus[u].sub[p]._id,
                                "permission": "0"
                            })
                    }
                    break
                case "1":
                    if (permissionModules[i].menus[u].sub[p].permission == '0' || permissionModules[i].menus[u].sub[p].permission == '1') {
                        permissionModule.menus.push(
                            {
                                "menuid": permissionModules[i].menus[u].sub[p]._id,
                                "permission": "1"
                            })
                    }
                    break
                case "2":
                    permissionModule.menus.push(
                        {
                            "menuid": permissionModules[i].menus[u].sub[p]._id,
                            "permission": "1"
                        })
                    break
                }
            }
        }
        permission.push(permissionModule)
    }
    return permission
}
const permissionUpdatePermission = (state, action) => {
    const data = {...state.data}
    for (let i = 0; i < data.organization.length; i++) {
        data.organization[i].children = _permissionUpdateSubGroup(data.organization[i].children, action, data.module)
        for (let userIndex = 0; userIndex < data.organization[i].members.length; userIndex++) {
            if (data.organization[i].members[userIndex]._id.$oid === action._id) {
                data.organization[i].members[userIndex].permission = action.permission
                break
            }
        }
    }
    return {
        ...state,
        data,
        "update_permission_loading": false,
        "update_permission_error": ''
    }
}
export default reducer