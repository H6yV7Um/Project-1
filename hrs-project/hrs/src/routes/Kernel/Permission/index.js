import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import PermissionView from './components/PermissionView'

export default (store) => ({
    "path": '/kernel/permission',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'permission',
            reducer
        })
        cb(null, PermissionView)
    }
})