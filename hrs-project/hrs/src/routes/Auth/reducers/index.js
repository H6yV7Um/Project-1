import {ACTIONS} from '../actions/AuthAction'
const initialState = {
    "addFieldError": "",
    "addFieldLoading": false,
    "addGroupError": "",
    "addGroupLoading": false,
    "removeFieldError": "",
    "removeFieldLoading": false,
    "removeGroupError": "",
    "removeGroupLoading": false,
    "fields": [
    ],
    "error": "",
    "loading": false,


    "getDepartmentError": '',
    "getDepartmentLoading": false,
    "departments": [],

    "getUsersError": '',
    "getUsersLoading": false,
    'users': []
}

/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ACTIONS.AUTH_ERROR:
        return {
            ...state,
            "authError": action.message,
            "authLoading": false
        }
    case ACTIONS.AUTH_LOADING:
        return {
            ...state,
            "authError": "",
            "authLoading": true
        }
    case ACTIONS.AUTH_SUCCESS:
        location='/'
        return {
            ...state,
            "authError": "",
            "authLoading": false
        }
    default:
        return {...state}
    }
}
export default reducer