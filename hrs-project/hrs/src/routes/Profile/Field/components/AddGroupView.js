import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import { Table, Layout, Button, Row, Col, Icon, Form, Input, Select, DatePicker, Upload, Tag, Modal } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
class AddGroupView extends Component {
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
                  sm: { span: 22, offset: 2 },
              }
          },
          group:{
            "_id":"",
            "name": "",
            "kernel": 0,
            "fields": []
          },
          validateStatus:"",
          help:""
      }
    }

    static propTypes =
    {
      group: React.PropTypes.object,
      visible: React.PropTypes.bool.isRequired,
      onOk: React.PropTypes.func.isRequired,
      onCancel: React.PropTypes.func.isRequired,
      confirmLoading: React.PropTypes.bool.isRequired
    }
    componentWillReceiveProps(nextProps)
    {
      if(this.props.visible && !nextProps.visible)
      {
        const group={
            "_id":"",
            "name": "",
            "kernel": 0,
            "fields": []
          }
        this.setState({...this.state, group: group})
      }

      if(!this.state.group._id && Object.keys(nextProps.group).length)
      {
        this.setState({...this.state, group:nextProps.group, validateStatus:"", help:""})
      }
      else if(this.state.group._id != nextProps.group._id)
      {
        this.setState({...this.state, group:nextProps.group, validateStatus:"", help:""})
      }
    }
    componentWillMount()
    {
      if(!this.state.group._id && Object.keys(this.props.group).length)
      {
        this.setState({...this.state, group:this.props.group, validateStatus:"", help:""})
      }
    }
    async setError(message)
    {
      await this.setState({...this.state, validateStatus: "error", help: message})
    }
    async getValue()
    {
      if(!this.state.group.name)
      {
        await this.setState({...this.state, validateStatus: "error", help:"分组名称不能为空。"})
        return false
      }
      await this.setState({...this.state, validateStatus: "", help:""})
      return this.state.group
    }
    render()
    {
      return (
        <Modal title={Object.keys(this.state.group)?"编辑字段分组":"新增字段分组"}
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
        <Form style={{marginTop:20}}>
          <FormItem {...this.state.formItemLayout} label="分组名称" required={true} validateStatus={this.state.validateStatus} help={this.state.help}>
            <Input value={this.state.group.name} onChange={(e)=>{
                  let group = {...this.state.group}
                  group.name = e.target.value
                  this.setState({...this.state, group})
                  return e.target.value
              }} onPressEnter={async (e)=>{
                let result = await this.getValue()
                this.props.onOk(result)
              }} />
          </FormItem>
        </Form>
        </Modal>
      )
    }
    
}
export default AddGroupView
