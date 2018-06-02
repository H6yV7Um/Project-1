import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import DingdingView from './components/DingdingView'

export default (store) => ({
    "path": 'dingding',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'dingding',
            reducer
        })
        cb(null, DingdingView)
    }
})