import {ACTIONS} from '../actions/MyWorkmateAction'

const initialState =
    {
        "list_loading": false,
        "list_error": false,
        "update_group_loading": false,
        "update_group_error": false,
        "data": {}
    }
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ACTIONS.ATTENDANCE_MYWORKMATE_LIST:
        return permissionGetList(state, action)
    case ACTIONS.ATTENDANCE_MYWORKMATE_LIST_LOADING:
        return {
            ...state,
            "list_loading": true
        }
    case ACTIONS.ATTENDANCE_MYWORKMATE_LIST_ERROR:
        return {
            ...state,
            "list_error": action.message
        }
    }
    return {...state}
}
const permissionGetList = (state, action) => {
    const data = {...action.data}
    return {
        ...state,
        data,
        "list_error": '',
        "list_loading": false
    }
}
export default reducer