import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import getSrc from '../../utils/imgSrc'
import $ from 'jquery'
import {} from './action'
import './style.scss'
import {Tabs, Pagination, Dropdown, Select, Menu, Col} from 'antd'

const TabPane = Tabs.TabPane

class App extends Component {

    static propTypes = {
        layoutReducer: PropTypes.object,
        children: PropTypes.element
    }

    componentDidMount () {
        $(this.dom).parent().css({'float': 'left', 'padding-left': '15px', 'padding-right': '15px'})
    }

    tabsOnchange (key) {
        if (key === '1') {
            browserHistory.push('/')
        } else if (key === '2' || key === '4') {
            browserHistory.push({pathname: '/meeting/userecord', state: {isReload: true}})
        }
        // 切换tabs的时候清空selectedRowKeys
        this.setState({activeKey: key})
    }

    render () {
        let className = 'layoutApp'
        const menu = (
            <Menu>
                <Menu.Item>
                    <a />
                </Menu.Item>
            </Menu>
        )
        const operations = <div ref={(dom) => { this.dom = dom }} className={`${className}-logo`}
            style={{float: 'left'}}>
            <img className={`${className}-logo-image`} width={100} src={getSrc('meeting_logo.png')} />
            <span className={`${className}-logo-title`}>会议室预定</span>
        </div>
        const isAdministrator = this.props.layoutReducer.userInfo.status >= 200
        let activeKey = ''
        if (this.props.children.props.location.pathname === '/') {
            activeKey = '1'
        } else if (this.props.children.props.location.pathname === '/meeting/userecord' && !isAdministrator) {
            activeKey = '2'
        } else if (this.props.children.props.route.path === 'meeting/details/:id' && isAdministrator) {
            activeKey = '4'
        } else if (this.props.children.props.route.path === 'meeting/details/:id') {
            activeKey = '2'
        } else {
            activeKey = '4'
        }
        return (
            <div className={className}>
                {/* header */}
                {/* body */}
                <div className={`${className}-body`}>
                    <Tabs
                        tabBarExtraContent={operations}
                        tabPosition='top'
                        onChange={(key) => {
                            this.tabsOnchange(key)
                        }}
                        activeKey={activeKey}
                    >
                        <TabPane tab='会议室状态' key='1'>
                            {this.props.children}
                        </TabPane>
                        {(
                            isAdministrator
                                ? null
                                : <TabPane tab='使用记录' key='2'>
                                {this.props.children}
                            </TabPane>

                        )}
                        {(
                            isAdministrator
                                ? <TabPane tab='申请审批' key='4'>
                                {this.props.children}
                            </TabPane>
                                : null
                        )}
                    </Tabs>
                </div>
                {/* 引用样式 Pagination Dropdown 解决table组件的样式bug */}
                <div className={`${className}-pagination`}>
                    <Pagination />
                    <Dropdown
                        overlay={menu}
                    >
                        <a />
                    </Dropdown>
                    <Select mode='multiple' />
                    <Col />
                </div>
                {/* footer */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer: state.layoutApp,
    layoutReducer: state.layoutDd,
    userecordReducer: state.userecord
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
