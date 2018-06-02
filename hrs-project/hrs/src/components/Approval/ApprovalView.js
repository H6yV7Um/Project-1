import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button, Form, Input, InputNumber, Select, DatePicker, Alert}from 'antd'
import UploadArchive from './UploadArchive'
import UploadDoc from './UploadDoc'
import UploadPicture from './UploadPicture'
import DepartmentSelect from 'components/DepartmentSelect'
import MembersSelect from 'components/MembersSelect'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'
const FormItem = Form.Item
const formItemLayout ={
    labelCol: 
    {
        sm: { span: 6 }
    },
    wrapperCol: 
    {
        sm: { span: 12 }
    },
}
const tailFormItemLayout = {
	wrapperCol: {
	    xs: {
	     	span: 24,
	      	offset: 0,
	    },
	    sm: {
	      	span: 14,
	      	offset: 6,
	    },
  },
}

class ApprovalView extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
           fields:[],
           fileData:{},
           remark:'',
           date:{}
        }
    }
    static propTypes =
    {
        oneSolution: React.PropTypes.object,
        fileData: React.PropTypes.object,
        onChange: React.PropTypes.func,
        changeFileData: React.PropTypes.func,
        solution_id: React.PropTypes.string,
    }
    async componentWillMount()
    {
        let fields = [...this.props.oneSolution.fields]
        let remark = this.props.oneSolution.remark.replace(/\n/g,"<br>")
        await this.setState({...this.state,fields:fields,remark:remark})
    }
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let date = {...this.state.date}
				for(let val in date)
				{
					if(date.hasOwnProperty(val))
					{
						if(values.hasOwnProperty(val))
						{
							values[val] = date[val]
						}
					}
				}
				this.props.onChange(values)
			}
		})
	}
	formatFormItem(){
		let fields = [...this.state.fields]
		let current = []
		const { getFieldDecorator } = this.props.form
		
		for(let field of fields)
		{	
			switch(field.type)
	        {
	            case 'input':
	                current.push(
		                <FormItem
		                	key={field.name}
				          	{...formItemLayout}
				          	label={field.name}
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}}

				        >
				          	{getFieldDecorator(field.namespace, {
				            	rules: [{
				              		required: field.require, message: field.name + "不能为空",
				            	}],
				          	})(
				            	<Input />
				          	)}
				        </FormItem>
			        )
	                break
	            case 'number':
	                current.push(
		                <FormItem
		                	key={field.name}
				          	{...formItemLayout}
				          	label={field.name}
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}}

				        >
				          	{getFieldDecorator(field.namespace, {
				            	rules: [{
				              		required: field.require, message: field.name + "不能为空",
				            	}],
				          	})(
				            	<InputNumber />
				          	)}
				        </FormItem>
			        )
	                break
	            case 'select':
	            	let options = [...field.options]
	            	let selectOptions = []
	            	for(let option of options)
	            	{
	            		selectOptions.push(<Option key={option}>{option}</Option>)
	            	}
	                current.push(
		                <FormItem
		                	key={field.name}
				          	{...formItemLayout}
				          	label={field.name}
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}}

				        >
				          	{getFieldDecorator(field.namespace, {
				            	rules: [{
				              		required: field.require,  message: field.name + "不能为空",
				            	}],
				          	})(
				          		<Select>
				          			{selectOptions}
				            	</Select>
				          	)}
				        </FormItem>
			        )
	                break
	            case 'file':
	            	switch(field.filetype)
	            	{
	            		case "picture":
	            			current.push(
						        <FormItem

		                            key={field.name}
						          	{...formItemLayout}
						          	label={field.name} 

                            		className="customFieldProfile"
		                            
		                            style={{paddingBottom:"20px",marginBottom: "0"}} 
		                           
			                    >
			                        {getFieldDecorator(field.namespace, {
			                            rules: [{
			                              required: field.require, message: '请上传'+field.name,
			                            }],
			                            valuePropName: 'fileList',
			                            initialValue: this.props.fileListData[field.namespace] ? this.props.fileListData[field.namespace] : []
			                        })(
			                            <UploadPicture 
                                            namespace= {field.namespace}
                                            fieldID={this.props.solution_id}
                                            size={field.size}
                                            maximum={field.maximum}
                                            onChange = {this.props.changeFileData}
			                            />
			                        )}
			                    </FormItem>
					        )
			                break
	            		case "doc":
	            			current.push(
				                <FormItem
						          	key={field.name}
						          	{...formItemLayout}
						          	label={field.name} 
                            		className="customFieldProfile"
		                            style={{paddingBottom:"20px",marginBottom: "0"}} 
						        >
						          	{getFieldDecorator(field.namespace, {
			                            rules: [{
			                              	required: field.require,  message: field.name + "不能为空",
			                            }],
			                            valuePropName: 'fileList',
			                            initialValue: this.props.fileListData[field.namespace] ? this.props.fileListData[field.namespace] : []
			                        })(
			                            <UploadDoc 
                                            namespace= {field.namespace}
                                            fieldID={this.props.solution_id}
                                            size={field.size}
                                            maximum={field.maximum}
                                            onChange = {this.props.changeFileData}
			                            />
			                        )}
						        </FormItem>
					        )
	            			break
	            			
	            		case "archive":
	            			current.push(
				                <FormItem
		                            key={field.name}
						          	{...formItemLayout}
						          	label={field.name} 
                            		className="customFieldProfile"
		                            style={{paddingBottom:"20px",marginBottom: "0"}} 
						        >
						          	{getFieldDecorator(field.namespace, {
			                            rules: [{
			                              	required: field.require, message: field.name + "不能为空",
			                            }],
			                            valuePropName: 'fileList',
			                            initialValue: this.props.fileListData[field.namespace]? this.props.fileListData[field.namespace] : []

			                        })(
			                             <UploadArchive
			                                           namespace= {field.namespace}
			                                           fieldID={this.props.solution_id}
			                                           size={field.size}
			                                           maximum={field.maximum}
			                                           onChange = {this.props.changeFileData}
			                             />
			                        )}
						        </FormItem>
					        )
	            			break
	            	}
	            	break
	            case 'department':
	            	current.push(
	            		<FormItem
		                	key={field.name}
				          	{...formItemLayout}
				          	label={field.name}
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}}

					    >
			                {getFieldDecorator(field.namespace, {
		                        rules: [{
						             required: field.require, message: field.name + "不能为空",
						        }],
						        getValueFromEvent:(...args)=>{
				            		return args
				            	}
		                    })(
		                        <DepartmentSelect 
									width={"60%"}
									multiple={field.multiple}
									treeCheckStrictly={field.treeCheckStrictly}
									onChange={(value)=>{

									}}	
		                        />  
		                    )}
	                    </FormItem>	
	            	)
	                break
	            case 'member':
	                current.push(
		                <FormItem
		                	key={field.name}
				          	{...formItemLayout}
				          	label={field.name}
                            className="customFieldProfile"
                        	style={{paddingBottom:"20px",marginBottom: "0"}}  

				        >
				          	{getFieldDecorator(field.namespace,{
		                        rules: [{
				              		required: field.require,  message: field.name + "不能为空",
				            	}],
				            	getValueFromEvent:(...args)=>{
				            		return args[1]
				            	}
		                    })(
		                        <MembersSelect 
		                                    width={'60%'}
		                                    disabled={false}
		                                    multiple={field.multiple}
		                                    onChange={(value,name)=>{}}
		                        />
		                    )}
				        </FormItem>
			        )
	                break
	            case "date":
	             	switch(field.dateType)
	             	{
	             		case "date":
	             			current.push(<FormItem
			                	key={field.name}
					          	{...formItemLayout}
					          	label={field.name}
	                            className="customFieldProfile"
	                            style={{paddingBottom:"20px",marginBottom: "0"}}
					        >
					          	{getFieldDecorator(field.namespace, {
					            	rules: [{
					              		required: field.require,  message: field.name + "不能为空",
					            	}],
					          	})(
			                        <DatePicker 
			                            format="YYYY-MM-DD" 
			                            style={{width:'60%'}}
			                            onChange={(dates,dateStrings)=>{
			                            	let date = {...this.state.date}
			                            	date[field.namespace] = {dateType:'date',value:dateStrings}
			                            	this.setState({...this.state,date})
								      	}}
			                        />
			                    )}
				        	</FormItem>)
	             			break
	             		case "dateRange":
	             			current.push(<FormItem
			                	key={field.name}
					          	{...formItemLayout}
					          	label={field.name}
	                            className="customFieldProfile"
	                            style={{paddingBottom:"20px",marginBottom: "0"}}
					        >
					          	{getFieldDecorator(field.namespace, {
					            	rules: [{
					              		required: field.require,  message: field.name + "不能为空",
					            	}],
					          	})(
			                        <RangePicker
								      	format="YYYY-MM-DD" 
								       	onChange={(dates,dateStrings)=>{
			                            	let date = {...this.state.date}
			                            	date[field.namespace] = {dateType:'dateRange',value:dateStrings}
			                            	this.setState({...this.state,date})
								      	}}
								    />
			                    )}
				        	</FormItem>)
	             			break
	             		case "time":
	             			current.push(<FormItem
			                	key={field.name}
					          	{...formItemLayout}
					          	label={field.name}
	                            className="customFieldProfile"
	                            style={{paddingBottom:"20px",marginBottom: "0"}}
					        >
					          	{getFieldDecorator(field.namespace, {
					            	rules: [{
					              		required: field.require,  message: field.name + "不能为空",
					            	}],
					          	})(
			                        <DatePicker
								      	showTime
								      	format="HH:mm"
								      	onChange={(dates,dateStrings)=>{
			                            	let date = {...this.state.date}
			                            	date[field.namespace] = {dateType:'time',value:dateStrings}

			                            	this.setState({...this.state,date})
								     	}}
								    />
			                    )}
				        	</FormItem>)
	             			break
             			case "timeRange":
             				current.push(<FormItem
			                	key={field.name}
					          	{...formItemLayout}
					          	label={field.name}
	                            className="customFieldProfile"
	                            style={{paddingBottom:"20px",marginBottom: "0"}}
					        >
					          	{getFieldDecorator(field.namespace, {
					            	rules: [{
					              		required: field.require,  message: field.name + "不能为空",
					            	}],
					          	})(
			                        <RangePicker
								      	showTime={{ format: 'HH:mm' }}
								      	format="HH:mm"
								      	placeholder={['开始时间', '结束时间']}
								      	onChange={(dates,dateStrings)=>{
			                            	let date = {...this.state.date}
			                            	date[field.namespace] = {dateType:'timeRange',value:dateStrings}

			                            	this.setState({...this.state,date})
								      	}}
								    />

			                    )}
				        	</FormItem>)
             				break
	             	}
	             	break
	        }
		}
		return current
	}
    render()
    {
		const { getFieldDecorator } = this.props.form
		const notice = (<p dangerouslySetInnerHTML={{__html:this.state.remark}}></p>)
        return (
        	<div>
	        	{
	        		this.state.remark 
	        		? 
	        		<Alert
					    message="提示"
					    description={notice}
					    type="info"
					    showIcon
					  />
					 :
					<div></div>
	        	}
        		 

	         	<Form onSubmit={this.handleSubmit}>
			        {this.formatFormItem()}
			        <FormItem {...tailFormItemLayout}>
			          	<Button loading={this.props.loading} style={{marginTop:"20px"}} type="primary" htmlType="submit" size="large">提交</Button>
			        </FormItem>
			    </Form>
			</div>
        )
    }
}
ApprovalView = Form.create()(ApprovalView)
export default ApprovalView
	