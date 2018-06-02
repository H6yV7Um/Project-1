import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import RuleView from './components/RuleView'
import RuleLeaveAddView from './components/RuleLeaveAddView'
import RuleAddView from './components/RuleAddView'
export const RuleViewRouter = (store) => ({
    "path": '/attendance/rule',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'rule',
            reducer
        })
        cb(null, RuleView)
    }
})
export const RuleLeaveAddViewRouter = (store) => ({
    "path": '/attendance/rule/leaveadd',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'rule',
            reducer
        })
        cb(null, RuleLeaveAddView)
    }
})

export const RuleAddViewRouter = (store) => ({
    "path": '/attendance/rule/add',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'rule',
            reducer
        })
        cb(null, RuleAddView)
    }
})
