import {request} from 'util/Common'
const REMUNERATION_ADD_SALARY = "remuneration/salary/add"
const REMUNERATION_UPDATE_SALARY = "remuneration/salary/update"
const REMUNERATION_REMOVE_SALARY = "remuneration/salary/remove"
const REMUNERATION_LIST_SALARY = "remuneration/salary/list"

const REMUNERATION_FIND_SALARY_SETTING = "remuneration/salary_setting/find"
const REMUNERATION_UPDATE_SALARY_SETTING = "remuneration/salary_setting/update"

export const getList = () => async (dispatch, getState) => 
{
    dispatch({type: 'REMUNERATION_SALARY_LOADING'})
    let result = await request(REMUNERATION_LIST_SALARY, {}, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'REMUNERATION_SALARY',
                data : result.data
            })
        }
    }
}
export const save = (_id, name, salaries, subsidy) => async (dispatch, getState)=>
{
    dispatch({type: 'REMUNERATION_SALARY_SAVE_LOADING'})
    if(_id)
    {
        _id = _id.$oid
    }
    const data = {
      _id, name, salaries: JSON.stringify(salaries), subsidy: JSON.stringify(subsidy)
    }
    const URL = _id ? REMUNERATION_UPDATE_SALARY:REMUNERATION_ADD_SALARY
    let result = await request(URL, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'REMUNERATION_SALARY_SAVE',
                data: result.data
            })
        }
    }
}
export const remove = (_id) => async (dispatch, getState) => 
{
    dispatch({type: 'REMUNERATION_SALARY_REMOVE_LOADING'})
    const data = {
        _id: _id
    }
    let result = await request(REMUNERATION_REMOVE_SALARY, data, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {   
            dispatch({type:"REMUNERATION_SALARY_REMOVE", _id:_id})
        }
    }
}


export const findSetting = () => async (dispatch, getState) => 
{
    dispatch({type: 'REMUNERATION_SALARY_SETTING_LOADING'})
    let result = await request(REMUNERATION_FIND_SALARY_SETTING, {}, dispatch)
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'REMUNERATION_SALARY_SETTING',
                data : result.data
            })
        }
    }
}


export const updateSetting = (cycle) => async (dispatch, getState)=>
{
    dispatch({type: 'REMUNERATION_SALARY_SETTING_UPDATE_LOADING'})
    const data = {
      cycle
    }
    let result = await request(REMUNERATION_UPDATE_SALARY_SETTING, data, dispatch)
    
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type: 'REMUNERATION_SALARY_SETTING_UPDATE',
                data: result.data
            })
        }
    }
}












