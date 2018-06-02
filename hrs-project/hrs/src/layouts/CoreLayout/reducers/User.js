import {ACTIONS} from '../actions/User'

const initialState = {
    "currentErrorCode": "",
    "networkError": false
}

// ------------------------------------
// Reducer
// ------------------------------------
const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case ACTIONS.CORE_CURRENT:
        if (!action.data.status.code) {
            return {
                ...state,
                ...action.data.data,
                "isCurrent": true
            }
        }

        return {
            ...state,
            "currentErrorCode": action.data.status.code
        }
    case ACTIONS.ACCESS_DENIED:
        location = 'https://uac.pf.tap4fun.com/client_systems/login?token=40fe409d-ac68-4b58-87ae-0f3420a31ad3'

        return {state}
    case ACTIONS.NETWORK_ERROR:
        return {
            ...state,
            "networkError": !state.networkError
        }
    default:
        return {...state}
    }
}

export default userReducer
