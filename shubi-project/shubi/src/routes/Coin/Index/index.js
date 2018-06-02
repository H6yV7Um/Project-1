import { injectReducer } from 'store/reducers'
export default store => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'index', reducer: require('./reducer').default })
      cb(null, require('./component').default)
    }, 'index')
  }
})
