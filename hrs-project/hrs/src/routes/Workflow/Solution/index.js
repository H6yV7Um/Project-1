import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import SolutionView from './components/SolutionView'
import SolutionAddView from './components/SolutionAddView'
import SolutionFlowDesignView from './components/SolutionFlowDesignView'
export const SolutionViewRouter = (store) => ({
    "path": '/workflow/solution',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'solution',
            reducer
        })
        cb(null, SolutionView)
    }
})

export const SolutionAddViewRouter = (store) => ({
    "path": '/workflow/solution/add',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'solution',
            reducer
        })
        cb(null, SolutionAddView)
    }
})

export const SolutionFlowDesignViewRouter = (store) => ({
    "path": '/workflow/solution/flowdesign',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'solution',
            reducer
        })
        cb(null, SolutionFlowDesignView)
    }
})