import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import browserAttr from '../../utils/browserAttr'
import {Spin} from 'antd'
import {Toast} from 'antd-mobile'
import ToastContent from 'components/ToastContent'
import App from '../App'
import dd from 'utils/dingding'
import $ from 'jquery'
import {login, getUserInfo, getSignature} from './action'

import '../../styles/core.scss'
import './style.scss'

class Dd extends Component {
    constructor (props) {
        super(props)

        this.state = {}
    }

    static propTypes = {
        getUserInfo: PropTypes.func,
        getSignature: PropTypes.func,
        login: PropTypes.func,
        layoutReducer: PropTypes.object,
        children: PropTypes.element
    }

    componentWillMount () {
        // 暂不支持移动端
        if (browserAttr.versions.mobile && this.props.children.props.route.path !== 'meeting/check/:id') {
            window.location.href = '/mobile'
        }

        // 获取用户信息
        this.props.getUserInfo(
            data => {
                // console.log(data);
                // 获取签名鉴权
                this.props.getSignature()
            },
            status => {
                // 登录
                this.props.login(
                    data => {
                        // console.log(data);
                        // 获取签名鉴权
                        this.props.getSignature()
                    },
                    status => {
                        Toast.info(<ToastContent type='fail' content='请加入tap4fun' />, 3, null, false)
                    }
                )
            }
        )

        dd.ready(res => {
            if (dd.os !== 'pc') {
                // 禁用橡皮筋
                dd.ui.webViewBounce.disable()
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
                })
                // 右侧按钮
                dd.biz.navigation.setRight({
                    // 控制按钮显示
                    show: false,
                    // 是否控制点击事件
                    control: false
                })
            }
        })
    }

    render () {
        let className = 'layoutDdPc'
        let layout = null
        if (this.props.layoutReducer.userInfo) {
            if (this.props.children.props.route.path === 'meeting/check/:id') {
                layout = <div>{this.props.children}</div>
            } else {
                layout = <App>{this.props.children}</App>
            }
        }
        return (
            <Spin spinning={!this.props.layoutReducer.userInfo} style={{height: $(window).height()}}>
                <div
                    className={className}
                    style={{height: document.body.clientHeight}}
                >
                    {layout}
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    layoutReducer: state.layoutDd
})

const mapDispatchToProps = {
    login, getUserInfo, getSignature
}

export default connect(mapStateToProps, mapDispatchToProps)(Dd)
