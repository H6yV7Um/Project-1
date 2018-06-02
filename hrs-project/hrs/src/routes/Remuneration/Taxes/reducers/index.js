import {ACTIONS} from '../actions/TaxesAction'

const initialState = {
    "data": [],
    "currentRecord": {
        "_id": '',
        "name": '',
        "threshold": 3500,
        "levels": [
            {
                "range": 0,
                "rate": 1
            }
        ]
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
    case "REMUNERATION_TAXES_SWITCH":
        return {
            ...state,
            "pageState": action.status
        }
    case "REMUNERATION_TAXES_SAVE":
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
    case "REMUNERATION_TAXES_SAVE_ERROR":
        return {
            ...state,
            "saveError": action.message
        }
    case "REMUNERATION_TAXES_SAVE_LOADING":
        return {
            ...state,
            "saveLoading": true
        }
    case "REMUNERATION_TAXES":
        return {
            ...state,
            "data": action.data,
            "getListError": '',
            "getListLoading": false
        }
    case "REMUNERATION_TAXES_ERROR":
        return {
            ...state,
            "getListError": action.message
        }
    case "REMUNERATION_TAXES_LOADING":
        return {
            ...state,
            "getListLoading": true
        }

    case "REMUNERATION_TAXES_REMOVE":
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
    case "REMUNERATION_TAXES_REMOVE_ERROR":
        return {
            ...state,
            "removeError": action.message
        }
    case "REMUNERATION_TAXES_REMOVE_LOADING":
        return {
            ...state,
            "removeLoading": true
        }
    case "REMUNERATION_TAXES_CURRENTRECORD":
        return {
            ...state,
            "currentRecord": action.currentRecord
        }
    }

    return {...state}
}


export default reducer