export default store => ({
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component').default)
        }, 'mobile')
    }
})
