import {request} from 'util/Common'
const LIST_GROUP= "organization/field/list_group"
const ORGANIZATION_EXISTS_CUSTOM_FILED= "organization/user/exists_custom_field"
const ORGANIZATION_COMPLETED = "/organization/completed"
const REMUNERATION_LIST_TAXES= "remuneration/taxes/list"
const REMUNERATION_LIST_INSURANCE= "remuneration/insurance/list"
const REMUNERATION_LIST_SALARY= "remuneration/salary/list"
const REMUNERATION_LIST_FUND= "remuneration/fund/list"
export const saveCompleted = (custom_field) => async (dispatch, getState)=>
{
    dispatch({type: 'PROFILE_MYPROFILE_SAVE_COMPLETED_LOADING'})
    const data = {
        custom_field: JSON.stringify(custom_field)
    }
    let result = await request(ORGANIZATION_COMPLETED, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type: 'PROFILE_MYPROFILE_SAVE_COMPLETED'
            })
        }
    }
}
export const existsCustomField = (_id,value) => async (dispatch, getState)=>
{
    dispatch({type: 'PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED_LOADING'})
    const data = {
        "_id":_id,"value":value
    }
    let result = await request(ORGANIZATION_EXISTS_CUSTOM_FILED, data, dispatch)
    
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type: 'PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED',         
            })
        }
        return result.data
    }
}
export const getFieldsGroup  = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_MYPROFILE_FIELDS_GROUP_LOADING'})
    let result = await request(LIST_GROUP, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_MYPROFILE_FIELDS_GROUP',
                groupData : result.data
            })
        }
    }
}
export const getProfileTaxes = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_MYPROFILE_TAXES_LOADING'})
    let result = await request(REMUNERATION_LIST_TAXES, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_MYPROFILE_TAXES',
                taxesData : result.data
            })
        }
    }
}
export const getSocialSecurity = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_MYPROFILE_SOCIAL_SECURITY_LOADING'})
    let result = await request(REMUNERATION_LIST_INSURANCE, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_MYPROFILE_SOCIAL_SECURITY',
                socialSecurityData : result.data
            })
        }
    }
}
export const getSalary = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_MYPROFILE_SALARY_LOADING'})
    let result = await request(REMUNERATION_LIST_SALARY, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_MYPROFILE_SALARY',
                salaryData : result.data
            })
        }
    }
}
export const getFund = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_MYPROFILE_FUND_LOADING'})
    let result = await request(REMUNERATION_LIST_FUND, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_MYPROFILE_FUND',
                fundData : result.data
            })
        }
    }
}
