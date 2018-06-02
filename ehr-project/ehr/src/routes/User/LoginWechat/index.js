import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation, getPosition} from 'utils/location';
import {hostName, appid} from 'config/wechat';
import {login} from './action';

import './style.scss';

class LoginWechat extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.scope = 'snsapi_userinfo';
    }

    componentWillMount() {
        let redirect_uri = `${hostName}${this.changeUrl(this.props.params.path)}`,
            path = `http://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${this.scope}&state=STATE#wechat_redirect`;
        window.location.href = path;
    }

    changeUrl = url => (
        `.${url}`.replace(/\./g,'/')
    );

    render() {

        return(
            //<Spin spinning={!this.props.reducer.loginMessage} style={{height : $(window).height()}}>
                <div className="routeUserLoginWechat">
                    {this.props.reducer.loginMessage}
                </div>
            //</Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.userLoginWechat,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    login : login
}

export default store => ({
    path : 'login/wechat/:path',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'userLoginWechat', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(LoginWechat))
        })
    }
})
