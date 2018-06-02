import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import SignedView from './components/SignedView'
import SignedDetailsView from './components/SignedDetailsView'
export const SignedViewRouter = (store) => ({
    "path": '/workflow/signed',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'signed',
            reducer
        })
        cb(null, SignedView)
    }
})

export const SignedDetailsViewRouter = (store) => ({
    "path": '/workflow/signed/signeddetails',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'signed',
            reducer
        })
        cb(null, SignedDetailsView)
    }
})



