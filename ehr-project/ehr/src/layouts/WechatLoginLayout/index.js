import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spin, BackTop} from 'antd';
import {Toast} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import dd from 'utils/dingding';
import $ from 'jquery';

import {login, getUserInfo, getSignature} from './action';

import '../../styles/core.scss';
import './style.scss';

class WechatLoginLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this.code = null;
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.code = this.getQueryString('code');
        // 获取签名鉴权
        this.props.getSignature(this.code
            ,() => {
                let host = process.env.NODE_ENV == 'development' ? 'http://172.20.70.62:3002' : 'http://ehr.tap4fun.com';
                window.location.href = `${host}/user/login/wechat/recruit.wechat.personalcenter.cv`
            });
    }

    // 获取url参数
    getQueryString = name => {
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if(r!=null)
            return  unescape(r[2]);
        return null;
    }


    render() {
        return(
            <Spin spinning={!this.props.reducer.userInfo} style={{height : $(window).height()}}>
                <div className="WechatLoginLayout">{this.props.reducer.userInfo ? this.props.children : null}<BackTop visibilityHeight={document.body.clientHeight} /></div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.wechatLoginLayout
})

const mapDispatchToProps = {
    login, getUserInfo, getSignature
}

export default connect(mapStateToProps, mapDispatchToProps)(WechatLoginLayout);