import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import { Table, Layout, Button, Row, Col, Icon, Form, Input, InputNumber, Select, DatePicker, Upload, Tag, Modal, Switch } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
class AddFieldView extends Component {
    constructor(props)
    {
      super(props)
      this.state = {
        formItemLayout:
          {
              labelCol: 
              {
                  sm: { span: 5 }
              },
              wrapperCol: 
              {
                  sm: { span: 17 }
              },
          },
          formItemLayoutWithOutLabel : 
          {
              wrapperCol: 
              {
                  sm: { span: 17, offset: 5 },
              }
          },
          field:{
            "name": "",
            "namespace":"",
            "type": "input",
            "require": false,
            "kernel": false,
            "modify": false,
            "check": false,
            "fill": false,
            "regex": "",
            "warning": "",
            "unique": false,
            "remark": ""
          },
          nameValidateStatus:"",
          nameHelp:"",
      }
    }
    static propTypes =
    {
      field: React.PropTypes.object,
      visible: React.PropTypes.bool.isRequired,
      confirmLoading: React.PropTypes.bool.isRequired,
      onOk: React.PropTypes.func.isRequired,
      onCancel: React.PropTypes.func.isRequired
    }
    componentWillReceiveProps(nextProps)
    {
      if(this.props.visible && !nextProps.visible)
      {
        const field = {
            "_id": "",
            "name": "",
            "namespace":"",
            "type": "input",
            "require": false,
            "kernel": false,
            "modify": false,
            "check": false,
            "fill": false,
            "regex": "",
            "remark": "",
            "unique": false,
            "warning": ""
        }
        this.setState({...this.state, field: field})
      }
      if(!this.state.field._id && Object.keys(nextProps.field).length)
      {
        this.setState({...this.state, field:nextProps.field, validateStatus:"", help:""})
      }
    }
    componentWillMount()
    {
      if(!this.state.field._id && Object.keys(this.props.field).length)
      {
        this.setState({...this.state, field:this.props.field, validateStatus:"", help:""})
      }
    }
    render()
    {
      return (
        <Modal title={Object.keys(this.state.field)?"编辑字段":"新增字段"}
               wrapClassName="permission-modal"
               visible={this.props.visible}
               confirmLoading={this.props.confirmLoading}
               onOk={async () => {
          let result = await this.getValue()
          this.props.onOk(result)
        }}
        onCancel={() => {
          this.props.onCancel()
        }}>
        <Form style={{marginTop:20, maxHeight:'350px', overflow:'auto'}}>
          <FormItem {...this.state.formItemLayout} label="字段名称" required={true} validateStatus={this.state.nameValidateStatus} help={this.state.nameHelp}>
            <Input value={this.state.field.name} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.name = e.target.value
                  this.setState({...this.state, field})
                  return e.target.value
              }} onPressEnter={(e)=>
              {
                let result = this.getValue()
                this.props.onOk(result)
              }} />
          </FormItem>
          <FormItem {...this.state.formItemLayout} label="命名空间" required={true} validateStatus={this.state.namespaceValidateStatus} help={this.state.namespaceHelp}>
            <Input value={this.state.field.namespace} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.namespace = e.target.value
                  this.setState({...this.state, field})
                  return e.target.value
              }} onPressEnter={(e)=>
              {
                let result = this.getValue()
                this.props.onOk(result)
              }} />
          </FormItem>
          <FormItem {...this.state.formItemLayout} label="字段说明" required={false}>
            <Input value={this.state.field.remark} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.remark = e.target.value
                  this.setState({...this.state, field})
                  return e.target.value
              }} onPressEnter={(e)=>
              {
                let result = this.getValue()
                this.props.onOk(result)
              }} />
          </FormItem>
          <FormItem {...this.state.formItemLayout} label="是否必填" required={true}>
              <Switch checked={this.state.field.require} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.require = e
                  this.setState({...this.state, field})
                  return e
              }} />
          </FormItem>
          <FormItem {...this.state.formItemLayout} label="员工可填写" required={true}>
              <Switch checked={this.state.field.fill} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.fill = e
                  this.setState({...this.state, field})
                  return e
              }} />
          </FormItem>
          <FormItem {...this.state.formItemLayout} label="员工可修改" required={true}>
              <Switch checked={this.state.field.modify} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.modify = e
                  this.setState({...this.state, field})
                  return e
              }} />
          </FormItem>
          <FormItem {...this.state.formItemLayout} label="员工可查看" required={true}>
              <Switch checked={this.state.field.check} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.check = e
                  this.setState({...this.state, field})
                  return e
              }} />
          </FormItem>
          
          <FormItem {...this.state.formItemLayout} label="字段类型" required={true}>
              <Select placeholder="请选择字段类型" value={this.state.field.type} onChange={(e)=>{
                let field = {...this.state.field}
                switch(field.type)
                {
                  case 'input':
                    delete field.warning
                    delete field.regex
                    delete field.unique
                  break
                  case 'select':
                    delete field.options
                  break
                  case 'file':
                    delete field.filetype
                    delete field.size
                    delete field.maximum
                  break
                  case 'department':
                    delete field.multiple
                    delete field.treeCheckStrictly
                  break
                  case 'member':
                    delete field.multiple
                  break
                }
                switch(e)
                {
                  case 'input':
                    field.warning = ''
                    field.regex = ''
                    field.unique = ''
                  break
                  case 'select':
                    field.options = [""]
                  break
                  case 'file':
                    field.filetype = "picture"
                    field.size = 100
                    field.maximum = 1
                  break
                  case 'department':
                    field.multiple = false
                    field.treeCheckStrictly = false
                  break
                  case 'member':
                    field.multiple = false
                  break
                }
                field.type = e
                this.setState({...this.state, field})
                return e
              }}>
                <Option value="input" key="input">文本</Option>
                <Option value="select" key="select">选择</Option>
                <Option value="file" key="file">附件</Option>
                <Option value="date" key="date">日期</Option>
                <Option value="department" key="department">部门</Option>
                <Option value="member" key="member">人员</Option>
              </Select>
          </FormItem>
          {this.state.field.type=="input"?this.getInput():""}
          {this.state.field.type=="select"?this.getSelect():""}
          {this.state.field.type=="file"?this.getFile():""}
          {this.state.field.type=="department"?this.getDepartment():""}
          {this.state.field.type=="member"?this.getMember():""}
        </Form>
        </Modal>
      )
    }
    getSelect()
    {
      const options = this.state.field.options.map((item, index)=>{
      let config = []
        if(index)
        {
          config = {...this.state.formItemLayoutWithOutLabel}
        }
        else
        {
          config = {...this.state.formItemLayout}
        }
        return (
          <FormItem  key={"item_"+index} {...config} label={!index?"选项":""} required={false} validateStatus={this.state.validateStatus} help={this.state.help}>
              <Row>
                <Col span={19}>
                  <Input value={item} onChange={(e)=>
                  {
                      let field = {...this.state.field}
                      field.options[index] = e.target.value
                      this.setState({...this.state, field})
                      return e.target.value
                  }} onPressEnter={(e)=>
                  {
                    let result = this.getValue()
                    this.props.onOk(result)
                  }} />
                </Col>
                <Col span={1}></Col>
                <Col span={4}>
                  <Button icon="delete" disabled={this.state.field.options.length === 1} onClick={() => {
                    let field = {...this.state.field}
                    field.options.splice(index, 1)
                    this.setState({...this.state, field})
                  }} />
                </Col>
              </Row>
        </FormItem>
        )
      })
      return (
        <div>
          {options}
          <Row>
            <Col span={5}></Col>
            <Col span={19}>
              <Button type="dashed" style={{ width: '60%' }} onClick={()=>{
                let field = {...this.state.field}
                field.options.push("")
                this.setState({...this.state, field})
              }}>
                <Icon type="plus" />增加选项
              </Button>
            </Col>
          </Row>
        </div>
      )
    }
    getInput()
    {
      return (<div>
            <FormItem {...this.state.formItemLayout} label="正则表达式" required={false} validateStatus={this.state.validateStatus} help={this.state.help}>
              <Input value={this.state.field.regex} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.regex = e.target.value
                  this.setState({...this.state, field})
                  return e.target.value
              }} onPressEnter={(e)=>
              {
                let result = this.getValue()
                this.props.onOk(result)
              }} />
            </FormItem>
            <FormItem {...this.state.formItemLayout} label="警告信息" required={false} validateStatus={this.state.validateStatus} help={this.state.help}>
              <Input value={this.state.field.warning} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.warning = e.target.value
                  this.setState({...this.state, field})
                  return e.target.value
              }} onPressEnter={(e)=>
              {
                let result = this.getValue()
                this.props.onOk(result)
              }} />
          </FormItem>
          <FormItem {...this.state.formItemLayout} label="唯一性" required={false}>
              <Switch checked={Boolean(this.state.field.unique)} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.unique = e
                  this.setState({...this.state, field})
                  return e
              }} />
          </FormItem>
          </div>)
    }
    getFile()
    {
      return (<div>
            <FormItem {...this.state.formItemLayout} label="文件类型" required={false}>
              <Select placeholder="请选择文件类型" value={this.state.field.filetype} onChange={(e)=>{
                let field = {...this.state.field}
                field.filetype = e
                this.setState({...this.state, field})
                return e
              }}>
                <Option value="picture" key="picture">图片</Option>
                <Option value="doc" key="doc">文档</Option>
                <Option value="archive" key="archive">压缩文件</Option>
              </Select>
            </FormItem>
            <FormItem {...this.state.formItemLayout} label="文件大小(Kb)" required={true} validateStatus={this.state.validateStatus} help={this.state.help}>
              <InputNumber min={1} max={1000000} value={this.state.field.size} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.size = e
                  this.setState({...this.state, field})
                  return e
              }} onPressEnter={(e)=>
              {
                let result = this.getValue()
                this.props.onOk(result)
              }} />
          </FormItem>
          <FormItem {...this.state.formItemLayout} label="最大文件数" required={true} validateStatus={this.state.validateStatus} help={this.state.help}>
              <InputNumber min={1} max={100} value={this.state.field.maximum} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.maximum = e
                  this.setState({...this.state, field})
                  return e
              }} onPressEnter={(e)=>
              {
                let result = this.getValue()
                this.props.onOk(result)
              }} />
          </FormItem>
          </div>)
    }
    getDepartment()
    {
      return (<div>
            <FormItem {...this.state.formItemLayout} label="是否多选" required={false}>
              <Switch checked={this.state.field.multiple} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.multiple = e
                  this.setState({...this.state, field})
                  return e
              }} />
            </FormItem>
            <FormItem {...this.state.formItemLayout} label="是否选择关联">
              <Switch checked={this.state.field.treeCheckStrictly} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.treeCheckStrictly = e
                  this.setState({...this.state, field})
                  return e
              }} />
            </FormItem>
          </div>)
    }
    getMember()
    {
      return (<div>
            <FormItem {...this.state.formItemLayout} label="是否多选" required={false}>
              <Switch checked={this.state.field.multiple} onChange={(e)=>
              {
                  let field = {...this.state.field}
                  field.multiple = e
                  this.setState({...this.state, field})
                  return e
              }} />
            </FormItem>
          </div>)
    }
    async getValue()
    {
      if(!this.state.field.name)
      {
        await this.setState({...this.state, nameValidateStatus: "error", nameHelp:"字段名称不能为空。"})
        return false
      }
      await this.setState({...this.state, nameValidateStatus: "", nameHelp:""})
      return this.state.field
    }
}
export default AddFieldView
