import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import HistoryView from './components/HistoryView'
import DetailsView from './components/DetailsView'
export const HistoryViewRouter = (store) => ({
    "path": '/workflow/history',
    getComponent (nextState, cb) {

        injectReducer(store, {
            "key": 'history',
            reducer
        })
        cb(null, HistoryView)
    }
})

export const DetailsViewRouter = (store) => ({
    "path": '/workflow/history/details',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'history',
            reducer
        })
        cb(null, DetailsView)
    }
})
