import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import ScrollPage from 'components/ScrollPage';
import ChangePanel from 'components/ChangePanel';
import Page from 'components/ScrollPage/Page';
import dd from 'utils/dingding';
import $ from 'jquery';

import {} from './action';

import './style.scss';

class ThinkLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 页数
            page                    :   2,
            // admin X
            adminX                  :   0,
            // admin 偏移X
            adminDeviationX         :   0,
            // website X
            websiteX                :   $(window).width(),
            // website border display
            websiteBorderDisplay    :   'none',
            // website border opacity
            websiteBorderOpacity    :   0,
            // home X
            homeX                   :   $(window).width() * 2,
            // home 偏移X
            homeDeviationX          :   0
        };
        // 默认标题
        this.defaultTitle = 'THINK DIFFERENT';
        // 侧栏宽度(admin、home)
        this.sideBarWidth = $(window).width() - 100 > 500 ? 500 : $(window).width() - 100;
    }

    static propTypes =
    {

    }

    componentWillMount() {

    }

    componentDidMount() {
        // 初始化
        // this.props.children.props.router.replace('/think/admin');
        // setTimeout(() => this.props.children.props.router.replace('/think/home'), 10);
        // setTimeout(() => this.props.children.props.router.replace('/think/website'), 20);
        // setTimeout(() => this.props.children.props.router.replace(this.props.children.props.location.pathname), 30);
    }

    componentWillReceiveProps(nextProps) {
        // 标题
        if(dd.os != 'pc') dd.biz.navigation.setTitle({title : nextProps.reducer.title || this.defaultTitle});
    }

    render() {
        let className = 'ThinkLayout';
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <div className={className}>
                <ScrollPage
                    className={`${className}-scrollPage`}
                    type={'X'}
                    isOwnChange={false}
                    changeSpeed={0.75}
                    page={this.state.page}
                    pageSum={3}
                    onMoving={(x, y, page) => {
                        //console.log(`${x} ${y} ${page}`);
                        if(x != 0)
                        {
                            const opacity = (Math.abs(x) > 100 ? 100 : Math.abs(x)) / 100;
                            switch(page)
                            {
                                case 1:
                                    this.setState({adminDeviationX : x > this.sideBarWidth ? this.sideBarWidth : x, homeDeviationX : 0, websiteBorderDisplay : 'block', websiteBorderOpacity : opacity});
                                    break;
                                case 2:
                                    if(x < 0)
                                    {
                                        this.setState({adminDeviationX : x, homeDeviationX : 0, websiteBorderDisplay : 'block', websiteBorderOpacity : 1 - opacity});
                                    }
                                    else
                                    {
                                        this.setState({homeDeviationX : x, adminDeviationX : 0, websiteBorderDisplay : 'block', websiteBorderOpacity : 1 - opacity});
                                    }
                                    break;
                                case 3:
                                    this.setState({homeDeviationX : x * -1 > this.sideBarWidth ? this.sideBarWidth * -1 : x, adminDeviationX : 0, websiteBorderDisplay : 'block', websiteBorderOpacity : opacity});
                                    break;
                            }
                        }
                    }}
                    onMoveEnd={(isChange, page, direction) => {
                        //console.log(`${isChange} ${page}`);
                        if(isChange)
                        {
                            switch(page)
                            {
                                case 1:
                                    this.setState({adminX : this.sideBarWidth, homeX : $(window).width() * 2, adminDeviationX : 0, homeDeviationX : 0, page, websiteBorderDisplay : 'block', websiteBorderOpacity : 1});
                                    break;
                                case 2:
                                    this.setState({adminX : 0, homeX : $(window).width() * 2, adminDeviationX : 0, homeDeviationX : 0, page, websiteBorderOpacity : 0});
                                    setTimeout(() => {this.setState({websiteBorderDisplay : 'none'})}, 200);
                                    break;
                                case 3:
                                    this.setState({homeX : $(window).width() * 2 - this.sideBarWidth, adminX : 0, adminDeviationX : 0, homeDeviationX : 0, page, websiteBorderDisplay : 'block', websiteBorderOpacity : 1});
                                    break;
                            }
                        }
                        else
                        {
                            this.setState({adminDeviationX : 0, homeDeviationX : 0, websiteBorderOpacity : this.state.page == 2 ? 0 : 1});
                            if(this.state.page == 2) setTimeout(() => {this.setState({websiteBorderDisplay : 'none'})}, 200);
                        }
                    }}
                >
                    {/*admin*/}
                    <Page
                        className={`${className}-page ${className}-page-admin`}
                        style={{width : $(window).width(), minHeight : $(window).height(), paddingLeft : ($(window).width() - this.sideBarWidth)}}
                        x={this.state.adminX}
                        deviationX={this.state.adminDeviationX}
                        duration={200}
                        animateName={'easeOutQuad'}
                    >
                        <div style={{backgroundColor : '#3BA3AE', minHeight : $(window).height()}}>admin</div>
                    </Page>

                    {/*website*/}
                    <Page
                        className={`${className}-page ${className}-page-website`}
                        style={{width : $(window).width(), minHeight : $(window).height()}}
                        x={this.state.websiteX}
                    >
                        {/*website border*/}
                        <div
                            className={`${className}-website-border`}
                            style={{width : $(window).width(), height : $(window).height(), display : this.state.websiteBorderDisplay, backgroundColor : `rgba(0, 0, 0, ${this.state.websiteBorderOpacity * 0.4})`}}
                            onClick={() => {
                                this.setState({adminX : 0, homeX : $(window).width() * 2, adminDeviationX : 0, homeDeviationX : 0, page : 2, websiteBorderOpacity : 0});
                                setTimeout(() => {this.setState({websiteBorderDisplay : 'none'})}, 200);
                            }}
                        />
                        {/*website body*/}
                        <div className={`${className}-website-body`}>
                            {this.props.children}
                        </div>
                    </Page>

                    {/*home*/}
                    <Page
                        className={`${className}-page ${className}-page-home`}
                        style={{width : $(window).width(), minHeight : $(window).height(), paddingRight : ($(window).width() - this.sideBarWidth)}}
                        x={this.state.homeX}
                        deviationX={this.state.homeDeviationX}
                        duration={200}
                        animateName={'easeOutQuad'}
                    >
                        <div style={{backgroundColor : '#AE6B7F', minHeight : $(window).height()}}>home</div>
                    </Page>

                    {/*<ChangePanel*/}
                        {/*className={`${className}-border`}*/}
                        {/*style={{width : $(window).width(), height : $(window).height()}}*/}
                        {/*changeKeys={['TestA1', 'TestA2', 'admin']}*/}
                        {/*thisKey={this.props.children.props.route.path}*/}
                    {/*>*/}
                        {/*{this.props.children}*/}
                    {/*</ChangePanel>*/}
                    {/*<ChangePanel*/}
                        {/*className={`${className}-border`}*/}
                        {/*style={{width : $(window).width(), height : $(window).height()}}*/}
                        {/*changeKeys={['TestB1', 'TestB2', 'website']}*/}
                        {/*thisKey={this.props.children.props.route.path}*/}
                    {/*>*/}
                        {/*{this.props.children}*/}
                    {/*</ChangePanel>*/}
                    {/*<ChangePanel*/}
                        {/*className={`${className}-border`}*/}
                        {/*style={{width : $(window).width(), height : $(window).height()}}*/}
                        {/*changeKeys={['TestC1', 'TestC2', 'home']}*/}
                        {/*thisKey={this.props.children.props.route.path}*/}
                    {/*>*/}
                        {/*{this.props.children}*/}
                    {/*</ChangePanel>*/}
                </ScrollPage>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.thinkLayout,
    coreReducer : state.coreLayout
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ThinkLayout);