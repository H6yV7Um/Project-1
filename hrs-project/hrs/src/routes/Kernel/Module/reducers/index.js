import {ACTIONS} from '../actions/ListAction'
import {ACTIONS as MENUACTIONS} from '../actions/MenuAction'
import {moduleList, moduleSave, moduleSaveNew} from './Module'
import {moduleSaveMenu, moduleSaveChildMenu} from './Menu'

const initialState =
    {
        "data": [],
        "list_error": "",
        "list_loading": false,
        "save_child_loading": false,
        "save_error": "",
        "save_loading": false,

        "save_menu_error": '',
        "save_menu_loading": false,
        
        "save_new_child_loading": false,
        "save_new_loading": false,
        "save_new_menu_loading": false
    }

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 获取模块列表
    case ACTIONS.MODULE_LIST:
        return moduleList(state, action)
    case ACTIONS.MODULE_LIST_LOADING:
        return {
            ...state,
            "list_loading": true
        }
    case ACTIONS.MODULE_LIST_ERROR:
        return {
            ...state,
            "list_error": action.message,
            "list_loading": false
        }
    case ACTIONS.MODULE_SAVE:
        return moduleSave(state, action)
    case ACTIONS.MODULE_SAVE_NEW:
        return moduleSaveNew(state, action)
    case ACTIONS.MODULE_SAVE_ERROR:
        return {
            ...state,
            "save_child_loading": false,
            "save_error": action.message,
            "save_loading": false,
            "save_menu_loading": false,
            "save_new_child_loading": false,
            "save_new_menu_loading": false
        }
    case ACTIONS.MODULE_SAVE_LOADING:
        return {
            ...state,
            "save_loading": true
        }
    case ACTIONS.MODULE_SAVE_NEW_LOADING:
        return {
            ...state,
            "save_new_loading": true
        }
    case MENUACTIONS.MODULE_SAVE_MENU_LOADING:
        return {
            ...state,
            "save_menu_loading": true
        }
    case MENUACTIONS.MODULE_SAVE_NEW_MENU_LOADING:
        return {
            ...state,
            "save_new_menu_loading": true
        }
    case MENUACTIONS.MODULE_SAVE_MENU:
        return moduleSaveMenu(state, action)
    case MENUACTIONS.MODULE_SAVE_CHILD_MENU:
        return moduleSaveChildMenu(state, action)
    case MENUACTIONS.MODULE_SAVE_CHILD_LOADING:
        return {
            ...state,
            "save_child_loading": true
        }
    case MENUACTIONS.MODULE_SAVE_NEW_CHILD_LOADING:
        return {
            ...state,
            "save_new_child_loading": true
        }
    default:
        return state
    }
}

export default reducer