import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Tag} from 'antd';
import {List, Toast} from 'antd-mobile';
import Icon from 'components/Icon';
import dd from 'utils/dingding';
import CONFIG from 'config/app';
import {deleteArray} from 'utils/array';

import './style.scss';

class DepartmentsPickerItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 当前选择部门列表
            departments           :   props.value || []
        };
        // 是否缺省
        this.isDefaultDepartments = false;
    }

    static propTypes =
    {
        // 微应用名
        agentName           :   React.PropTypes.oneOf(['show', 'recruit', 'train']).isRequired,
        // 标签名
        labelName           :   React.PropTypes.string,
        // 初始值 (部门列表[{id, name}])
        value               :   React.PropTypes.array,
        /**
         * 选择回调
         * @param value 部门列表
         */
        onChange            :   React.PropTypes.func,
        // 最大选择数
        maxNum              :   React.PropTypes.number,
        // 说明信息
        brief               :   React.PropTypes.string,
        // 缺省部门列表([{id, name, key}] key须保证与各部门ID不相同)
        defaultDepartments  :   React.PropTypes.array
    }

    static defaultProps =
    {
        // 标签名
        labelName           :   null,
        // 最大选择数
        maxNum              :   100,
        /**
         * 选择回调
         * @param value 部门列表
         */
        onChange            :   value => {}
    }

    componentWillMount() {
        this.setValue(this.state.departments);
    }

    choose = () => {
        let departments = [];
        if(dd.os != 'pc')
        {
            if(!this.isDefaultDepartments)
            {
                this.state.departments.map((v, k) => {
                    // 处理ID为1却返回为-1的BUG
                    departments.push(v.id == 1 ? -1 : v.id);
                })
            }

            dd.biz.contact.departmentsPicker({
                title : '选择部门',
                multiple : true,
                corpId : CONFIG.DD_CORP_ID,
                appId : CONFIG.GET_DD_AGENT_ID(this.props.agentName),
                limitTips : `最多只能选择${this.props.maxNum}个部门哦`,
                maxDepartments : this.props.maxNum,
                pickedDepartments : departments,
                permissionType : 'GLOBAL',
                onSuccess : data => {
                    this.setValue(data.departments);
                },
                onFail : err => {
                    // alert(JSON.stringify(err))
                    this.setValue([]);
                }
            })
        }
        else
        {

        }
    }

    /**
     * 设置值
     * @param value 部门列表[{id, name}]
     */
    setValue = value => {
        if(value.length == 0 && this.props.defaultDepartments)
        {
            value = this.props.defaultDepartments;
            this.isDefaultDepartments = true;
        }
        else
        {
            this.isDefaultDepartments = false;
            if(value.length > 0)
            {
                // 处理ID为1却返回为-1的BUG
                value.map((v, k) => {
                    if(v.id == -1)
                    {
                        value[k].id = 1;
                    }
                });
            }
        }

        this.setState({departments : value});
        this.props.onChange(value);
    }

    render()
    {
        const Item = List.Item;

        let className = 'component-Dingding-DepartmentsPickerItem';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        let departmentsItem = null;

        if(this.state.departments.length > 0)
        {
            let departments = [];
            this.state.departments.map((v, k) => {
                departments.push(
                    <Tag
                        className={`${className}-department`}
                        key={v.key || v.id}
                        color={'blue'}
                        closable={!this.isDefaultDepartments}
                        onClick={() => {
                            setTimeout(() => this.setValue(deleteArray(this.state.departments, 'id', v.id)[0]), 200);
                        }}
                    >
                        {v.name}
                    </Tag>
                );
            })
            departmentsItem =
                <Item className={`${className}-departments`} extra={
                    this.isDefaultDepartments
                        ?
                        null
                        :
                        <div className={`${className}-clear`} onClick={()=>{
                            this.setValue([]);
                        }}>
                            <Icon type={'times-circle'}/>
                        </div>
                }>
                    {departments}
                </Item>
        }

        return(
            <div className={componentClassName}>
                <Item className={`${className}-choose`} arrow="horizontal" onClick={this.choose}>
                    {this.props.labelName}
                    <Item.Brief>{this.props.brief}</Item.Brief>
                </Item>
                {departmentsItem}
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsPickerItem);