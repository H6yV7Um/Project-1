import {request} from 'util/Common'
const WORKFLOW_SOLUTION = "workflow/solution/list"
const WORKFLOW_START_ADD = "workflow/add"
export const getSolution = () => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_START_SOLUTION_LOADING'})
    let result = await request(WORKFLOW_SOLUTION, {}, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_START_SOLUTION',
                solution : result.data
            })
        }
    }
}

export const complete = (solution_id,fields) => async (dispatch, getState) => 
{
    dispatch({type: 'WORKFLOW_STRAT_COMPLETE_LOADING'})
    const data = {
        solution_id:solution_id,fields:JSON.stringify(fields)
    }
    let result = await request(WORKFLOW_START_ADD, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'WORKFLOW_STRAT_COMPLETE',
                solution : result.data
            })
            return 1
        }
    }
}
