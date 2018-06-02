import keyMirror from 'keymirror'
import {auth as _auth} from '../middlewares/AuthMiddleware'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
  "AUTH_ERROR":"AUTH_ERROR",
  "AUTH_SUCCESS":"AUTH_SUCCESS",
  "AUTH_LOADING":"AUTH_LOADING",
})
export const auth = (ticket) => {return _auth(ticket)}