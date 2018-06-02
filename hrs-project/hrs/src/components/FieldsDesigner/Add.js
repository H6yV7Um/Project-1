import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import { Table, Layout, Button, Row, Col, Icon, Form, Input, InputNumber, Select, DatePicker, Upload, Tag, Modal, Switch } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
class Add extends Component {
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
            formItemLayoutWithOutLabel: 
            {
                wrapperCol: 
                {
                    sm: { span: 17, offset: 5 },
                }
            },
            field:{
                '_id':'',
                'dateType':'date',
                "kernel": false,
                "name": "",
                "namespace":"",
                "regex": "",
                "remark": "",
                "require": false,
                "type": "input",
                "unique": false,
                "warning": "",
            },
            deletedOptions:[],
            fieldNamespace: ''
        }
    }
    static propTypes =
    {
        field: React.PropTypes.object,
        visible: React.PropTypes.bool.isRequired,
        onOk: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        currentIndex: React.PropTypes.number,
        fields: React.PropTypes.array,
        onDelete: React.PropTypes.func,
    }
    async componentWillReceiveProps(nextProps)
    {
        if(this.props.visible && !nextProps.visible)
        {
            await this.setState({...this.state, visible:nextProps.visible})
        }
        if(!this.props.visible && nextProps.visible && nextProps.field)
        {
            await this.setState({...this.state, 'field':{...nextProps.field}})
        }
    }
    handleCreate = async () => {
        const form = this.props.form
        form.validateFields(async (err, values) => {
            if (err) {
                return
            }
            //删除选项
            if(this.state.deletedOptions.length)
            {
                await this.props.onDelete(this.state.fieldNamespace,this.state.deletedOptions)
            }
            //对选项值进行验证
            if(this.state.field.options)
            {
                let options = [...this.state.field.options]
                for(let i =0 ; i< options.length;i++)
                {
                    let j = i+1
                    for(j;j<options.length;j++)
                    {
                        if(options[i] == options[j])
                        {
                            this.props.form.setFields({
                                ['item_'+j]: {
                                    errors: [new Error('选项值已经存在')]
                                }
                            })
                            return false
                        }
                    }
                    j-- 
                    this.props.form.setFields({
                        ['item_'+j]: {
                            errors: null
                        }
                    })
                }
            }
            //保存字段的值
            let field =  {...this.state.field}
            await this.props.onOk(field)
            //重置field的值
            field = {
                "_id": "",
                "name": "",
                "namespace":"",
                "type": "input",
                "require": false,
                "kernel": false,
                "regex": "",
                "remark": "",
                "unique": false,
                "warning": "",
                "dateType":'date',
            }
            if(this.state.field.options)
            {
                field.options=['','']
            }
            await this.setState({...this.state, field: {...field}})
            this.props.form.resetFields()
        })
    }
    render()
    {
        const { getFieldDecorator } = this.props.form
        const getSelect = ()=>
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
                        <FormItem  
                            key={index} 
                            {...config} 
                            label={!index?"选项":""} 
                        >
                            <Row>
                                <Col span={19}>
                                    {getFieldDecorator("item_"+index, {
                                        initialValue: this.state.field.options[index],
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [
                                            { required: true, message: '选项值不能为空' },
                                        ],
                                    })(
                                        <Input 
                                            onChange ={(e)=>
                                            {
                                                let field = {...this.state.field}
                                                let options = [...this.state.field.options]
                                                field.options[index] = e.target.value
                                                this.setState({...this.state, field:field})
                                                return e.target.value
                                            }}
                                        />
                                    )}      
                                </Col>
                                <Col span={1}></Col>
                                <Col span={4}>
                                    <Button 
                                        icon="delete" 
                                        disabled={this.state.field.options.length <= 2} 
                                        onClick={async () => {
                                            let options = [...this.state.field.options]
                                            let field = {...this.state.field}
                                            let deletedOptions = [...this.state.deletedOptions]
                                            this.props.form.setFields({
                                                ['item_'+index]: {
                                                    errors: null
                                                }
                                            })
                                            let deletedOption = options.splice(index, 1)
                                            let fieldNamespace = field.namespace
                                            deletedOptions.push(deletedOption)
                                            field.options = [...options]
                                            await this.setState({...this.state, field:field,deletedOptions:deletedOptions,fieldNamespace:fieldNamespace})
                                        }} 
                                    />
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
                                <Button 
                                    type="dashed" 
                                    style={{ width: '60%' }} 
                                    onClick={()=>{
                                        let field = {...this.state.field}
                                        let options = [...this.state.field.options]
                                        options.push("")
                                        field.options = [...options]
                                        this.setState({...this.state, field: field})
                                    }}
                                >
                                    <Icon type="plus" />增加选项
                                </Button>
                            </Col>
                        </Row>
                    </div>
                )
        }
        const getInput = ()=>
        {
          return (
            <div>
                <FormItem {...this.state.formItemLayout} label="正则表达式">
                    {getFieldDecorator('regex', {
                            initialValue: this.state.field.regex,
                    })(
                        <Input 
                            onChange={(e)=>
                            {
                                let field = {...this.state.field}
                                field.regex = e.target.value
                                this.setState({...this.state, field})
                                return e.target.value
                            }}
                        />
                    )}      
                </FormItem>
                <FormItem {...this.state.formItemLayout} label="警告信息">
                    {getFieldDecorator('warning', {
                        initialValue: this.state.field.warning,
                    })(
                        <Input 
                            onChange={(e)=>
                            {
                                let field = {...this.state.field}
                                field.warning = e.target.value
                                this.setState({...this.state, field})
                                return e.target.value
                            }}
                        />
                    )}    
                   
              </FormItem>
              <FormItem {...this.state.formItemLayout} label="唯一性">
                {getFieldDecorator('unique', {
                        initialValue: this.state.field.unique,   
                })(
                    <Switch 
                        checked={Boolean(this.state.field.unique)} 
                        onChange={(e)=>
                        {
                            let field = {...this.state.field}
                            field.unique = e
                            this.setState({...this.state, field})
                            return e
                        }} 
                    />
                )}    
                    
              </FormItem>
            </div>)
        }
        const getNumber = ()=>
        {
            return (
                <div>
                    <FormItem {...this.state.formItemLayout} label="最小值" >
                        {getFieldDecorator('min', {
                            initialValue: this.state.field.min,
                            rules: [{ required: true, message: '最小值不能为空' }],
                        })(
                            <InputNumber 
                                onChange={(e)=>
                                {
                                    let field = {...this.state.field}
                                    field.min = e
                                    this.setState({...this.state, field})
                                    return e
                                }}
                            />
                        )}        
                     
                    </FormItem>
                    <FormItem {...this.state.formItemLayout} label="最大值" >
                        {getFieldDecorator('max', {
                            initialValue: this.state.field.max,
                            rules: [{ required: true, message: '最大值不能为空' }],
                        })(
                            <InputNumber 
                                onChange={(e)=>
                                {
                                    let field = {...this.state.field}
                                    field.max = e
                                    this.setState({...this.state, field})
                                    return e
                                }} 
                            />
                        )}     
                    </FormItem>
                    <FormItem {...this.state.formItemLayout} label="步长">
                        {getFieldDecorator('step', {
                            initialValue: this.state.field.step,
                            rules: [{ required: true, message: '步长不能为空' }],
                        })(
                            <InputNumber 
                                onChange={(e)=>
                                {
                                    let field = {...this.state.field}
                                    field.step = e
                                    this.setState({...this.state, field})
                                    return e
                                }}
                            /> 
                        )}     
                    </FormItem>
                </div>
            )
        }
        const getFile = ()=>
        {
          return (<div>
                <FormItem {...this.state.formItemLayout} label="文件类型">
                    {getFieldDecorator('filetype', {
                            initialValue: this.state.field.filetype,
                    })(
                        <Select 
                            placeholder="请选择文件类型" 
                            onChange={(e)=>{
                                let field = {...this.state.field}
                                field.filetype = e
                                this.setState({...this.state, field})
                                return e
                            }}
                        >
                            <Option value="picture" key="picture">图片</Option>
                            <Option value="doc" key="doc">文档</Option>
                            <Option value="archive" key="archive">压缩文件</Option>
                        </Select>
                        
                    )}     
                    
                </FormItem>
                <FormItem {...this.state.formItemLayout} label="文件大小(Kb)">
                    {getFieldDecorator('size', {
                        initialValue: this.state.field.size,
                        rules: [{ required: true, message: '文件大小不能为空' }],
                    })(
                        <InputNumber 
                            min={1} 
                            max={1000000} 
                            onChange={(e)=>
                            {
                                let field = {...this.state.field}
                                field.size = e
                                this.setState({...this.state, field})
                                return e
                            }}
                        />
                        
                    )}     
                </FormItem>
                <FormItem {...this.state.formItemLayout} label="最大文件数" >
                    {getFieldDecorator('maximum', {
                        required:true,
                        initialValue: this.state.field.maximum,
                        rules: [{ required: true, message: '最大文件数不能为空' }],
                    })(
                        <InputNumber 
                            min={1} 
                            max={100} 
                            onChange={(e)=>
                            {
                                let field = {...this.state.field}
                                field.maximum = e
                                this.setState({...this.state, field})
                                return e
                            }}
                        />
                        
                    )}     
                </FormItem>
              </div>)
        }
        const getDepartment = ()=>
        {
            return (
                <div>
                    <FormItem {...this.state.formItemLayout} label="是否多选">
                        {getFieldDecorator('multiple', {
                            initialValue: this.state.field.multiple,
                        })(
                             <Switch 
                                checked={this.state.field.multiple} 
                                onChange={(e)=>
                                {
                                    let field = {...this.state.field}
                                    field.multiple = e
                                    this.setState({...this.state, field})
                                    return e
                                }} 
                            />
                        )}     
                    </FormItem>
                    <FormItem {...this.state.formItemLayout} label="是否选择关联">
                        {getFieldDecorator('treeCheckStrictly', {
                                initialValue: this.state.field.treeCheckStrictly,
                        })(
                            <Switch 
                                checked={this.state.field.treeCheckStrictly} 
                                onChange={(e)=>
                                {
                                    let field = {...this.state.field}
                                    field.treeCheckStrictly = e
                                    this.setState({...this.state, field})
                                    return e
                                }} 
                            />
                        )}     
                        
                    </FormItem>
                </div>
            )
        }
        const getMember = ()=>
        {
          return (<div>
                <FormItem {...this.state.formItemLayout} label="是否多选">
                    {getFieldDecorator('multiple', {
                        initialValue: this.state.field.multiple,
                    })(
                        <Switch 
                            checked={this.state.field.multiple} 
                            onChange={(e)=>
                            {
                                let field = {...this.state.field}
                                field.multiple = e
                                this.setState({...this.state, field})
                                return e
                            }} 
                        />
                    )}     
                    
                </FormItem>
              </div>)
        }
        const getDate = ()=>
        {
          return (<div>
                <FormItem {...this.state.formItemLayout} label="选择日期类型">
                    {getFieldDecorator('dateType', {
                        initialValue: this.state.field.dateType,
                    })(
                        <Select
                            placeholder="请选择日期类型"
                            onChange={(e)=>
                            {
                                let field = {...this.state.field}
                                field.dateType = e
                                this.setState({...this.state, field})
                                return e
                            }}
                        >
                            <Option value="date">日期</Option>
                            <Option value="dateRange">日期段</Option>
                            <Option value="time">时间</Option>
                            <Option value="timeRange">时间段</Option>
                        </Select>
                    )}     
                    
                </FormItem>
              </div>)
        }
        return (
            <Modal
                title={Object.keys(this.state.field)?"编辑字段":"新增字段"}
                wrapClassName="permission-modal"
                visible={this.props.visible}
                onOk={async () => {
                    await this.handleCreate()
                }}
                onCancel={() => {
                    this.props.onCancel()
                }}
            >
                <Form style={{marginTop:20, maxHeight:'350px', overflow:'auto'}}>
                    <FormItem 
                        {...this.state.formItemLayout}
                        label="字段名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [
                            { required: true, message: '字段名字不能为空' }],
                            initialValue: this.state.field.name,
                            getValueFromEvent: (e) =>{
                                let field = {...this.state.field}
                                field.name = e.target.value
                                this.setState({...this.state,field:field})
                                return e.target.value
                            }
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem 
                        {...this.state.formItemLayout}
                        label="命名空间"
                    >
                        {getFieldDecorator('namespace', {
                            rules: [
                                {required: true, message: '命名空间不能为空'},
                                {
                                    validator: (rule, value, callback)=>{
                                        if(value)
                                        {
                                            let fields = [...this.props.fields]
                                            if(fields.length)
                                            {
                                                for(let i=0;i<fields.length;i++)
                                                {
                                                    if(fields[i].namespace == value && i!=this.props.currentIndex)
                                                    {
                                                        callback('命名空间已存在')
                                                    }
                                                }
                                            }
                                            callback()
                                        }
                                        else
                                        {
                                            callback()
                                        }
                                    }
                                }
                            ],
                            initialValue: this.state.field.namespace,
                        })(
                            <Input 
                                onChange={(e)=>
                                {
                                    let field = {...this.state.field}
                                    field.namespace = e.target.value
                                    this.setState({...this.state, field})
                                    return e.target.value
                                }} 
                            />
                        )}
                    </FormItem>
                    <FormItem {...this.state.formItemLayout}
                            label="字段说明"
                    >
                        {getFieldDecorator('remark', {
                                initialValue: this.state.field.remark,
                        })(
                            <Input
                                onChange={(e)=>
                                {
                                    let field = {...this.state.field}
                                    field.remark = e.target.value
                                    this.setState({...this.state, field})
                                    return e.target.value
                                }}
                            />
                        )}
                    
                    
                    </FormItem>
                    <FormItem 
                        {...this.state.formItemLayout} 
                        label="是否必填"
                    >
                        {getFieldDecorator('require', {
                            initialValue: this.state.field.require,
                        })(
                            <Switch 
                                checked={this.state.field.require} 
                                onChange={(e)=>
                                {
                                    let field = {...this.state.field}
                                    field.require = e
                                    this.setState({...this.state, field})
                                    return e
                                }} 
                            />
                        )}
                        
                    </FormItem>
                  
                    <FormItem {...this.state.formItemLayout} label="字段类型" >
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '字段类型不能为空' }],
                            initialValue: this.state.field.type,
                        })(
                            <Select
                                placeholder="请选择字段类型"
                                allowClear={true} 
                                onChange={(e)=>{
                                    let field = {...this.state.field}
                                    switch(field.type)
                                    {
                                        case 'input':
                                            delete field.warning
                                            delete field.regex
                                            delete field.unique
                                            break
                                        case 'number':
                                            delete field.min
                                            delete field.max
                                            delete field.step
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
                                        case 'date':
                                            delete field.dateType
                                            break
                                    }
                                    switch(e)
                                    {
                                        case 'input':
                                            field.warning = ''
                                            field.regex = ''
                                            field.unique = ''
                                            break
                                        case 'number':
                                            field.min = 0
                                            field.max = 1000
                                            field.step = 0
                                            break
                                        case 'select':
                                            field.options = ["",""]
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
                                        case 'date':
                                            field.dateType = 'date'// date,dateRange,time,timeRange
                                    }
                                    field.type = e
                                    this.setState({...this.state, field:field})
                                    return e
                                }}
                            >
                                <Option value="input" key="input">文本</Option>
                                <Option value="number" key="number">数字</Option>
                                <Option value="select" key="select">选择</Option>
                                <Option value="file" key="file">附件</Option>
                                <Option value="date" key="date">日期</Option>
                                <Option value="department" key="department">部门</Option>
                                <Option value="member" key="member">人员</Option>
                            </Select>
                        )}
                    </FormItem>
                    {this.state.field.type=="input"?getInput():""}
                    {this.state.field.type=="number"?getNumber():""}
                    {this.state.field.type=="select"?getSelect():""}
                    {this.state.field.type=="file"?getFile():""}
                    {this.state.field.type=="department"?getDepartment():""}
                    {this.state.field.type=="member"?getMember():""}
                    {this.state.field.type=="date"?getDate():""}

                </Form>
            </Modal>
        )
    }
}
Add = Form.create()(Add)
export default Add