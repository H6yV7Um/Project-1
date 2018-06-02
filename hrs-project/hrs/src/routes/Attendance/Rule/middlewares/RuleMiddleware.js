import {request} from 'util/Common'
const ATTENDANCE_RULE_UPDATE_LATE = "attendance/rule/update_late"
const ATTENDANCE_RULE_UPDATE_ABSENTEEISM = "attendance/rule/update_absenteeism"
const ATTENDANCE_RULE_UPDATE_OVERTIME = "attendance/rule/update_overtime"
const ATTENDANCE_RULE_UPDATE_DAYS_OFF = "attendance/rule/update_days_off"
const ATTENDANCE_RULE_UPDATE_BUSINESS_TRIP = "attendance/rule/update_business_trip"
const ATTENDANCE_RULE_UPDATE_ANNUAL_VACATION = "attendance/rule/update_annual_vacation"
const ATTENDANCE_RULE_ADD_LEAVE = "attendance/rule/add_leave"
const ATTENDANCE_RULE_UPDATE_LEAVE = "attendance/rule/update_leave"
const ATTENDANCE_RULE_REMOVE = "attendance/rule/remove"
const ATTENDANCE_RULE_FIND = "attendance/rule/find"
const ATTENDANCE_RULE_LIST = "attendance/rule/list"
const ATTENDANCE_RULE_LIST_OTHERS = "attendance/rule/list_others"

export const getList = () => async (dispatch, getState) => 
{
    dispatch({type: 'ATTENDANCE_RULE_LOADING'})
    let result = await request(ATTENDANCE_RULE_LIST, {}, dispatch)
    
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'ATTENDANCE_RULE',
                data : result.data
            })
        }
    }
}
export const getListOthers = () => async (dispatch, getState) => 
{
    dispatch({type: 'ATTENDANCE_RULE_OTHERS_LOADING'})
    let result = await request(ATTENDANCE_RULE_LIST_OTHERS, {}, dispatch)
    
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch(
            {
                type : 'ATTENDANCE_RULE_OTHERS',
                data : result.data
            })
        }
    }
}
export const save = (_id, name, fee, deduct_subsidy, deduct_type, remark) => async (dispatch, getState)=>
{
    dispatch({type: 'ATTENDANCE_RULE_SAVE_LOADING'})
    if(_id)
    {
        _id = _id.$oid
    }
    const data = {
      _id, name, fee, deduct_subsidy:Number(deduct_subsidy), deduct_type, remark
    }
    const URL = _id ?  ATTENDANCE_RULE_UPDATE_LEAVE: ATTENDANCE_RULE_ADD_LEAVE
    let result = await request(URL, data, dispatch)
    if(result)
    {
        switch(result.status.code)
        {
            case 0:
                return dispatch(
                {
                    type: 'ATTENDANCE_RULE_SAVE',
                    data: result.data
                })
            break
        }
    }
}
export const remove = (_id) => async (dispatch, getState) => 
{
    dispatch({type: 'ATTENDANCE_RULE_REMOVE_LOADING'})
    const data = {
        _id: _id
    }
    let result = await request(ATTENDANCE_RULE_REMOVE, data, dispatch)
    
    if(result)
    {
        if(result.status.code === 0)
        {
            dispatch({type:"ATTENDANCE_RULE_REMOVE", _id:_id})
        }
    }
}

export const updateLate = (fee, free_times, remark) => async (dispatch, getState) =>
{
    dispatch({type: 'ATTENDANCE_RULE_UPDATE_LATE_LOADING'})
    
    const data = {
      fee, free_times, remark
    }
    let result = await request(ATTENDANCE_RULE_UPDATE_LATE, data, dispatch)
    if(result)
    {
        switch(result.status.code)
        {
            case 0:
                return dispatch(
                {
                    type: 'ATTENDANCE_RULE_UPDATE_LATE',
                    data: result.data
                })
            break
        }
    }
}

export const updateAbsenteeism = (fee, free_hours, remark) => async (dispatch, getState) =>
{
    dispatch({type: 'ATTENDANCE_RULE_UPDATE_ABSENTEEISM_LOADING'})
    
    const data = {
      fee, free_hours, remark
    }
    let result = await request(ATTENDANCE_RULE_UPDATE_ABSENTEEISM, data, dispatch)
    if(result)
    {
        switch(result.status.code)
        {
            case 0:
                return dispatch(
                {
                    type: 'ATTENDANCE_RULE_UPDATE_ABSENTEEISM',
                    data: result.data
                })
            break
        }
    }
}

export const updateOvertime = (weekday_fee, weekend_fee, weekday_minimum_pay_hours, weekend_minimum_pay_hours, weekday_multiple_payment, weekend_multiple_payment, remark) => async (dispatch, getState) =>
{
    dispatch({type: 'ATTENDANCE_RULE_UPDATE_OVERTIME_LOADING'})
    
    const data = {
      weekday_fee, weekend_fee, weekday_minimum_pay_hours, weekend_minimum_pay_hours, weekday_multiple_payment: Number(weekday_multiple_payment), weekend_multiple_payment: Number(weekend_multiple_payment), remark
    }
    let result = await request(ATTENDANCE_RULE_UPDATE_OVERTIME, data, dispatch)
    if(result)
    {
        switch(result.status.code)
        {
            case 0:
                return dispatch(
                {
                    type: 'ATTENDANCE_RULE_UPDATE_OVERTIME',
                    data: result.data
                })
            break
        }
    }
}

export const updateDaysOff = (fee, remark) => async (dispatch, getState) =>
{
    dispatch({type: 'ATTENDANCE_RULE_UPDATE_DAYSOFF_LOADING'})
    
    const data = {
      fee, remark
    }
    let result = await request(ATTENDANCE_RULE_UPDATE_DAYS_OFF, data, dispatch)
    if(result)
    {
        switch(result.status.code)
        {
            case 0:
                return dispatch(
                {
                    type: 'ATTENDANCE_RULE_UPDATE_DAYSOFF',
                    data: result.data
                })
            break
        }
    }
}

export const updateBusinessTrip = (fee, remark) => async (dispatch, getState) =>
{
    dispatch({type: 'ATTENDANCE_RULE_UPDATE_BUSINESSTRIP_LOADING'})
    
    const data = {
      fee, remark
    }
    let result = await request(ATTENDANCE_RULE_UPDATE_BUSINESS_TRIP, data, dispatch)
    if(result)
    {
        switch(result.status.code)
        {
            case 0:
                return dispatch(
                {
                    type: 'ATTENDANCE_RULE_UPDATE_BUSINESSTRIP',
                    data: result.data
                })
            break
        }
    }
}


export const updateAnnualVacation = (days, clear_date, remark) => async (dispatch, getState) =>
{
    dispatch({type: 'ATTENDANCE_RULE_UPDATE_ANNUALVACATION_LOADING'})
    
    const data = {
      days:JSON.stringify(days), clear_date, remark
    }
    let result = await request(ATTENDANCE_RULE_UPDATE_ANNUAL_VACATION, data, dispatch)
    if(result)
    {
        switch(result.status.code)
        {
            case 0:
                return dispatch(
                {
                    type: 'ATTENDANCE_RULE_UPDATE_ANNUALVACATION',
                    data: result.data
                })
            break
        }
    }
}
