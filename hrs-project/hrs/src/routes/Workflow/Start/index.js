import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import StartView from './components/StartView'
import StartApprovalView from './components/StartApprovalView'
export const StartViewRouter = (store) => ({
    "path": '/workflow/start',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'start',
            reducer
        })
        cb(null, StartView)
    }
})

export const StartApprovalViewRouter = (store) => ({
    "path": '/workflow/start/startapproval',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'start',
            reducer
        })
        cb(null, StartApprovalView)
    }
})
