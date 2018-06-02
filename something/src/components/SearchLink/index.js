import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {Row, Tag, Spin} from 'antd';
import Col from 'components/Col';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Modal from 'components/ModalAntd';
import $ from 'jquery';

import {setLayout, setDefaultLayout} from 'layouts/CoreLayout/action';
import './style.scss';

class SearchLink extends Component {
    constructor(props){
        super(props);

        const time = new Date().getTime();

        this.state = {

        };

        this.searchModalKey = time + 200;
    }

    static propTypes = {
        // 默认搜索
        default         :   React.PropTypes.string,
        // 点击之后跳转的路劲
        path            :   React.PropTypes.string,
        // 组件渲染的形式
        type            :   React.PropTypes.oneOf(['button', 'input'])
    }

    static defaultTypes = {
        // 默认搜索
        default         :   "",
        // modules
        path            :   "",
        // 组件渲染的形式
        type            :   'input'
    }

    link = () => {
        browserHistory.push(this.props.path);
    }

    render() {
        let className = `component-SearchLink`;
        let componentClassName = `${className}`;
        if(this.props.className) {
            componentClassName += ` ${this.props.className}`;
        }

        // 作为输入框显示
        let buttonType =  <div>
            <Button
                action={this.handleClick}
                name={'搜索'}
                type={'null'}
            />
        </div>
        // 作为按钮显示
        let inputType =
            <div className={`${className}-search-box`}>
                <div className={`${className}-search-content`}>
                    <Icon className={`${className}-icon`} classType="it" type={'sousuo-sousuo'}/>
                    <input
                        type="text"
                        placeholder={this.props.default}
                        onClick={this.link}
                    />
                </div>
            </div>


        return(
            <div className={componentClassName}>
                {this.props.type == "button" ? buttonType : inputType}
            </div>
        )
    }
}

export default SearchLink;