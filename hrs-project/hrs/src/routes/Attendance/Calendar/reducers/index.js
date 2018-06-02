import {ACTIONS} from '../actions/CalendarAction'
import moment from 'moment'
const initialState = {
    "data": [],
    "currentMonth": moment(),
    "currentRecord": {},
    "getListLoading": false,
    "pageState": 'list',
    "saveLoading": false,
    "removeLoading": false
}

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
    const data = state.data

    switch (action.type) {
    case "ATTENDANCE_CALENDAR_SAVE":
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
            "saveLoading": false
        }
    case "ATTENDANCE_CALENDAR_SAVE_LOADING":
        return {
            ...state,
            "saveLoading": true
        }
    case "ATTENDANCE_CALENDAR":
        return {
            ...state,
            "data": action.data,
            "getListLoading": false
        }
    case "ATTENDANCE_CALENDAR_ERROR":
        return {
            ...state,
            "getListError": action.message
        }
    case "ATTENDANCE_CALENDAR_LOADING":
        return {
            ...state,
            "getListLoading": true
        }

    case "ATTENDANCE_CALENDAR_REMOVE":
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
    case "ATTENDANCE_CALENDAR_REMOVE_LOADING":
        return {
            ...state,
            "removeLoading": true
        }
    case "ATTENDANCE_CALENDAR_CURRENTRECORD":
        return {
            ...state,
            "currentRecord": action.currentRecord
        }
    case "ATTENDANCE_CALENDAR_CURRENTMONTH":
        return {
            ...state,
            "currentMonth": action.currentMonth
        }
    }

    return {...state}

}


export default reducer