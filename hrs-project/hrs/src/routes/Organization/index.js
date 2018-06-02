import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import OrganizationView from './components/OrganizationView'

export default (store) => ({
    "path": '/organization',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'organization',
            reducer
        })
        cb(null, OrganizationView)
    }
})