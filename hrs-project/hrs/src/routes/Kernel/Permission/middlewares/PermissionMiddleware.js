import {request} from 'util/Common'
const LIST = 'organization/permission/list'
const UPDATEGROUP = 'organization/user/update_group'
const UPDATEPERMISSION = 'organization/user/update_permission'
export const list = () => async (dispatch, getState) => {
    dispatch({type : "PERMISSION_LIST_LOADING"})
    let data = await request(LIST, {}, dispatch)
    
    if(data)
    {
        if (!data.status.code)
        {
            return dispatch({type : "PERMISSION_LIST", data : data.data})
        }
    }
}
export const updateGroup = (_id, group) => async (dispatch, getState) => {
    const param = {
        group,
        _id
    }
    dispatch({type : 'PERMISSION_LIST_LOADING'})
    let data = await request(UPDATEGROUP, param, dispatch)
    
    if(data)
    {
        if (!data.status.code)
        {
            return dispatch({type : "PERMISSION_UPDATE_GROUP", _id : _id, group : group})
        }
    }
}
export const updatePermission = (_id, permission, group) => async (dispatch, getState) => {
    const param = {
        permission: JSON.stringify(permission),
        _id
    }
    dispatch({type : "PERMISSION_UPDATE_PERMISSION_LOADING"})
    const permissionParam = JSON.stringify(permission)
    let data = await request(UPDATEPERMISSION, param, dispatch)
    if(data)
    {
        if (!data.status.code)
        {
            return dispatch({type : "PERMISSION_UPDATE_PERMISSION", _id : _id, permission : permission, group: group})
            
        }
    }
}