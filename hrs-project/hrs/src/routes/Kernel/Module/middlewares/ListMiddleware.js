import {request} from 'util/Common'

const MODULE_LIST = 'kernel/module/list'
const MODULE_ADD = 'kernel/module/add'
const MODULE_DELETE = 'kernel/module/delete'
const MODULE_UPDATE = 'kernel/module/update'

export const list = () => async (dispatch, getState) => 
{
    dispatch({type : "MODULE_LIST_LOADING"})
    
    let result = await request(MODULE_LIST, {}, dispatch)
    
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'MODULE_LIST',
                data : result.data
            })
        }
    }
}
export const save = (key, name, namespace, version, permission) => async(dispatch, getState)=>{
    if(!name)
    {
        dispatch({type : 'MODULE_SAVE_ERROR', message : "模块名称不能为空。"})
        return false
    }
    if(!namespace)
    {
        dispatch({type : 'MODULE_SAVE_ERROR', message : "模块命名空间不能为空。"})
        return false
    }
    let regex = /[\w]{1,50}/
    if(!regex.test(namespace))
    {
        dispatch({type : 'MODULE_SAVE_ERROR', message : "模块命名空间格式错误。"})
        return false
    }
    
    if(key)
    {
        dispatch({type : 'MODULE_SAVE_LOADING'})
        const params = {
            mid:key,
            name,
            namespace,
            version,
            permission
        }
        let data = await request(MODULE_UPDATE, params, dispatch)
        if(data)
        {
            if(data.status.code === 0)
            {
                dispatch(
                {
                    type : 'MODULE_SAVE',
                    key : key,
                    name : name,
                    namespace : namespace,
                    version : version,
                    permission : permission
                })
            }
        }
    }
    else
    {
        dispatch(
        {
            type : 'MODULE_SAVE_NEW_LOADING'
        })
        const params = {
            name,
            namespace,
            version,
            permission
        }
        let data = await request(MODULE_ADD, params, dispatch)
        
        if(data)
        {
            if(data.status.code === 0)
            {
                dispatch(
                {
                    type : 'MODULE_SAVE_NEW',
                    key : data.data.$oid,
                    name : name,
                    namespace : namespace,
                    version : version,
                    permission : permission
                })
            }
        }
    }

}