import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import SalaryView from './components/SalaryView'
import SalaryAddView from './components/SalaryAddView'

export const SalaryViewRouter = (store) => ({
    "path": '/remuneration/salary',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'salary',
            reducer
        })
        cb(null, SalaryView)
    }
})


export const SalaryAddViewRouter = (store) => ({
    "path": '/remuneration/salary/add',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'salary',
            reducer
        })
        cb(null, SalaryAddView)
    }
})