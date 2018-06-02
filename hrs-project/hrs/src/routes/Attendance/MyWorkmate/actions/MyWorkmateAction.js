import keyMirror from 'keymirror'
import {list} from '../middlewares/MyWorkmateMiddleware'

export const ACTIONS = keyMirror({
    "ATTENDANCE_MYWORKMATE_LIST": "ATTENDANCE_MYWORKMATE_LIST",
    "ATTENDANCE_MYWORKMATE_LIST_LOADING": "ATTENDANCE_MYWORKMATE_LIST_LOADING",
    "ATTENDANCE_MYWORKMATE_LIST_ERROR": "ATTENDANCE_MYWORKMATE_LIST_ERROR",
})

export const getList = () => list()
