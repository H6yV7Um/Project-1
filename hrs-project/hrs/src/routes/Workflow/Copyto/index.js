import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import CopytoView from './components/CopytoView'
import CopytoDetailsView from './components/CopytoDetailsView'
export const CopytoViewRouter = (store) => ({
    "path": '/workflow/copyto',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'copyto',
            reducer
        })
        cb(null, CopytoView)
    }
})
export const CopytoDetailsViewRouter = (store) => ({
    "path": '/workflow/copyto/copytodetails',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'copyto',
            reducer
        })
        cb(null, CopytoDetailsView)
    }
})
