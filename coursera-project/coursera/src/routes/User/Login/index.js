import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin} from 'antd';
import $ from 'jquery';

import {login} from './action';

import './style.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        // 登录
        this.props.login(this.props.params.code, data => {
            setTimeout(() => {
                // 跳转
                window.location.href = '/';
            }, 1000);
        });
    }

    render() {

        return(
            <Spin spinning={!this.props.reducer.loginMessage} style={{height : $(window).height()}}>
                <div className="routeUserLogin">
                    {this.props.reducer.loginMessage}
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.userLogin,
    publicReducer : state.layoutBase
})

const mapDispatchToProps = {
    login : login
}

export default store => ({
    path : 'login/:code',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'userLogin', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Login))
        })
    }
})
