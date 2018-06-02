import {ACTIONS} from '../actions/SalaryAction'

const initialState = {
    "data": [],
    "setting": [],
    "currentRecord":{},
    "getListError": '',
    "getListLoading": false,
    "pageState": 'list',
    "saveError": '',
    "saveLoading": false,
    "removeError": '',
    "removeLoading": false,
    "settingError": '',
    "settingLoading": false,
    "settingUpdateError": '',
    "settingUpdateLoading": false
}

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
    const data = state.data

    switch (action.type) {
    case "REMUNERATION_SALARY_SWITCH":
        return {
            ...state,
            "pageState": action.status
        }
    case "REMUNERATION_SALARY_SAVE":
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
    case "REMUNERATION_SALARY_SAVE_ERROR":
        return {
            ...state,
            "saveError": action.message
        }
    case "REMUNERATION_SALARY_SAVE_LOADING":
        return {
            ...state,
            "saveLoading": true
        }
    case "REMUNERATION_SALARY":
        return {
            ...state,
            "data": action.data,
            "getListError": '',
            "getListLoading": false
        }
    case "REMUNERATION_SALARY_ERROR":
        return {
            ...state,
            "getListError": action.message
        }
    case "REMUNERATION_SALARY_LOADING":
        return {
            ...state,
            "getListLoading": true
        }

    case "REMUNERATION_SALARY_REMOVE":
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
    case "REMUNERATION_SALARY_REMOVE_ERROR":
        return {
            ...state,
            "removeError": action.message
        }
    case "REMUNERATION_SALARY_REMOVE_LOADING":
        return {
            ...state,
            "removeLoading": true
        }
    case "REMUNERATION_SALARY_SETTING":
        return {
            ...state,
            "settingError": "",
            "settingLoading": false,
            "setting": action.data
        }
    case "REMUNERATION_SALARY_SETTING_UPDATE":
        return {
            ...state,
            "settingUpdateError": "",
            "settingUpdateLoading": false,
            "setting": action.data
        }
    case "REMUNERATION_SALARY_SETTING_ERROR":
        return {
            ...state,
            "settingError": action.message
        }
    case "REMUNERATION_SALARY_SETTING_LOADING":
        return {
            ...state,
            "settingLoading": true
        }

    case "REMUNERATION_SALARY_SETTING_UPDATE_ERROR":
        return {
            ...state,
            "settingUpdateError": action.message
        }
    case "REMUNERATION_SALARY_SETTING_UPDATE_LOADING":
        return {
            ...state,
            "settingUpdateLoading": true
        }
    case "REMUNERATION_SALARY_CURRENTRECORD":
            return {
                ...state,
                "currentRecord": action.currentRecord
            }

    }

    return {...state}

}


export default reducer