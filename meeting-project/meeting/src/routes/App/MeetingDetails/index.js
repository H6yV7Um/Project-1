import {injectReducer} from 'store/reducers'

export default store => ({
    path: 'meeting/details/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key: 'meetingDetails', reducer: require('./reducer').default})
            cb(null, require('./component').default)
        }, 'details')
    }
})