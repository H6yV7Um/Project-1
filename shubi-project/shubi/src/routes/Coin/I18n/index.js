import { injectReducer } from 'store/reducers'
export default store => ({
  path: 'i18n',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'i18n-test', reducer: require('./reducer').default })
      cb(null, require('./component').default)
    }, 'i18n-test')
  }
})
