import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import CalendarView from './components/CalendarView'
import CalendarAddView from './components/CalendarAddView'

export const CalendarViewRouter = (store) => ({
    "path": '/attendance/calendar',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'calendar',
            reducer
        })
        cb(null, CalendarView)
    }
})

export const CalendarAddViewRouter = (store) => ({
    "path": '/attendance/calendar/add',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'calendar',
            reducer
        })
        cb(null, CalendarAddView)
    }
})