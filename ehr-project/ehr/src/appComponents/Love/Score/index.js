import React, {Component, PropTypes} from 'react';
import Icon from 'components/Icon';
import {Toast} from 'antd-mobile';

import './style.scss';

class Score extends Component {
    static propTypes =
    {
        // 大小
        size                : React.PropTypes.oneOf(['lg', 'md', 'sm', 'x-sm']),
        //颜色
        color               : React.PropTypes.oneOf(['red', 'blue', 'purple', 'pink']),
        // 图标
        icon                : React.PropTypes.string,
        //分数
        score               : React.PropTypes.number.isRequired,
        // 内容
        content             : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.array]),
        //是否显示文字
        isShow              :React.PropTypes.bool
    }
    static defaultProps =
    {
        //图标
        icon                : '',
        // 大小
        size                : 'md',
        //颜色
        color               : 'red',
        //分数
        score               : '0',
        //是否显示文字
        isShow              : 'false'
    }
    handleClick = () =>{
        if(this.props.content){
            Toast.info(
                <span>
                    <Icon type='star-o' style={{marginRight:'10px'}}/>
                    {this.props.content}
                    {this.props.score}
                </span>
                , 1, false);
        }
    }

    render()
    {
        let className = 'componentScore';
        let componentClassName = className;
        let showScore = null;
        let showIcon = null;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }
        if(this.props.color){
            componentClassName += ` ${className}-${this.props.color}`;
        }
        if(this.props.size){
            componentClassName += ` ${className}-${this.props.size}`;
        }
        if(this.props.isShow){
            componentClassName += ` ${className}-score ${className}-${this.props.isShow}`;
            showScore = <span className={componentClassName}>{this.props.score}分</span>
        }
        if(this.props.icon){
            showIcon =  <Icon type={this.props.icon} className={componentClassName}/>
        }else{
            showIcon = null;
        }

        return (
            <span onClick={this.handleClick}>
                {showIcon}
                {showScore}
            </span>
            )
    }
}

export default Score;
