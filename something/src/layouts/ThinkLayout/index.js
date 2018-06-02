import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import SidebarLayout from 'components/SidebarLayout';
import Header from './Header';
import Footer from './Footer';
import dd from 'utils/dingding';
import $ from 'jquery';

import {setLayoutFinish, setPage} from './action';

import './style.scss';

class ThinkLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyPaddingTop : 0,
            bodyPaddingBottom : 0
        };
        // 默认标题
        this.defaultTitle = 'THINK DIFFERENT';
        // 当前标题
        this.title = null;
    }

    static propTypes =
    {

    }

    componentWillMount() {
        this.setTitle(this.props.reducer.title || this.defaultTitle);

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if(this.title != (nextProps.reducer.title || this.defaultTitle))
        {
            this.setTitle(nextProps.reducer.title || this.defaultTitle);
        }
    }

    componentDidUpdate() {
        // 设置layout
        if(this.props.reducer.isSetLayout)
        {
            setTimeout(()=>{
                const bodyPaddingTop = $(this.headerDom).outerHeight(true);
                const bodyPaddingBottom = $(this.footerDom).outerHeight(true);
                if(this.state.bodyPaddingTop != bodyPaddingTop || this.state.bodyPaddingBottom != bodyPaddingBottom)
                {
                    this.setState({bodyPaddingTop, bodyPaddingBottom});
                }
            }, 100);

            this.props.setLayoutFinish();
        }
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

    render() {
        let className = 'ThinkLayout';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        // admin
        const admin =
            <div style={{width : $(window).width() - 100 > 500 ? 500 : $(window).width() - 100, minHeight : $(window).height() + 100, textAlign : 'center', paddingTop : 200, color : '#fff', fontSize : 30}}>
                ADMIN
            </div>

        // home
        const home =
            <div style={{width : $(window).width() - 100 > 500 ? 500 : $(window).width() - 100, minHeight : $(window).height() + 100, textAlign : 'center', paddingTop : 200, color : '#000', fontSize : 30}}>
                HOME
            </div>

        return(
            <div className={componentClassName}>
                <SidebarLayout
                    page={this.props.reducer.page}
                    setPage={page => this.props.setPage(page)}
                    leftBody={admin}
                    leftBackgroundColor={'#4E394C'}
                    middleBody={
                        <div className={`${className}-main`}>
                            <div className={`${className}-header`} ref={dom => this.headerDom = dom}>{this.props.reducer.header || <Header />}</div>
                            <div className={`${className}-body`} style={{paddingTop : this.state.bodyPaddingTop, paddingBottom : this.state.bodyPaddingBottom}}>
                                {this.props.children}
                            </div>
                            <div className={`${className}-footer`} ref={dom => this.footerDom = dom}>{this.props.reducer.footer === false || this.props.coreReducer.isShowKeyboard ? null : this.props.reducer.footer || <Footer />}</div>
                        </div>
                    }
                    rightBody={home}
                    rightBackgroundColor={'#FFFFFF'}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.thinkLayout,
    coreReducer : state.coreLayout
})

const mapDispatchToProps = {
    setLayoutFinish, setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(ThinkLayout);