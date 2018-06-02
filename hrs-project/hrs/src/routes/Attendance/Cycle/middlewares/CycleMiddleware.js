import {request} from 'util/Common'
const ATTENDANCE_CYCLE_ADD = "attendance/cycle/add"
const ATTENDANCE_CYCLE_UPDATE = "attendance/cycle/update"
const ATTENDANCE_CYCLE_REMOVE = "attendance/cycle/remove"
const ATTENDANCE_CYCLE_LIST = "attendance/cycle/list"

export const getList = () => async (dispatch, getState) => 
{
    dispatch({type: 'ATTENDANCE_CYCLE_LOADING'})
    let result = await request(ATTENDANCE_CYCLE_LIST, {}, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'ATTENDANCE_CYCLE',
                data : result.data
            })
        }
    }
}
export const save = (_id, start_time, end_time, lunch_start_time, lunch_end_time, overtime_start_time) => async (dispatch, getState)=>
{
    dispatch({type: 'ATTENDANCE_CYCLE_SAVE_LOADING'})
    if(_id)
    {
        _id = _id.$oid
    }
    const data = {
      _id, start_time, end_time, lunch_start_time, lunch_end_time, overtime_start_time
    }
    const URL = _id ? ATTENDANCE_CYCLE_UPDATE: ATTENDANCE_CYCLE_ADD
    let result = await request(URL, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'ATTENDANCE_CYCLE_SAVE',
                data: result.data
            })
        }
    }
}
export const remove = (_id) => async (dispatch, getState) => 
{
    dispatch({type: 'ATTENDANCE_CYCLE_REMOVE_LOADING'})
    const data = {
        _id: _id
    }
    let result = await request(ATTENDANCE_CYCLE_REMOVE, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch({type:"ATTENDANCE_CYCLE_REMOVE", _id:_id})
        }
    }
}

















