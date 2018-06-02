import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import SidebarLayout from 'components/SidebarLayout';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import dd from 'utils/dingding';
import $ from 'jquery';

import {setLayoutFinish, setPage} from './action';

import './style.scss';

class Ehr extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyPaddingTop : 0,
            bodyPaddingBottom : 0
        };
        // 默认标题
        this.defaultTitle = 'EHR';
        // 当前标题
        this.title = null;
    }

    static propTypes =
    {
        // app name
        appName             :   React.PropTypes.string,
    }

    componentWillMount() {
        this.setTitle(this.props.reducer.title || this.defaultTitle);

    }

    componentDidMount() {
        this.setLayout(true);
    }

    componentWillReceiveProps(nextProps) {
        if(this.title != (nextProps.reducer.title || this.defaultTitle))
        {
            this.setTitle(nextProps.reducer.title || this.defaultTitle);
        }
    }

    componentDidUpdate() {
        this.setLayout();
    }

    /**
     * 设置layout
     * @param isSet 是否强制设置
     */
    setLayout = isSet => {
        if(isSet || this.props.reducer.isSetLayout)
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
        let className = 'layoutEhr';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        // 头部
        let header = null;
        // 主体
        let body = this.props.children;
        // 尾部
        let footer = null;

        return(
            <div className={componentClassName}>
                <SidebarLayout
                    page={this.props.reducer.page}
                    setPage={page => this.props.setPage(page)}
                    onChangePage={this.props.reducer.onChangePage}
                    leftBody={this.props.reducer.leftBody}
                    leftBackgroundColor={'#F2F2F2'}
                    middleBody={
                        <div className={`${className}-main`}>
                            <div className={`${className}-header`} ref={dom => this.headerDom = dom}>{this.props.reducer.header === false ? null : this.props.reducer.header || header ||  <Header/>}</div>
                            <div className={`${className}-body`} style={{paddingTop : this.state.bodyPaddingTop, paddingBottom : this.state.bodyPaddingBottom}}>
                                {body}
                            </div>
                            <div className={`${className}-footer`} ref={dom => this.footerDom = dom}>{this.props.reducer.footer === false || this.props.publicReducer.isShowKeyboard ? null : this.props.reducer.footer || footer || <Footer/>}</div>
                        </div>
                    }
                    rightBody={<Menu menu={this.props.appName}/>}
                    rightBackgroundColor={'#4E394C'}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.layoutEhr,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    setLayoutFinish, setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Ehr);