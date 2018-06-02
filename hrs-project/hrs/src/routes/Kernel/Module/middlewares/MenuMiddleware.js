import {request} from 'util/Common'

const MENU_ADD = 'kernel/menu/add'
const MENU_DELETE = 'kernel/menu/delete'
const MENU_UPDATE = 'kernel/menu/update'

const MENU_ADD_SUB = 'kernel/menu/add_sub'
const MENU_DELETE_SUB = 'kernel/menu/delete_sub'
const MENU_UPDATE_SUB = 'kernel/menu/update_sub'

export const save = (id, name, icon, moduleid) => async (dispatch, getState) => 
{
    if(!name)
    {
        return dispatch({type : "MODULE_SAVE_ERROR", message : "菜单名称不能为空。"})
    }
    if(!icon)
    {
        return dispatch({type : "MODULE_SAVE_ERROR", message : "菜单图标不能为空。"})
    }
    
    if(id)
    {
        dispatch({type : "MODULE_SAVE_MENU_LOADING"})
        const params = {
            mid:id,
            name,
            icon
        }
        let data = await request(MENU_UPDATE, params, dispatch)
        
        if(data)
        {
            if(data.status.code === 0)
            {
                return dispatch(
                {
                    type : "MODULE_SAVE_MENU",
                    id : id,
                    name : name,
                    icon : icon,
                    moduleid : moduleid
                })
            }
        }
    }
    else
    {
        dispatch({type : "MODULE_SAVE_NEW_MENU_LOADING"})
        const params = {
            moduleid,
            name,
            icon
        }
        let data = await request(MENU_ADD, params, dispatch)
        
        if(data)
        {
            if(data.status.code === 0)
            {
                return dispatch(
                {
                    type : "MODULE_SAVE_MENU",
                    id : data.data.$oid,
                    name : name,
                    icon : icon,
                    moduleid : moduleid
                })
            }
        }
    }
}

export const saveChild = (id, parentid, name, url, icon, moduleid, permission) =>  async (dispatch, getState) => {
    if(!name)
    {
        return dispatch({type : "MODULE_SAVE_ERROR", message : "菜单名称不能为空。"})
    }
    if(!url)
    {
        return dispatch({type : "MODULE_SAVE_ERROR", message : "URL不能为空。"})
    }
    
    if(id)
    {
        dispatch({type : "MODULE_SAVE_CHILD_LOADING"})
        const params = {
            sid: id,
            name,
            icon,
            url,
            permission
        }
        let data = await request(MENU_UPDATE_SUB, params, dispatch)
        if(data)
        {
            if(data.status.code === 0)
            {
                return dispatch(
                {
                    type : "MODULE_SAVE_CHILD_MENU",
                    id : id,
                    name : name,
                    icon : icon,
                    url : url,
                    parentid : parentid,
                    moduleid : moduleid,
                    permission : permission
                })
            }
        }
    }
    else
    {
        dispatch({type : "MODULE_SAVE_NEW_CHILD_LOADING"})
        const params =
        {
            parentid,
            name,
            icon,
            url,
            permission
        }
        let data = await request(MENU_ADD_SUB, params, dispatch)
        if(data)
        {
            if(data.status.code === 0)
            {
                return dispatch(
                {
                    type : "MODULE_SAVE_CHILD_MENU",
                    id : data.data.$oid,
                    name : name,
                    icon : icon,
                    url : url,
                    moduleid : moduleid,
                    parentid : parentid,
                    permission : permission
                })
            }
        }
    }
}