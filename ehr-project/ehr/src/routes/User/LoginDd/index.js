import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin} from 'antd';
import $ from 'jquery';

import {login} from './action';

import './style.scss';

class LoginDd extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        // 登录
        this.props.login(this.props.params.developmentCode, data => {
            setTimeout(() => {
                // 跳转
                window.location.href = '/';
            }, 1000);
        });
    }

    render() {

        return(
            <Spin spinning={!this.props.reducer.loginMessage} style={{height : $(window).height()}}>
                <div className="routeUserLoginDd">
                    {this.props.reducer.loginMessage}
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.userLoginDd,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    login : login
}

export default store => ({
    path : 'login/:developmentCode',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'userLoginDd', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(LoginDd))
        })
    }
})
