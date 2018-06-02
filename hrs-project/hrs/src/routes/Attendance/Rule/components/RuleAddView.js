import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Form, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Input, InputNumber, Select, Switch } from 'antd'
import { Link } from 'react-router'
import {switchStatus, updateLate, updateAbsenteeism, updateOvertime, updateDaysOff, updateBusinessTrip, updateAnnualVacation} from '../actions/RuleAction'
const FormItem = Form.Item
const Option = Select.Option

class RuleAddView extends Component {

    constructor(props)
    {
        super(props)
        this.state = 
        {
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
            {}
        }
    }
    static propTypes =
    {
        switchStatus: React.PropTypes.func.isRequired,
        ruleStore: React.PropTypes.object,
        updateLate: React.PropTypes.func.isRequired,
        updateAbsenteeism: React.PropTypes.func.isRequired,
        updateOvertime: React.PropTypes.func.isRequired,
        updateDaysOff: React.PropTypes.func.isRequired,
        updateBusinessTrip: React.PropTypes.func.isRequired,
        updateAnnualVacation: React.PropTypes.func.isRequired
    }
    componentWillMount()
    {
        if(this.props.ruleStore.pageState != 'otherEdit')
        {
            this.props.router.push('/attendance/rule')
        }
        if(this.props.ruleStore)
        {
            let Rule = this.props.ruleStore.currentOtherRecord
            this.setState({...this.state, Rule})
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.ruleStore.pageState != 'otherEdit')
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
                switch(this.state.Rule.type)
                {
                    case "late":
                        this.props.updateLate(this.state.Rule.fee, this.state.Rule.free_times, this.state.Rule.remark)
                        break
                    case "absenteeism":
                        this.props.updateAbsenteeism(this.state.Rule.fee, this.state.Rule.free_hours, this.state.Rule.remark)
                        break
                    case "annualvacation":
                        this.props.updateAnnualVacation(this.state.Rule.days, this.state.Rule.clear_date, this.state.Rule.remark)
                        break
                    case "businesstrip":
                        this.props.updateBusinessTrip(this.state.Rule.fee, this.state.Rule.remark)
                        break
                    case "daysoff":
                        this.props.updateDaysOff(this.state.Rule.fee, this.state.Rule.remark)
                        break
                    case "overtime":
                        this.props.updateOvertime(this.state.Rule.weekday_fee, this.state.Rule.weekend_fee, this.state.Rule.weekday_minimum_pay_hours, this.state.Rule.weekend_minimum_pay_hours, this.state.Rule.weekday_multiple_payment, this.state.Rule.weekend_minimum_pay_hours, this.state.Rule.remark)
                        break
                }
            }
        })
    }
    getLate()
    {
      const { getFieldDecorator } = this.props.form 
      return (
        <div>
          <FormItem
          {...this.state.formItemLayout}
          label="类别"
          hasFeedback
          >
          迟到
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="免费次数"
          hasFeedback
          >
          {
              getFieldDecorator('free_times',
              {
                  initialValue: this.state.Rule.free_times,
                  getValueFromEvent:(e)=>{
                      let Rule = {...this.state.Rule}
                      Rule.free_times = e
                      this.setState({...this.state, Rule})
                      return e
                  },
                  rules: [
                  {
                      required: true,
                      message: '请输入免费次数'
                  }
              ],
              })
              (
                  <InputNumber />
              )
          }
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="扣费金额"
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
                      message: '请输入扣费金额'
                  }
              ],
              })
              (
                  <InputNumber formatter={value =>`￥ ${value}`} />
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
                <Button type="primary" size="large" htmlType="submit" loading={this.props.ruleStore.updateLateLoading}>提交</Button>
                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                this.props.switchStatus("list")
                }}>返回</Button>
            </FormItem>
        </div>
      )
    }
    getAbsenteeism()
    {
      const { getFieldDecorator } = this.props.form 
      return (
        <div>
          <FormItem
          {...this.state.formItemLayout}
          label="类别"
          hasFeedback
          >
          旷工
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="免费小时数"
          hasFeedback
          >
          {
              getFieldDecorator('free_hours',
              {
                  initialValue: this.state.Rule.free_hours,
                  getValueFromEvent:(e)=>{
                      let Rule = {...this.state.Rule}
                      Rule.free_hours = e
                      this.setState({...this.state, Rule})
                      return e
                  },
                  rules: [
                  {
                      required: true,
                      message: '请输入免费小时数'
                  }
              ],
              })
              (
                  <InputNumber />
              )
          }
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="扣费金额"
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
                      message: '请输入扣费金额'
                  }
              ],
              })
              (
                  <InputNumber formatter={value =>`￥ ${value}`} />
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
                <Button type="primary" size="large" htmlType="submit" loading={this.props.ruleStore.updateAbsenteeismLoading}>提交</Button>
                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                this.props.switchStatus("list")
                }}>返回</Button>
            </FormItem>
        </div>
      )
    }
    getAnnualVacation()
    {
      const { getFieldDecorator } = this.props.form 
      const days = this.state.Rule.days
      const items = days.map((item, index)=>{
            const formItemLayout = index ===0 ? {...this.state.formItemLayout} : {...this.state.formItemLayoutWithOutLabel}
            return (
            <div>
            <FormItem
                {...formItemLayout}
                label={index===0? '年假阶梯' : ''}
                hasFeedback
                key={"items_"+index}
                >
                
                <div>
                  <Row gutter={16}>
                      <Col span={10}>
                          <InputNumber min={0} max={100} placeholder="社会工龄" formatter={value =>`${value}年`} value={item.workingage} onChange={(e)=>{
                              item.workingage = e
                              let Rule = {...this.state.Rule}
                              Rule.days = days
                              this.setState({...this.state, Rule})
                              return e
                          }} />
                      </Col>
                      <Col span={10}>
                          <InputNumber min={0} max={100} placeholder="假期天数" formatter={value =>`${value}天`} value={item.vacation} onChange={(e)=>{
                              item.vacation = e
                              let Rule = {...this.state.Rule}
                              Rule.days = days
                              this.setState({...this.state, Rule})
                              return e
                          }} />
                      </Col>
                      <Col span={4}>
                          <Button icon="delete" disabled={days.length === 1} onClick={() => {
                              this.props.form.setFields({
                                      ['items_'+index]:{
                                          errors:null
                                      }
                                  })
                              let Rule = {...this.state.Rule}
                              Rule.days.splice(index, 1)
                              this.setState({...this.state, Rule})
                          }} />
                      </Col>
                  </Row>
                </div>
            </FormItem>
            </div>
            )
      })
      return (
        <div>
          <FormItem
          {...this.state.formItemLayout}
          label="类别"
          hasFeedback
          >
          年假
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="清零月份"
          >
          {
              getFieldDecorator('clear_date',
              {
                  initialValue: this.state.Rule.clear_date,
                  getValueFromEvent:(e)=>{
                      let Rule = {...this.state.Rule}
                      Rule.clear_date = e
                      this.setState({...this.state, Rule})
                      return e
                  },
                  rules: [
                  {
                      required: true,
                      message: '请选择清零月份'
                  }
              ],
              })
              (
                <Select>
                  <Option value="1">一月</Option>
                  <Option value="2">二月</Option>
                  <Option value="3">三月</Option>
                  <Option value="4">四月</Option>
                  <Option value="5">五月</Option>
                  <Option value="6">六月</Option>
                  <Option value="7">七月</Option>
                  <Option value="8">八月</Option>
                  <Option value="9">九月</Option>
                  <Option value="10">十月</Option>
                  <Option value="11">十一月</Option>
                  <Option value="12">十二月</Option>
                </Select>
              )
          }
          </FormItem>
          {items}
          <FormItem
          label=""
          {...this.state.formItemLayoutWithOutLabel}
          >

                <Button type="dashed" style={{ width: '60%' }} onClick={()=>{
                        let Rule = {...this.state.Rule}
                        Rule.days.push(
                            {
                                "workingage":0,
                                "vacation":0,
                            }
                        )
                        this.setState({...this.state, Rule})
                    }}>
                    <Icon type="plus" />增加阶梯
                </Button>
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
                <Button type="primary" size="large" htmlType="submit" loading={this.props.ruleStore.updateAnnualVacationLoading}>提交</Button>
                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                this.props.switchStatus("list")
                }}>返回</Button>
            </FormItem>
        </div>
      )
    }
    getBusinessTrip()
    {
      const { getFieldDecorator } = this.props.form
      return (
        <div>
          <FormItem
          {...this.state.formItemLayout}
          label="类别"
          hasFeedback
          >
          出差
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="出差补贴"
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
                      message: '请输入出差补贴'
                  }
              ],
              })
              (
                  <InputNumber formatter={value =>`￥ ${value}`} />
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
                <Button type="primary" size="large" htmlType="submit" loading={this.props.ruleStore.updateBusinessTripLoading}>提交</Button>
                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                this.props.switchStatus("list")
                }}>返回</Button>
            </FormItem>
        </div>
      )
    }
    getDaysOff()
    {
      const { getFieldDecorator } = this.props.form
      return (
        <div>
          <FormItem
          {...this.state.formItemLayout}
          label="类别"
          hasFeedback
          >
          调休
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="调休费用"
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
                      message: '请输入调休费用'
                  }
              ],
              })
              (
                  <InputNumber formatter={value =>`￥ ${value}`} />
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
                <Button type="primary" size="large" htmlType="submit" loading={this.props.ruleStore.updateDaysOffLoading}>提交</Button>
                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                this.props.switchStatus("list")
                }}>返回</Button>
            </FormItem>
        </div>
      )
    }
    getOverTime()
    {
      const { getFieldDecorator } = this.props.form
      return (
        <div>
          <FormItem
          {...this.state.formItemLayout}
          label="类别"
          hasFeedback
          >
          加班
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="工作日补贴"
          hasFeedback
          >
          {
              getFieldDecorator('weekday_fee',
              {
                  initialValue: this.state.Rule.weekday_fee,
                  getValueFromEvent:(e)=>{
                      let Rule = {...this.state.Rule}
                      Rule.weekday_fee = e
                      this.setState({...this.state, Rule})
                      return e
                  },
                  rules: [
                  {
                      required: true,
                      message: '请输入工作日补贴'
                  }
              ],
              })
              (
                  <InputNumber formatter={value =>`￥ ${value}`} />
              )
          }
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="节假日补贴"
          hasFeedback
          >
          {
              getFieldDecorator('weekend_fee',
              {
                  initialValue: this.state.Rule.weekend_fee,
                  getValueFromEvent:(e)=>{
                      let Rule = {...this.state.Rule}
                      Rule.weekend_fee = e
                      this.setState({...this.state, Rule})
                      return e
                  },
                  rules: [
                  {
                      required: true,
                      message: '请输入节假日补贴'
                  }
              ],
              })
              (
                  <InputNumber formatter={value =>`￥ ${value}`} />
              )
          }
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="工作日最小加班时间"
          hasFeedback
          >
          {
              getFieldDecorator('weekday_minimum_pay_hours',
              {
                  initialValue: this.state.Rule.weekday_minimum_pay_hours,
                  getValueFromEvent:(e)=>{
                      let Rule = {...this.state.Rule}
                      Rule.weekday_minimum_pay_hours = e
                      this.setState({...this.state, Rule})
                      return e
                  },
                  rules: [
                  {
                      required: true,
                      message: '请输入工作日最小加班时间'
                  }
              ],
              })
              (
                  <InputNumber formatter={value =>`${value}小时`} />
              )
          }
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="节假日最小加班时间"
          hasFeedback
          >
          {
              getFieldDecorator('weekend_minimum_pay_hours',
              {
                  initialValue: this.state.Rule.weekend_minimum_pay_hours,
                  getValueFromEvent:(e)=>{
                      let Rule = {...this.state.Rule}
                      Rule.weekend_minimum_pay_hours = e
                      this.setState({...this.state, Rule})
                      return e
                  },
                  rules: [
                  {
                      required: true,
                      message: '请输入节假日最小加班时间'
                  }
              ],
              })
              (
                  <InputNumber formatter={value =>`${value}小时`} />
              )
          }
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="工作日是否多次补贴"
          hasFeedback
          >
          {
              getFieldDecorator('weekday_multiple_payment',
              {
                  valuePropName:'checked',
                  initialValue: Boolean(this.state.Rule.weekday_multiple_payment),
                  getValueFromEvent:(e)=>{
                      let Rule = {...this.state.Rule}
                      Rule.weekday_multiple_payment = e
                      this.setState({...this.state, Rule})
                      return e
                  }
              })
              (
                  <Switch />
              )
          }
          </FormItem>
          <FormItem
          {...this.state.formItemLayout}
          label="节假日是否多次补贴"
          >
          {
              getFieldDecorator('weekend_multiple_payment',
              {
                  valuePropName:'checked',
                  initialValue: Boolean(this.state.Rule.weekend_multiple_payment),
                  getValueFromEvent:(e)=>{
                      let Rule = {...this.state.Rule}
                      Rule.weekend_multiple_payment = e
                      this.setState({...this.state, Rule})
                      return e
                  }
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
                <Button type="primary" size="large" htmlType="submit" loading={this.props.ruleStore.updateOvertimeLoading}>提交</Button>
                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                this.props.switchStatus("list")
                }}>返回</Button>
            </FormItem>
        </div>
      )
    }
    render()
    {
        const { getFieldDecorator } = this.props.form 
        return (
            <div>
                <Layout className="layout-main">
                    <Row className="titleBox">
                        <Col span={20}>
                            <div className="h1">编辑考勤规则</div>
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
                            {this.props.ruleStore.currentOtherRecord.type=='late'?this.getLate():null}
                            {this.props.ruleStore.currentOtherRecord.type=='absenteeism'?this.getAbsenteeism():null}
                            {this.props.ruleStore.currentOtherRecord.type=='annualvacation'?this.getAnnualVacation():null}
                            {this.props.ruleStore.currentOtherRecord.type=='businesstrip'?this.getBusinessTrip():null}
                            {this.props.ruleStore.currentOtherRecord.type=='daysoff'?this.getDaysOff():null}
                            {this.props.ruleStore.currentOtherRecord.type=='overtime'?this.getOverTime():null}
                          </Form>
                        </div>
                    
                </Layout>
            </div>
        )
    }
}
RuleAddView = Form.create()(RuleAddView)


const mapStateToProps = (state) => ({
  ruleStore: state.rule
})

const mapDispatchToProps = {
  switchStatus, updateLate, updateAbsenteeism, updateOvertime, updateDaysOff, updateBusinessTrip, updateAnnualVacation
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleAddView)
