import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button,Table, Form, Input, Timeline, Icon, Modal} from 'antd'
import { Link } from 'react-router'
import {SERVER} from 'config'
import UploadFile from './UploadFile'
import UploadPicture from './UploadPicture'
const { Column, ColumnGroup } = Table
const FormItem = Form.Item
const { TextArea } = Input
class Comment extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
           	className:'',
            fileData:{},
            fileListData:{},
            content:''
        }
    }
    static propTypes =
    {
       	visible: React.PropTypes.bool,
       	confirmLoading: React.PropTypes.bool,
       	onOk: React.PropTypes.func,
       	onCancel: React.PropTypes.func,
        solution_id: React.PropTypes.string,
    }
    handleCreate(){
	    const form = this.props.form
	    form.validateFields((err, values) => {
	      	if (err) {
	        	return
	    	}
            let data = {...values}
            let fileData = {...this.state.fileData}
            for(let i in fileData){
                if (fileData.hasOwnProperty(i)) {
                    data[i] = [...fileData[i]]
                }
            }
            this.setState({
                ...this.state,
                className:'',
                fileData:{},
                fileListData:{},
                content:''
            })
            form.resetFields()
	        this.props.onOk(data)
	    })
  	}
    async onChange (fileList,namespace)
    {  
        let fileData = {...this.state.fileData}
        let fileListData = {...this.state.fileListData}
        fileList = [...fileList]
        let current = []
        let currentAll = []
        for(let val of fileList)
        {
            if(val.status)
            {
                if(val.status == 'done')
                {
                    current.push(val.response.data[0].$oid)
                    let url = SERVER+"organization/file/download/"+val.response.data[0].$oid
                    val.url = url
                    val.uid = val.response.data[0].$oid
                    val.name = val.name
                    currentAll.push(val)
                }
                else
                {
                    currentAll.push(val) 
                }
            }
            else
            {
                current.push(val.uid)
                currentAll.push(val)
            }
        }
        let name = namespace
        fileData[name] = current
        fileListData[name] = currentAll
        await this.setState({...this.state,"fileData": fileData,"fileListData":fileListData})
    }
    render()
    {
    	const { getFieldDecorator } = this.props.form
    	const 	formItemLayout =
      	{
          	labelCol:
          	{
              	sm: { span: 5 }
          	},
          	wrapperCol:
          	{
              	sm: { span: 17 }
          	}
      	}
        return (
	        <Modal 
	        		title={"评论"}
	               	wrapClassName="permission-modal"
	               	visible={this.props.visible}
	               	confirmLoading={this.props.confirmLoading}
	               	onOk={
	          			()=>this.handleCreate()
	        		}
			        onCancel={() => {
			          	this.props.onCancel()
			        }}
			>
		        <Form style={{marginTop:20, maxHeight:'350px', overflow:'auto'}}>
		          	<FormItem 
		          		{...formItemLayout} 
		          		label="评论"
                		className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}} 
		          	>
			          	{getFieldDecorator('content', {
			              	initialValue: this.state.content
			            })(
			              	<Input.TextArea
			              		rows={3} 
			              		cols={50}
			              		style={{borderRadius:"5px",resize:'none'}}
			              	/>
			            )}
		          	</FormItem>
		          	<FormItem
			          	{...formItemLayout}
			          	label={"图片"} 
                		className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}} 
                    >
                        {getFieldDecorator('picture', {
                            initialValue: this.state.fileListData['picture']? this.state.fileListData['picture'] : [],
                            valuePropName: 'fileList',
                        })(
                            <UploadPicture 
                                namespace= {'picture'}
                                fieldID={this.props.solution_id}
                                size={10000}
                                maximum={1}
                                onChange = {(fileList,namespace)=>{this.onChange(fileList,namespace)}}
                            />
                        )}
                    </FormItem>
                    <FormItem
			          	{...formItemLayout}
			          	label={"上传文档"} 
                		className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}} 
			        >
			          	{getFieldDecorator("attachment", {
                            valuePropName: 'fileList',
                            initialValue: this.state.fileListData['attachment']? this.state.fileListData['attachment'] : [],
                        })(
                            <UploadFile 
                                namespace= {"attachment"}
                                fieldID={this.props.solution_id}
                                size={10000}
                                maximum={1}
                                onChange = {(fileList,namespace)=>{this.onChange(fileList,namespace)}}
                            />
                        )}
			        </FormItem>
		        </Form>
	        </Modal>
      	)
    }
}
Comment = Form.create()(Comment)
export default Comment
