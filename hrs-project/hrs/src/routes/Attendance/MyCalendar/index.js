import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import MyCalendarView from './components/MyCalendarView'

export const MyCalendarViewRouter = (store) => ({
    "path": '/attendance/mycalendar',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'mycalendar',
            reducer
        })
        cb(null, MyCalendarView)
    }
})
