import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import HomeView from './components/HomeView'

export default (store) => ({
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'home',
            reducer
        })
        cb(null, HomeView)
    }
})