import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import { Form, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Input, InputNumber, Radio, Switch, TimePicker, Popconfirm } from 'antd'
import { Link } from 'react-router'
import {switchStatus, save, remove} from '../actions/CalendarAction'
const FormItem = Form.Item
const RadioGroup = Radio.Group
class CalendarAddView extends Component {

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
            Calendar:
            {
            }
        }
    }
    static propTypes =
    {
        save: React.PropTypes.func.isRequired,
        remove: React.PropTypes.func.isRequired,
        calendarStore: React.PropTypes.object
    }
    componentWillMount()
    {
        if(!this.props.calendarStore.currentRecord.date)
        {
          this.props.router.push('/attendance/calendar')
        }
        if(this.props.calendarStore)
        {
            let Calendar = {...this.props.calendarStore.currentRecord}
            this.setState({...this.state, Calendar})
        }
    }
    componentWillReceiveProps(nextProps)
    {
      if(this.props.calendarStore.saveLoading && !nextProps.calendarStore.saveLoading)
      {
        this.props.router.push('/attendance/calendar')
      }
      if(this.props.calendarStore.removeLoading && !nextProps.calendarStore.removeLoading)
      {
        this.props.router.push('/attendance/calendar')
      }
    }
    verify(e)
    {
        e.preventDefault()
        this.props.form.validateFields((err, values) => 
        {
            if(!err)
            {
              let _id = ""
              if(this.state.Calendar._id)
              {
                _id = this.state.Calendar._id
              }
              this.props.save(_id, this.state.Calendar.date, this.state.Calendar.vacation, this.state.Calendar.title, this.state.Calendar.remark, this.state.Calendar.attendance_time, this.state.Calendar.closing_time)
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
                            {!this.state.Calendar._id?(<div className="h1">新增工作安排</div>):(<div className="h1">编辑工作安排</div>)}
                        </Col>
                        <Col span={4} className="extra">
                            <Button
                                   type="primary"
                                   icon="rollback"
                                   onClick={()=>{
                                      this.props.router.push('/attendance/calendar')
                                    }}>
                                   返回
                            </Button>
                        </Col>
                    </Row>
                    <div className="table-container">
                      <Form style={{marginTop:20}} onSubmit={(e)=>{this.verify(e)}}>
                          <FormItem
                            {...this.state.formItemLayout}
                            label="日期"
                            hasFeedback
                            >
                            {this.state.Calendar.date}
                           </FormItem>
                           
                           <FormItem
                            {...this.state.formItemLayout}
                            label="标题"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('title',
                                {
                                  initialValue: this.state.Calendar.title,
                                  getValueFromEvent:(e)=>{
                                      let Calendar = {...this.state.Calendar}
                                      Calendar.title = e.target.value
                                      this.setState({...this.state, Calendar})
                                      return e.target.value
                                  },
                                  rules: 
                                  [
                                    {
                                        required: true,
                                        message: '请输入标题。'
                                    }
                                  ]
                                })
                                (
                                    <Input />
                                )
                            }
                            
                           </FormItem>
                           <FormItem
                            {...this.state.formItemLayout}
                            label="是否放假"
                            hasFeedback
                            >
                            {
                              getFieldDecorator('vacation',
                              {
                                  valuePropName:'checked',
                                  initialValue: Boolean(this.state.Calendar.vacation),
                                  getValueFromEvent:(e)=>{
                                      let Calendar = {...this.state.Calendar}
                                      Calendar.vacation = e
                                      if(e)
                                      {
                                        Calendar.attendance_time = ""
                                        Calendar.closing_time = ""
                                      }
                                      
                                      this.setState({...this.state, Calendar})
                                      return e
                                  }
                              })
                              (
                                  <Switch />
                              )
                            }
                           </FormItem>
                           {!this.state.Calendar.vacation?
                           (<div>
                             <FormItem
                            {...this.state.formItemLayout}
                            label="调整上班时间"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('attendance_time',
                                {
                                  initialValue: this.state.Calendar.attendance_time?moment(this.state.Calendar.attendance_time, "HH:mm:ss"):null,
                                  getValueFromEvent:(e)=>{
                                      if(!e)
                                      {
                                          return e
                                      }
                                      let Calendar = {...this.state.Calendar}
                                      Calendar.attendance_time = e.format("HH:mm:ss")
                                      this.setState({...this.state, Calendar})
                                      return moment(e)
                                  }
                                })
                                (
                                    <TimePicker placeholder="留空为正常上班时间。" style={{width:"100%"}} />
                                )
                            }
                           </FormItem>
                           
                           <FormItem
                            {...this.state.formItemLayout}
                            label="调整下班时间"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('closing_time',
                                {
                                  initialValue: this.state.Calendar.closing_time?moment(this.state.Calendar.closing_time, "HH:mm:ss"):null,
                                  getValueFromEvent:(e)=>{
                                      if(!e)
                                      {
                                          return e
                                      }
                                      let Calendar = {...this.state.Calendar}
                                      Calendar.closing_time = e.format("HH:mm:ss")
                                      this.setState({...this.state, Calendar})
                                      return moment(e)
                                  }
                                })
                                (
                                    <TimePicker placeholder="留空为正常下班时间。" style={{width:"100%"}} />
                                )
                            }
                            
                           </FormItem></div>):null}


                           <FormItem
                            {...this.state.formItemLayout}
                            label="说明"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('remark',
                                {
                                  initialValue: this.state.Calendar.remark,
                                  getValueFromEvent:(e)=>{
                                      let Calendar = {...this.state.Calendar}
                                      Calendar.remark = e.target.value
                                      this.setState({...this.state, Calendar})
                                      return e.target.value
                                  }
                                })
                                (
                                    <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                )
                            }
                            
                           </FormItem>
                           
                          <FormItem {...this.state.formItemLayoutWithOutLabel} style={{marginTop: '20px'}}>
                                <Button type="primary" size="large" htmlType="submit" loading={this.props.calendarStore.saveLoading}>提交</Button>
                                {this.state.Calendar._id?
                                (
                                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.props.remove(this.state.Calendar._id.$oid)}>
                                        <Button type="danger"
                                                style={{ marginLeft: 8 }}
                                                size="large"
                                                loading={this.props.calendarStore.removeLoading}
                                        >删除</Button>
                                    </Popconfirm>
                                ):null}

                                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                                  this.props.router.push('/attendance/calendar')
                            }}>返回</Button>
                          </FormItem>
                      </Form>
                    </div>
                </Layout>
            </div>
        )
    }
}
CalendarAddView = Form.create()(CalendarAddView)


const mapStateToProps = (state) => ({
  calendarStore: state.calendar
})

const mapDispatchToProps = {
  switchStatus, save, remove
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAddView)
