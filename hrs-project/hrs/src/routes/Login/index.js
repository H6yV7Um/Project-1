import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import LoginView from './components/LoginView'

export default (store) => ({
    "path": 'login',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'login',
            reducer
        })
        cb(null, LoginView)
    }
})