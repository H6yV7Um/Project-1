import React, {Component, PropTypes} from 'react'
import { Upload, Button, Icon ,message,Form} from 'antd'
import {SERVER, UPLOAD_HTTP_HEADER} from 'config'
const FormItem = Form.Item
class Fields extends React.Component {
    
    static propTypes =
    {
       	fields: React.PropTypes.array,
    }
   	formatFormItem(){
		let fields = [...this.props.fields]
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
		                                    multiple={true}
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
			                            onChange={(date,dateString)=>{
			                               
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
								      format={dateFormat}
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
								      format="YYYY-MM-DD HH:mm:ss"
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
								      	format="YYYY-MM-DD HH:mm"
								      	placeholder={['开始时间', '结束时间']}
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
    render() {
        return (
			<div>{this.formatFormItem()}</div>

        )
    }
}
export default Fields