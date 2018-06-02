import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Row, Tag, Spin} from 'antd';
import Col from 'components/Col';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Modal from 'components/Modal';
import getSrc from 'utils/imgSrc';
import browserAttr from 'utils/browserAttr';
import $ from 'jquery';

import {showKeyboard, hideKeyboard} from '../../layouts/DdLayout/action';
import './style.scss';

class SearchLink extends Component {
    constructor(props){
        super(props);

        this.state = {
            // 搜索模态框
            searchModal                 :   false
        };

        // 搜索模态框key
        this.searchModalKey = new Date().getTime();

        // 键盘是否显示
        this.isShowKeyboard = false;
    }

    static propTypes = {
        // placeHolder
        placeHolder                 :   React.PropTypes.string,
        // 组件渲染的形式
        type                        :   React.PropTypes.oneOf(['button', 'input']),
        // 搜索操作
        action                      :   React.PropTypes.func
    }

    static defaultTypes = {
        // placeHolder
        placeHolder                 :   '你想搜索什么?',
        // 组件渲染的形式
        type                        :   'input',
        // 搜索操作
        action                      :   () => {}
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if(this.isShowKeyboard)
        {
            // 隐藏键盘
            this.props.hideKeyboard();
        }
    }

    // 点击searchLink
    onClickInput = () => {
        // // 父组件onClick事件
        // this.props.onClick();
        // 改变模态框状态
        this.toggleModal();
    }

    // 切换模态框的显示状态
    toggleModal = () => {
        this.setState({searchModal : !this.state.searchModal});
        setTimeout(()=>{$(this.input)[0].focus();},10);
    }

    // 输入框获取焦点
    onFocus = () => {
        console.log('focus')
        if(browserAttr.versions.mobile)
        {
            setTimeout(()=>{
                // 显示键盘
                this.isShowKeyboard = true;
                this.props.showKeyboard();
            }, 10)
        }
    }

    // 输入框失去焦点
    onBlur = () => {
        console.log('blur')
        // 移动端
        if(browserAttr.versions.mobile)
        {
            setTimeout(()=>{
                // 隐藏键盘
                this.isShowKeyboard = false;
                this.props.hideKeyboard();
            }, 10)
        }
    }

    render() {
        let className = `component-SearchLink`;
        let componentClassName = `${className}`;
        if(this.props.className) {
            componentClassName += ` ${this.props.className}`;
        }

        let searchLinkLayout = null,
            searchLayout = null,
            modal = null;

        // 搜索link
        searchLinkLayout = (<div className={`${componentClassName}-searchLinkContainer`}>
            {/*公司logo和搜索logo*/}
            <div className={`${componentClassName}-logo-container`}>
                <div className={`${componentClassName}-logo`}><img src={getSrc('PersonalCenter/Result/logo.png')} alt="tap4fun"/></div>
                <div className={`${componentClassName}-search-logo`}><Icon type={'search'} style={{color: '#999'}}/></div>
            </div>
            {/*右侧模拟输入框*/}
            <div className={`${componentClassName}-input-container`} onClick={()=>{this.onClickInput()}}><div className={`${componentClassName}-input`}>{this.props.placeHolder}</div></div>
            {/*搜索模态框*/}
        </div>);

        // 搜索
        searchLayout = (<div className={`${componentClassName}-searchModal-searchContainer`}>
            {/*搜索logo*/}
            <div className={`${componentClassName}-logo-container`}><div className={`${componentClassName}-search-logo`}><Icon type={'search'} style={{color: '#fff'}}/></div></div>
            {/*输入框*/}
            <div className={`${componentClassName}-input-container`}>
                <input type="text" className={`${componentClassName}-input`} ref={dom => this.input = dom}/>
            </div>
            {/*右侧取消按钮*/}
            <div className={`${componentClassName}-cancel-container`} onClick={()=>{this.toggleModal()}}>取消</div>
        </div>);

        // 搜索模态框
        modal = (<Modal
            key={this.searchModalKey}
            className={`${componentClassName}-searchModal`}
            isShow={this.state.searchModal}
            positionX={'top'}
            modalShowTime={100}
            modalHideTime={100}
            contentShowTime={100}
            contentHideTime={100}
        >
            <div className={`${componentClassName}-searchModal-header`}>
                {searchLayout}
            </div>
        </Modal>);

        return(
            <div className={componentClassName}>
                {/*搜索框*/}
                {searchLinkLayout}
                {/*模态框*/}
                {modal}
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    showKeyboard, hideKeyboard
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLink);