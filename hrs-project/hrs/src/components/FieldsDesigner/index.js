import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import { Table, Layout, Button, Row, Col, Icon, Form, Input, InputNumber, Select, DatePicker, Upload, Tag, Modal, Switch, Alert, Popconfirm } from 'antd'
import Add from './Add'
import DepartmentSelect from 'components/DepartmentSelect'
import MembersSelect from 'components/MembersSelect'
const FormItem = Form.Item
const Option = Select.Option
class FieldsDesigner extends Component {
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
                }
            },
            formItemLayoutWithOutLabel:
            {
                wrapperCol: 
                {
                    sm: { span: 17, offset: 5 }
                }
            },
            visible:false,
            fields:[],
            currentField:null,
            currentIndex:null,
        }
    }
    static propTypes =
    {
        value: React.PropTypes.array,
        onEdit: React.PropTypes.func,
        onMove: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onChange: React.PropTypes.func
    }
    componentWillMount()
    {
        if(this.props.value)
        {   
            let fields = [...this.props.value]
            this.setState({...this.state, fields:fields})
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.value){
            let fields = [...nextProps.value]
            this.setState({...this.state, fields:fields})
        }
       
    }
    getDepartment(item)
    {
        return (
            <FormItem 
                {...this.state.formItemLayout} 
                help={item.remark} 
                label={item.name} 
                required={item.require}
            >
                <DepartmentSelect 
                    width={"50%"} 
                    disabled={true} 
                    data= {this.props.value.departments} 
                    multiple={item.multiple} 
                    treeCheckStrictly={item.treeCheckStrictly} 
                />
            </FormItem>
        )
    }
    getMember(item)
    {
        return (
            <FormItem 
                {...this.state.formItemLayout} 
                help={item.remark} 
                label={item.name} 
                required={item.require}
            >
                <MembersSelect 
                    data={this.props.value.users} 
                    width={"50%"} 
                    disabled={true} 
                    multiple={item.multiple} 
                />
            </FormItem>
        )
    }
    getInput(item)
    {
        return (
            <FormItem 
                {...this.state.formItemLayout} 
                help={item.remark} 
                label={item.name} 
                required={item.require}
            >
                <Input disabled={true} style={{width:"50%"}} />
            </FormItem>
        )
    }
    getNumber(item)
    {
        return (
            <FormItem 
                {...this.state.formItemLayout} 
                help={item.remark} 
                label={item.name} 
                required={item.require}
            >
                <InputNumber disabled={true} style={{width:"50%"}} />
            </FormItem>
        )
    }
    getUpload(item)
    {
        return (
            <FormItem 
                {...this.state.formItemLayout} 
                help={item.remark} 
                label={item.name} 
                required={item.require}
            >
                <Upload>
                    <Button disabled={true}>
                        <Icon type="upload" />
                        {item.filetype=='picture'?(<span>点击上传图片(最大{item.size}Kb)</span>):("")}
                        {item.filetype=='doc'?(<span>点击上传文档(最大{item.size}Kb)</span>):("")}
                        {item.filetype=='archive'?(<span>点击上传压缩文件(最大{item.size}Kb)</span>):("")}
                    </Button>
                </Upload>
            </FormItem>
        )
    }
    getDate(item)
    {
        return (
            <FormItem 
                {...this.state.formItemLayout} 
                help={item.remark} 
                label={item.name} 
                required={item.require}
            >
                <DatePicker  disabled={true} format="YYYY-MM-DD" style={{width:"50%"}} />
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
            <FormItem 
                {...this.state.formItemLayout} 
                help={item.remark} 
                label={item.name} 
                required={item.require}
            >
                <Select style={{width:"50%"}} placeholder= "请选择" disabled={true}>
                    {options}
                </Select>
            </FormItem>
        )
    }
    getElement(items)
    {
        return items.map((item,index)=>{
            let Item
            let element
            switch(item.type)
            {
                case "input":
                    element = this.getInput(item)
                    break
                case "number":
                    element = this.getNumber(item)
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
                    {
                        item.kernel
                            ?
                        (
                            <span>
                                <Col span={1}></Col>
                                <Col span={1}>
                                    <a 
                                        onClick={async ()=>{
                                            this.setState({...this.state, visible:true, currentField:item, currentIndex:index})
                                        }} 
                                        className="edit"
                                    >
                                        编辑
                                    </a>
                                </Col>
                                <Col span={2}><Tag>系统</Tag></Col>
                            </span>
                        ):(
                            <span>
                                <Col span={1}></Col>
                                <Col span={1}>
                                    <a 
                                        onClick={async ()=>{
                                            this.setState({...this.state, visible:true, currentField:item, currentIndex:index})
                                        }} 
                                        className="edit"
                                    >
                                        编辑
                                    </a>
                                </Col>
                                <Col span={2}>
                                {
                                    <Popconfirm 
                                        title="确定要删除吗？" 
                                        onConfirm={async (e) => {
                                            let fields = this.state.fields
                                            let deletedFiled 
                                            for(let i=0;i<fields.length;i++)
                                            {
                                                if(i == index)
                                                {
                                                    deletedFiled = fields.splice(i,1)
                                                    await this.props.onChange(this.state.fields)
                                                    await this.props.onDelete(deletedFiled[0].namespace,[])
                                                    break
                                                }
                                            }
                                        }}
                                    >
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
    render()
    {
        const Root = SortableContainer(({items}) => 
        {
            return (
                <div>
                    <Row  className="groupTitle">
                        <Col span={21}>
                            <div className="h1">
                                <Icon type="bars" style={{fontSize:'16px'}} /> 自定义字段
                            </div>  
                        </Col>
                    </Row>
                    {items}
                </div>
            )
        })
        return (
            <div style={{padding:'20px 0'}}>
                {
                    this.state.fields.length?
                    (
                        <Root 
                            items={this.getElement(this.state.fields)} 
                            onSortEnd={(position, e)=>{
                                let fields = this.state.fields
                                fields = arrayMove(fields, position.oldIndex, position.newIndex)
                                this.setState({...this.state, fields})
                                if(this.props.onChange)
                                {
                                    this.props.onChange(this.state.fields)
                                }
                            }} 
                            useDragHandle={true} 
                        />
                    ):
                    (
                        <div>
                            <Alert
                                showIcon
                                message="提示"
                                description="请新增字段"
                                type="info"
                            />
                        </div>
                    )
                }
                <a 
                    onClick={async ()=>{
                        await this.setState({...this.state, visible:true, currentField:null, currentIndex:null})
                    }} 
                    style={{lineHeight:'35px'}}
                >
                    <Icon type="plus" /> 新增字段
                </a>
                <Add
                    field={this.state.currentField}
                    fields={this.state.fields}
                    currentIndex={this.state.currentIndex}
                    visible={this.state.visible}
                    onDelete = {this.props.onDelete}
                    onOk={async (field)=>
                    {
                        if(this.state.currentField)
                        {
                            let fields = this.state.fields
                            if(this.props.onEdit)
                            {
                                let result = await this.props.onEdit(field)
                                if(result)
                                {
                                    for(let i=0;i<fields.length;i++)
                                    {
                                        if(i == this.state.currentIndex)
                                        {
                                            fields[i] = result
                                            break
                                        }
                                    }
                                }
                            }
                            else
                            {
                                for(let i=0;i<fields.length;i++)
                                {
                                    if(i == this.state.currentIndex)
                                    {
                                        fields[i] = field
                                        break
                                    }
                                }
                            }
                            await this.setState({...this.state, "fields":fields, 'visible':false})
                        }
                        else
                        {
                            let fields = this.state.fields
                            fields.push(field)
                            await this.setState({...this.state, "fields":fields, 'visible':false})
                        }
                        if(this.props.onChange)
                        {
                            this.props.onChange(this.state.fields)
                        }
                    }}
                    onCancel={()=>{
                        this.setState({...this.state, visible:false})
                    }}
                />
            </div>
        )
    }
}
export default FieldsDesigner