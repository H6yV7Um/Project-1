import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Form, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Input, InputNumber, Radio, Switch } from 'antd'
import { Link } from 'react-router'
import {switchStatus, save} from '../actions/TaxesAction'
const FormItem = Form.Item
const RadioGroup = Radio.Group
class TaxesAddView extends Component {

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
                threshold: 3500,
                levels:[
                    {
                        range:0,
                        rate:1
                    }
                ]
            }
        }
    }
    static propTypes =
    {
        switchStatus: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        taxesStore: React.PropTypes.object
    }
    componentWillMount()
    {
        if(this.props.taxesStore.pageState=='list')
        {
            this.props.router.push('/remuneration/taxes')
        }
        if(this.props.taxesStore.currentRecord)
        {
            let Solution = this.props.taxesStore.currentRecord
            this.setState({...this.state, Solution})
        }
        if(this.props.taxesStore.pageState=='add')
        {
            let Solution = {
                _id: '',
                name: '',
                threshold: 3500,
                levels:[
                    {
                        range:0,
                        rate:1
                    }
                ]
            }
            this.setState({...this.state, Solution})
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.taxesStore.pageState=='list')
        {
            this.props.router.push('/remuneration/taxes')
        }
    }
    verify(e)
    {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.save(this.state.Solution._id, this.state.Solution.name, this.state.Solution.threshold, this.state.Solution.levels)
            }
        })
    }
    render()
    {
        const { getFieldDecorator } = this.props.form
        const levels = this.state.Solution.levels.map((item, index)=>{
            return (
            <FormItem key={"item_"+index} {...this.state.formItemLayout} label={"阶梯"} required={false} validateStatus={this.state.validateStatus} help={this.state.help}>
                <Row>
                    <Col span={9}>
                    <InputNumber min={1} max={1000000} formatter={value =>`￥ ${value}`} value={item.range} onChange={(e)=>
                    {
                        let Solution = {...this.state.Solution}
                        Solution.levels[index].range = e
                        this.setState({...this.state, Solution: Solution})
                        return e
                    }} onPressEnter={(e)=>
                    {
                    }} />
                    </Col>
                    <Col span={2}>税率：</Col>
                    <Col span={8}>
                        <InputNumber min={1} max={100} step={0.1} formatter={value =>`${value} %`} value={item.rate} onChange={(e)=>
                        {
                            let Solution = {...this.state.Solution}
                            Solution.levels[index].rate = e
                            this.setState({...this.state, Solution: Solution})
                            return e
                        }} onPressEnter={(e)=>
                        {
                        }} />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={4}>
                    <Button icon="delete" disabled={this.state.Solution.levels.length === 1} onClick={() => {
                        let Solution = {...this.state.Solution}
                        Solution.levels.splice(index, 1)
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
                            {!this.state.Solution._id?(<div className="h1">新增个税方案</div>):(<div className="h1">编辑个税方案</div>)}
                        </Col>
                        <Col span={4} className="extra">
                            <Button
                                   type="primary"
                                   icon="rollback"
                                   onClick={()=>{
                                       this.props.switchStatus("list")
                                       this.props.router.push('/remuneration/taxes')
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
                                label="起征点"
                                hasFeedback
                            >
                            {
                                getFieldDecorator('threshold', 
                                {
                                    initialValue: this.state.Solution.threshold,
                                    getValueFromEvent:(e)=>{
                                        let Solution = {...this.state.Solution}
                                        Solution.threshold = e
                                        this.setState({...this.state, Solution})
                                        return e
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: '请输入个税起征点'
                                    }
                                ],
                                })
                                (<InputNumber min={1} max={1000000} formatter={value =>`￥ ${value}`} />)
                            }
                            </FormItem>
                           {levels}
                           <Row>
                                <Col span={2}></Col>
                                <Col span={20}>
                                <Button type="dashed" style={{ width: '60%' }} onClick={()=>{
                                    let Solution = {...this.state.Solution}
                                    Solution.levels.push({range:0, rate:1})
                                    this.setState({...this.state, Solution})
                                }}>
                                <Icon type="plus" />增加阶梯
                                </Button>
                                </Col>
                          </Row>
                          
                          <FormItem {...this.state.formItemLayoutWithOutLabel} style={{marginTop: '20px'}}>
                                <Button type="primary" size="large" htmlType="submit" loading={this.props.taxesStore.saveLoading}>提交</Button>
                                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                                this.props.switchStatus("list")
                                this.props.router.push('/remuneration/taxes')
                            }}>返回</Button>
                          </FormItem>
                      </Form>
                    </div>
                </Layout>
            </div>
        )
    }
}
TaxesAddView = Form.create()(TaxesAddView)


const mapStateToProps = (state) => ({
  taxesStore: state.taxes
})

const mapDispatchToProps = {
  switchStatus, save
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxesAddView)
