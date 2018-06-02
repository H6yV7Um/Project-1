import keyMirror from 'keymirror'
import {
   login as _login
} from '../middlewares/JumpMiddleware.js'

export const ACTIONS = keyMirror({
    "JUMP_LOGIN_LOADING": "JUMP_LOGIN_LOADING",
    "JUMP_LOGIN_FAIL": "JUMP_LOGIN_FAIL",
})

export const login = (url) => _login(url) 
