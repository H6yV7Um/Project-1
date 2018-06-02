import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import MachineView from './components/MachineView'
import MachineAddView from './components/MachineAddView'
export const MachineViewRouter = (store) => ({
    "path": '/attendance/machine',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'machine',
            reducer
        })
        cb(null, MachineView)
    }
})

export const MachineAddViewRouter = (store) => ({
    "path": '/attendance/machine/add',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'machine',
            reducer
        })
        cb(null, MachineAddView)
    }
})