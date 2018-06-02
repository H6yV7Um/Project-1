import {request} from 'util/Common'
const REMUNERATION_ADD_FUND = "remuneration/fund/add"
const REMUNERATION_UPDATE_FUND = "remuneration/fund/update"
const REMUNERATION_REMOVE_FUND = "remuneration/fund/remove"
const REMUNERATION_LIST_FUND = "remuneration/fund/list"

export const getList = () => async (dispatch, getState) => 
{
    dispatch({type: 'REMUNERATION_FUND_LOADING'})
    let result = await request(REMUNERATION_LIST_FUND, {}, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'REMUNERATION_FUND',
                data : result.data
            })
        }
    }
}
export const save = (_id, name, company_rate, personal_rate, lower, higher) => async (dispatch, getState)=>
{
    dispatch({type: 'REMUNERATION_FUND_SAVE_LOADING'})
    if(_id)
    {
        _id = _id.$oid
    }
    const data = {
      _id, name, company_rate, personal_rate, lower, higher
    }
    const URL = _id ? REMUNERATION_UPDATE_FUND:REMUNERATION_ADD_FUND
    let result = await request(URL, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'REMUNERATION_FUND_SAVE',
                data: result.data
            })
        }
    }

}
export const remove = (_id) => async (dispatch, getState) => 
{
    dispatch({type: 'REMUNERATION_FUND_REMOVE_LOADING'})
    const data = {
        _id: _id
    }
    let result = await request(REMUNERATION_REMOVE_FUND, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {   
            dispatch({type:"REMUNERATION_FUND_REMOVE", _id:_id})
        }
    }
}

















