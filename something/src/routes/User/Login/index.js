import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from '../../../store/reducers';

import {login} from './action';

import './style.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        // 登录
        this.props.login(this.props.params.code);
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return(
            <div className="User-SetCode"></div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.userLogin,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    login : login
}

export default store => ({
    path : 'login/:code',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'userLogin', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Login))
        })
    }
})
