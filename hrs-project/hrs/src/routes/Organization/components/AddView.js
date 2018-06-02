import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Layout, Input, Tree, Spin, Select, Icon, Button, Modal, Form, Row, Col, Switch } from 'antd'
import {toggle, setNewDepartment, add} from '../actions/OrganizationAction'
const FormItem = Form.Item
class AddView extends Component 
{
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
            }
        }
    }
    static propTypes =
    {
        data: React.PropTypes.object.isRequired,
        add: React.PropTypes.func.isRequired,
        toggle: React.PropTypes.func.isRequired,
        setNewDepartment: React.PropTypes.func.isRequired
    }
    componentWillMount() 
    {

    }
    componentWillReceiveProps(nextProps)
    {
    }
    handleCancel()
    {
    }
    verify(e)
    {
        e.preventDefault()
        this.props.form.validateFields((err, values) => 
        {
          if (!err) 
          {
            this.props.add(this.props.data.newDepartment.name,
                           this.props.data.newDepartment.parentid,
                           this.props.data.newDepartment.create_dept_group)
          }
        })
    }
    render()
    {
        const { getFieldDecorator } = this.props.form 
        return (
          <Layout className="layout-main">
              <Row className="titleBox" >
                  <Col span={20}>
                      <div className="h1">新增子部门</div>
                  </Col>
                  <Col span={4} className="extra">
                      <Button
                              type="primary"
                              icon="rollback"
                              onClick={()=>{this.props.toggle("tree")}}>
                              返回
                      </Button>
                  </Col>
              </Row>
              <div className="table-container">
                  <Form style={{marginTop:20}} onSubmit={(e)=>{this.verify(e)}}>
                    <FormItem
                            {...this.state.formItemLayout}
                            label="部门名称"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('name',
                                {
                                    initialValue: this.props.data.newDepartment.name,
                                    getValueFromEvent:(e)=>{
                                        let Department = {...this.props.data.newDepartment}
                                        Department.name = e.target.value
                                        this.props.setNewDepartment(Department)
                                        return e.target.value
                                    },
                                    rules: [
                                    {
                                        required: true,
                                        message: "请输入部门名称"
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
                            label="是否建群"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('create_dept_group',
                                {
                                    initialValue: this.props.data.newDepartment.create_dept_group,
                                    getValueFromEvent:(e)=>{
                                        let Department = {...this.props.data.newDepartment}
                                        Department.create_dept_group = e
                                        this.props.setNewDepartment(Department)
                                        return e
                                    }
                                })
                                (
                                    <Switch />
                                )
                            }
                    </FormItem>
                    <FormItem {...this.state.formItemLayoutWithOutLabel} style={{marginTop: '20px'}}>
                                <Button type="primary" loading={this.props.data.addLoading} size="large" htmlType="submit">提交</Button>
                                <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{
                                    this.props.toggle("tree")
                                }}>返回</Button>
                    </FormItem>
                  </Form>
              </div>
          </Layout>
        )
    }
}
AddView = Form.create()(AddView)
const mapStateToProps = (state) => ({
    data: state.organization
})

const mapDispatchToProps = {
    toggle, setNewDepartment, add
}
export default connect(mapStateToProps, mapDispatchToProps)(AddView)
