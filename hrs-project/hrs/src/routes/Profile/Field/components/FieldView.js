import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import { Table, Layout, Button, Row, Col, Icon, Form, Input, Select, DatePicker, Upload, Tag, Modal, Popconfirm, Spin } from 'antd'
import AddGroupView from './AddGroupView'
import AddFieldView from './AddFieldView'
import DepartmentSelect from 'components/DepartmentSelect'
import MembersSelect from 'components/MembersSelect'
import {saveGroup, listGroup, sortGroup, saveInputField,
        saveSelectField, saveFileField, saveDateField,
        saveDepartmentField, saveMemberField, sortField,
        removeGroup, removeField,
        getDepartment, setErrorGetDepartment, getUsers,
        setErrorGetUsers} from '../actions/FieldAction'
const FormItem = Form.Item
const Option = Select.Option
class FieldView extends Component 
{
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
                  sm: { span: 20 }
              },
          },
          formItemLayoutWithOutLabel : 
          {
              wrapperCol: 
              {
                  sm: { span: 20, offset: 4 },
              }
          },
          addGroupModalVisible: false,
          addFieldModalVisible: false,
          fieldStore:[],
          currentGroup:{},
          currentGroupIndex:-1,
          currentField:{},
          currentFieldIndex:-1,
          currentRemovingGroupIndex: -1,
          currentRemovingFieldIndex: -1
      }
    }

    static propTypes =
    {
      fieldStore: React.PropTypes.object.isRequired,
      listGroup: React.PropTypes.func.isRequired,
      saveGroup: React.PropTypes.func.isRequired,
      sortGroup: React.PropTypes.func.isRequired,
      saveInputField: React.PropTypes.func.isRequired,
      saveSelectField: React.PropTypes.func.isRequired,
      saveFileField: React.PropTypes.func.isRequired,
      saveDateField: React.PropTypes.func.isRequired,
      saveDepartmentField: React.PropTypes.func.isRequired,
      saveMemberField:  React.PropTypes.func.isRequired,
      sortField: React.PropTypes.func.isRequired,
      removeGroup: React.PropTypes.func.isRequired,
      removeField: React.PropTypes.func.isRequired,
      getDepartment: React.PropTypes.func.isRequired,
      setErrorGetDepartment: React.PropTypes.func.isRequired,
      getUsers: React.PropTypes.func.isRequired,
      setErrorGetUsers: React.PropTypes.func.isRequired
    }
    componentWillMount()
    {
      this.props.getDepartment()
      this.props.getUsers()
      if(!this.props.fieldStore.fields.length)
      {
        this.props.listGroup()
      }
      this.setState({...this.state, fieldStore:this.props.fieldStore})
    }
    async componentWillReceiveProps(nextProps)
    {
      if(!this.props.fieldStore.addGroupError && nextProps.fieldStore.addGroupError)
      {
        this.refs.addGroup.setError(nextProps.fieldStore.addGroupError)
      }
      if(!this.props.fieldStore.addFileError && nextProps.fieldStore.addFileError)
      {
        this.refs.addFile.setError(nextProps.fieldStore.addFileError)
      }
      if(this.props.fieldStore.addGroupLoading && !nextProps.fieldStore.addGroupLoading && !nextProps.fieldStore.addGroupError)
      {
        await this.setAddGroupModalVisible(false)
      }
      if(this.props.fieldStore.addFieldLoading && !nextProps.fieldStore.addFieldLoading && !nextProps.fieldStore.addFieldError)
      {
        await this.setAddFieldModalVisible(false,-1,-1,{})
      }
      if(!this.state.fieldStore.fields.length)
      {
        await this.setState({...this.state, fieldStore:nextProps.fieldStore})
      }
      
    }
    
    getGroup()
    {
      if(!this.state.fieldStore.fields.length)
      {
        return (<div></div>)
      }
      return this.state.fieldStore.fields.map((item,index)=>{
        const Group = SortableContainer(({items}) => 
        {
          const DragHandle = SortableHandle(() => {
            return (
                <Col span={21}>
                  <div className="h1" style={{cursor:"move"}}>
                    <Icon type="bars" style={{fontSize:'16px'}} /> {item.name}
                  </div>  
                </Col>
            )
          })
          return (
            <div key={"g_"+index} style={{paddingBottom:'20px', background:'#fff'}}>
              <Row className="groupTitle">
                <DragHandle />
                {item.kernel?(
                      <div>
                      <Col span={1}></Col>
                      <Col span={1}><a onClick={async ()=>{
                            await this.setState({...this.state, currentGroup: item, currentGroupIndex: index, addGroupModalVisible: true})
                          }} className="edit">编辑</a></Col>
                      <Col span={1}><Tag>系统</Tag></Col>
                      </div>
                      ):(
                      <div>
                        <Col span={1}></Col>
                        <Col span={1}><a className="edit" onClick={async ()=>{
                            await this.setState({...this.state, currentGroup: item, currentGroupIndex: index, addGroupModalVisible: true})
                          }}>编辑</a></Col>
                        <Col span={1}>
                        {
                            item._id == this.state.currentRemovingGroupIndex && this.props.fieldStore.removeGroupLoading?
                            <span>
                              <Spin size="small" />
                            </span>
                            :
                            <Popconfirm title="确定要删除吗？" onConfirm={async () => {
                              if(!this.props.fieldStore.removeGroupLoading)
                              {
                                await this.setState({...this.state, currentRemovingGroupIndex: item._id})
                                this.props.removeGroup(item._id)
                              }
                            }}>
                              <a className="delete">删除</a>
                            </Popconfirm>
                          }
                          </Col>
                        </div>
                      )}
              </Row>
              <ul>
                {items}
              </ul>
              <a onClick={()=>{this.setAddFieldModalVisible(true, index, -1, {})}} style={{lineHeight:'35px'}}><Icon type="plus" /> 新增字段</a>
            </div>
          )
        })
        const Item = SortableElement((value) => {
          return value.value
        })
        let fields = this.getElement(item.fields, index)
        const result = (<Group items={fields} key={"g_"+index}  useDragHandle={true} onSortEnd={(position, e)=>{
                       let fieldStore = {...this.state.fieldStore}
                       fieldStore.fields[index].fields = arrayMove(fieldStore.fields[index].fields, position.oldIndex, position.newIndex)
                       this.setState({...this.state, fieldStore: fieldStore})
                       this.props.sortField(fieldStore.fields[index].fields[position.oldIndex]._id, position.oldIndex+1, position.newIndex+1)
                    }} />)
        return (<Item index={index} value={result} key={"r_"+index}></Item>)
      })
    }
    getElement(items, groupIndex)
    {
      return items.map((item,index)=>{
        let Item
        let element
        switch(item.type)
        {
          case "input":
            element = this.getInput(item)
            break
          case "select":
            element = this.getSelect(item)
            break
          case "date":
            element = this.getDate(item)
            break
          case "file":
            element = this.getUpload(item)
            break
          case "department":
            element = this.getDepartment(item)
            break
          case "member":
            element = this.getMember(item)
            break
          default:
            element = (<div></div>)
            break
        }
        
        Item = SortableElement((value) => {
          const DragHandle = SortableHandle(() => {
            return (
                <span>
                  <Col span={20}>{element}</Col>
                </span>
            )
          })
          return (
                  <Row className="customField">
                    <DragHandle />
                    {item.kernel?(
                      <span>
                        <Col span={1}></Col>
                        <Col span={1}><a onClick={async ()=>{
                          await this.setAddFieldModalVisible(true, groupIndex, index, item)
                        }} className="edit">编辑</a></Col>
                        <Col span={2}><Tag>系统</Tag></Col>
                      </span>
                      ):(
                        <span>
                          <Col span={1}></Col>
                          <Col span={1}><a onClick={async ()=>{
                            await this.setAddFieldModalVisible(true, groupIndex, index, item)
                          }} className="edit">编辑</a></Col>
                          <Col span={2}>
                          {
                            item._id.$oid == this.state.currentRemovingFieldIndex && this.props.fieldStore.removeFieldLoading?
                            <span>
                              <Spin size="small" />
                            </span>
                            :
                            <Popconfirm title="确定要删除吗？" onConfirm={async () => {
                              if(!this.props.fieldStore.removeFieldLoading)
                              {
                                await this.setState({...this.state, currentRemovingFieldIndex: item._id.$oid})
                                this.props.removeField(item._id)
                              }
                            }}>
                              <a className="delete">删除</a>
                            </Popconfirm>
                          }
                          </Col>
                        </span>
                      )}
                  </Row>
              )
        })
        return (<Item key={"e_"+index} index={index} value={item}></Item>)
      })
    }
    getDepartment(item)
    {
      return (
        <FormItem {...this.state.formItemLayout} help={item.remark} label={item.name} required={item.require}>
          <DepartmentSelect width={"50%"} disabled={true} data= {this.props.fieldStore.departments} multiple={item.multiple} treeCheckStrictly={item.treeCheckStrictly} />
          {item.check?(<Tag style={{marginLeft:'5px'}}>员工可查看</Tag>):(<span></span>)}
          {item.modify?(<Tag style={{marginLeft:'5px'}}>员工可修改</Tag>):(<span></span>)}
          {item.fill?(<Tag style={{marginLeft:'5px'}}>员工可填写</Tag>):(<span></span>)}
        </FormItem>
      )
    }
    getMember(item)
    {
      return (
        <FormItem {...this.state.formItemLayout} help={item.remark} label={item.name} required={item.require}>
          <MembersSelect data={this.props.fieldStore.users} width={"50%"} disabled={true} multiple={item.multiple} />
          {item.check?( <Tag style={{marginLeft:'5px'}}>员工可查看</Tag>):(<span></span>)}
          {item.modify?( <Tag style={{marginLeft:'5px'}}>员工可修改</Tag>):(<span></span>)}
          {item.fill?(<Tag style={{marginLeft:'5px'}}>员工可填写</Tag>):(<span></span>)}
        </FormItem>
      )
    }
    getInput(item)
    {
      return (
        <FormItem {...this.state.formItemLayout} help={item.remark} label={item.name} required={item.require}>
            <Input disabled={true} style={{width:"50%"}} />
            {item.check?( <Tag style={{marginLeft:'5px'}}>员工可查看</Tag>):(<span></span>)}
            {item.modify?( <Tag style={{marginLeft:'5px'}}>员工可修改</Tag>):(<span></span>)}
            {item.fill?(<Tag style={{marginLeft:'5px'}}>员工可填写</Tag>):(<span></span>)}
        </FormItem>
      )
    }
    getUpload(item)
    {
      return (
        <FormItem {...this.state.formItemLayout} help={item.remark} label={item.name} required={item.require}>
            <Upload>
              <Button disabled={true}>
                <Icon type="upload" /> 
                {item.filetype=='picture'?(<span>点击上传图片(最大{item.size}Kb)</span>):("")}
                {item.filetype=='doc'?(<span>点击上传文档(最大{item.size}Kb)</span>):("")}
                {item.filetype=='archive'?(<span>点击上传压缩文件(最大{item.size}Kb)</span>):("")}
              </Button>
              {item.check?( <Tag style={{marginLeft:'5px'}}>员工可查看</Tag>):(<span></span>)}
              {item.modify?( <Tag style={{marginLeft:'5px'}}>员工可修改</Tag>):(<span></span>)}
              {item.fill?(<Tag style={{marginLeft:'5px'}}>员工可填写</Tag>):(<span></span>)}
            </Upload>
        </FormItem>
      )
    }
    getDate(item)
    {
      return (
        <FormItem {...this.state.formItemLayout} help={item.remark} label={item.name} required={item.require}>
            <DatePicker  disabled={true} format="YYYY-MM-DD" style={{width:"50%"}} />
            {item.check?( <Tag style={{marginLeft:'5px'}}>员工可查看</Tag>):(<span></span>)}
            {item.modify?( <Tag style={{marginLeft:'5px'}}>员工可修改</Tag>):(<span></span>)}
            {item.fill?(<Tag style={{marginLeft:'5px'}}>员工可填写</Tag>):(<span></span>)}
        </FormItem>
      )
    }
    getSelect(item)
    {
      let options = []
      item.options.map((value,index)=>{
        options.push(<Option key={index} value={value}>{value}</Option>)
      })
      return (
        <FormItem {...this.state.formItemLayout} help={item.remark} label={item.name} required={item.require}>  
          <Select style={{width:"50%"}} placeholder= "请选择" disabled={true}>
            {options}
          </Select>
            {item.check?( <Tag style={{marginLeft:'5px'}}>员工可查看</Tag>):(<span></span>)}
            {item.modify?( <Tag style={{marginLeft:'5px'}}>员工可修改</Tag>):(<span></span>)}
            {item.fill?(<Tag style={{marginLeft:'5px'}}>员工可填写</Tag>):(<span></span>)}
        </FormItem>
      )
    }
    async setAddGroupModalVisible(status)
    {
      if(!status)
      {
        await this.setState({...this.state, addGroupModalVisible:false, currentGroup:{}, currentGroupIndex: -1})
      }
      else
      {
        await this.setState({...this.state, addGroupModalVisible:true, currentGroupIndex: -1})
      }
    }
    async setAddFieldModalVisible(status, groupIndex, fieldIndex, item)
    {
      if(!status)
      {
        await this.setState({...this.state, addFieldModalVisible:false, currentField:{}, currentFieldIndex: -1, currentGroupIndex: -1})
      }
      else
      {
        await this.setState({...this.state, addFieldModalVisible:true, currentFieldIndex: fieldIndex, currentGroupIndex: groupIndex, currentField: item})
      }
    }
    render()
    {
      const Root = SortableContainer(({items}) => 
        {
          return (<div>{items}</div>)
        }
      )
      const Loading = (
                <div className="TableLoading">
                    <Spin size="large"></Spin>
                </div>
            )
      if(this.state.fieldStore.loading)
      {
        return Loading
      }
      return (
          <Layout className="layout-main">
              <Row className="titleBox">
                  <Col span={20}><div className="h1">员工档案字段</div></Col>
                  <Col span={4} className="extra"></Col>
              </Row>
              <div className="table-container">
                <Form style={{marginTop:20}}>
                  <Root items={this.getGroup()} onSortEnd={(position, e)=>{
                    let fieldStore = {...this.state.fieldStore}
                    let current = fieldStore.fields[position.oldIndex]
                    fieldStore.fields = arrayMove(fieldStore.fields, position.oldIndex, position.newIndex)
                    this.setState({...this.state, fieldStore: fieldStore})
                    this.props.sortGroup(current._id, position.oldIndex+1, position.newIndex+1)
                  }}  useDragHandle={true} />
                </Form>
                <Row style={{background:'#f6f6f6', padding:'10px 20px', borderBottom:'1px solid #eee'}}>
                  <Col span={20}><a onClick={()=>{this.setAddGroupModalVisible(true)}}><Icon type="plus" /> 新增分组</a></Col>
                  <Col span={4} className="extra"></Col>
                </Row>
              </div>
              <AddGroupView ref="addGroup"
                            group={this.state.currentGroup}
                            visible={this.state.addGroupModalVisible}
                            onOk={(result)=>
                            {
                              if(result)
                              {
                                this.props.saveGroup(result._id, result.name)
                              }
                            }}
                            confirmLoading={ this.props.fieldStore.addGroupLoading }
                            onCancel={() => this.setAddGroupModalVisible(false)}
                            >
                </AddGroupView>
                <AddFieldView ref="addField"
                            field={this.state.currentField}
                            visible={this.state.addFieldModalVisible}
                            confirmLoading={this.props.fieldStore.addFieldLoading}
                            onOk={(result) =>
                            {
                              const groupid = this.state.fieldStore.fields[this.state.currentGroupIndex]._id
                              let _id = ""
                              if(this.state.currentFieldIndex != -1)
                              {
                                _id = this.state.currentField._id
                              }
                              if(result)
                              {
                                switch(result.type)
                                {
                                  case 'input':
                                    this.props.saveInputField(_id, groupid, result.type, result.name, result.namespace, result.require, result.modify, result.check, result.fill, result.regex, result.warning, result.unique, result.remark)
                                  break
                                  case 'select':
                                    this.props.saveSelectField(_id, groupid, result.type, result.name, result.namespace, result.require, result.modify, result.check, result.fill, result.remark, result.options)
                                  break
                                  case 'file':
                                    this.props.saveFileField(_id, groupid, result.type, result.name, result.namespace, result.require, result.modify, result.check, result.fill, result.filetype, result.size, result.maximum, result.remark)
                                  break
                                  case 'date':
                                    this.props.saveDateField(_id, groupid, result.type, result.name, result.namespace, result.require, result.modify, result.check, result.fill, result.remark)
                                  break
                                  case 'department':
                                    this.props.saveDepartmentField(_id, groupid, result.type, result.name, result.namespace, result.require, result.modify, result.check, result.fill, result.remark, result.multiple, result.treeCheckStrictly)
                                  break
                                  case 'member':
                                    this.props.saveMemberField(_id, groupid, result.type, result.name, result.namespace, result.require, result.modify, result.check, result.fill, result.remark, result.multiple)
                                  break
                                }
                              }
                            }}
                            onCancel={() => this.setAddFieldModalVisible(false,-1,-1,{})}>
                </AddFieldView>
          </Layout>
      )
    }
}

const mapStateToProps = (state) => ({
  fieldStore:state.field
})

const mapDispatchToProps = {
  saveGroup, listGroup, sortGroup,
  saveInputField, saveSelectField,
  saveFileField, saveDateField, saveDepartmentField,
  saveMemberField, sortField, removeGroup, removeField,
  getDepartment, setErrorGetDepartment, getUsers, setErrorGetUsers
}
export default connect(mapStateToProps, mapDispatchToProps)(FieldView)
