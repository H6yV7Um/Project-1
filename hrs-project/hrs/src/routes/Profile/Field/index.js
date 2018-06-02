import {injectReducer} from 'store/reducers'

export default (store) => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const FieldView = require('./components/FieldView').default
            const reducer = require('./reducers').default

            injectReducer(store, {
                "key": 'field',
                reducer
            })
            cb(null, FieldView)
        }, 'field')
    },
    "path": 'profile/field'
})