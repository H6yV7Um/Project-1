import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button, Form, Input, InputNumber,Select, DatePicker,message } from 'antd'
import {changeFileData,complete} from '../actions/StartAction'
import ApprovalView from 'components/Approval'
import './StartViewStyle.scss'
class StartApprovalView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            fields:[]
        }
    }
    static propTypes =
    {
        oneSolution: React.PropTypes.array,
        changeFileData: React.PropTypes.func,
        complete: React.PropTypes.func,
    }
    async componentWillMount()
    {
        if(!Object.keys(this.props.start.oneSolution).length)
        {   
           this.props.router.push("/workflow/start")
           return    
        }
        let fields = [...this.props.start.oneSolution.fields]
        await this.setState({...this.state,fields:fields})
    }
    async onChange(data){
        let fileData = {...this.props.start.fileData}
        for(let i in fileData){
            if (fileData.hasOwnProperty(i)) {
                data[i] = [...fileData[i]]
            }
        }
        let code = await this.props.complete(this.props.start.oneSolution._id.$oid,data) 
        if(code == 1)
        {
            message.success('发起成功')
            this.props.router.push("/workflow/start")
        }
    }
    render()
    {   
        if(!Object.keys(this.props.start.oneSolution).length)
        {
            return <div></div>
        }
        else
        {
            return (
                <div >
                    <Layout className="layout-main">
                        <Row className="titleBox" >
                            <Col span={20}><div className="h1">{this.props.start.oneSolution.name}</div></Col>
                            <Col span={4} className="extra">
                                <Button 
                                    type="primary"  
                                    onClick={()=>{
                                        this.props.router.push("/workflow/start")
                                    }} 
                                >
                                    返回
                                </Button>
                            </Col>
                        </Row>
                        <div className="table-container"> 
                            <ApprovalView 
                                loading={this.props.start.completeLoading}
                                fileListData={this.props.start.fileListData}
                                changeFileData = {this.props.changeFileData}
                                onChange={(data)=>this.onChange(data)}
                                solution_id={this.props.start.solution_id}
                                oneSolution={this.props.start.oneSolution}
                            />
                        </div>
                    </Layout>
                </div>
            )
        }
        
    }
}
const mapStateToProps = (state) => ({
    start: state.start
})
const mapDispatchToProps = {
	changeFileData,
    complete
}
StartApprovalView = Form.create()(StartApprovalView)
export default connect(mapStateToProps, mapDispatchToProps)(StartApprovalView)
	