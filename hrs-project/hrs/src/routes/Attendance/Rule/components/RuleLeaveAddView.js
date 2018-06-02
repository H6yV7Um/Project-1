import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Form, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Input, InputNumber, Select, Switch } from 'antd'
import { Link } from 'react-router'
import {switchStatus, save} from '../actions/RuleAction'
const FormItem = Form.Item
const Option = Select.Option

class RuleLeaveAddView extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            formItemLayout:
            {
                labelCol: 
                {
                    sm: { span: 4 }
                },
                wrapperCol: 
                {
                    sm: { span: 10 }
                }
            },
            formItemLayoutWithOutLabel: 
            {
                wrapperCol: 
                {
                    sm: { span: 10, offset: 4 }
                }
            },
            Rule:
            {
                _id: '',
                name: '',
                fee:0,
                deduct_subsidy: false,
                deduct_type: "fixed",
                remark: "",
                type: "leave"
            }
        }
    }
    static propTypes =
    {
        switchStatus: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        ruleStore: React.PropTypes.object
    }
    componentWillMount()
    {
        if(this.props.ruleStore.pageState == 'list')
        {
            this.props.router.push('/attendance/rule')
        }
        if(this.props.ruleStore)
        {
            let Rule = this.props.ruleStore.currentRecord
            this.setState({...this.state, Rule})
        }
        if(this.props.ruleStore.pageState == 'add')
        {
            let Rule = {
                _id: '',
                name: '',
                fee:0,
                deduct_subsidy: false,
                deduct_type: "fixed",
                remark: "",
                type: "leave"
            }
            this.setState({...this.state, Rule})
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.ruleStore.pageState == 'list')
        {
            this.props.router.push('/attendance/rule')
        }
    }
    verify(e)
    {
        e.preventDefault()
        this.props.form.validateFields((err, values) => 
        {
            if(!err)
            {
                this.props.save(this.state.Rule._id,
                                this.state.Rule.name,
                                this.state.Rule.fee,
                                this.state.Rule.deduct_subsidy,
                                this.state.Rule.deduct_type,
                                this.state.Rule.remark,
                                "leave")
            }
        })
    }
    render()
    {
        const { getFieldDecorator } = this.props.form 
        return (
            <div>
                <Layout className="layout-main">
                    <Row className="titleBox">
                        <Col span={20}>
                            {!this.state.Rule._id?(<div className="h1">新增请假规则</div>):(<div className="h1">编辑请假规则</div>)}
                        </Col>
                        <Col span={4} className="extra">
                            <Button
                                   type="primary"
                                   icon="rollback"
                                   onClick={()=>{
                                       this.props.switchStatus("list")
                                   }}>
                                   返回
                            </Button>
                        </Col>
                    </Row>
                    <div className="table-container">
                      <Form style={{marginTop:20}} onSubmit={(e)=>{this.verify(e)}}>
                          <FormItem
                            {...this.state.formItemLayout}
                            label="项目"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('name',
                                {
                                    initialValue: this.state.Rule.name,
                                    getValueFromEvent:(e)=>{
                                        let Rule = {...this.state.Rule}
                                        Rule.name = e.target.value
                                        this.setState({...this.state, Rule})
                                        return e.target.value
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: '请输入项目'
                                    }
                                ],
                                })
                                (
                                    <Input />
                                )
                            }
                           </FormItem>
                           
                           <FormItem
                            {...this.state.formItemLayout}
                            label="扣除费用类型"
                            >
                            {
                                getFieldDecorator('deduct_type',
                                {
                                    initialValue: this.state.Rule.deduct_type,
                                    getValueFromEvent:(e)=>
                                    {
                                        let Rule = {...this.state.Rule}
                                        Rule.deduct_type = e
                                        this.setState({...this.state, Rule})
                                        return e
                                    }
                                })
                                (
                                    <Select>
                                      <Option value="fixed">固定额度</Option>
                                      <Option value="salary">每天工资比例</Option>
                                    </Select>
                                )
                            }
                           </FormItem>

                           <FormItem
                            {...this.state.formItemLayout}
                            label="扣除费用"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('fee',
                                {
                                    initialValue: this.state.Rule.fee,
                                    getValueFromEvent:(e)=>{
                                        let Rule = {...this.state.Rule}
                                        Rule.fee = e
                                        this.setState({...this.state, Rule})
                                        return e
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: '请输入扣除费用'
                                    }]
                                })
                                (
                                    this.state.Rule.deduct_type=='fixed'?<InputNumber formatter={value =>`￥ ${value}`} />:<InputNumber formatter={value =>`${value} %`} />
                                )
                            }
                           </FormItem>
                           <FormItem
                            {...this.state.formItemLayout}
                            label="是否扣除补贴"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('deduct_subsidy',
                                {
                                    valuePropName:'checked',
                                    initialValue: Boolean(this.state.Rule.deduct_subsidy),
                                    getValueFromEvent:(e)=>{
                                        let Rule = {...this.state.Rule}
                                        Rule.deduct_subsidy = e
                                        this.setState({...this.state, Rule})
                                        return e
                                    },
                                })
                                (
                                    <Switch />
                                )
                            }
                           </FormItem>
                          <FormItem
                            {...this.state.formItemLayout}
                            label="说明"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('remark',
                                {
                                    initialValue: this.state.Rule.remark,
                                    getValueFromEvent:(e)=>{
                                        let Rule = {...this.state.Rule}
                                        Rule.remark = e.target.value
                                        this.setState({...this.state, Rule})
                                        return e.target.value
                                    },
                                })
                                (
                                    <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                )
                            }
                          </FormItem>
                          <FormItem {...this.state.formItemLayoutWithOutLabel} style={{marginTop: '20px'}}>
                                <Button type="primary" size="large" htmlType="submit" loading={this.props.ruleStore.saveLoading}>提交</Button>
                                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                                this.props.switchStatus("list")
                            }}>返回</Button>
                          </FormItem>
                      </Form>
                    </div>
                </Layout>
            </div>
        )
    }
}
RuleLeaveAddView = Form.create()(RuleLeaveAddView)


const mapStateToProps = (state) => ({
  ruleStore: state.rule
})

const mapDispatchToProps = {
  switchStatus, save
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleLeaveAddView)
