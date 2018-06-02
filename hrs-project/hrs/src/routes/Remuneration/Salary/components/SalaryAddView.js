import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Form, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Input, InputNumber, Radio, Switch, Select } from 'antd'
import { Link } from 'react-router'
import {switchStatus, save} from '../actions/SalaryAction'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
class SalaryAddView extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            formItemLayout:
            {
                labelCol: 
                {
                    sm: { span: 2 }
                },
                wrapperCol: 
                {
                    sm: { span: 12 }
                }
            },
            formItemLayoutWithOutLabel: 
            {
                wrapperCol: 
                {
                    sm: { span: 12, offset: 2 }
                }
            },
            Solution:
            {
                _id: '',
                name: '',
                salaries: [
                    {
                        "name":"基本薪资",
                        "type":"monthly"
                    },
                    {
                        "name":"岗位薪资",
                        "type":"monthly"
                    }
                ],
                subsidy:[
                    {
                        name:'餐补',
                        amount:100.00,
                        type:'monthly'
                    }
                ]
            }
        }
    }
    static propTypes =
    {
        switchStatus: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        salarieStore: React.PropTypes.object
    }
    componentWillMount()
    {
        if(this.props.salarieStore.pageState == 'list')
        {
            this.props.router.push('/remuneration/salary')
        }
        if(this.props.salarieStore)
        {
            let Solution = this.props.salarieStore.currentRecord
            this.setState({...this.state, Solution})
        }
        if(this.props.salarieStore.pageState == 'add')
        {
            let Solution = {
                _id: '',
                name: '',
                salaries: [
                    {
                        "name":"基本薪资",
                        "type":"monthly"
                    },
                    {
                        "name":"岗位薪资",
                        "type":"monthly"
                    }
                ],
                subsidy:[
                    {
                        name:'餐补',
                        amount:100.00,
                        type:'monthly'
                    }
                ]
            }
            this.setState({...this.state, Solution})
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.salarieStore.pageState == 'list')
        {
            this.props.router.push('/remuneration/salary')
        }
    }
    verify(e)
    {
        e.preventDefault()
        this.props.form.validateFields((err, values) => 
        {
            if(!err)
            {
                this.props.save(this.state.Solution._id,
                                this.state.Solution.name,
                                this.state.Solution.salaries,
                                this.state.Solution.subsidy)
            }
        })
    }
    render()
    {
        const { getFieldDecorator } = this.props.form
        const salaries = this.state.Solution.salaries.map((item, index)=>{
            return (
            <FormItem key={"item_"+index} {...this.state.formItemLayout} label={"薪资类型"} required={false}>
                <Row>
                    <Col span={7}>
                    <Input  value={item.name} onChange={(e)=>
                    {
                        let Solution = {...this.state.Solution}
                        Solution.salaries[index].name = e.target.value
                        this.setState({...this.state, Solution: Solution})
                        return e.target.value
                    }} onPressEnter={(e)=>
                    {
                    }} />
                    </Col>
                    <Col span={1} />
                    <Col span={2}>
                        类型：
                    </Col>
                    <Col span={7}>
                        <Select value={item.type} onChange={(e)=>{
                                let Solution = {...this.state.Solution}
                                Solution.salaries[index].type = e
                                this.setState({...this.state, Solution: Solution})
                                return e
                            }}>
                            <Option value="monthly">月薪</Option>
                            <Option value="daily">日薪</Option>
                        </Select>
                    </Col>
                    <Col span={1} />
                    <Col span={4}>
                    <Button icon="delete" disabled={this.state.Solution.salaries.length === 1} onClick={() => {
                        let Solution = {...this.state.Solution}
                        Solution.salaries.splice(index, 1)
                        this.setState({...this.state, Solution: Solution})
                    }} />
                    </Col>
                </Row>
            </FormItem>
            )
        })

        const subsidy = this.state.Solution.subsidy.map((item, index)=>{
            return (
            <FormItem key={"item_"+index} {...this.state.formItemLayout} label={"补贴类型"} required={false}>
                <Row>
                    <Col span={6}>
                        <Input  value={item.name} onChange={(e)=>
                        {
                            let Solution = {...this.state.Solution}
                            Solution.subsidy[index].name = e.target.value
                            this.setState({...this.state, Solution: Solution})
                            return e.target.value
                        }} onPressEnter={(e)=>
                        {
                        }} />
                    </Col>
                    <Col span={2} />
                    <Col span={6}>
                        <InputNumber min={1} max={1000000} formatter={value =>`￥ ${value}`} value={item.amount} onChange={(e)=>
                        {
                            let Solution = {...this.state.Solution}
                            Solution.subsidy[index].amount = e
                            this.setState({...this.state, Solution: Solution})
                            return e
                        }} onPressEnter={(e)=>
                        {
                        }} />
                    </Col>
                    <Col span={6}>
                        <Select value={item.type} onChange={(e)=>{
                                let Solution = {...this.state.Solution}
                                Solution.subsidy[index].type = e
                                this.setState({...this.state, Solution: Solution})
                                return e
                            }}>
                            <Option value="monthly">月补</Option>
                            <Option value="daily">日补</Option>
                        </Select>
                    </Col>
                    <Col span={1} />
                    <Col span={3}>
                    <Button icon="delete" onClick={() => {
                        let Solution = {...this.state.Solution}
                        Solution.subsidy.splice(index, 1)
                        this.setState({...this.state, Solution: Solution})
                    }} />
                    </Col>
                </Row>
            </FormItem>
            )
        })
        
        return (
            <div >
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}>
                            {!this.state.Solution._id?(<div className="h1">新增薪资方案</div>):(<div className="h1">编辑薪资方案</div>)}
                        </Col>
                        <Col span={4} className="extra">
                            <Button
                                   type="primary"
                                   icon="rollback"
                                   onClick={()=>{this.props.switchStatus("list")}}>
                                   返回
                            </Button>
                        </Col>
                    </Row>
                    <div className="table-container">
                      <Form style={{marginTop:20}} onSubmit={(e)=>{this.verify(e)}}>
                          <FormItem
                            {...this.state.formItemLayout}
                            label="方案名称"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('name',
                                {
                                    initialValue: this.state.Solution.name,
                                    getValueFromEvent:(e)=>{
                                        let Solution = {...this.state.Solution}
                                        Solution.name = e.target.value
                                        this.setState({...this.state, Solution})
                                        return e.target.value
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: '请输入方案名称'
                                    }
                                ],
                                })
                                (
                                    <Input />
                                )
                            }
                           </FormItem>
                           {salaries}
                           <Row>
                                <Col span={2}></Col>
                                <Col span={20}>
                                <Button type="dashed" style={{ width: '60%' }} onClick={()=>{
                                    let Solution = {...this.state.Solution}
                                    Solution.salaries.push({
                                        "name":"岗位薪资",
                                        "type":"monthly"
                                    })
                                    this.setState({...this.state, Solution})
                                }}>
                                <Icon type="plus" />增加薪资类型
                                </Button>
                                </Col>
                          </Row>
                          <div style={{marginTop:'20px'}} />
                          {subsidy}
                          <Row>
                                <Col span={2}></Col>
                                <Col span={20}>
                                <Button type="dashed" style={{ width: '60%' }} onClick={()=>{
                                    let Solution = {...this.state.Solution}
                                    Solution.subsidy.push({
                                        "name":"",
                                        "amount":100.00,
                                        "type":"monthly"
                                    })
                                    this.setState({...this.state, Solution})
                                }}>
                                <Icon type="plus" />增加补贴类型
                                </Button>
                                </Col>
                          </Row>
                          <FormItem {...this.state.formItemLayoutWithOutLabel} style={{marginTop: '20px'}}>
                                <Button type="primary" size="large" htmlType="submit" loading={this.props.salarieStore.saveLoading}>提交</Button>
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
SalaryAddView = Form.create()(SalaryAddView)

const mapStateToProps = (state) => ({
  salarieStore: state.salary
})

const mapDispatchToProps = {
  switchStatus, save
}

export default connect(mapStateToProps, mapDispatchToProps)(SalaryAddView)
