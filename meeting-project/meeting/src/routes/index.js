import {injectReducer} from '../store/reducers'

// user
import UserLogin from './User/Login'

// mobile
import Mobile from './Mobile'

// app
import MeetingRoomStatus from './App/MeetingRoomStatus'
import UseRecord from './App/UseRecord'
import MeetingDetails from './App/MeetingDetails'
import MeetingCheck from './App/MeetingCheck'

export const createRoutes = (store) => [
    {
        path: '/',
        indexRoute: MeetingRoomStatus(store),
        childRoutes: [
            UseRecord(store),
            MeetingDetails(store),
            MeetingCheck(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key: 'layoutDd', reducer: require('../layouts/Dd/reducer').default})
                injectReducer(store, {key: 'layoutApp', reducer: require('../layouts/App/reducer').default})
                cb(null, require('../layouts/Dd').default)
            }, 'LayoutDd')
        }
    },
    {
        path: '/user',
        childRoutes: [
            UserLogin(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key: 'LayoutBase', reducer: require('../layouts/Base/reducer').default})
                cb(null, require('../layouts/Base').default)
            }, 'LayoutBase')
        }
    },
    {
        path: '/mobile',
        indexRoute: Mobile(store),
        childRoutes: [],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key: 'LayoutBase', reducer: require('../layouts/Base/reducer').default})
                cb(null, require('../layouts/Base').default)
            }, 'LayoutBase')
        }
    }
]

export default createRoutes
