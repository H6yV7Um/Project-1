import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {List, Toast} from 'antd-mobile';
import Ding from 'appComponents/Dingding/Ding';
import Icon from 'components/Icon';
import Avatar from 'components/Avatar';
import dd from 'utils/dingding';
import $ from 'jquery';
import {corpId} from 'config/app';

import './style.scss';

class Remind extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 当前选择人列表
            users       : []
        };
    }

    static propTypes =
    {
        // 标签名
        labelName       : React.PropTypes.string,
        // 设置值
        setValues       : React.PropTypes.func.isRequired,
        // 设置执行Ding (null则不Ding)
        setRunDing      : React.PropTypes.func,
        // 是否Ding
        isDing          : React.PropTypes.bool
    }

    static defaultProps =
    {
        // 标签名
        labelName       : '提醒谁看 @',
        // 设置执行Ding
        setRunDing      : ()=>{}
    }

    componentWillMount() {
        if(this.props.setRunDing)
        {
            this.props.setRunDing(()=>{});
        }
    }

    componentDidMount() {
        // 设置初始值
        this.setValues(this.state.users);
    }

    choose = () => {
        let users = [];
        let config = {};
        if(dd.os != 'pc')
        {
            config = {
                startWithDepartmentId : -1,
                limitTips : '不能选择更多的人了',
                local : true,
                isNeedSearch : true,
                title : '请选择'
            }
        }

        this.state.users.map((v, k) => {
            users.push(v.emplId);
        })

        dd.biz.contact.choose({
            ...config,
            users,
            multiple : true,
            corpId,
            max : 1500,
            onSuccess : data => {
                this.setState({users: data});
                // 设置值
                this.setValues(data);
            },
            onFail : err => {
                this.setState({users: []});
                // 设置值
                this.setValues([]);
            }
        })
    }

    /**
     * 设置值
     * @param users     当前选择人列表
     */
    setValues = (users) => {
        let userIds = [];
        if(users.length == 0)
        {
            this.props.setValues({
                users,
                userIds
            });
        }
        else
        {
            users.map((v, k) => {
                userIds.push(v.emplId);
            })
            this.props.setValues({
                users,
                userIds
            });
        }
    }

    render()
    {
        const Item = List.Item;

        let className = 'component-Dingding-Remind';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        let users = null;
        let ding = null;
        if(this.state.users.length > 0)
        {
            let avatars = [];
            this.state.users.map((v, k) => {
                avatars.push(v.avatar);
            })

            // 当前选择人列表
            users =
                <Item className="users" extra={
                    <div className="users-clear-border" onClick={()=>{
                        this.setState({users: []});
                        // 设置值
                        this.setValues([]);
                    }}>
                        <Icon className="users-clear" type={'times-circle'}/>
                    </div>
                }>
                    <Avatar className="avatar" url={avatars} size={'sm'} maxWidth={($(this.atDom).width() - 30) * 0.85} />
                </Item>

            // DING
            if(this.props.setRunDing != null)
            {
                ding =
                    <Ding
                        setRunDing={this.props.setRunDing}
                        isDing={this.props.isDing}
                    />
            }
        }

        return(
            <div className={componentClassName} ref={dom=>this.atDom=dom}>
                <Item className="choose" arrow="horizontal" onClick={this.choose}>
                    {this.props.labelName}
                </Item>
                {users}
                {ding}
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Remind);