import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Layout, Input, Tree, Spin, Select, Icon, Button, Modal, Form, Row, Col, Switch } from 'antd'
import {toggle, setCurrentDepartment} from '../actions/OrganizationAction'
import DepartmentSelect from 'components/DepartmentSelect'
import MembersSelect from 'components/MembersSelect'
const FormItem = Form.Item
class UpdateView extends Component 
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
            },
            organization:[]
        }
    }
    static propTypes =
    {
        data: React.PropTypes.object.isRequired,
        toggle: React.PropTypes.func.isRequired,
        setCurrentDepartment: React.PropTypes.func.isRequired
    }
    componentWillMount() 
    {
        let organization = this.props.data.data.organization
        organization = this.filter(organization)
        this.setState({...this.state, organization})
    }
    filter(organizations)
    {
        let newOrganizations = []
        for(let i=0; i<organizations.length; i++)
        {
            if(organizations[i]._id.$oid != this.props.data.currentDepartment._id.$oid)
            {
                organizations[i].children = this.filter(organizations[i].children)
                newOrganizations.push({...organizations[i]})
            }
        }
        return newOrganizations
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
            // this.props.add(this.props.data.newDepartment.name,
            //                this.props.data.newDepartment.parentid,
            //                this.props.data.newDepartment.create_dept_group)
          }
        })
    }
    render()
    {
        console.log(this.props.data.currentDepartment.managers)
        const { getFieldDecorator } = this.props.form 
        return (
          <Layout className="layout-main">
              <Row className="titleBox" >
                  <Col span={20}>
                      <div className="h1">编辑部门</div>
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
                                    initialValue: this.props.data.currentDepartment.name,
                                    getValueFromEvent:(e)=>{
                                        let Department = {...this.props.data.currentDepartment}
                                        Department.name = e.target.value
                                        this.props.setCurrentDepartment(Department)
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
                            label="上级部门"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('parentid',
                                {
                                    initialValue: this.props.data.currentDepartment.parentid?[{"value":this.props.data.currentDepartment.parentid.$oid}]:[],
                                    getValueFromEvent:(e)=>{
                                        let Department = {...this.props.data.currentDepartment}
                                        if (!e)
                                        {
                                            Department.parentid = ""
                                        }
                                        else
                                        {
                                            Department.parentid = {"$oid": e.value}
                                        }
                                        this.props.setCurrentDepartment(Department)
                                        return [e]
                                    }
                                })
                                (
                                    <DepartmentSelect
                                         width={"100%"}
                                         data= {this.state.organization}
                                         multiple={false}
                                         treeCheckStrictly={false}
                                         />
                                )
                            }
                    </FormItem>
                    <FormItem
                            {...this.state.formItemLayout}
                            label="部门负责人"
                            hasFeedback
                            >
                            {
                                getFieldDecorator('managers',
                                {
                                    initialValue: this.props.data.currentDepartment.managers.length? [this.props.data.currentDepartment.managers[0].$oid]: [],
                                    getValueFromEvent:(e)=>{
                                        let Department = {...this.props.data.currentDepartment}
                                        if (!e)
                                        {
                                            Department.managers = []
                                        }
                                        else
                                        {
                                            Department.managers = [{"$oid": e[0]}]
                                        }
                                        this.props.setCurrentDepartment(Department)
                                        return [e]
                                    }
                                })
                                (
                                    <MembersSelect 
                                                  data={this.props.data.currentDepartment.members} 
                                                  width={'100%'} 
                                                  disabled={false} 
                                                  multiple={false}
                                                  />
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
UpdateView = Form.create()(UpdateView)
const mapStateToProps = (state) => ({
    data: state.organization
})

const mapDispatchToProps = {
    toggle, setCurrentDepartment
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateView)
