import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import MyWorkmateView from './components/MyWorkmateView'

export const MyWorkmateViewRouter = (store) => ({
    "path": '/attendance/myworkmate',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'myworkmate',
            reducer
        })
        cb(null, MyWorkmateView)
    }
})
