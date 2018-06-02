import {request} from 'util/Common'
const LIST_GROUP= "organization/field/list_group"
const REMUNERATION_LIST_TAXES= "remuneration/taxes/list"
const REMUNERATION_LIST_INSURANCE= "remuneration/insurance/list"
const REMUNERATION_LIST_SALARY= "remuneration/salary/list"
const REMUNERATION_LIST_FUND= "remuneration/fund/list"
const ORGANIZATION_ENTRY= "organization/user/entry"
const ORGANIZATION_REMOVE= "organization/file/remove"
const ORGANIZATION_LIST_USERS = "organization/user/list"
const ORGANIZATION_LIST_NAME= "organization/user/list_name"
const ORGANIZATION_DOWNLOAD=  "organization/file/download/"
const ORGANIZATION_USER_FIND_ID= "organization/user/find_id"
const ORGANIZATION_UPDATE = "organization/user/update"
const ORGANIZATION_EXISTS_CUSTOM_FILED= "organization/user/exists_custom_field"

const ORGANIZATION_LIST_ALL= "organization/department/list_all"



export const getFieldsGroup  = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_FIELDS_GROUP_LOADING'})
    let result = await request(LIST_GROUP, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_FIELDS_GROUP',
                groupData : result.data
            })
        }
    }
}

export const getEmployees  = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_EMPLOYEES_LOADING'})
    let result = await request(ORGANIZATION_LIST_ALL, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_EMPLOYEES',
                employees : result.data.users
            })
        }
    }
}

export const getProfileTaxes = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_TAXES_LOADING'})
    let result = await request(REMUNERATION_LIST_TAXES, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_TAXES',
                taxesData : result.data
            })
        }
    }
}

export const getSocialSecurity = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_SOCIAL_SECURITY_LOADING'})
    let result = await request(REMUNERATION_LIST_INSURANCE, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_SOCIAL_SECURITY',
                socialSecurityData : result.data
            })
        }
    }
}

export const getSalary = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_SALARY_LOADING'})
    let result = await request(REMUNERATION_LIST_SALARY, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_SALARY',
                salaryData : result.data
            })
        }
    }
}


export const getFund = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_FUND_LOADING'})
    let result = await request(REMUNERATION_LIST_FUND, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_FUND',
                fundData : result.data
            })
        }
    }
}

export const getEntrySave = (custom_field, insuranceJuge, taxes, fundJuge, salary, salaries) => async (dispatch, getState)=>
{
    let insurance = insuranceJuge ? insuranceJuge : ''
    let fund = fundJuge ? fundJuge : '' 
    dispatch({type: 'PROFILE_ENTRY_LOADING'})
    const data = {
        custom_field: JSON.stringify(custom_field),insurance, taxes, fund,salary,salaries:JSON.stringify(salaries)
    }
    let result = await request(ORGANIZATION_ENTRY, data, dispatch)
    

    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type: 'PROFILE_ENTRY',
                saveSuccessData: true,
                updateProfile: true
                
            })
        }
    }
}

export const getEntryUpdate = (id,custom_field, insuranceJuge, taxes, fundJuge, salary, salaries) => async (dispatch, getState)=>
{
    let insurance = insuranceJuge ? insuranceJuge : ''
    let fund = fundJuge ? fundJuge : '' 
    dispatch({type: 'PROFILE_ENTRY_UPDATE_LOADING'})

    const data = {
        _id:id,custom_field: JSON.stringify(custom_field),insurance, taxes, fund,salary,salaries:JSON.stringify(salaries)
    }
    let result = await request(ORGANIZATION_UPDATE, data, dispatch)
    
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type: 'PROFILE_ENTRY_UPDATE',
                updateSuccessData: true,
                id:id,
                updateProfile: true
                
            })
        }
    }

}

export const getEmployeeStatus = (condition,pagination) => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_EMPLOYEE_STATUS_LOADING',updateProfile: false})
    const data = {
        condition: JSON.stringify(condition),pagination
    }
    let result = await request(ORGANIZATION_LIST_USERS, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_EMPLOYEE_STATUS',
                getEmployeeStatusData : result.data,
                total:result.data.count,
                current: pagination,
                condition: condition
            })
        }
    }
}

export const getListName = (keywords) => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_LIST_NAME_LOADING'})
    
    const data = {
        "keywords":keywords
    }
    let result = await request(ORGANIZATION_LIST_NAME, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_LIST_NAME',
                getListNameData : result.data
            })
        }
    }
}

export const getHead = (id) => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_HEAD_LOADING'})
    let result = await request(ORGANIZATION_DOWNLOAD, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_HEAD',
                getHeadData : result.data
            })
        }
    }
}



export const getEmployeeDetails = (_id) => async (dispatch, getState)=>
{
    dispatch({type: 'PROFILE_EMPLOYEEDETAILS_LOADING'})
    const data = {
        "_id":_id
    }
    let result = await request(ORGANIZATION_USER_FIND_ID, data, dispatch)

    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type: 'PROFILE_EMPLOYEEDETAILS',
                employeeDetailsData:result.data,     
            })
        }
    }

}

export const existsCustomField = (_id,value) => async (dispatch, getState)=>
{
    dispatch({type: 'PROFILE_EXISTS_CUSTOM_FILED_LOADING'})
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
                type: 'PROFILE_EXISTS_CUSTOM_FILED',
            })
            return result.data
        }
    }
}






