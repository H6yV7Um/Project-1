import {request} from 'util/Common'
const WORKFLOW_FIND_OWN_COPYTO_WORKFLOW = "workflow/find_own_copyto_workflow"
const WORKFLOW_COPYTO_COMMENT= "workflow/comment"
const WORKFLOW_COPYTO_WORKFLOW_AUDIT = "workflow/audit"
export const getOwnCopytoWorkflow  = (p) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_COPYTO_GET_OWN_COPYTO_WORKFLOW_LOADING'})
    const data = {
        p:p
    }
    let result = await request(WORKFLOW_FIND_OWN_COPYTO_WORKFLOW, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'WORKFLOW_COPYTO_GET_OWN_COPYTO_WORKFLOW',
               	dataSource: result.data.list,
                count: result.data.count,
                current: p
            })
        }
    }
}
export const onOk = (id,values,length) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_COPYTO_ONOK_LOADING'})
    const data = {
        _id:id,picture:JSON.stringify(values.picture),attachment:JSON.stringify(values.attachment),content:values.content
    }
    let result = await request(WORKFLOW_COPYTO_COMMENT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_COPYTO_ONOK',
                operation_log: result.data.operation_log,
                length: length
            })
            return 1
        }
    }
}
export const pass = (_id,status,content) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_COPYTO_PASS_LOADING'})
    const data = {
        _id: _id,status:status,content: content
    }
    let result = await request(WORKFLOW_COPYTO_WORKFLOW_AUDIT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_COPYTO_PASS',
            })
            return 1
        }
    }
}
export const reject = (_id,status,content) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_COPYTO_REJECT_LOADING'})
    const data = {
        _id: _id,status:status,content: content
    }
    let result = await request(WORKFLOW_COPYTO_WORKFLOW_AUDIT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_COPYTO_REJECT',
            })
            return 1
        }
    }
}

