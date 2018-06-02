import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import { Menu as PcMenu, Pagination} from 'antd';
import browserAttr from 'utils/browserAttr';
import dd from 'utils/dingding';
import Icon from 'components/Icon';
import $ from 'jquery';

import {setLayoutFinish, setPage} from './action';

import './style.scss';

const SubMenu = PcMenu.SubMenu;

class RecruitLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height              :   null,
            openKeys            :   ['sub1']
        };

        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    }

    static propTypes =
    {

    }

    componentWillMount() {
        this.setState({height:document.documentElement.clientHeight})
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize)
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }


    onWindowResize = () => {
        this.setState({height:document.documentElement.clientHeight})
    }

    /**
     * 设置标题
     * @param title 标题
     */
    setTitle = title => {
        // 标题
        this.title = title;
        if(dd.os != 'pc') dd.biz.navigation.setTitle({title});
    }

    onOpenChange = (openKeys) => {
        console.log(openKeys)
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    // 当选择pc端菜单时
    handleSelect = item => {
        switch (item.key) {
            case '1':
                browserHistory.push('/recruit/dd/interview/userlist')
                break;
            case '2':
                browserHistory.push('/recruit/dd/backstage/job')
                break;
            case '3':
                browserHistory.push('/recruit/dd/backstage/hr')
                break;
            case '4':
                browserHistory.push('/recruit/dd/backstage/jobtype')
                break;
            case '5':
                browserHistory.push('/recruit/dd/offer/send')
                break;
            case '6':
                browserHistory.push('/recruit/dd/backstage/cv')
                break;
        }
    }

    render() {
        let className = 'RecruitLayout';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }


        return(
            <div className={componentClassName}>
                {
                    browserAttr.versions.mobile ?
                        this.props.children
                        :
                        <div className={`${className}-container`} style={{height: this.state.height}}>
                            <div className={`${className}-menu`}>
                                <PcMenu
                                    mode="inline"
                                    theme={'dark'}
                                    openKeys={this.state.openKeys}
                                    onOpenChange={this.onOpenChange}
                                    style={{ width: '100%' }}
                                    onSelect={item => {
                                        this.handleSelect(item);
                                    }}
                                >
                                    <SubMenu key="sub1" title={
                                        <span>
                                            <Icon className="icon" type="envelope-o" style={{color: '#fff'}}>&nbsp;</Icon>
                                            <span>面试管理</span>
                                        </span>}>
                                        <PcMenu.Item key="1">面试邀请</PcMenu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={
                                        <span>
                                            <Icon className="icon" type="cogs" style={{color: '#fff'}}>&nbsp;</Icon>
                                            <span>后台管理</span>
                                        </span>}>
                                        <PcMenu.Item key="2">岗位维护</PcMenu.Item>
                                        <PcMenu.Item key="3">HR联系方式维护</PcMenu.Item>
                                        <PcMenu.Item key="4">岗位类型维护</PcMenu.Item>
                                        <PcMenu.Item key="5">offer发放</PcMenu.Item>
                                        <PcMenu.Item key="6">简历库</PcMenu.Item>
                                        {/*<SubMenu key="sub3" title="Submenu">*/}
                                        {/*<PcMenu.Item key="7">Option 7</PcMenu.Item>*/}
                                        {/*<PcMenu.Item key="8">Option 8</PcMenu.Item>*/}
                                        {/*</SubMenu>*/}
                                    </SubMenu>
                                </PcMenu>
                            </div>
                            <div className={`${className}-pagination`}><Pagination/></div>
                            <div className={`${className}-content`} style={{height : this.state.height}}>
                                {this.props.children}
                            </div>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.showLayout,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    setLayoutFinish, setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(RecruitLayout);