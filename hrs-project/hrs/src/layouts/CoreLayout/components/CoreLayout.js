import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import { Layout, Menu, Icon, Breadcrumb, Spin, Alert, message } from 'antd'
import {getCurrent, setNetworkError} from '../actions/User'
import {getMenus} from '../actions/Menu'
import {CoreHeader} from './CoreHeader'
import CoreSider from './CoreSider'
import {CoreFooter} from './CoreFooter'

import './Style.scss'

const { Content, Sider } = Layout

class CoreLayout extends Component {
    static propTypes =
    {
        children    : React.PropTypes.element.isRequired,
        coreLayout  : React.PropTypes.object.isRequired,
        setNetworkError: React.PropTypes.func.isRequired
    }
    state = {
        collapsed: false,
        mode: 'inline',
    }
    toggle = (collapsed) => {
        this.setState({
          collapsed,
          mode: collapsed ? 'vertical' : 'inline',
        })
    }
    async componentWillMount()
    {
        await this.props.getCurrent()
        await this.props.getMenus()
    }
    componentWillReceiveProps(nextProps)
    {
        if(!this.props.coreLayout.user.networkError && nextProps.coreLayout.user.networkError)
        {
            message.error('网络状态异常，请检查您的网络连接。', 1.5, ()=>{
                this.props.setNetworkError()
            });
        }
    }
    componentWillUpdate()
    {
        // if(this.props.coreLayout.user.currentErrorCode)
        // {
            // location='/hrs/accessdenied'
        // }
    }
    getBread()
    {
        if(this.props.location.pathname=='/')
        {
            return (
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/"><Icon type="home" /> 首页</Link></Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        if(this.props.coreLayout.menu.menus)
        {
            let menus = this.props.coreLayout.menu.menus
            for(let i=0;i<menus.length;i++)
            {
                for(let u=0;u<menus[i].sub.length;u++)
                {
                    if(menus[i].sub[u].url==this.props.location.pathname)
                    {
                        return (
                            <Breadcrumb>
                            <Breadcrumb.Item><Link to="/"><Icon type="home" /> 首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Icon type={menus[i].icon} /> {menus[i].name}</Breadcrumb.Item>
                            <Breadcrumb.Item>{menus[i].sub[u].name}</Breadcrumb.Item>
                            </Breadcrumb>
                        )
                    }
                }
            }
        }
        else
        {
            return (
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/"><Icon type="home" />首页</Link></Breadcrumb.Item>
                </Breadcrumb>
            )
        }
    }
    render()
    {
        if(Object.keys(this.props.coreLayout.user).length)
        {
            return (
                <Layout className="layout-topaside">
                    <CoreHeader user={this.props.coreLayout.user}></CoreHeader>
                    <Layout className="layout-wrapper">
                          {this.getBread()}
                        <Layout className="layout-container">
                            <Sider className="layout-sider">
                                <CoreSider location={this.props.location} menu={this.props.coreLayout.menu}></CoreSider>
                            </Sider>
                            <Content className="layout-content">
                                {this.props.children}
                            </Content>
                        </Layout>
                        <CoreFooter></CoreFooter>
                    </Layout>
                </Layout>
            )
        }
        else
        {
            return (
                <Layout className="layout-loading">
                    <Spin size="large"></Spin>
                </Layout>
                )
        }
    }
}
const mapStateToProps = (state) => ({
    coreLayout  : state.coreLayout
})
const mapDispatchToProps = {
    getCurrent,
    getMenus,
    setNetworkError
}
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)