import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import MyprofileView from './components/MyprofileView'
export const MyprofileViewRouter = (store) => ({
    "path": '/myprofile',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'myprofile',
            reducer
        })
        cb(null, MyprofileView)
    }
})