import {ACTIONS} from '../actions/MyCalendarAction'
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
    /**************************************/
    case "ATTENDANCE_MYCALENDAR":
        return {
            ...state,
            "data": action.data,
            "getListLoading": false
        }
    case "ATTENDANCE_MYCALENDAR_LOADING":
        return {
            ...state,
            "getListLoading": true
        }

    /**************************************/
    
    case "ATTENDANCE_MYCALENDAR_CURRENTRECORD":
        return {
            ...state,
            "currentRecord": action.currentRecord
        }
    case "ATTENDANCE_MYCALENDAR_CURRENTMONTH":
        return {
            ...state,
            "currentMonth": action.currentMonth
        }
    /**************************************/
    
    case "ATTENDANCE_MYCALENDAR_CURRENTRECORD":
        return {
            ...state,
            "currentRecord": action.currentRecord
        }
    /**************************************/
    
    case "ATTENDANCE_MYCALENDAR_CURRENTMONTH":
        return {
            ...state,
            "currentMonth": action.currentMonth
        }
    }


    return {...state}

}


export default reducer