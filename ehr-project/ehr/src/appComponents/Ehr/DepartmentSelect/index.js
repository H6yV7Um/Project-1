import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TreeSelect from 'components/TreeSelect';

import {getDepartments} from './action';

import './style.scss';

// 部门选择
class DepartmentSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 部门列表
            departments : []
        };
    }

    static propTypes =
    {
        // 是否只选管理部门 (true时将只可选自己管理部门(包括子部门))
        isLeader            :   React.PropTypes.bool,
        // 部门
        value               :   React.PropTypes.array,
        /**
         * 事件:选择部门后
         * @param value 部门
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
        this.props.getDepartments(this.props.isLeader, data => {
            let departments = [];
            // console.log(data)
            data.map((v1, k1) => {
                let isFirst = true;
                const build = departments => {
                    departments.map((v2, k2) => {
                        if(v2.value == v1.parent_department_id)
                        {
                            if(!v2.children) v2.children = [];
                            v2.children.push({key : k1, label : v1.name, value : v1.department_id.toString()});
                            isFirst = false;
                        }
                        else if(v2.children)
                        {
                            build(v2.children);
                        }
                    })
                }
                build(departments);
                if(isFirst)
                {
                    departments.push({key : k1, label : v1.name, value : v1.department_id.toString()});
                }
            })
            this.setState({departments});
            // console.log(departments)
        });
    }

    render() {
        let className = 'appComponents-Ehr-DepartmentSelect';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName}>
                <TreeSelect
                    styleName={'deepPurple'}
                    style={{width: '100%'}}
                    placeholder={this.state.departments.length > 0 ? '请选择' : ''}
                    treeNodeFilterProp={'title'}
                    treeDefaultExpandAll
                    multiple
                    treeCheckable={false}
                    allowClear
                    treeData={this.state.departments}
                    value={this.state.departments.length > 0 ? this.props.value : []}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    getDepartments
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentSelect);
