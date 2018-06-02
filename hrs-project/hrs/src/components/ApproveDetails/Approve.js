import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button,Table, Form, Input, Timeline, Icon, Modal} from 'antd'
import { Link } from 'react-router'
import {SERVER} from 'config'
import Comment from './Comment'
import moment from 'moment'
import './Approve.scss'
const { Column, ColumnGroup } = Table
const FormItem = Form.Item
const { TextArea } = Input
class Approve extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
			picClassName:'',
			visible:false,
			current_solution: {},
			content:'',
			fileListData:{},
			filePicClassName:'',
			comment: {},
			operation_log_length:''
        }
    }
    static propTypes =
    {
        fields: React.PropTypes.array,
        fieldsDetails: React.PropTypes.object,
        router: React.PropTypes.func,
        name: React.PropTypes.string,
        onOk: React.PropTypes.func,
        pass: React.PropTypes.func,
        passLoading: React.PropTypes.bool,
        rejectLoading: React.PropTypes.bool,
        reject: React.PropTypes.func,
        current_solution: React.PropTypes.object,
        onOKLoading: React.PropTypes.bool,
        comment: React.PropTypes.object,
    }
    showModal(e){
        this.setState({...this.state,visible: true})
    }
    showpicModal(e){
    	this.setState({
          	picClassName: e.target.className
        })
    }
    showFilePicModal = (e) => {
        this.setState({
          	filePicClassName: e.target.className
        })
    }
    async componentWillMount() {
    	let current_solution = {...this.props.current_solution}
    	await this.setState({...this.state,current_solution:current_solution,operation_log_length:current_solution.operation_log.length})
    }
    format(fields,fieldsDetails)
    {
    	const formItemLayout = {
            labelCol: {
                span:2
            }
    	}
 		let current = []
	  	for(let field of fields)
        {
        	for(let key in fieldsDetails)
        	{
        		if(fieldsDetails.hasOwnProperty(key))
        		{
	        		if(field.namespace == key)
	        		{
	        			if( field.type == "date" )
			            {	
			            	let data
			            	if(field.dateType == "date")
			            	{
			            		data = moment(fieldsDetails[key].value).format('YYYY-MM-DD HH:mm:ss')
			            	}
			            	else if(field.dateType == "dateRange")
			            	{
			            		let startData= moment(fieldsDetails[key].value[0]).format('YYYY-MM-DD HH:mm:ss')
			            		let endData= moment(fieldsDetails[key].value[1]).format('YYYY-MM-DD HH:mm:ss')
			            		data = startData+" - "+endData
			            	}
			            	else if(field.dateType == "time")
			            	{
			            		data = moment(fieldsDetails[key].value).format('YYYY-MM-DD HH:mm:ss')
			            	}
			            	else if(field.dateType == "timeRange")
			            	{
			            		let startData= moment(fieldsDetails[key].value[0]).format('YYYY-MM-DD HH:mm:ss')
			            		let endData= moment(fieldsDetails[key].value[1]).format('YYYY-MM-DD HH:mm:ss')
			            		data = startData+" - "+endData
			            	}
			            	
			                current.push(
			                    <FormItem
			                        {...formItemLayout}
			                        label={field.name}
			                        key = {field.namespace} 
			                        className="customFieldProfile"
			                        style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  
			                    >
			                       {data}
			                    </FormItem>
			                )
			            }
			            else if(field.type == "input" || field.type == "select" || field.type == 'number')
			            {
			            	current.push(
			                    <FormItem
			                        {...formItemLayout}
			                        label={field.name}
			                        key = {field.namespace} 
			                        className="customFieldProfile"
			                        style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  
			                    >
			                       {fieldsDetails[key]}
			                    </FormItem>
			                )
			            }
			            else if(field.type == "file")
			            {
			                if(field.filetype == "picture")
			                {
			                    let fileList = []
			                    const handleCancel = () => {
			                        this.setState({...this.state,
			                          "picClassName": '',
			                        })
			                    }
			                    for(let val of fieldsDetails[key])
			                    {
			                        let url = SERVER+"workflow/file/download/"+val
			                        fileList.push(
			                            <div key = {val}>
			                                <img 
			                                	style={{border:"1px solid #ccc",borderRadius:"10px",width:"100px",height:"100px" }} 
			                                	className={val}  
			                                	src={url} 
			                                	onClick={(e)=>this.showpicModal(e)} 
			                                />
			                                <Modal 
			                                    visible={this.state.picClassName == val ? true :false}
			                                    width={430}
			                                    onCancel={handleCancel}
			                                    footer={null}
			                                >
			                                    <img style={{width:"400px",height:"400px"}} src = {url} />
			                                </Modal>
			                            </div>
			                        )
			                    }
			                    current.push(
			                        <FormItem
			                            {...formItemLayout}
			                            label={field.name}
			                            key = {field.namespace} 
			                            className="customFieldProfile"
			                            style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}   
			                        >
			                           {fileList}
			                        </FormItem>
			                    )
			                }
			                else
			                {
			                    let fileList = []
			                    for(let val of fieldsDetails[key])
			                    {
			                        let url = SERVER+"organization/file/download/"+val
			                        fileList.push(<a key = {val} href={url}>doxc</a>)
			                    }
			                    current.push(
			                            <FormItem
			                                {...formItemLayout}
			                                label={field.name}
			                                key = {field.name} 
			                                className="customFieldProfile"
			                                style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  
			                            >
			                                {fileList}
			                               
			                            </FormItem>
			                    )
			                }
			            }
			            else if(field.type == "department")
			            {
			                let department = ''
	                        for(let val of fieldsDetails[key])
	                        {
	                            department += val.label + ' '
	                        }
	                        current.push(
	                                <FormItem
	                                    {...formItemLayout}
	                                    label={field.name}
	                                    key = {field.name}
	                                    className="customFieldProfile"
	                                    style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  

	                                >
	                                   {department}
	                                </FormItem>
	                        )
			            }
			            else if(field.type == "member")
			            {   
			                let member = ''
	                        for(let val of fieldsDetails[key])
	                        {
	                            member += val.value + ' '
	                        }
	                        current.push(
	                                <FormItem
	                                    {...formItemLayout}
	                                    label={field.name}
	                                    key = {field.name}
	                                    className="customFieldProfile"
	                                    style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  
	                                >
	                                   {member}
	                                </FormItem>
	                        )
			            }
	        		}
	        	}
        	}  
        }
        return current 	
    }
    render()
    {
    	const formatTimelineItem = (current_solution)=>{
			let users = [...current_solution.users]
    		let operation_log = [...current_solution.operation_log]
    		let operatorUserLenth = 0
    		let key = 0
    		let current = []
    		current.push(
	    		<Timeline.Item
    				key={'creator'}
			    	dot={
			    		<img 
							className='image_style'
							src={SERVER+"organization/file/download/"+this.state.current_solution.creator_user.selfie[0].$oid}
						/>	
					}
				>
			    	<p className='approve-p'><label className='approve-label'>{this.state.current_solution.creator_user.name}</label>发起申请</p>
			    	<p className='approve-p'><label className='approve-label'>发起时间:</label> {moment(this.state.current_solution.creation_time.$date).format('YYYY-MM-DD HH:mm:ss')}</p>
					<p className='approve-p-hidden'>－－</p>
				</Timeline.Item>
			)
			for(let _log of operation_log)
			{ 
				let userID = _log.operator.$oid
				let operatorUsers = {}
				for(let i = 0 ; i< users.length;i++ )
				{
					if(users[i]._id.$oid == userID)
					{
						operatorUsers = {...users[i]}
					}
				}
				if(_log.type == 'audit')
				{
					operatorUserLenth++
					if(_log.status)
					{
						current.push(
						 	<Timeline.Item
					 			key={"operatorUsers"+key}
						    	dot={
						    		<img 
										className='image_style'
										src={SERVER+"organization/file/download/"+operatorUsers.selfie[0].$oid}
									/>	
								}
						    >
						    	<p className='approve-p'><label className='approve-label'>{operatorUsers.name}</label>已审批</p>
						    	<p className='approve-p'><label className='approve-label'>审批意见:</label> {_log.content}</p>
						    	<p className='approve-p'><label className='approve-label'>审批时间:</label> {moment(_log.operate_time.$date).format('YYYY-MM-DD HH:mm:ss')}</p>
						   	</Timeline.Item>
	    				)
					}
					else
					{
						current.push(
						 	<Timeline.Item
					 			key={"operatorUsers"+key}
						    	dot={
						    		<img 
										className='image_style'
										src={SERVER+"organization/file/download/"+operatorUsers.selfie[0].$oid}
									/>	
								}
						    >
						    	<p className='approve-p'><label className='approve-label'>{operatorUsers.name}</label>已拒绝</p>
						    	<p className='approve-p'><label className='approve-label'>审批意见:</label> {_log.content}</p>
						    	<p className='approve-p'><label className='approve-label'>审批时间:</label> {moment(_log.operate_time.$date).format('YYYY-MM-DD HH:mm:ss')}</p>
						   	</Timeline.Item>
	    				)
					}	 
				}
				else if(_log.type == 'comment')
				{
					let attachment = _log.attachment_detail
					let content = _log.content
					let picture = _log.picture_detail
					let picFileList = []
					let attFileList = []
					
					if(picture.length)
                    {
                        const handleCancel = () => {
                            this.setState({
                              "filePicClassName": '',
                            })
                        }
                        for(let _picture of picture)
                        {
                            let url = SERVER+"workflow/file/download/"+_picture._id.$oid
                            picFileList.push(
                                <div key = {_picture._id.$oid}>
                                    <img 
                                    	style={{border:"1px solid #ccc",borderRadius:"10px",width:"100px",height:"100px" }} 
                                    	className={_picture._id.$oid}  
                                    	src={url} 
                                    	onClick={this.showFilePicModal} 
                                    />
                                    <Modal 
                                        visible={this.state.filePicClassName == _picture._id.$oid ? true : false}
                                        width={430}
                                        onCancel={handleCancel}
                                        footer={null}
                                    >
                                        <img style={{width:"400px",height:"400px"}} src = {url} />
                                    </Modal>
                                </div>
                            )
                        }

                    }
                   	if(attachment.length)
                    {
                        for(let _attachment of attachment)
                        {
                            let url = SERVER+"workflow/file/download/"+_attachment._id_$oid
                            attFileList.push(<a key = {_attachment._id.$oid} href={url}>  {_attachment.filename} </a>)
                        }
                    }

                    current.push(
						 	<Timeline.Item
				 				key={"operatorUsers"+key}
						    	dot={
						    		<img 
										className='image_style'
										src={SERVER+"organization/file/download/"+operatorUsers.selfie[0].$oid}
									/>	
								}
						    >
						    	<p className='approve-p'><label className='approve-label'>{operatorUsers.name}</label>评论</p>
						    	<p className='approve-p'><label className='approve-label'>评论:</label> {_log.content}</p>
						    	{picture.length ? <div className='appove-file'>{picFileList}</div> : null}
						    	{attachment.length ? <div className='appove-file'>{attFileList}</div> : null}
						    	<p className='approve-p'><label className='approve-label'>评论时间:</label> {moment(_log.operate_time.$date).format('YYYY-MM-DD HH:mm:ss')}</p>
						   	</Timeline.Item>
	    			)
				}
				else if(_log.type == 'cancel')
				{
					operatorUserLenth++
					current.push(
						 	<Timeline.Item
					 			key={"operatorUsers"+key}
						 		
						    	dot={
						    		<img 
										className='image_style'
										src={SERVER+"organization/file/download/"+operatorUsers.selfie[0].$oid}
									/>	
								}
						    >
						    	<p className='approve-p'><label className='approve-label'>{operatorUsers.name}</label>已撤销</p>
						    	<p className='approve-p'><label className='approve-label'>撤销时间:</label> {moment(_log.operate_time.$date).format('YYYY-MM-DD HH:mm:ss')}</p>
						    	<p className='approve-p-hidden'>－－</p>

						   	</Timeline.Item>
	    				)
				}
				key++
			}
			if(this.props.operation.length)
			{	
				let remark = 0
				for(let log of this.props.operation)
				{ 
						let attachment = log.attachment_detail
						let content = log.content
						let picture = log.picture_detail
						let picFileList = []
						let attFileList = []
						let id = log.operator.$oid
						let operation_user
						for(let U of users)
						{
							if(U._id.$oid == id)
							{
								operation_user = U
							}
						}
						if(picture.length)
	                    {
	                        const handleCancel = () => {
	                            this.setState({
	                              "filePicClassName": '',
	                            })
	                        }
	                        for(let _picture of picture)
	                        {
	                            let url = SERVER+"workflow/file/download/"+_picture._id.$oid
	                            picFileList.push(
	                                <div key = {_picture._id.$oid}>
	                                    <img 
	                                    	style={{border:"1px solid #ccc",borderRadius:"10px",width:"100px",height:"100px" }} 
	                                    	className={_picture._id.$oid}  
	                                    	src={url} 
	                                    	onClick={this.showFilePicModal} 
	                                    />
	                                    <Modal 
	                                        visible={this.state.filePicClassName == _picture._id.$oid ? true : false}
	                                        width={430}
	                                        onCancel={handleCancel}
	                                        footer={null}
	                                    >
	                                        <img style={{width:"400px",height:"400px"}} src = {url} />
	                                    </Modal>
	                                </div>
	                            )
	                        }
	                    }
	                   	if(attachment.length)
	                    {
	                        for(let _attachment of attachment)
	                        {
	                            let url = SERVER+"workflow/file/download/"+_attachment._id_$oid
	                            attFileList.push(<a key = {_attachment._id.$oid} href={url}>  {_attachment.filename} </a>)
	                        }
	                    }
						current.push(
						 	<Timeline.Item
				 				key={"operator"+remark}
						    	dot={
						    		<img 
										className='image_style'
										src={SERVER+"organization/file/download/"+operation_user.selfie[0].$oid}
									/>	
								}
						    >
						    	<p className='approve-p'><label className='approve-label'>{operation_user.name}</label>评论</p>
						    	<p className='approve-p'><label className='approve-label'>评论:</label> {log.content}</p>
						    	{picture.length ? <div className='appove-file'>{picFileList}</div> : null}
						    	{attachment.length ? <div className='appove-file'>{attFileList}</div> : null}
						    	<p className='approve-p'><label className='approve-label'>评论时间:</label> {moment(log.operate_time.$date).format('YYYY-MM-DD HH:mm:ss')}</p>
						   	</Timeline.Item>
	    				)
	    				remark++
				}
			}
			for(let k = operatorUserLenth;  k< users.length; k++)
			{
				if(k == operatorUserLenth && !current_solution.status)
				{
					current.push(

					 	<Timeline.Item
					 		key={"notOperatorUsers"+k}
					    	dot={
					    		<img 
									className='image_style'
									src={SERVER+"organization/file/download/"+users[k].selfie[0].$oid}
								/>	
							}
					    >
					    	<p className='approve-p'><label className='approve-label'>{users[k].name}</label>正在审批</p>
					    	<p className='approve-p-hidden'>－－</p>
					    	<p className='approve-p-hidden'>－－</p>
					   	</Timeline.Item>
	    			)
				}
				else
				{
					current.push(
					 	<Timeline.Item
					 		key={"notOperatorUsers"+k}
					    	dot={
					    		<img 
									className='image_style'
									src={SERVER+"organization/file/download/"+users[k].selfie[0].$oid}
								/>	
							}
					    >
					    	<p className='approve-p'><label className='approve-label'>{users[k].name}</label></p>
						    <p className='approve-p-hidden'>－－</p>
						    <p className='approve-p-hidden'>－－</p>
					   	</Timeline.Item>
	    			)
				}
			}
  			return current
	    }
        return (
	        <div>
	            <Layout className="layout-main">
	                <Row className="titleBox" >
	                    <Col span={20}><div className="h1">审批</div></Col>
	                    <Col 
	                    	span={4} 
	                    	className="extra"
	                    >
	                    	<Button 
	                    		type="primary" 
	                    		onClick={()=>{
	                                
	                                this.props.router()
	                    		}}
	                    	>
	                    		返回
	                    	</Button>
	                    </Col>
	                </Row>
	                <div className="table-container">
	                	<Row className="groupTitle" style={{marginTop:"20px"}}>
                            <Col span={21}>
                                <div className="h1">
                                    审批详情
                                </div>  
                            </Col>
                        </Row>
	                	<Form>
	                    	{this.format(this.props.fields,this.props.fieldsDetails)}
	                    </Form>
	                    <Row className="groupTitle" style={{marginTop:"20px"}}>
                            <Col span={21}>
                                <div className="h1">
                                    审批流程
                                </div> 
                            </Col>
                        </Row>
                        <Timeline  className='approve-timeline-style'>
						    {formatTimelineItem(this.state.current_solution)}
						</Timeline>
						{
							this.props.disabled
							?
							<div>
								<Button style={{ marginLeft: 8,marginTop:20}} onClick={() =>{this.showModal()}}>评论</Button>
							</div>
							:
							<div>
								<div>
									<Input.TextArea 
										placeholder="审批意见"
										disabled={this.props.disabled}
					              		rows={10} 
					              		cols={80}
					              		className='appove-textarea'
					              		onChange={async (e)=>{
					              			await this.setState({...this.state,content:e.target.value})
					              		}}
					              	/>
								</div>
								<Button 
		                    		loading={this.props.passLoading}
		                    		type="primary" 
		                    		style={{marginTop:20}} 
		                    		onClick={() =>{
		                    			this.props.pass(this.state.current_solution._id.$oid,1,this.state.content)
		                    		}}
		                    	>
		                    		通过
		                    	</Button>
		                		<Button 
		                			type="danger"
		                			loading={this.props.rejectLoading}
		                			style={{ marginLeft: 8,marginTop:20}} 
		                			onClick={() =>{	
		                    			this.props.reject(this.state.current_solution._id.$oid,0,this.state.content)
		                			}}
		                		>
		                			拒绝
		                		</Button>
								<Button style={{ marginLeft: 8,marginTop:20}} onClick={() =>{this.showModal()}}>评论</Button>
							</div>
                    	}
                		<Comment
                			visible={this.state.visible}
                			onOk={(values)=>{
                				this.props.onOk(values,this.state.operation_log_length)
                				this.setState({...this.state,visible:false})
                			}}
                			onOKLoading={this.props.onOKLoading}
                			onCancel={()=>{this.setState({...this.state,visible:false})}}
                			confirmLoading={this.props.confirmLoading}
                			solution_id={this.state.current_solution._id.$oid}
                		/>
	                </div>
	            </Layout>
	        </div>
	    )
    }
}
export default Approve
