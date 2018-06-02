import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import { Form, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Input, InputNumber, Radio, Switch, TimePicker } from 'antd'
import { Link } from 'react-router'
import {switchStatus, save} from '../actions/CycleAction'
const FormItem = Form.Item
const RadioGroup = Radio.Group
class CycleAddView extends Component {

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
            Cycle:
            {
                _id: '',
                start_time: '',
                end_time:'',
                lunch_start_time:'',
                lunch_end_time:'',
                dinner_start_time:'',
                dinner_end_time:''
            }
        }
    }
    static propTypes =
    {
        switchStatus: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        cycleStore: React.PropTypes.object
    }
    componentWillMount()
    {
        if(this.props.cycleStore.pageState == 'list')
        {
            this.props.router.push('/attendance/cycle')
        }
        if(this.props.cycleStore)
        {
            let Cycle = this.props.cycleStore.currentRecord
            this.setState({...this.state, Cycle})
        }
        if(this.props.cycleStore.pageState == 'add')
        {
            let Cycle = {
                _id: '',
                start_time: '',
                end_time:'',
                lunch_start_time:'',
                lunch_end_time:'',
                dinner_start_time:'',
                dinner_end_time:''   
            }
            this.setState({...this.state, Cycle})
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.cycleStore.pageState == 'list')
        {
            this.props.router.push('/attendance/cycle')
        }
    }
    verify(e)
    {
        e.preventDefault()
        this.props.form.validateFields((err, values) => 
        {
            if(!err)
            {
                this.props.save(this.state.Cycle._id,
                                this.state.Cycle.start_time,
                                this.state.Cycle.end_time,
                                this.state.Cycle.lunch_start_time,
                                this.state.Cycle.lunch_end_time,
                                this.state.Cycle.overtime_start_time
                                )
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
                            {!this.state.Cycle._id?(<div className="h1">新增考勤周期</div>):(<div className="h1">编辑考勤周期</div>)}
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
                            label="上班时间"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('start_time',
                                {
                                  initialValue: this.state.Cycle.start_time?moment(this.state.Cycle.start_time, "HH:mm:ss"):null,
                                  getValueFromEvent:(e)=>{
                                      let Cycle = {...this.state.Cycle}
                                      Cycle.start_time = e.format("HH:mm:ss")
                                      this.setState({...this.state, Cycle})
                                      return moment(e)
                                  },
                                  rules: [
                                  {
                                      type:"object",
                                      required: true,
                                      message: '请选择上班时间'
                                  }
                                ],
                                })
                                (
                                    <TimePicker style={{width:"100%"}} />
                                )
                            }
                           </FormItem>
                           
                           <FormItem
                            {...this.state.formItemLayout}
                            label="下班时间"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('end_time',
                                {
                                  initialValue: this.state.Cycle.end_time?moment(this.state.Cycle.end_time, "HH:mm:ss"):null,
                                  getValueFromEvent:(e)=>{
                                      let Cycle = {...this.state.Cycle}
                                      Cycle.end_time = e.format("HH:mm:ss")
                                      this.setState({...this.state, Cycle})
                                      return moment(e)
                                  },
                                  rules: [
                                  {
                                      type:"object",
                                      required: true,
                                      message: '请选择下班时间'
                                  }
                                ],
                                })
                                (
                                    <TimePicker style={{width:"100%"}} />
                                )
                            }
                           </FormItem>

                           <FormItem
                            {...this.state.formItemLayout}
                            label="午休开始时间"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('lunch_start_time',
                                {
                                  initialValue: this.state.Cycle.lunch_start_time?moment(this.state.Cycle.lunch_start_time, "HH:mm:ss"):null,
                                  getValueFromEvent:(e)=>{
                                      let Cycle = {...this.state.Cycle}
                                      Cycle.lunch_start_time = e.format("HH:mm:ss")
                                      this.setState({...this.state, Cycle})
                                      return moment(e)
                                  },
                                  rules: 
                                  [
                                    {
                                        type:"object",
                                        required: true,
                                        message: '请选择午休开始时间'
                                    }
                                  ],
                                })
                                (
                                    <TimePicker style={{width:"100%"}} />
                                )
                            }
                           </FormItem>
                           
                           <FormItem
                            {...this.state.formItemLayout}
                            label="午休结束时间"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('lunch_end_time',
                                {
                                  initialValue: this.state.Cycle.lunch_end_time?moment(this.state.Cycle.lunch_end_time, "HH:mm:ss"):null,
                                  getValueFromEvent:(e)=>{
                                      let Cycle = {...this.state.Cycle}
                                      Cycle.lunch_end_time = e.format("HH:mm:ss")
                                      this.setState({...this.state, Cycle})
                                      return moment(e)
                                  },
                                  rules: 
                                  [
                                    {
                                        type:"object",
                                        required: true,
                                        message: '请选择午休结束时间'
                                    }
                                  ],
                                })
                                (
                                    <TimePicker style={{width:"100%"}} />
                                )
                            }
                            
                           </FormItem>


                           <FormItem
                            {...this.state.formItemLayout}
                            label="加班开始时间"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('overtime_start_time',
                                {
                                  initialValue: this.state.Cycle.overtime_start_time?moment(this.state.Cycle.overtime_start_time, "HH:mm:ss"):null,
                                  getValueFromEvent:(e)=>{
                                      let Cycle = {...this.state.Cycle}
                                      Cycle.overtime_start_time = e.format("HH:mm:ss")
                                      this.setState({...this.state, Cycle})
                                      return moment(e)
                                  },
                                  rules: 
                                  [
                                    {
                                        type:"object",
                                        required: true,
                                        message: '请选择加班开始时间'
                                    }
                                  ],
                                })
                                (
                                    <TimePicker style={{width:"100%"}} />
                                )
                            }
                            
                           </FormItem>
                           
                          <FormItem {...this.state.formItemLayoutWithOutLabel} style={{marginTop: '20px'}}>
                                <Button type="primary" size="large" htmlType="submit" loading={this.props.cycleStore.saveLoading}>提交</Button>
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
CycleAddView = Form.create()(CycleAddView)


const mapStateToProps = (state) => ({
  cycleStore: state.cycle
})

const mapDispatchToProps = {
  switchStatus, save
}

export default connect(mapStateToProps, mapDispatchToProps)(CycleAddView)
