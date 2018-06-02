import {request} from 'util/Common'
const WORKFLOW_PENDING_WORKFLOW = "workflow/find_own_pending_workflow"
const WORKFLOW_PENDING_WORKFLOW_AUDIT = "workflow/audit"
const WORKFLOW_PENDING_COMMENT= "workflow/comment"
export const getPendingWorkflow = (p) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_PENDING_GET_PENDING_WORKFLOW_LOADING'})
	const data = {
        p:p
    }
    let result = await request(WORKFLOW_PENDING_WORKFLOW, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_PENDING_GET_PENDING_WORKFLOW',
                solution : result.data.list,
                count: result.data.count,
                current: p
            })
        }
    }
}

export const pass = (_id,status,content) => async (dispatch, getState) => 
{

    dispatch({type: 'WORKFLOW_PENDING_PASS_LOADING'})
    const data = {
        _id: _id,status:status,content: content
    }
    let result = await request(WORKFLOW_PENDING_WORKFLOW_AUDIT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_PENDING_PASS',
                
            })
            return 1
        }
    }
}

export const reject = (_id,status,content) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_PENDING_REJECT_LOADING'})
    const data = {
        _id: _id,status:status,content: content
    }
    let result = await request(WORKFLOW_PENDING_WORKFLOW_AUDIT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_PENDING_REJECT',
            })
            return 1
        }
    }
}

export const onOk = (id,values,length) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_PENDING_ONOK_LOADING'})
    const data = {
        _id:id,picture:JSON.stringify(values.picture),attachment:JSON.stringify(values.attachment),content:values.content
    }
    let result = await request(WORKFLOW_PENDING_COMMENT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_PENDING_ONOK',
                operation_log: result.data.operation_log,
                length: length
            })
            return 1
        }
    }
}





