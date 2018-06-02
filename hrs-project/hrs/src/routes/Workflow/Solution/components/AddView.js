import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Modal,Radio,Form ,InputNumber,Select,Transfer,Button, TimePicker, Row,Col,Icon  } from 'antd'
import MembersSelect from 'components/MembersSelect'
import moment from 'moment';
const RadioGroup = Radio.Group
const FormItem = Form.Item
const Option = Select.Option
class AddView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
        	field:{
        		type:1,
				approvalWay:1,
				namespace:'',
				level:1,
				selectLevelValue:1,
				approvalObject:'',
				fieldType:'',
				fillNumber:'',
				operator: '',
				branchType:1,
				approvedObject:'0',	
				approvalFields:{},			
				options:[{"cycle_day":1,"cycle_time":moment('00:00:00', 'HH:mm:ss')}]
        	}
        }
    }
    static propTypes =
    {
        visible: React.PropTypes.bool,
        onOk: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        fields: React.PropTypes.array,
        source: React.PropTypes.number,
    }
	getMock = (namespace) => {
		const rightKeys = []
		const condition = []
		let fields = this.props.fields
		for(let field of fields)
		{
			if(namespace == field.namespace)
			{
				let options = field.options
				for(let i=0;i<options.length;i++)
				{
					const data = {
						key: i.toString(),
						title: options[i]
					}
					condition.push(data)
				}
			}
		}
		let field = {...this.state.field}
		field.condition = condition
		field.rightKeys = rightKeys
		this.setState({...this.state,field:field})
	}
	filterOption = (inputValue, option) => {
		return option.description.indexOf(inputValue) > -1
	}
	handleChange = (targetKeys, direction, moveKeys) => {
		let field = {...this.state.field}
		field.targetKeys = targetKeys
		this.setState({ ...this.state,field:field})
	}
    onChangeType = (e) => {
    	let field = {...this.state.field}
    	field.type = e.target.value
	    this.setState({
	    	...this.state,field:field
	    })
	}
	onChangeApprovalWay = (e) => {
		let field = {...this.state.field}
    	field.approvalWay = e.target.value
	    this.setState({
	    	...this.state,field:field
	    })
	}
	onChangeNamespace = async (e) => {
		for(let field of this.props.fields)
		{
			if(field.namespace==e)
			{
				let newField = {...this.state.field}
		    	newField.fieldType = field.type
		    	newField.namespace = e
			    await this.setState({...this.state,'field':newField})
			    if(field.type == "select")
			    {
			   	 	this.getMock(e)
			    }
			}
		}
	}
	onChangeLevel = (e) => {
		let field = {...this.state.field}
		field.level = e.target.value
	    this.setState({
	    	...this.state,field:field
		})
	}
	onChangeSelectLevel  = (e) => {
		let field = {...this.state.field}
		field.selectLevelValue = e
	    this.setState({
	    	...this.state,field:field
		})
	}
	onChangeApprovalObject  = (value,name) => {
		let field = {...this.state.field}
		field.approvalObjectID = value
		field.approvalObject = name[0].value
	    this.setState({...this.state,field:field})
	}
	onChangeFillNumber  = (e) => {
		let field = {...this.state.field}
		field.fillNumber = e
	    this.setState({
	    	...this.state,field:field
		})
	}
	onChangeOperator  = (e) => {
		let field = {...this.state.field}
		field.operator = e
	    this.setState({
	    	...this.state,field:field
		})
	}
	onChangeBranchType = (e) => {
		let field = {...this.state.field}
		field.branchType = e.target.value
		field.targetKeys = []
	    this.setState({
	    	...this.state,field:field
		})
	    const form = this.props.form

	    form.setFields({
          	'rightKeys': {
            	errors: null
          	}
        })
	}
	onChangeApprovedObject = (e) => {
		let field = {...this.state.field}
		field.approvedObject = e.value
	    this.setState({
	    	...this.state,field:field
		})
	}
	onChangeNameCycleDay = (e) => {
		let field = {...this.state.field}
		field.cycle_day = e.value
	    this.setState({
	    	...this.state,field:field
		})
	}
	onChangeNameCycleTime = (e) => {
		let field = {...this.state.field}
		field.cycle_time = e.value
	    this.setState({
	    	...this.state,field:field
		})
	}
	onSelect = (e,option) => {
		let field = {...this.state.field}
		field.approvalFields.value = option.props.children
		field.approvalFields.namespace = option.props.eventKey
		console.log(field)
	    this.setState({
	    	...this.state,field:field
		})
	}
	async componentWillReceiveProps(nextProps) {
		if(this.props.visible && !nextProps.visible)
		{
			let field = {
				type:1,
				approvalWay:1,
				namespace:'',
				level:1,
				selectLevelValue:1,
				approvalObject:'',
				fieldType:'',
				fillNumber:'',
				operator: '',
				branchType:1,
				approvedObject:'0',
				approvalFields:{},			
				options:[{"cycle_day":1,"cycle_time":moment('00:00', 'HH:mm')}]
	        }
	        await this.setState({...this.state,field:field})
	      	this.props.form.resetFields()
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return true
	}
	handleCreate = ()=>{
	    const form = this.props.form
	    form.validateFieldsAndScroll((err, values) => 
	    {
	      	if (err) {
	        	return
	      	}
	      	if(values.type == 2)
	      	{
	      		if(this.state.field.fieldType == 'select')
		      	{
		      		let stateVal = {...this.state}
			      	let rightKeys = []
			      	let targetKeys = [...this.state.field.targetKeys]
			      	let condition = this.state.field.condition
			      	let leftKeys = []
			      	let conditionVal =[]
					for(let val of condition)
					{
						let key = val.key
						for(let index of targetKeys)
						{
							if(key == index)
							{
								rightKeys.push(val.title)
								key = "none"
							}
						}
						if(key != "none")
						{
							leftKeys.push(val.title)
						}
					}
					values.rightKeys = rightKeys
					values.leftKeys = leftKeys
					values.fieldType = this.state.field.fieldType
					values.fieldName = name 
		      	}
		      	values.fieldType = this.state.field.fieldType
		      	if(this.state.field.fieldType == 'date')
		      	{
		      		let options = []
		      		let i = 0
		      		for(let i=0; i<this.state.field.options.length;i++)
		      		{
		      			let newOption = {...this.state.field.options[i]}
		      			if(i==0){
		      				newOption.date = "0分钟 - "+newOption.cycle_day+'天'+moment(newOption.cycle_time).format('HH小时mm分钟')
		      			}
		      			else
		      			{
		      				newOption.date = this.state.field.options[i-1].cycle_day+'天'+moment(this.state.field.options[i-1].cycle_time).format('HH小时mm分钟')+" - "+newOption.cycle_day+'天'+moment(newOption.cycle_time).format('HH小时mm分钟')
		      			}

		      			options.push(newOption)
		      		}
		      		options.push({'date': "其他","cycle_day":-1,"cycle_time":moment('00:00', 'HH:mm')})
		      		values.options = options
		      	}
	      	}
	      	if(values.type == 1 && values.approvalWay == 3)
	      	{
	      		values.approvalObject = {id:values.approvalObject[0],name:this.state.field.approvalObject}
	      	}
	      	if(values.type == 1 && values.approvalWay == 4)
	      	{
	      		values.approvalFields = {namespace:this.state.field.approvalFields.namespace,value:this.state.field.approvalFields.value}
	      	}
	      	let options = this.state.field.options
	      	for(let i=0;i<options.length;i++)
	      	{
	      		if(i==0)
	       		{
	       			if(options[i].cycle_day==='')
	       			{
	       				this.props.form.setFields({
			              ['item_'+i]: {
			              	
			                errors: [new Error('不能为空')]
			              }
			            })
			            return false
	       			}
	       			else if(options.length>1)
	       			{
	       				let pretime = options[i].cycle_day*24*60 + Number(options[i].cycle_time.format('HH')) * 60 + Number(options[i].cycle_time.format('mm'))
	       				let time = options[i+1].cycle_day*24*60 + Number(options[i+1].cycle_time.format('HH')) * 60 + Number(options[i+1].cycle_time.format('mm'))
	       				if(time <= pretime)
	       				{
	       					this.props.form.setFields({
				              ['item_'+i]: {
				              
				                errors: [new Error('必须比下一条时间早')],
				              },
				            })
				            return false
	       				}
	       			}
	       		}
	       		else if(i > 0)
	       		{
	       			if(options[i].cycle_day==='')
	       			{	
		       			this.props.form.setFields({
			              ['item_'+i]: {
			                errors: [new Error('不能为空')],
			              },
			            })
			            return false
	       			}
	       			else 
	       			{
	       				let pretime = options[i-1].cycle_day*24*60 + Number(options[i-1].cycle_time.format('HH')) * 60 + Number(options[i-1].cycle_time.format('mm'))
	       				let time = options[i].cycle_day*24*60 + Number(options[i].cycle_time.format('HH')) * 60 + Number(options[i].cycle_time.format('mm'))
	       				if(time <= pretime)
	       				{
	       					this.props.form.setFields({
				              ['item_'+i]: {
				              
				                errors: [new Error('必须比上一条时间晚')],
				              },
				            })
				            return false
	       				}
	       			}
	       		}
	       		this.props.form.setFields({
	              ['item_'+i]: {
	              
	                errors: null
	              }
	            })
	      	}
	      	this.props.handleOk(values)
	    })
	}
    render()
    {
    	const formItemLayout = {
	      labelCol: {
	        sm: { span: 4 },
	      },
	      wrapperCol: {
	        sm: { span: 20 },
	      },
	    }	
    	const { getFieldDecorator } = this.props.form
    	const createFormItem = () =>{
    		let current = []
    		current.push(
    				<FormItem
		    			{...formItemLayout}
		    			label="类型"
		    			key="type"
		    		>
						{getFieldDecorator('type', {
				            initialValue: this.state.field.type,
				        })(
				            <RadioGroup onChange={this.onChangeType}>
						        <Radio value={1}>审批步骤</Radio>
						        <Radio value={2}>审批条件</Radio>
						    </RadioGroup>
				        )}		        
					</FormItem>
    		)
    		if(this.state.field.type ==1)
    		{
    			current.push(
    				<FormItem
		    			{...formItemLayout}
			    		label="审批方式" 
		    			key="approvalWay"
			    	>
						{getFieldDecorator('approvalWay', {
				            initialValue: this.state.field.approvalWay,
				        })(
				            <RadioGroup onChange={this.onChangeApprovalWay}>
						        <Radio value={1}>按行政汇报对象层级</Radio>
						        <Radio value={2}>按工作汇报对象层级</Radio>
						        <Radio value={3}>指定审批对象</Radio>
						        <Radio value={4}>指定审批字段</Radio>
						    </RadioGroup>
				        )}		        
					</FormItem>
				)
				if(this.state.field.approvalWay==1 || this.state.field.approvalWay==2)
				{
					let options = []
						
					for(let field of this.props.fields)
					{
						if(field.type == "member" && !field.multiple)
						{
							options.push(<Option key={field.namespace}>{field.name}</Option>)
						}
					}
					current.push(
	    				<FormItem
				    		{...formItemLayout}
				    		label="被审批对象"
				    		key="approvedObject"
				    	>
							{getFieldDecorator('approvedObject', {
								initialValue: this.state.field.approvedObject,
					        })(
							    <Select
								    style={{ width: 200 }}
									allowClear={true}
									onChange={this.onChangeApprovedObject}
								>
									<Option key={0}>发起人</Option>
									{options}
								</Select>
					        )}		        
						</FormItem>	
					)
					current.push(
	    				<FormItem
				    		{...formItemLayout}
				    		label="层级" 
			    			key="level"
				    	>
							{getFieldDecorator('level', {
					            initialValue: this.state.field.level,
					        })(
					            <RadioGroup onChange={this.onChangeLevel}>
							        <Radio value={1}>固定层级</Radio>
							        <Radio value={2}>向上层级</Radio>
							        <Radio value={3}>跳转至指定层级</Radio>
							    </RadioGroup>
					        )}		        
						</FormItem>
					)
					current.push(
	    				<FormItem
				    		{...formItemLayout}
				    		label="选择层级" 
			    			key="selectLevel"
				    	>
							{getFieldDecorator('selectLevel', {
					            initialValue: this.state.field.selectLevelValue,
					            rules: [{
					              	required: true, message: '输入层级',
					            }],
					        })(
					          	<InputNumber
					          		onChange={this.onChangeSelectLevel}
					          	/>
					        )}		        
						</FormItem>
					)
				}
				else if(this.state.field.approvalWay==3)
				{
					current.push(
	    				<FormItem
				    		{...formItemLayout}
				    		label="审批对象" 
			    			key="approvalObject"
				    	>
							{getFieldDecorator('approvalObject', {
					            initialValue: this.state.field.approvalObjectID,
					            rules: [{
					              	required: true, message: '请选择审批对象',
					            }],
					        })(
					          	<MembersSelect 
                                    width={'60%'}
                                    disabled={false}
                                    multiple={false}
                                    onChange={
                                        (value,name)=>this.onChangeApprovalObject(value,name)
                              		}
                        		/>
					        )}		        
						</FormItem>
					)
				}
				else if(this.state.field.approvalWay==4)
				{
					let options = []
					let approvalFields = {}
					for(let field of this.props.fields)
					{
						if(field.require && field.type == "member")
						{
							options.push(<Option key={field.namespace}>{field.name}</Option>)
						}
					}
					current.push(
	    				<FormItem
				    		{...formItemLayout}
				    		label="审批字段"
				    		key="approvalFields"
				    	>
							{getFieldDecorator('approvalFields', {
								rules: [{
					              	required: true, message: '请选择审批字段',
					            }],
								initialValue: this.state.field.approvalFields.value ? this.state.field.approvalFields.value : ''
					        })(
							    <Select
								    style={{ width: 200 }}
									allowClear={true}
									onSelect={this.onSelect}
								>
									{options}
								</Select>
					        )}		        
						</FormItem>	
					)
				}
				return current
    		}
    		else if(this.state.field.type ==2)
    		{
    			let options = []
    			for(let field of this.props.fields)
    			{
    				if(((field.type == "select") && field.require) || ((field.type == "number") && field.require) || ((field.type == "date") && (field.dateType  == "dateRange") && field.require) || ((field.type == "date") && (field.dateType  == "timeRange")&& field.require))
    				{
    					options.push(<Option key={field.namespace}>{field.name}</Option>)	
    				}
    			}
				current.push(
    				<FormItem
			    		{...formItemLayout}
			    		label="选择字段"
			    		key="namespace"
			    	>
						{getFieldDecorator('namespace', {
							rules: [{
				              	required: true, message: '请选择字段',
				            }],
				            initialValue: this.state.field.namespace,

				        })(
						    <Select
							    style={{ width: 200 }}
							    placeholder="选择字段"
							    onChange={this.onChangeNamespace}
								allowClear={true}
							>
							    {options}
							</Select>
				        )}		        
					</FormItem>	
				)
				if(this.state.field.fieldType == "number")
				{
					current.push(
	    				<FormItem
				    		{...formItemLayout}
				    		label="运算符"
				    		key="operator"
				    	>
							{getFieldDecorator('operator', {
								rules: [{
					              	required: true, message: '请选择运算符',
					            }],
					            initialValue: this.state.field.operator,
					        })(
							    <Select
								    style={{ width: 200 }}
								    placeholder="请选择运算符"
								    onChange={this.onChangeOperator}
								    allowClear={true}
								>
								    <Option value='>'>&gt;</Option>
								    <Option value='<'>&lt;</Option>
								    <Option value='='>＝</Option>
								</Select>
					        )}		        
						</FormItem>	
					)
					current.push(
	    				<FormItem
				    		{...formItemLayout}
				    		label="值"
				    		key="fillNumber"
				    	>
							{getFieldDecorator('fillNumber', {
								rules: [{
					              	required: true, message: '请填值',
					            }],
					            initialValue: this.state.field.fillNumber,
					        })(
							    <InputNumber onChange={this.onChangeFillNumber}/>
					        )}		        
						</FormItem>	
					)
				}
				else if(this.state.field.fieldType == "select")
				{
					current.push(
	    				<FormItem
				    		{...formItemLayout}
				    		label="分支类型"
				    		key="branchType"
				    	>
							{getFieldDecorator('branchType', {
					            initialValue: this.state.field.branchType,
					        })(
							    <RadioGroup onChange={this.onChangeBranchType}>
								        <Radio value={1}>多分支</Radio>
								        <Radio value={2}>双分支</Radio>
								</RadioGroup>
					        )}		        
						</FormItem>
					)
					current.push(
	    				<FormItem
				    		{...formItemLayout}
				    		label="选项"
				    		key="rightKeys"
				    	>
							{getFieldDecorator('rightKeys', {
								rules: [{
					                required: true,
					                message: "右侧不能为空",
					            }, {
					                validator: (rule, value, callback) => {
								       	if(value && this.state.field.condition.length == value.length)
								       	{
								       		callback("左侧不能为空")
								       	}
								       	else if(this.state.field.branchType == 1 && value.length>5)
								       	{
								       		callback("右侧选项不能超过五项")
								       	}
								        callback()
								 	}
					            }],
					            initialValue: this.state.field.rightKeys
					        })(
							    <Transfer
							        dataSource={this.state.field.condition}
							        showSearch
							        filterOption={this.filterOption}
							        targetKeys={this.state.field.targetKeys}
							        onChange={this.handleChange}
							        render={item=>item.title}
							        listStyle={{
							          	width: 150,
							          	height: 180,
							        }}
							    />
					        )}		        
						</FormItem>	
					)
				}
				else if(this.state.field.fieldType == "date" )
				{
		        	let options = this.state.field.options
		        	
		        	for(let i =0 ; i< options.length ; i++)
		        	{
		        		current.push(
				            <FormItem 
				            	key={"item_"+i} 
				            	{...this.state.formItemLayout} 
				            	style={{marginLeft:43}}
				            >
				            	{getFieldDecorator("item_"+i)(
						            <Row>
					                    <Col  span={8}>
					                    	<label style={{fontSize: "12px",color: 'rgba(0,0,0,.85)',marginRight:6}}>天数: </label>
						                    <InputNumber 
						                    	value={options[i].cycle_day} 
						                    	onChange={(e)=>
							                    {
							                       	if(e==undefined)
							                       	{
							                       		e = ''
							                       	}
							                        options[i].cycle_day = e
							                        this.setState({...this.state.field, options: options})
							                        return e
							                    }} 
							                />
					                    </Col>
					                    <Col span={8}>
					                    	<label style={{fontSize: "12px",color: 'rgba(0,0,0,.85)'}}>时间: </label>
					                        <TimePicker 
										   		defaultOpenValue={moment('00:00', 'HH:mm')} 
										   		format={'HH:mm'}
										   		value={options[i].cycle_time}
												onChange={(e)=>
						                        {
						                            options[i].cycle_time = e
						                            this.setState({...this.state.field, options: options})
						                            return e
						                        }}
										   	/>
					                    </Col>
					                    <Col span={2}>
						                    <Button 
						                    	icon="delete" 
						                    	disabled={this.state.field.options.length == 1} 
						                    	onClick={() => {
							                        let options = this.state.field.options
							                        this.props.form.setFields({
										              ['item_'+i]: {
										                errors: null
										              }
										            })
							                        options.splice(i, 1)
							                        this.setState({...this.state.field, options: options})
						                    	}} 
					                    	/>
					                    </Col>
					                </Row>
				                )}
				            </FormItem>
			            )
		        	}
		        	current.push(
		        		<Row key = 'dashed'>
                            <Col span={2}></Col>
                            <Col span={20}>
                                <Button
                                	type="dashed" 
                                	style={{ width: 200 ,marginLeft: 40}}
                                	onClick={async ()=>{
	                                    let options = this.state.field.options
	                                    options.push({"cycle_day":1,'cycle_time':moment('00:00', 'HH:mm')})
	                                    await this.setState({...this.state.field, options:[...options]})
                                	}}
                                >
                                	<Icon type="plus" />增加时间段
                                </Button>
                            </Col>	
                      	</Row>
                    )
				}
				return current
    		}			
    	}
        return (	
		        <Modal
		        	title="标题" 
	               	wrapClassName="permission-modal"
	               	visible={this.props.visible}
	               	onOk={this.handleCreate}	
          			onCancel={this.props.handleCancel}
          		>
	    			<Form style={{marginTop:20, maxHeight:'350px', overflow:'auto'}}>
					    {createFormItem()}
					</Form>
			    </Modal>
        )
    }
}
AddView = Form.create()(AddView)
export default AddView
