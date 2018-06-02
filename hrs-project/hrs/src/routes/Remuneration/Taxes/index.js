import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import TaxesView from './components/TaxesView'
import TaxesAddView from './components/TaxesAddView'

export const TaxesViewRouter = (store) => ({
    "path": '/remuneration/taxes',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'taxes',
            reducer
        })
        cb(null, TaxesView)
    }
})

export const TaxesAddViewRouter = (store) => ({
    "path": '/remuneration/taxes/add',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'taxes',
            reducer
        })
        cb(null, TaxesAddView)
    }
})