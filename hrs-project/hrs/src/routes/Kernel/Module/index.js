import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import ListView from './components/ListView'
export default (store) => ({
    "path": '/kernel/module',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'module',
            reducer
        })
        cb(null, ListView)
    }
})