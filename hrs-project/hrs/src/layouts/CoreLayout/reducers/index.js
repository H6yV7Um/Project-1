import {combineReducers} from 'redux'

import user from './User'
import menu from './Menu'

export default combineReducers(
    {
        user,
        menu
    }
)
