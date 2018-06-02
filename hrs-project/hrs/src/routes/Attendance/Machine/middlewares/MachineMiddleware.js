import {SERVER, HTTP_HEADER} from 'config'
import {formatBody} from 'util/Common'
const ATTENDANCE_ADD_MACHINE = "attendance/machine/add"
const ATTENDANCE_UPDATE_MACHINE = "attendance/machine/update"
const ATTENDANCE_REMOVE_MACHINE = "attendance/machine/remove"
const ATTENDANCE_LIST_MACHINE = "attendance/machine/list"

export const getList = () => async (dispatch, getState) => 
{
    dispatch({type: 'ATTENDANCE_MACHINE_LOADING'})
    let result
    try
    {
        const response = await fetch(SERVER + ATTENDANCE_LIST_MACHINE, HTTP_HEADER)
        result = await response.json()
    }
    catch(e)
    {
        dispatch({type : "ATTENDANCE_MACHINE_ERROR", message : "网络状态异常，请检查您的网络连接。"})
    }
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'ATTENDANCE_MACHINE',
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
            dispatch({type : 'ATTENDANCE_MACHINE_ERROR', message : "网络状态异常，请检查您的网络连接。"})
        }
    }
}
export const save = (_id, serial_number, ip_address, location) => async (dispatch, getState)=>
{
    dispatch({type: 'ATTENDANCE_MACHINE_SAVE_LOADING'})
    if(_id)
    {
        _id = _id.$oid
    }
    const data = {
      _id, serial_number, ip_address, location
    }
    let result
    try
    {
        const URL = _id ? SERVER + ATTENDANCE_UPDATE_MACHINE:SERVER + ATTENDANCE_ADD_MACHINE
        const response = await fetch(URL, {
            ...HTTP_HEADER,
            "body": formatBody(data)
        })
        result = await response.json()
    }
    catch(e)
    {
        dispatch({type : "ATTENDANCE_MACHINE_SAVE_ERROR", message : "网络状态异常，请检查您的网络连接。"})
    }

    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'ATTENDANCE_MACHINE_SAVE',
                data: result.data
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
            dispatch({type: 'ATTENDANCE_MACHINE_SAVE_ERROR', message: "网络状态异常，请检查您的网络连接。"})
        }
    }

}
export const remove = (_id) => async (dispatch, getState) => 
{
    dispatch({type: 'ATTENDANCE_MACHINE_REMOVE_LOADING'})
    const data = {
        _id: _id
    }
    let result
    try
    {   
        const response = await fetch(SERVER + ATTENDANCE_REMOVE_MACHINE, {
            ...HTTP_HEADER,
            "body": formatBody(data)
        })
        result = await response.json()
    }
    catch(e)
    {
        dispatch({type : "ATTENDANCE_MACHINE_REMOVE_ERROR", message : "网络状态异常，请检查您的网络连接。"})
    }
    if(result)
    {
        if(result.status.code === 0)
        {   
            dispatch({type:"ATTENDANCE_MACHINE_REMOVE", _id:_id})
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
            dispatch({type : 'ATTENDANCE_MACHINE_REMOVE_ERROR', message : "网络状态异常，请检查您的网络连接。"})
        }
    }
}

















