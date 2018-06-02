import {request} from 'util/Common'
const AUTH = 'organization/user/auth'

export const auth = (ticket) => async (dispatch, getState) => 
{
    dispatch({type : "AUTH_LOADING"})
    const data = {
      ticket
    }
    let result = await request(AUTH, data, dispatch)

    if(result)
    {
        if(result.status.code != 0)
        {
            dispatch({type: 'AUTH_ERROR', message: "授权失败。"})
        }
        else
        {
          dispatch({type: 'AUTH_SUCCESS'})
        }
    }
}