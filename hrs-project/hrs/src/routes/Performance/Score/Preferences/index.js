import {injectReducer} from 'store/reducers'
export default (store) => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const PreferencesView = require('./components/PreferencesView').default
            const reducer = require('./reducers').default
            injectReducer(store, {
                "key": 'preferences',
                reducer
            })
            cb(null, PreferencesView)
        }, 'preferences')
    },
    "path": 'performance/score/preferences'
})