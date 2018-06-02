import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Form, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Input, InputNumber, Radio, Switch } from 'antd'
import { Link } from 'react-router'
import {switchStatus, save} from '../actions/FundAction'
const FormItem = Form.Item
const RadioGroup = Radio.Group
class FundAddView extends Component {

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
                company_rate:50.00,
                personal_rate:50.00,
                lower:1000,
                higher:1000000
            }
        }
    }
    static propTypes =
    {
        switchStatus: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        fundStore: React.PropTypes.object
    }
    componentWillMount()
    {
        if(this.props.fundStore.pageState == 'list')
        {
            this.props.router.push('/remuneration/fund')
        }
        if(this.props.fundStore)
        {
            let Solution = this.props.fundStore.currentRecord
            this.setState({...this.state, Solution})
        }
        if(this.props.fundStore.pageState == 'add')
        {
            let Solution = {
                _id: '',
                name: '',
                company_rate:50.00,
                personal_rate:50.00,
                lower:1000,
                higher:1000000
            }
            this.setState({...this.state, Solution})
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.fundStore.pageState == 'list')
        {
            this.props.router.push('/remuneration/fund')
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
                                this.state.Solution.company_rate,
                                this.state.Solution.personal_rate,
                                this.state.Solution.lower,
                                this.state.Solution.higher)
            }
        })
    }
    render()
    {
        const { getFieldDecorator } = this.props.form 
        return (
            <div >
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}>
                            {!this.state.Solution._id?(<div className="h1">新增公积金方案</div>):(<div className="h1">编辑公积金方案</div>)}
                        </Col>
                        <Col span={4} className="extra">
                            <Button
                                   type="primary"
                                   icon="rollback"
                                   onClick={()=>{
                                       this.props.switchStatus("list")
                                       this.props.router.push('/remuneration/fund')
                                    }}>
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
                           
                           <FormItem
                            {...this.state.formItemLayout}
                            label="基数下限"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('lower',
                                {
                                    initialValue: this.state.Solution.lower,
                                    getValueFromEvent:(e)=>{
                                        let Solution = {...this.state.Solution}
                                        Solution.lower = e
                                        this.setState({...this.state, Solution})
                                        return e
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: '基数下限'
                                    }
                                ],
                                })
                                (
                                    <InputNumber min={1} max={1000000} step={0.1} formatter={value =>`￥ ${value}`} />
                                )
                            }
                           </FormItem>

                           <FormItem
                            {...this.state.formItemLayout}
                            label="基数上限"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('higher',
                                {
                                    initialValue: this.state.Solution.higher,
                                    getValueFromEvent:(e)=>{
                                        let Solution = {...this.state.Solution}
                                        Solution.higher = e
                                        this.setState({...this.state, Solution})
                                        return e
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: '基数上限'
                                    }
                                ],
                                })
                                (
                                    <InputNumber min={1} max={1000000} step={0.1} formatter={value =>`￥ ${value}`} />
                                )
                            }
                           </FormItem>
                           

                           <FormItem
                            {...this.state.formItemLayout}
                            label="公司比例"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('company_rate',
                                {
                                    initialValue: this.state.Solution.company_rate,
                                    getValueFromEvent:(e)=>{
                                        let Solution = {...this.state.Solution}
                                        Solution.company_rate = e
                                        this.setState({...this.state, Solution})
                                        return e
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: '公司比例'
                                    }
                                ],
                                })
                                (
                                    <InputNumber min={1} max={1000000} step={0.1} formatter={value =>`${value} %`} />
                                )
                            }
                           </FormItem>


                           <FormItem
                            {...this.state.formItemLayout}
                            label="个人比例"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('personal_rate',
                                {
                                    initialValue: this.state.Solution.personal_rate,
                                    getValueFromEvent:(e)=>
                                    {
                                        let Solution = {...this.state.Solution}
                                        Solution.personal_rate = e
                                        this.setState({...this.state, Solution})
                                        return e
                                    },
                                    rules: 
                                    [
                                        {
                                            required: true,
                                            message: '个人比例'
                                        }
                                    ],
                                })
                                (
                                    <InputNumber min={1} max={1000000} step={0.1} formatter={value =>`${value} %`} />
                                )
                            }
                           </FormItem>
                          <FormItem {...this.state.formItemLayoutWithOutLabel} style={{marginTop: '20px'}}>
                                <Button type="primary" size="large" htmlType="submit" loading={this.props.fundStore.saveLoading}>提交</Button>
                                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                                this.props.switchStatus("list")
                                this.props.router.push('/remuneration/fund')
                            }}>返回</Button>
                          </FormItem>
                      </Form>
                    </div>
                </Layout>
            </div>
        )
    }
}
FundAddView = Form.create()(FundAddView)


const mapStateToProps = (state) => ({
  fundStore: state.fund
})

const mapDispatchToProps = {
  switchStatus, save
}

export default connect(mapStateToProps, mapDispatchToProps)(FundAddView)
