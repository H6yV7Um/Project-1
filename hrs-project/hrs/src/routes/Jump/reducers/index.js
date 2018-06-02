import {ACTIONS} from '../actions/JumpAction'

const initialState =
    {
        loginloading: false,
        loginfail: false,
        loginerror: false
    }
/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
	    case ACTIONS.JUMP_LOGIN_LOADING:
	        return {
	            ...state,
	            "loginloading": true
	        }
	    case ACTIONS.JUMP_LOGIN_FAIL:
	        return {
	            ...state,
	            "loginfail": true,
	            "loginloading": false
	        }
    }
    return {...state}
}
export default reducer