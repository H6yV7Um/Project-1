import React, {Component} from 'react';
import {connect} from 'react-redux';
import {  } from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import {injectReducer} from 'store/reducers';
import $ from 'jquery';
import {getDepartment, saveManagement} from './action';
import './style.scss';
import browserAttr from 'utils/browserAttr'
import {browserHistory} from 'react-router'
import { Form, Input, Icon, Button, InputNumber} from 'antd';
const FormItem = Form.Item;
let clientHeight = document.documentElement.clientHeight
// let uuid = 0;
let className = `coursera-management`;
class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            uuid: 0,
            company_num: 1
        }

    }
    static propTypes =
    {
        // 获取部门
        getDepartment                 : React.PropTypes.func,
        // 保存现有组织架构
        saveManagement                : React.PropTypes.func,
    }
    componentWillMount() {
        // 获取部门列表信息
        this.props.getDepartment({},(data)=>{
            // console.log(data)
            this.setState({departments: [...data],uuid: data.length,company_num:data[0].company_num })
        })
    }
    remove = async (k) => {
        const { form } = this.props;
        let {uuid, departments} = this.state;
        if (uuid === 1) {
            return;
        }
        departments.splice(k,1);
        let newUuid = uuid-1
        await this.setState({uuid: newUuid,departments: departments});
    }
    add = async () => {
        let {uuid, departments} = this.state
        departments.push({
            department_name: '',
            user_num: 1
        })
        let newUuid = uuid+1
        await  this.setState({uuid: newUuid,departments: departments})
    }
    handleSubmit = () => {
        let {departments, company_num} = this.state
        this.props.saveManagement({departments: JSON.stringify(departments),company_num: company_num},()=>{
            browserHistory.push('/train/coursera/management')
        })
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let {uuid, departments,company_num} = this.state
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };

        let keys = []
        for(let i =0 ;i < uuid; i++)
        {
            keys.push(i)
        }
        const formItems = keys.map((k, index) => {
            return (<div key={k}>
                        <FormItem
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? '部门名称' : ''}
                            key={`deparment-${k}`}
                        >
                            <Input
                                onChange={(e)=>{
                                    let department_name = e.target.value
                                    let departments = [...this.state.departments]
                                    departments[k].department_name = department_name
                                    this.setState({departments: departments})
                                }}
                                value = {departments[k].department_name}
                                placeholder="部门名称"
                                style={{ width: '60%', marginRight: 8 }}
                            />
                            {keys.length > 1 ? (
                                <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle-o"
                                    disabled={keys.length === 1}
                                    onClick={() => this.remove(k)}
                                />
                            ) : null}
                        </FormItem>
                        <FormItem
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? '部门人数' : ''}
                            key={`deparment-num-${k}`}
                        >
                            <InputNumber
                                value = {departments[k].user_num}
                                onChange={(e)=>{
                                    let user_num = e
                                    let departments = [...this.state.departments]
                                    departments[k].user_num = user_num
                                    this.setState({departments: departments})
                                }}
                                placeholder="部门人数"
                            />
                        </FormItem>
                    </div>)

        });
        return (
            <div className={`${className}`}>
                <div className = {`${className}-back`}>
                    <a
                        onClick={()=>{
                            browserHistory.push('/train')
                        }}
                    >
                        返回
                    </a>
                </div>
                <Form>
                    {formItems}
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus" /> 添加部门字段
                        </Button>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司总人数"
                    >

                        <InputNumber
                            value={company_num}
                            onChange={(e)=>{
                                this.setState({company_num: e})
                            }}
                        />

                    </FormItem>
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    reducer : state.courseraField,
    ddreducer : state.ddLayout

})
const mapDispatchToProps = {
    getDepartment,
    saveManagement
}
Management = Form.create()(Management);
export default store => ({
    path : 'coursera/management',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'management', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Management))
        })
    }
})