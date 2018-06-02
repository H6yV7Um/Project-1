import {request} from 'util/Common'
const ATTENDANCE_CALENDAR_ADD = "attendance/calendar/add"
const ATTENDANCE_CALENDAR_UPDATE = "attendance/calendar/update"
const ATTENDANCE_CALENDAR_REMOVE = "attendance/calendar/remove"
const ATTENDANCE_CALENDAR_LIST = "attendance/calendar/list"

export const getList = (start_time, end_time) => async (dispatch, getState) =>
{
    dispatch({type: 'ATTENDANCE_CALENDAR_LOADING'})
    let result = await request(ATTENDANCE_CALENDAR_LIST, {start_time, end_time}, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'ATTENDANCE_CALENDAR',
                data : result.data
            })
        }
    }
}
export const save = (_id, date, vacation, title, remark, attendance_time, closing_time) => async (dispatch, getState)=>
{
    dispatch({type: 'ATTENDANCE_CALENDAR_SAVE_LOADING'})
    if(_id)
    {
        _id = _id.$oid
    }
    const data = {
      _id, date, vacation: Number(vacation), title, remark, attendance_time, closing_time
    }
    const URL = _id ? ATTENDANCE_CALENDAR_UPDATE: ATTENDANCE_CALENDAR_ADD
    let result = await request(URL, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'ATTENDANCE_CALENDAR_SAVE',
                data: result.data
            })
        }
    }
}
export const remove = (_id) => async (dispatch, getState) =>
{
    dispatch({type: 'ATTENDANCE_CALENDAR_REMOVE_LOADING'})
    const data = {
        _id: _id
    }
    let result = await request(ATTENDANCE_CALENDAR_REMOVE, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch({type:"ATTENDANCE_CALENDAR_REMOVE", _id:_id})
        }
    }
}


