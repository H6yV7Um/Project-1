import {request} from 'util/Common'
const LIST = 'organization/permission/list'
export const list = () => async (dispatch, getState) => {
    dispatch({type : "ATTENDANCE_MYWORKMATE_LISTLOADING"})
    let data = await request(LIST, {}, dispatch)
    if(data)
    {
        if (!data.status.code)
        {
            return dispatch({type : "ATTENDANCE_MYWORKMATE_LIST", data : data.data})
        }
    }
}
