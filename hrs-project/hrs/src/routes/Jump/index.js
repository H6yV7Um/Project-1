import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import JumpView from './components/JumpView'
export const JumpViewRouter = (store) => ({
    "path": 'jump',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'jump',
            reducer
        })
        cb(null, JumpView)
    }
})
