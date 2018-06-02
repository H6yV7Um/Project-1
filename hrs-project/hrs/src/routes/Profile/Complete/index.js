import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import CompleteView from './components/CompleteView'

export const CompleteViewRouter = (store) => ({
    "path": '/profile/complete',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'complete',
            reducer
        })
        cb(null, CompleteView)
    }
})