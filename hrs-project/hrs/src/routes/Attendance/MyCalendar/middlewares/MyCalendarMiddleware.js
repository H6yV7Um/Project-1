import {request} from 'util/Common'

const ATTENDANCE_MYCALENDAR_LIST = "attendance/calendar/list"

export const getList = (start_time, end_time) => async (dispatch, getState) =>
{
    dispatch({type: 'ATTENDANCE_MYCALENDAR_LOADING'})
    let result = await request(ATTENDANCE_MYCALENDAR_LIST, {start_time, end_time}, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'ATTENDANCE_MYCALENDAR',
                data : result.data
            })
        }
    }
}

