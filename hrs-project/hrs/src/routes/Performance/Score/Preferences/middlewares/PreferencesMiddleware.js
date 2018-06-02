import {SERVER, HTTP_HEADER} from 'config'
import {formatBody} from 'util/Common'
const PERFORMANCE_PREFERENCES_ADD = "performance/preferences/add"
const PERFORMANCE_PREFERENCES_UPDATE = "performance/preferences/update"
const ORGANIZATION_LIST = "organization/department/list_tree"
const SERVER_PERFORMANCE = "performance/preferences/list"
const REMOVE_LIST = "performance/preferences/remove"

export const getList = () => async (dispatch, getState) => 
{
    dispatch({type: 'PERFORMANCE_GETLIST_LOADING'})
    let result
    try
    {
        const response = await fetch(SERVER + ORGANIZATION_LIST, HTTP_HEADER)
        result = await response.json()
    }
    catch(e)
    {
        dispatch({type : "PERFORMANCE_GETLIST_ERROR", message : "网络状态异常，请检查您的网络连接。"})
    }
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'PERFORMANCE_GETLIST',
                data : result.data
            })
        }
        else
        {
            if(result.status.code == -1)
            {
                dispatch(
                {
                    type : 'ACCESS_DENIED'
                })
            }
            dispatch({type : 'PERFORMANCE_GETLIST_ERROR', message : "网络状态异常，请检查您的网络连接。"})
        }
    }
}
export const getPerformanceList = () => async (dispatch, getState) => 
{
    dispatch({type: 'PERFORMANCE_GETPERFORMANCELIST_LOADING'})
    let result
    try
    {
        const response = await fetch(SERVER + SERVER_PERFORMANCE, HTTP_HEADER)
        result = await response.json()
    }
    catch(e)
    {
        dispatch({type : "PERFORMANCE_GETPERFORMANCELIST_ERROR", message : "网络状态异常，请检查您的网络连接。"})
    }
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'PERFORMANCE_GETPERFORMANCELIST',
                data : result.data

            })
        }
        else
        {
            if(result.status.code == -1)
            {
                dispatch(
                {
                    type: 'ACCESS_DENIED'
                })
            }
            dispatch({type: 'PERFORMANCE_GETPERFORMANCELIST_ERROR', message: "网络状态异常，请检查您的网络连接。"})
        }
    }
}
export const save = (_id, title, remark, cycle, start, end, avoid, objects, options, performanceType) => async (dispatch, getState)=>
{
    dispatch({type: 'PERFORMANCE_SAVE_LOADING'})
    if(_id)
    {
        _id = _id.$oid
    }
    const data = {
        _id, title, remark, cycle, start, end, avoid, objects: JSON.stringify(objects), options: JSON.stringify(options), performanceType: JSON.stringify(performanceType)
    }
    let result
    try
    {
        const URL = _id ? SERVER + PERFORMANCE_PREFERENCES_UPDATE:SERVER + PERFORMANCE_PREFERENCES_ADD
        const response = await fetch(URL, {
            ...HTTP_HEADER,
            "body": formatBody(data)
        })
        result = await response.json()
    }
    catch(e)
    {
        dispatch({type : "PERFORMANCE_SAVE_ERROR", message : "网络状态异常，请检查您的网络连接。"})
    }

    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'PERFORMANCE_SAVE',
                
            })
        }
        else
        {
            if(result.status.code == -1)
            {
                dispatch(
                {
                    type: 'ACCESS_DENIED'
                })
            }
            dispatch({type: 'PERFORMANCE_SAVE_ERROR', message: "网络状态异常，请检查您的网络连接。"})
        }
    }

}
export const remove = (_id) => async (dispatch, getState) => 
{
    dispatch({type: 'PERFORMANCE_REMOVE_LOADING',_id:_id})
    const data = {
        _id: _id
    }
    let result
    try
    {   
        const response = await fetch(SERVER + REMOVE_LIST, {
            ...HTTP_HEADER,
            "body": formatBody(data)
        })
        result = await response.json()
    }
    catch(e)
    {
        dispatch({type : "PERFORMANCE_REMOVE_ERROR", message : "网络状态异常，请检查您的网络连接。"})
    }
    if(result)
    {
        if(result.status.code === 0)
        {   
            dispatch({type:"PERFORMANCE_REMOVE",_id:_id})
        }
        else
        {
            if(result.status.code == -1)
            {
                dispatch(
                {
                    type : 'ACCESS_DENIED'
                })
            }
            dispatch({type : 'PERFORMANCE_REMOVE_ERROR', message : "网络状态异常，请检查您的网络连接。"})
        }
    }
}

















