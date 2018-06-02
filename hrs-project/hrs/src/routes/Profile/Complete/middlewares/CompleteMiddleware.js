import {request} from 'util/Common'
const LIST_GROUP= "organization/field/list_group"
const ORGANIZATION_EXISTS_CUSTOM_FILED= "organization/user/exists_custom_field"
const ORGANIZATION_COMPLETED = "organization/completed"
export const saveCompleted = (custom_field) => async (dispatch, getState)=>
{
    dispatch({type: 'PROFILE_COMPLETE_SAVE_COMPLETED_LOADING'})
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
                type: 'PROFILE_COMPLETE_SAVE_COMPLETED'
            })
        }
    }
}
export const existsCustomField = (_id,value) => async (dispatch, getState)=>
{
    dispatch({type: 'PROFILE_COMPLETE_EXISTS_CUSTOM_FILED_LOADING'})
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
                type: 'PROFILE_COMPLETE_EXISTS_CUSTOM_FILED',         
            })
        }
        return result.data
    }
}
export const getFieldsGroup  = () => async (dispatch, getState) => 
{
    dispatch({type: 'PROFILE_COMPLETE_FIELDS_GROUP_LOADING'})
    let result = await request(LIST_GROUP, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'PROFILE_COMPLETE_FIELDS_GROUP',
                groupData : result.data
            })
        }
    }
}