import {ACTIONS} from '../actions/CycleAction'

const initialState = {
    "data": [],
    "currentRecord": {},
    "getListError": '',
    "getListLoading": false,
    "pageState": 'list',
    "saveError": '',
    "saveLoading": false,
    "removeError": '',
    "removeLoading": false
}

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
    const data = state.data

    switch (action.type) {
    case "ATTENDANCE_CYCLE_SWITCH":
        return {
            ...state,
            "pageState": action.status
        }
    case "ATTENDANCE_CYCLE_SAVE":
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
    case "ATTENDANCE_CYCLE_SAVE_ERROR":
        return {
            ...state,
            "saveError": action.message
        }
    case "ATTENDANCE_CYCLE_SAVE_LOADING":
        return {
            ...state,
            "saveLoading": true
        }
    case "ATTENDANCE_CYCLE":
        return {
            ...state,
            "data": action.data,
            "getListError": '',
            "getListLoading": false
        }
    case "ATTENDANCE_CYCLE_ERROR":
        return {
            ...state,
            "getListError": action.message
        }
    case "ATTENDANCE_CYCLE_LOADING":
        return {
            ...state,
            "getListLoading": true
        }

    case "ATTENDANCE_CYCLE_REMOVE":
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
    case "ATTENDANCE_CYCLE_REMOVE_ERROR":
        return {
            ...state,
            "removeError": action.message
        }
    case "ATTENDANCE_CYCLE_REMOVE_LOADING":
        return {
            ...state,
            "removeLoading": true
        }
    case "ATTENDANCE_CYCLE_CURRENTRECORD":
        return {
            ...state,
            "currentRecord": action.currentRecord
        }
    }

    return {...state}

}


export default reducer