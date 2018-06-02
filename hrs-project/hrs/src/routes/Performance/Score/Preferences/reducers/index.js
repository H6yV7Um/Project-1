import {ACTIONS} from '../actions/PreferencesAction'
import {format,getAddPreferences,getAddPreferencesData,getAddPreferencesDataBack,getRemovePreferencesData,getRemovePreferences} from './format'
const initialState = {
    "data": [],
    "preferencesData": [],
    "preferences": [],
    "addPreferences":[],
    "currentPage": 'list',
    "key":"",
    "remove_id":'',
    
    "getListError":'',
    "getListLoading":false,

    "getPerformanceListError":'',
    "getPerformanceListLoading":false,

    "saveError": '',
    "saveLoading": false,

    "getPerformanceRemoveError":"",
    "getPerformanceRemoveLoading": false
}

/**
 * Reducer
 */
const reducer = (state = initialState, action) => {

    switch (action.type) {

    /**************************************************/
    case ACTIONS.PERFORMANCE_GETLIST_LOADING:
        return {
            ...state,
            "getListLoading": true
        }
    case ACTIONS.PERFORMANCE_GETLIST_ERROR:
        return {
            ...state,
            "getListError": action.message,
            "getListLoading": false
        }
    case ACTIONS.PERFORMANCE_GETLIST_REMOVE_ERROR:
        return {
            ...state,
            "getListError": action.message,
            "getListLoading": false
        }

    case ACTIONS.PERFORMANCE_GETLIST:
        return {
            ...state,
            "data": action.data,
            "getListLoading": false
        }
    /**************************************************/
    case ACTIONS.PERFORMANCE_SAVE_LOADING:
        return {
            ...state,
            "saveLoading": true
        }
    case ACTIONS.PERFORMANCE_SAVE_ERROR:
        return {
            ...state,
            "saveError": action.message,
            "saveLoading": false
        }
    case ACTIONS.PERFORMANCE_SAVE_REMOVE_ERROR:
        return {
            ...state,
            "saveError": action.message,
            "saveLoading": false
        }
    case ACTIONS.PERFORMANCE_SAVE:
        return {
            ...state,
            "saveError": '',
            "saveLoading": false
        }

    /**************************************************/
    case ACTIONS.PERFORMANCE_GETPERFORMANCELIST_LOADING:
        return {
            ...state,
            "getPerformanceListLoading": true
        }
    case ACTIONS.PERFORMANCE_GETPERFORMANCELIST_ERROR:
        return {
             ...state,
            "getPerformanceListError": action.message,
            "getPerformanceListLoading": false
            
        }
    case ACTIONS.PERFORMANCE_GETPERFORMANCELIST_REMOVE_ERROR:
        return {
             ...state,
            "getPerformanceListError": action.message,
            "getPerformanceListLoading": false
            
        }
    case ACTIONS.PERFORMANCE_GETPERFORMANCELIST:
        return {
            ...state,
            "preferencesData":getAddPreferencesData(action.data),
            "preferences": format([],action.data),
            "getPerformanceListLoading": false
            
        }
    /**************************************************/
    case ACTIONS.PERFORMANCE_REMOVE_LOADING:
        return {
            ...state,   
            "getPerformanceRemoveLoading": true,
            "remove_id":action._id
        }
    case ACTIONS.PERFORMANCE_REMOVE_ERROR:
        return {
             ...state,
            "getPerformanceRemoveError": action.message,
            "getPerformanceRemoveLoading": false
            
        }
    case ACTIONS.PERFORMANCE_REMOVE_REMOVE_ERROR:
        return {
             ...state,
            "getPerformanceRemoveError": action.message,
            "getPerformanceRemoveLoading": false
            
        }
    case ACTIONS.PERFORMANCE_REMOVE:
        return {
            ...state,
            "preferencesData": getRemovePreferencesData(state.preferencesData,action._id),
            "preferences": getRemovePreferences(state.preferences,action._id),
            "getPerformanceRemoveLoading": false
        }
    
    /**************************************************/
    case ACTIONS.EDIT:
        return {
            ...state,
            "currentPage": 'update',
            "key": action.key,
            "addPreferences":getAddPreferences(action.key,state.preferencesData)
        }
    /**************************************************/
    case ACTIONS.TOGGLE:
        return {
                ...state,
                "currentPage": action.status
        }
    }
    return {...state}
}



export default reducer







