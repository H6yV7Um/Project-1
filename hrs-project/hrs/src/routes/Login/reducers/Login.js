import {ACTIONS} from '../actions/LoginAction'

const initialState = {}

/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:

        return {
            ...state,
            "isLogin": true
        }
    }

    return {...state}
}

export default reducer