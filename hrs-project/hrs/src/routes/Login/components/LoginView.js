import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {loginRun} from '../actions/LoginAction'

import './LoginStyle.scss'

class LoginView extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isRedirect : true
        };
    }

    static propTypes =
    {
        login         : React.PropTypes.object.isRequired,
        loginRun      : React.PropTypes.func.isRequired
    }

    componentDidMount()
    {
        this.props.loginRun(this.props.location.query.code)
    }

    componentDidUpdate()
    {
        if(this.props.login.login.isLogin && this.state.isRedirect)
        {
            this.state.isRedirect = false
            this.props.router.push('/')
        }
    }

    render()
    {
        return (<div>正在登陆...</div>)
    }
}

const mapStateToProps = (state) => ({
    login      : state.login
})

const mapDispatchToProps = {
    //执行登录
    loginRun   : loginRun
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
