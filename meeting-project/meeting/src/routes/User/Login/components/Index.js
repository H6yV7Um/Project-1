import React, {Component, PropTypes} from 'react'
import Spin from '../containers/Spin'

import '../styles/Index.scss'

class Login extends Component {
    constructor (props) {
        super(props)

        this.state = {}
    }

    static propTypes = {
        params: PropTypes.object,
        loginMessage: PropTypes.string
    }

    componentWillMount () {
        this.props.login(this.props.params.code)
    }

    render () {
        let className = 'routeUserLogin'
        return (
            <Spin>
                <div className={className}>{this.props.loginMessage}</div>
            </Spin>
        )
    }
}

export default Login
