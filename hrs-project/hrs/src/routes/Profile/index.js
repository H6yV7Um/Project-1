import {injectReducer} from 'store/reducers'
import reducer from './reducers'
import ProfileView from './components/ProfileView'
import ProfileAddStepFirstView from './components/ProfileAddStepFirstView'
import ProfileAddStepSecondView from './components/ProfileAddStepSecondView'
import ProfileEmployeeDetailsView from './components/ProfileEmployeeDetailsView'
export const ProfileViewRouter = (store) => ({
    "path": 'profile',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'profile',
            reducer
        })
        cb(null, ProfileView)
    }
})
export const ProfileAddStepFirstViewRouter = (store) => ({
    "path": 'profile/stepfirst',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'profile',
            reducer
        })
        cb(null, ProfileAddStepFirstView)
    }
})
export const ProfileAddStepSecondViewRouter = (store) => ({
    "path": 'profile/stepsecond',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'profile',
            reducer
        })
        cb(null, ProfileAddStepSecondView)
    }
})
export const ProfileEmployeeDetailsViewRouter = (store) => ({
    "path": 'profile/details',
    getComponent (nextState, cb) {
        injectReducer(store, {
            "key": 'profile',
            reducer
        })
        cb(null, ProfileEmployeeDetailsView)
    }
})