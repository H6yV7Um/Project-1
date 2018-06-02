import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import CycleView from './components/CycleView'
import CycleAddView from './components/CycleAddView'

export const CycleViewRouter = (store) => ({
    "path": '/attendance/cycle',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'cycle',
            reducer
        })
        cb(null, CycleView)
    }
})
export const CycleAddViewRouter = (store) => ({
    "path": '/attendance/cycle/add',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'cycle',
            reducer
        })
        cb(null, CycleAddView)
    }
})