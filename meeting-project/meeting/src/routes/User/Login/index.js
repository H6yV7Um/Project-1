import {injectReducer} from 'store/reducers'

export default store => ({
    path: 'login/:code',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key: 'userLogin', reducer: require('./reducer').default})
            cb(null, require('./containers/Index').default)
        }, 'login')
    }
})
