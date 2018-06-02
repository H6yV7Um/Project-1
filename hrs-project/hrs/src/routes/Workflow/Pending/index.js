import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import PendingView from './components/PendingView'
import ApproveView from './components/ApproveView'
export const PendingViewRouter = (store) => ({
    "path": '/workflow/pending',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'pending',
            reducer
        })
        cb(null, PendingView)
    }
})

export const ApproveViewRouter = (store) => ({
    "path": '/workflow/pending/approve',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'pending',
            reducer
        })
        cb(null, ApproveView)
    }
})
