import { injectReducer } from 'store/reducers'
export default store => ({
  path:'result',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'success', reducer: require('./reducer').default })
      cb(null, require('./component').default)
    }, 'success')
  }
})
