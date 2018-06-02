import {request} from 'util/Common'
const WORKFLOW_FIND_OWN_WORKFLOW = "workflow/find_own_workflow"
const WORKFLOW_CANCEL = "workflow/cancel"
const WORKFLOW_HISTORY_COMMENT= "workflow/comment"
const WORKFLOW_HISTORY_WORKFLOW_AUDIT = "workflow/audit"
export const getOwnWorkflow  = (status,p) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_HISTORY_GET_OWN_WORKFLOW_LOADING'})
    const data = {
        status:status,p:p
    }
    let result = await request(WORKFLOW_FIND_OWN_WORKFLOW, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'WORKFLOW_HISTORY_GET_OWN_WORKFLOW',
               	dataSource: result.data.list,
               	status: status,
                count: result.data.count,
                current: p
            })
        }
    }
}

export const withdraw  = (key) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_HISTORY_WITHDRAW_LOADING'})
    const data = {
        _id: key
    }
    let result = await request(WORKFLOW_CANCEL, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'WORKFLOW_HISTORY_WITHDRAW',
                key: key
            })
            return 1
        }
    }
}

export const onOk = (id,values,length) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_HISTORY_ONOK_LOADING'})
    const data = {
        _id:id,picture:JSON.stringify(values.picture),attachment:JSON.stringify(values.attachment),content:values.content
    }
    let result = await request(WORKFLOW_HISTORY_COMMENT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_HISTORY_ONOK',
                operation_log: result.data.operation_log,
                length: length
            })
            return 1
        }
    }
}

export const pass = (_id,status,content) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_HISTORY_PASS_LOADING'})
    const data = {
        _id: _id,status:status,content: content
    }
    let result = await request(WORKFLOW_HISTORY_WORKFLOW_AUDIT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_HISTORY_PASS',
            })
            return 1
        }
    }
}

export const reject = (_id,status,content) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_HISTORY_REJECT_LOADING'})
    const data = {
        _id: _id,status:status,content: content
    }
    let result = await request(WORKFLOW_HISTORY_WORKFLOW_AUDIT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_HISTORY_REJECT',
            })
            return 1
        }
    }
}

