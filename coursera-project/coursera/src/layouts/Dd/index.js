import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spin} from 'antd';
import {Toast} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Coursera from '../Coursera';
import dd from 'utils/dingding';
import $ from 'jquery';

import {login, getUserInfo, getSignature} from './action';

import '../../styles/core.scss';
import './style.scss';

class Dd extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        // 获取签名鉴权
        this.props.getSignature();
        // 获取用户信息
        this.props.getUserInfo(
            data => {
                // console.log(data);
            },
            status => {
                // 钉钉ready
                dd.ready(res => {
                    // console.log(status)
                    // 登录
                    this.props.login(
                        data => {
                            // console.log(data);
                        },
                        status => {
                            Toast.info(<ToastContent type="fail" content="请加入tap4fun" />, 3, null, false);
                        }
                    );
                });
            }
        );

        dd.ready(res => {
            if(dd.os != 'pc')
            {
                // 禁用橡皮筋
                dd.ui.webViewBounce.disable();
                // 左侧按钮
                dd.biz.navigation.setLeft({
                    // 控制按钮显示
                    show: true,
                    // 是否控制点击事件
                    control: false,
                    // 控制显示文本，空字符串表示显示默认文本
                    text: '',
                    // 是否显示图标
                    showIcon: false
                });
                // 右侧按钮
                dd.biz.navigation.setRight({
                    // 控制按钮显示
                    show: false,
                    // 是否控制点击事件
                    control: false
                });
            }
        });
    }

    render() {
        let layout = null;

        if(this.props.reducer.userInfo)
        {
            layout = <Coursera>{this.props.children}</Coursera>;
        }

        return(
            <Spin spinning={!this.props.reducer.userInfo} style={{height : $(window).height()}}>
                <div
                    className="layoutDd"
                    style={
                        this.props.reducer.isShowModal
                            ?
                        {height : document.body.clientHeight}
                            :
                        {minHeight : document.body.clientHeight}
                    }
                >
                    {layout}
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.layoutDd
})

const mapDispatchToProps = {
    login, getUserInfo, getSignature
}

export default connect(mapStateToProps, mapDispatchToProps)(Dd);