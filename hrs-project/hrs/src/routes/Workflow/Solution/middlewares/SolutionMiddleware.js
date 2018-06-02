import {request} from 'util/Common'
const WORKFLOW_SOLUTION = "workflow/solution/list"
const WORKFLOW_SOLUTION_COMPLETE = "workflow/solution/add"
const WORKFLOW_SOLUTION_REMOVE = "workflow/solution/remove"
const WORKFLOW_SOLUTION_UPDATE = "workflow/solution/update"
export const getSolution = () => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_SOLUTION_LOADING'})
    let result = await request(WORKFLOW_SOLUTION, {}, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_SOLUTION',
                solution : result.data
            })
        }
    }
}

export const complete = (name,copyto,remark,fields,flow) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_SOLUTION_COMPLETE_LOADING'})
    const data = {
        name:name,copyto:JSON.stringify(copyto),remark:remark,fields: JSON.stringify(fields),flow:JSON.stringify(flow)
    }
    let result = await request(WORKFLOW_SOLUTION_COMPLETE, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_SOLUTION_COMPLETE',
                solution : result.data
            })
            return 1
        }
    }
}

export const update = (_id,name,copyto,remark,fields,flow) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_SOLUTION_UPDATE_LOADING'})
    const data = {
        _id:_id,name:name,copyto:JSON.stringify(copyto),remark:remark,fields: JSON.stringify(fields),flow:JSON.stringify(flow)
    }
    let result = await request(WORKFLOW_SOLUTION_UPDATE, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_SOLUTION_UPDATE',
            })
            return 1
        }
    }
}

export const remove = (id) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_SOLUTION_REMOVE_LOADING'})
    const data = {
        _id:id
    }
    let result = await request(WORKFLOW_SOLUTION_REMOVE, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_SOLUTION_REMOVE',
                id: id
            })
            return 1
        }
    }
}




