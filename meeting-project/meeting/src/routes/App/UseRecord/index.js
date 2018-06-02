import {injectReducer} from 'store/reducers'

export default store => ({
    path: 'meeting/userecord',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key: 'userecord', reducer: require('./reducer').default})
            cb(null, require('./component').default)
        }, 'record')
    }
})