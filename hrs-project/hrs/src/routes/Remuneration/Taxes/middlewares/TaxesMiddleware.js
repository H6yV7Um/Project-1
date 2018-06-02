import {request} from 'util/Common'
const REMUNERATION_ADD_TAXES = "remuneration/taxes/add"
const REMUNERATION_UPDATE_TAXES = "remuneration/taxes/update"
const REMUNERATION_REMOVE_TAXES = "remuneration/taxes/remove"
const REMUNERATION_LIST_TAXES = "remuneration/taxes/list"

export const getList = () => async (dispatch, getState) => 
{
    dispatch({type: 'REMUNERATION_TAXES_LOADING'})
    let result = await request(REMUNERATION_LIST_TAXES, {}, dispatch)
    
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'REMUNERATION_TAXES',
                data : result.data
            })
        }
    }
}
export const save = (_id, name, threshold, levels) => async (dispatch, getState)=>
{
    dispatch({type: 'REMUNERATION_TAXES_SAVE_LOADING'})
    if(_id)
    {
        _id = _id.$oid
    }
    const data = {
      _id, name, threshold, levels: JSON.stringify(levels)
    }
    const URL = _id ? REMUNERATION_UPDATE_TAXES:REMUNERATION_ADD_TAXES
    let result = await request(URL, data, dispatch)
    
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'REMUNERATION_TAXES_SAVE',
                data: result.data
            })
        }
    }

}
export const remove = (_id) => async (dispatch, getState) => 
{
    dispatch({type: 'REMUNERATION_TAXES_REMOVE_LOADING'})
    const data = {
        _id: _id
    }
    let result = await request(REMUNERATION_REMOVE_TAXES, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {   
            dispatch({type:"REMUNERATION_TAXES_REMOVE", _id:_id})
        }
    }
}

















