import {injectReducer} from 'store/reducers'
export default (store) => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const InsuranceLayoutView = require('./components/InsuranceLayoutView').default
            const reducer = require('./reducers').default

            injectReducer(store, {
                "key": 'insurance',
                reducer
            })
            cb(null, InsuranceLayoutView)
        }, 'insurance')
    },
    "path": 'remuneration/socialinsurance'
})