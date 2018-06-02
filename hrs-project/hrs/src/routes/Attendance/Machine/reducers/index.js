import {ACTIONS} from '../actions/MachineAction'

const initialState = {
    "data": [],
    "currentRecord": {
        "_id": '',
        "serial_number": '',
        "ip_address": '',
        "location": ''
    },
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
    case "ATTENDANCE_MACHINE_SWITCH":
        return {
            ...state,
            "pageState": action.status
        }
    case "ATTENDANCE_MACHINE_SAVE":
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
    case "ATTENDANCE_MACHINE_SAVE_ERROR":
        return {
            ...state,
            "saveError": action.message
        }
    case "ATTENDANCE_MACHINE_SAVE_LOADING":
        return {
            ...state,
            "saveLoading": true
        }
    case "ATTENDANCE_MACHINE":
        return {
            ...state,
            "data": action.data,
            "getListError": '',
            "getListLoading": false
        }
    case "ATTENDANCE_MACHINE_ERROR":
        return {
            ...state,
            "getListError": action.message
        }
    case "ATTENDANCE_MACHINE_LOADING":
        return {
            ...state,
            "getListLoading": true
        }

    case "ATTENDANCE_MACHINE_REMOVE":
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
    case "ATTENDANCE_MACHINE_REMOVE_ERROR":
        return {
            ...state,
            "removeError": action.message
        }
    case "ATTENDANCE_MACHINE_REMOVE_LOADING":
        return {
            ...state,
            "removeLoading": true
        }
    case "ATTENDANCE_MACHINE_CURRENTRECORD":
        return {
            ...state,
            "currentRecord": action.currentRecord
        }
    }

    return {...state}

}


export default reducer