import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import UploadPicture from './UploadPicture'
import UploadArchive from './UploadArchive'
import UploadDoc from './UploadDoc'
import MembersSelect from 'components/MembersSelect'
import DepartmentSelect from 'components/DepartmentSelect'
import { Spin ,Input, Icon,  Row, Col, DatePicker,Upload, Steps ,Form, Button,Select,Layout} from 'antd'
import {SERVER} from 'config'
const FormItem = Form.Item
const Option = Select.Option
class FieldsView extends React.Component {
    static propTypes =
    {  
        buttonBar: React.PropTypes.func.isRequired,//添加下一步按钮
        submitAction: React.PropTypes.func.isRequired,//提交表单时调用
       
        fieldsGroup: React.PropTypes.array,  //字段信息

        changeMemberData: React.PropTypes.func.isRequired,
        memberData: React.PropTypes.object,//存储所有需要上传的字段数据，用于提交

        changeFileData: React.PropTypes.func.isRequired,//上传文件,onchange时调用，改变fileOfMemberData
        fileOfMemberData: React.PropTypes.object,//存储格式化后的file数据，用于绑定file

        existsCustomField: React.PropTypes.func.isRequired, //判断输入是否已经存在

        displayAllFields: React.PropTypes.number,//用于判断是否显示所有字段
    }
    constructor(props)
    {
        super(props)
        this.state={
            intMemberData: {},
        }
    }
    async componentWillMount() {
        await this.setState({...this.state,intMemberData:{...this.props.memberData}})
    }
    handleSubmit =(e)=>{
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.submitAction()
            }
        })
    }
    async componentWillReceiveProps(nextProps) {
        await this.setState({...this.state,intMemberData:{...nextProps.memberData}})
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }
        /*********************************************************/
        const getDepartment = (key,disabled=false)=>
        {
            return (
                <FormItem
                        {...formItemLayout}
                        label={key.name}
                        key = {key.namespace}
                        className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}}  
                > 
                    {this.props.form.getFieldDecorator(key.namespace, {
                        rules: [{
                          required: key.require, message: '请输入'+key.name,
                        }],
                        initialValue: this.props.memberData[key.namespace]
                    })(
                        <DepartmentSelect 
                                        disabled={disabled}  
                                        width={"60%"}
                                        multiple={key.multiple}
                                        treeCheckStrictly={key.treeCheckStrictly}
                                        onChange={(e)=>{
                                            let memberData = {...this.props.memberData}
                                            memberData[key.namespace] = e
                                            this.props.changeMemberData(memberData)
                                        }}
                        />  
                    )}
                </FormItem>)
        }
        const getMember = (key,disabled=false)=>
        {
            return (
                <FormItem
                        {...formItemLayout}
                        label={key.name}
                        key = {key.namespace}
                        className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}}  
                >
                    {this.props.form.getFieldDecorator(key.namespace, {
                            rules: [{
                              required: key.require, message: '请输入'+key.name,
                            }],
                            initialValue: this.props.memberData[key.namespace]
                    })(
                        <MembersSelect 
                                    width={'60%'}
                                    disabled={disabled}  
                                    multiple={key.multiple}
                                    onChange={(e)=>{
                                        let memberData = {...this.props.memberData}
                                        memberData[key.namespace] = e
                                        this.props.changeMemberData(memberData)
                                    }}
                        />
                    )}
            </FormItem>)
        }
        const getInput = (key,disabled=false)=>
        {      
            return (
                <FormItem
                        {...formItemLayout}
                        label={key.name} 
                        key = {key.namespace}
                        className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}}
                >
                    {this.props.form.getFieldDecorator(key.namespace, {
                        rules: [{
                            pattern:RegExp(key.regex), message: key.warning,
                        }, {
                            required: key.require,  message: '请填写'+key.name,
                        }, {
                            validator: async (rule, value, callback)=>{
                                if(key.unique && value && this.state.intMemberData[key.namespace] != this.props.memberData[key.namespace])
                                {
                                    debugger
                                    let existsCustomFieldData = await this.props.existsCustomField(key._id.$oid,value)
                                    if(existsCustomFieldData)
                                    {

                                        callback(key.name+"已经存在")
                                    }
                                    else
                                    {
                                        callback()
                                    }
                                }
                                else
                                {
                                    callback()
                                }
                            }
                        }],
                        validateTrigger: "onBlur",
                        initialValue: this.props.memberData[key.namespace]
                    })(
                        <Input 
                            disabled={disabled}  
                            style={{width:'60%'}} 
                            onChange={async (e)=>{
                                let memberData = {...this.props.memberData}
                                memberData[key.namespace] = e.target.value
                                this.props.changeMemberData(memberData)
                            }}
                        />
                    )}
                </FormItem>
            )
        }
        const getUpload = (key,disabled=false) =>
        {
            if(key.filetype == 'picture')
            {
                return (
                    <FormItem
                            {...formItemLayout}
                            label={key.name}
                            key = {key.namespace} 
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}} 
                            extra={key.remark}
                    >
                        {this.props.form.getFieldDecorator(key.namespace, {
                            rules: [{
                              required: key.require, message: '请上传'+key.name,
                            }],
                            valuePropName: 'fileList',
                            initialValue: this.props.fileOfMemberData[key.namespace] ? this.props.fileOfMemberData[key.namespace] : []
                        })(
                            <UploadPicture 
                                            disabled={disabled}  
                                            namespace= {key.namespace}
                                            fieldID={key._id.$oid}
                                            size={key.size}
                                            maximum={key.maximum}
                                            onChange = {this.props.changeFileData}
                            />
                        )}
                    </FormItem>
                ) 
            }
            else if(key.filetype == 'archive' )
            {

                return (
                    <FormItem
                            {...formItemLayout}
                            label={key.name}
                            key = {key.namespace} 
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}}
                            extra={key.remark}

                    >
                        {this.props.form.getFieldDecorator(key.namespace, {
                            rules: [{
                              required: key.require, message: '请上传'+key.name,
                            }],
                            valuePropName: 'fileList',
                            initialValue: this.props.fileOfMemberData[key.namespace]? this.props.fileOfMemberData[key.namespace] : []

                        })(
                             <UploadArchive
                                           disabled={disabled}  
                                           namespace= {key.namespace}
                                           fieldID={key._id.$oid}
                                           size={key.size}
                                           maximum={key.maximum}
                                           onChange = {this.props.changeFileData}
                             />
                        )}
                    </FormItem> 
                )
            }
            else if(key.filetype ==  'doc')
            {
                return (
                    <FormItem
                            {...formItemLayout}
                            label={key.name}
                            key = {key.namespace} 
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}} 
                            extra={key.remark}
                    >
                        {this.props.form.getFieldDecorator(key.namespace, {
                            rules: [{
                              required: key.require, message: '请上传'+key.name,
                            }],
                            valuePropName: 'fileList',
                            initialValue: this.props.fileOfMemberData[key.namespace] ? this.props.fileOfMemberData[key.namespace] : []
                        })(
                            <UploadDoc 
                                            disabled={disabled}  
                                            namespace= {key.namespace}
                                            fieldID={key._id.$oid}
                                            size={key.size}
                                            maximum={key.maximum}
                                            onChange = {this.props.changeFileData}
                            />
                        )}
                    </FormItem>
                ) 
            }
        }
        const getDate = (key,disabled=false)=>
        {
            return (
                <FormItem
                        {...formItemLayout}
                        label={key.name}
                        key = {key.namespace}
                        className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}}  
                >
                    {this.props.form.getFieldDecorator(key.namespace, {
                        rules: [{
                          required: key.require, message: '请选择'+key.name,
                        }],
                        initialValue: this.props.memberData[key.namespace]?moment(this.props.memberData[key.namespace],"YYYY-MM-DD"):null
                    })(
                        <DatePicker 
                            disabled={disabled}  

                            format="YYYY-MM-DD" 
                            style={{width:'60%'}}
                            onChange={(date,dateString)=>{
                                let memberData = {...this.props.memberData}
                                memberData[key.namespace] = dateString
                                this.props.changeMemberData(memberData)
                            }} 
                        />
                    )}
            </FormItem>)
        }
        const getSelect = (key,disabled=false)=>
        {
            let optionArr = []
            for(let i = 0 ; i < key.options.length ; i++ )
            {
                optionArr.push(<Option key = {i} value={key.options[i]}>{key.options[i]}</Option>)
            }
            return (
                <FormItem
                        {...formItemLayout}
                        label={key.name}
                        key = {key.namespace}
                        className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}}  
                >
                    {this.props.form.getFieldDecorator(key.namespace, 
                    {
                        rules: [{
                          required: key.require, message: '请选择'+key.name,
                        }],
                        initialValue: this.props.memberData[key.namespace]
                    })(
                            <Select
                                disabled={disabled}  
                                placeholder="请选择"  
                                style={{ width: "60%"}}
                                onChange={(e)=>{  

                                        let memberData = {...this.props.memberData}
                                        memberData[key.namespace] = e
                                        this.props.changeMemberData(memberData)
                                }}
                            >
                              {optionArr}
                            </Select>
                    )}
                </FormItem>)
        }
        /**********************************************************/
       
        const combineFields = (data)=>
        {
            let current = []
            let fillRequire = 0
            for(let val of data)
            {
                if(val.fields.length != 0)
                {
                    let items = []
                    for(let key of val.fields)
                    {  
                        let type =  key.type
                        let fill = key.fill
                        if(this.props.displayAllFields===1)
                        {
                            if(fill)
                            {
                                switch(type)
                                {
                                    case 'select':
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getSelect(key))
                                    break
                                    case 'input':
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getInput(key))
                                    break
                                    case 'file':
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getUpload(key))
                                    break
                                    case 'date':
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getDate(key))
                                    break
                                    case "department":
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getDepartment(key))
                                    break
                                    case "member":
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getMember(key))
                                    break
                                }
                            }
                        }
                        else if(this.props.displayAllFields===0)
                        {
                            if(!fill)
                            {
                                switch(type)
                                {
                                    case 'select':
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getSelect(key))
                                    break
                                    case 'input':
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getInput(key))
                                    break
                                    case 'file':
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getUpload(key))
                                    break
                                    case 'date':
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getDate(key))
                                    break
                                    case "department":
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getDepartment(key))
                                    break
                                    case "member":
                                        if(key.require)
                                        {
                                            fillRequire++
                                        }
                                        items.push(getMember(key))
                                    break
                                } 
                            }
                        }
                        else if(this.props.displayAllFields===2)
                        {
                            switch(type)
                            {
                                case 'select':
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    items.push(getSelect(key))
                                break
                                case 'input':
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    items.push(getInput(key))
                                break
                                case 'file':
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    items.push(getUpload(key))
                                break
                                case 'date':
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    items.push(getDate(key))
                                break
                                case "department":
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    items.push(getDepartment(key))
                                break
                                case "member":
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    items.push(getMember(key))
                                break
                            } 
                        }
                        else if(this.props.displayAllFields===3)
                        {
                            switch(type)
                            {
                                case 'select':
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    if(key.check)
                                    {
                                        items.push(getSelect(key,!key.modify))
                                    }
                                    
                                break
                                case 'input':
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    if(key.check)
                                    {
                                        items.push(getInput(key,!key.modify))
                                    }
                                break
                                case 'file':
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    if(key.check)
                                    {
                                        items.push(getUpload(key,!key.modify))
                                    }
                                break
                                case 'date':
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    if(key.check)
                                    {
                                        items.push(getDate(key,!key.modify))
                                    }
                                break
                                case "department":
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    if(key.check)
                                    {
                                        items.push(getDepartment(key,!key.modify))
                                    }
                                break
                                case "member":
                                    if(key.require)
                                    {
                                        fillRequire++
                                    }
                                    if(key.check)
                                    {
                                        items.push(getMember(key,!key.modify))
                                    }
                                break
                            } 
                        }
                    }
                    if(items.length)
                    {
                        current.push(
                            <Row key = {val._id.$oid} className="groupTitle">
                                    <Col span={21}>
                                        <div className="h1" style={{cursor:"move"}}>
                                            <Icon type="bars" style={{fontSize:'16px'}} /> {val.name}
                                        </div>  
                                    </Col>
                            </Row>
                        )
                        current.push(items)
                    }
                }  
            }
            let memberData = {...this.props.memberData}
            return current
        }
        return (
             <Form onSubmit={this.handleSubmit}>
                {combineFields(this.props.fieldsGroup)}
                {this.props.buttonBar()}
             </Form>
        )
    }
}
FieldsView = Form.create()(FieldsView)
export default FieldsView

















