import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Form, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Input, InputNumber, Radio, Switch } from 'antd'
import { Link } from 'react-router'
import {switchStatus, save} from '../actions/MachineAction'
const FormItem = Form.Item
const RadioGroup = Radio.Group
class MachineAddView extends Component {

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
            Machine:
            {
                _id: '',
                serial_number: '',
                ip_address:'',
                location:''
            }
        }
    }
    static propTypes =
    {
        switchStatus: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        machineStore: React.PropTypes.object
    }
    componentWillMount()
    {
        if(this.props.machineStore.pageState == 'list')
        {
            this.props.router.push('/attendance/machine')
        }
        if(this.props.machineStore)
        {
            let Machine = this.props.machineStore.currentRecord
            this.setState({...this.state, Machine})
        }
        if(this.props.machineStore.pageState == 'add')
        {
            let Machine = {
                _id: '',
                serial_number: '',
                ip_address:'',
                location:''
            }
            this.setState({...this.state, Machine})
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.machineStore.pageState == 'list')
        {
            this.props.router.push('/attendance/machine')
        }
    }
    verify(e)
    {
        e.preventDefault()
        this.props.form.validateFields((err, values) => 
        {
            if(!err)
            {
                this.props.save(this.state.Machine._id,
                                this.state.Machine.serial_number,
                                this.state.Machine.ip_address,
                                this.state.Machine.location)
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
                            {!this.state.Machine._id?(<div className="h1">新增考勤机</div>):(<div className="h1">编辑考勤机</div>)}
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
                            label="机器编号"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('serial_number',
                                {
                                    initialValue: this.state.Machine.serial_number,
                                    getValueFromEvent:(e)=>{
                                        let Machine = {...this.state.Machine}
                                        Machine.serial_number = e
                                        this.setState({...this.state, Machine})
                                        return e
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: '请输入机器编号'
                                    }
                                ],
                                })
                                (
                                    <InputNumber min={1} max={100} step={1} />
                                )
                            }
                           </FormItem>
                           
                           <FormItem
                            {...this.state.formItemLayout}
                            label="IP地址"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('ip_address',
                                {
                                    initialValue: this.state.Machine.ip_address,
                                    getValueFromEvent:(e)=>{
                                        let Machine = {...this.state.Machine}
                                        Machine.ip_address = e.target.value
                                        this.setState({...this.state, Machine})
                                        return e.target.value
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: '请填写IP地址'
                                    },
                                    {
                                        pattern:RegExp(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/), message: "IP地址格式不正确。",
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
                            label="机器位置"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('location',
                                {
                                    initialValue: this.state.Machine.location,
                                    getValueFromEvent:(e)=>{
                                        let Machine = {...this.state.Machine}
                                        Machine.location = e.target.value
                                        this.setState({...this.state, Machine})
                                        return e.target.value
                                    },
                                })
                                (
                                    <Input />
                                )
                            }
                           </FormItem>
                          <FormItem {...this.state.formItemLayoutWithOutLabel} style={{marginTop: '20px'}}>
                                <Button type="primary" size="large" htmlType="submit" loading={this.props.machineStore.saveLoading}>提交</Button>
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
MachineAddView = Form.create()(MachineAddView)


const mapStateToProps = (state) => ({
  machineStore: state.machine
})

const mapDispatchToProps = {
  switchStatus, save
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineAddView)
