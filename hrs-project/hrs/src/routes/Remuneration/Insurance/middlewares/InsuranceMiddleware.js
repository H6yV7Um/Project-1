import {request} from 'util/Common'
import  SERVER from 'config'
const LIST_INSURANCE = "remuneration/insurance/list" 
const ADD_INSURANCE = "remuneration/insurance/add"
const UPDATE_INSURANCE =  "remuneration/insurance/update"
const REMOVE_INSURANCE =  "remuneration/insurance/remove"
export const listInsurance  = () => async (dispatch, getState) => 
{
    dispatch({type: 'REMUNERATION_INSURANCE_LOADING'})
    let result = await request(LIST_INSURANCE, {}, dispatch)
    if(result)
    {
        if(result.status.code == 0)
        {
            dispatch(
            {
                type : 'REMUNERATION_INSURANCE',
                listInsurance : result.data
            })
        }
    }
}
export const save = (_id,name,pension,medical,serious_illness,unemployment,occupational_injury,birth) => async (dispatch, getState)=>
{
    dispatch({type: 'REMUNERATION_INSURANCE_SAVE_LOADING'})
    if(_id)
    {
        _id = _id.$oid
    }
    const data = {
        _id:_id,
        name:name, 
        pension:JSON.stringify(pension),
        medical:JSON.stringify(medical),
        serious_illness:JSON.stringify(serious_illness),
        unemployment:JSON.stringify(unemployment),
        occupational_injury:JSON.stringify(occupational_injury),
        birth:JSON.stringify(birth)
      
    }
    const URL =  _id ? UPDATE_INSURANCE:SERVER + ADD_INSURANCE

    let result = await request(URL, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'REMUNERATION_INSURANCE_SAVE',
                data: result.data,
                pageState:"list"
            })
        }
    }

}
export const remove = (_id) => async (dispatch, getState) => 
{
    dispatch({type: 'REMUNERATION_INSURANCE_REMOVE_LOADING'})
    const data = {
        _id: _id
    }
    let result = await request(REMOVE_INSURANCE, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {   
            dispatch({type:"REMUNERATION_INSURANCE_REMOVE", _id:_id})
        }
    }
}







