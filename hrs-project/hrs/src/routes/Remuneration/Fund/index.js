import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import FundView from './components/FundView'
import FundAddView from './components/FundAddView'

export const FundViewRouter = (store) => ({
    "path": '/remuneration/fund',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'fund',
            reducer
        })
        cb(null, FundView)
    }
})
export const FundAddViewRouter = (store) => ({
    "path": '/remuneration/fund/add',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'fund',
            reducer
        })
        cb(null, FundAddView)
    }
})