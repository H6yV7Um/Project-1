import {request} from 'util/Common'
const LIST = 'organization/permission/list'
const ADD = 'organization/department/create'
const UPDATE = 'organization/department/update'

export const list = () => async (dispatch, getState) => {
    dispatch({type : "ORGANIZATION_LIST_LOADING"})
    let result = await request(LIST, {}, dispatch)
    if(result)
    {
        if (!result.status.code)
        {
            return dispatch({type : "ORGANIZATION_LIST", data : result.data})
        }
    }
}

export const add = (name, parentid, create_dept_group) => async (dispatch, getState)=>
{
    dispatch({type: 'ORGANIZATION_ADD_LOADING'})
    const data = {
      name, parentid, create_dept_group
    }
    let result = await request(ADD, data, dispatch)
    
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'ORGANIZATION_ADD',
                data: result.data
            })
        }
    }

}


export const update = (_id, name, parentid, manager) => async (dispatch, getState)=>
{
    dispatch({type: 'ORGANIZATION_UPDATE_LOADING'})
    const data = {
      _id, name, parentid, manager
    }
    let result = await request(UPDATE, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'ORGANIZATION_UPDATE',
                data: result.data
            })
        }
    }

}