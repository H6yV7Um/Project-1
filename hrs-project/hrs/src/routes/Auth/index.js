import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import AuthView from './components/AuthView'

export default (store) => ({
    "path": 'auth',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'auth',
            reducer
        })
        cb(null, AuthView)
    }
})