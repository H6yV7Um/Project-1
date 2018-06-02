import React, {Component, PropTypes} from 'react'
import {browserHistory, Router} from 'react-router'
import {Provider} from 'react-redux'

class AppContainer extends Component {
    static propTypes = {
        routes: PropTypes.array.isRequired,
        store: PropTypes.object.isRequired
    }

    shouldComponentUpdate() {
        return false
    }
    constructor(props) {
        super(props)
    }
    render() {
        const {routes, store} = this.props
        return (
            <Provider store={store}>
                <Router history={browserHistory} children={routes}/>
            </Provider>
        )
    }
}

export default AppContainer