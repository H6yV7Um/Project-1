import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {List, Toast} from 'antd-mobile';
import Switch from 'components/Switch';
import Icon from 'components/Icon';
import dd from 'utils/dingding';
import {corpId} from 'config/app';

import './style.scss';

class Ding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 是否Ding
            isDing          : props.isDing
        };
    }

    static propTypes =
    {
        // 设置执行Ding
        setRunDing          : React.PropTypes.func.isRequired,
        // 是否Ding
        isDing              : React.PropTypes.bool
    }

    static defaultProps =
    {
        // 是否Ding
        isDing              : false
    }

    componentWillMount() {
        this.props.setRunDing(this.runDing);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    /**
     * 执行Ding
     * @param userIds       用户ID: 1,2,3 || [1,2,3]
     * @param content       内容
     * @param title         附件标题
     * @param text          附件文本
     * @param url           附件链接
     * @param image         图片地址
     */
    runDing = (userIds, content, title, text, url, image) => {
        if(userIds && userIds.length > 0 && this.state.isDing)
        {
            if(Object.prototype.toString.call(userIds) == '[object String]')
            {
                userIds = userIds.split(',');
            }
            dd.biz.ding.post({
                users : userIds,
                corpId,
                type : 2,
                attachment : {
                    title,
                    url,
                    image,
                    text
                },
                text : content,
                onSuccess : data => {console.log(data)},
                onFail : err => {console.log(err)}
            });
        }
    }

    render()
    {
        const Item = List.Item;

        let className = 'component-Dingding-Ding';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName} style={this.props.style}>
                <Item extra={
                    <Switch
                        checked={this.state.isDing}
                        onChange={checked => {
                            this.setState({isDing: checked});
                        }}
                    />
                }>
                    <Icon className="ding-icon" type={'thumb-tack'}/>
                    <div className="ding-name">DING</div>
                </Item>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Ding);