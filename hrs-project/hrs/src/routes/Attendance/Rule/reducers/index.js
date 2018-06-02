import {ACTIONS} from '../actions/RuleAction'

const initialState = {
    "data": [],
    "others": [],
    "getListOthersLoading": false,
    "currentRecord": {},
    "currentOtherRecord": {},
    "getListError": '',
    "getListLoading": false,
    "pageState": 'list',
    "tabState": "1",
    "saveError": '',
    "saveLoading": false,
    "removeError": '',
    "removeLoading": false,
    "updateLateLoading": false,
    "updateAbsenteeismLoading": false,
    "updateOvertimeLoading": false,
    "updateDaysOffLoading": false,
    "updateBusinessTripLoading": false,
    "updateAnnualVacationLoading": false

}

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
    const data = state.data

    switch (action.type) {
    case "ATTENDANCE_RULE_SWITCH":
        return {
            ...state,
            "pageState": action.status
        }
    case "ATTENDANCE_RULE_SWITCH_TAB":
        return {
            ...state,
            "tabState": action.status
        }
    case "ATTENDANCE_RULE_SAVE":
        let exists = false

        for (let i = 0; i < data.length; i++) {
            if (data[i]._id.$oid == action.data._id.$oid) {
                data[i] = action.data
                exists = true
                break
            }
        }
        if (!exists) {
            data.push(action.data)
        }


        return {
            ...state,
            data,
            "pageState": 'list',
            "saveError": '',
            "saveLoading": false
        }
    case "ATTENDANCE_RULE_SAVE_ERROR":
        return {
            ...state,
            "saveError": action.message
        }
    case "ATTENDANCE_RULE_SAVE_LOADING":
        return {
            ...state,
            "saveLoading": true
        }
    case "ATTENDANCE_RULE":
        return {
            ...state,
            "data": action.data,
            "getListError": '',
            "getListLoading": false
        }
    case "ATTENDANCE_RULE_ERROR":
        return {
            ...state,
            "getListError": action.message
        }
    case "ATTENDANCE_RULE_LOADING":
        return {
            ...state,
            "getListLoading": true
        }

    case "ATTENDANCE_RULE_REMOVE":
        for (let i = 0; i < data.length; i++) {
            if (data[i]._id.$oid == action._id) {
                data.splice(i, 1)
                break
            }
        }

        return {
            ...state,
            data,
            "removeError": '',
            "removeLoading": false
        }
    case "ATTENDANCE_RULE_REMOVE_ERROR":
        return {
            ...state,
            "removeError": action.message
        }
    case "ATTENDANCE_RULE_REMOVE_LOADING":
        return {
            ...state,
            "removeLoading": true
        }
    case "ATTENDANCE_RULE_CURRENTRECORD":
        return {
            ...state,
            "currentRecord": action.currentRecord
        }
    case "ATTENDANCE_RULE_CURRENT_OTHERRECORD":
        return {
            ...state,
            "currentOtherRecord": action.currentOtherRecord
        }
    case "ATTENDANCE_RULE_OTHERS_LOADING":
        return {
            ...state,
            "getListOthersLoading": !state.getListOthersLoading
        }
    case "ATTENDANCE_RULE_OTHERS":
        return {
            ...state,
            "getListOthersLoading": false,
            "others": action.data
        }
    case "ATTENDANCE_RULE_UPDATE_LATE":
        return {
            ...state,
            "data": updateList(data, action.data),
            "pageState": 'list',
            "updateLateLoading": false
        }
    case "ATTENDANCE_RULE_UPDATE_ABSENTEEISM":
        return {
            ...state,
            "data": updateList(data, action.data),
            "pageState": 'list',
            "updateAbsenteeismLoading": false
        }
    case "ATTENDANCE_RULE_UPDATE_OVERTIME":
        return {
            ...state,
            "data": updateList(data, action.data),
            "pageState": 'list',
            "updateOvertimeLoading": false
        }
    case "ATTENDANCE_RULE_UPDATE_DAYSOFF":
        return {
            ...state,
            "data": updateList(data, action.data),
            "pageState": 'list',
            "updateDaysOffLoading": false
        }
    case "ATTENDANCE_RULE_UPDATE_BUSINESSTRIP":
        return {
            ...state,
            "data": updateList(data, action.data),
            "pageState": 'list',
            "updateBusinessTripLoading": false
        }
    case "ATTENDANCE_RULE_UPDATE_ANNUALVACATION":
        return {
            ...state,
            "data": updateList(data, action.data),
            "pageState": 'list',
            "updateAnnualVacationLoading": false
        }
    case "ATTENDANCE_RULE_UPDATE_LATE_LOADING":
        return {
            ...state,
            "updateLateLoading": !state.updateLateLoading
        }
    case "ATTENDANCE_RULE_UPDATE_ABSENTEEISM_LOADING":
        return {
            ...state,
            "updateAbsenteeismLoading": !state.updateAbsenteeismLoading
        }
    case "ATTENDANCE_RULE_UPDATE_OVERTIME_LOADING":
        return {
            ...state,
            "updateOvertimeLoading": !state.updateOvertimeLoading
        }
    case "ATTENDANCE_RULE_UPDATE_DAYSOFF_LOADING":
        return {
            ...state,
            "updateDaysOffLoading": !state.updateDaysOffLoading
        }
    case "ATTENDANCE_RULE_UPDATE_BUSINESSTRIP_LOADING":
        return {
            ...state,
            "updateBusinessTripLoading": !state.updateBusinessTripLoading
        }
    case "ATTENDANCE_RULE_UPDATE_ANNUALVACATION_LOADING":
        return {
            ...state,
            "updateAnnualVacationLoading": !state.updateAnnualVacationLoading
        }
    }


    return {...state}

}
const updateList = (data, record) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i]._id.$oid == record._id.$oid) {
            data[i] = record
            break
        }
    }

    return data
}

export default reducer