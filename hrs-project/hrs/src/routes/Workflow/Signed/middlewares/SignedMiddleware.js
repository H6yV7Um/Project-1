import {request} from 'util/Common'
const WORKFLOW_SIGNED_WORKFLOW = "workflow/find_own_done_workflow"
const WORKFLOW_SIGNED_COMMENT= "workflow/comment"
export const getFindOwnDoneWorkflow = (p) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_SIGNED_GET_FIND_OWN_DONE_WORKFLOW_LOADING'})
	const data = {
        p:p
    }
    let result = await request(WORKFLOW_SIGNED_WORKFLOW, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_SIGNED_GET_FIND_OWN_DONE_WORKFLOW',
                solution : result.data.list,
                count: result.data.count,
                current: p
            })
        }
    }
}

export const onOk = (id,values,length) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_SIGNED_ONOK_LOADING'})
    const data = {
        _id:id,picture:JSON.stringify(values.picture),attachment:JSON.stringify(values.attachment),content:values.content
    }
    let result = await request(WORKFLOW_SIGNED_COMMENT, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_SIGNED_ONOK',
                operation_log: result.data.operation_log,
                length: length
                
            })
            return 1
        }
    }
}