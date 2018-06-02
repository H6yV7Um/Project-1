import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {InputItem as InputItemAntd} from 'antd-mobile';
import browserAttr from 'utils/browserAttr';

import {showKeyboard, hideKeyboard} from '../../layouts/CoreLayout/action';

import './style.scss';

class InputItem extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        // 键盘是否显示
        this.isShowKeyboard = false;
    }

    static propTypes =
    {

    }

    componentWillUnmount() {
        if(this.isShowKeyboard)
        {
            // 隐藏键盘
            this.props.hideKeyboard();
        }
    }

    render()
    {
        let props = {...this.props};
        delete props.showKeyboard;
        delete props.hideKeyboard;

        let className = 'component-InputItem';
        if(props.disabled || props.editable == false)
        {
            className += ' component-InputItem-readonly';
        }
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <InputItemAntd
                {...props}
                className={className}
                onFocus={
                    val => {
                        // 移动端
                        if(browserAttr.versions.mobile && props.editable != false)
                        {
                            // 显示键盘
                            this.isShowKeyboard = true;
                            this.props.showKeyboard();
                        }

                        if(props.onFocus)
                        {
                            props.onFocus(val);
                        }
                    }
                }
                onBlur={
                    val => {
                        // 移动端
                        if(browserAttr.versions.mobile && props.editable != false)
                        {
                            // 隐藏键盘
                            this.isShowKeyboard = false;
                            this.props.hideKeyboard();
                        }

                        if(props.onBlur)
                        {
                            props.onBlur(val);
                        }
                    }
                }
            >
                {this.props.children}
            </InputItemAntd>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    showKeyboard, hideKeyboard
}

export default connect(mapStateToProps, mapDispatchToProps)(InputItem);