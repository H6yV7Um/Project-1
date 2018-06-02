import {ACTIONS} from '../actions/Menu'

const initialState = {
    "error": "",
    "loading": false,
    "menus": []
}

// ------------------------------------
// Reducer
// ------------------------------------

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
    case ACTIONS.CORE_LOADING:
        return {
            ...state,
            "loading": true
        }
    case ACTIONS.CORE_ERROR:
        return {
            ...state,
            "error": action.message
        }
    case ACTIONS.CORE_LOAD:
        return {
            ...state,
            "menus": action.menus
        }
    default:
        return {...state}
    }
}

export default menuReducer
