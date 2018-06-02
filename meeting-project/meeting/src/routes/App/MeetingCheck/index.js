import {injectReducer} from 'store/reducers'

export default store => ({
    path: 'meeting/check/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key: 'meetingCheck', reducer: require('./reducer').default})
            cb(null, require('./component').default)
        }, 'check')
    }
})
