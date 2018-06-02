import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Select as SelectAntd} from 'antd';
import Select from 'components/Select';

import {getUsers} from './action';

import './style.scss';

// 成员选择
class UserSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 成员列表
            users : []
        };
    }

    static propTypes =
    {
        // 是否只选管理成员 (true时将只可选自己管理部门成员(包括子部门成员))
        isLeader            :   React.PropTypes.bool,
        // 成员
        value               :   React.PropTypes.array,
        /**
         * 事件:选择成员后
         * @param value 成员
         */
        onChange            :   React.PropTypes.func
    }

    static defaultProps =
    {
        isLeader            :   true,
        onChange            :   value => {}
    }

    componentWillMount() {
        // 初始化数据
        this.props.getUsers(this.props.isLeader, data => {
            let users = [];
            // console.log(data);
            data.map((v, k) => {
                users.push(<SelectAntd.Option key={v.user_id} title={v.name} value={v.user_id}>{v.name}</SelectAntd.Option>);
            })
            this.setState({users});
        });
    }

    render() {
        let className = 'appComponents-Ehr-UserSelect';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName}>
                <Select
                    style={{width: '100%'}}
                    styleName={'deepPurple'}
                    mode={'multiple'}
                    allowClear
                    optionFilterProp={'children'}
                    placeholder={this.state.users.length > 0 ? '请选择' : ''}
                    value={this.state.users.length > 0 ? this.props.value : []}
                    onChange={this.props.onChange}
                >
                    {this.state.users}
                </Select>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSelect);
