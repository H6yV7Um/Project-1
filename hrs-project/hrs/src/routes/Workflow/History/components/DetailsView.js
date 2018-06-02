import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button,Select,Tabs,Form,Table, Modal } from 'antd'
import { Link } from 'react-router'
import Approve from 'components/ApproveDetails'
import {onOk,reject,pass} from '../actions/HistoryAction'
const FormItem = Form.Item
class DetailsView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
           disabled:true,
           comment: {}
        }
    }
    static propTypes =
    {
        fields: React.PropTypes.array,
        name: React.PropTypes.string,
        fieldsDetails: React.PropTypes.object,
        current_solution: React.PropTypes.object,
        onOk: React.PropTypes.func,
        onOKLoading: React.PropTypes.bool,
        operation: React.PropTypes.array,
    }
    router()
    {
    	this.props.router.push('/workflow/history')
    }
    async componentWillMount() {
        if(!this.props.history.fields.length)
        {
            location="/workflow/history"
            return
        }
        let current_solution = {...this.props.history.current_solution}
        let user = {...this.props.coreLayout.user}
        if(user._id.$oid == current_solution.next.$oid && !current_solution.status)
        {
            await this.setState({...this.state,disabled:false})
        }
    }
    async pass(_id,status,content){
        let code = await this.props.pass(_id,status,content)
        if(code)
        {
            this.props.router.push("/workflow/history")
        }
    }
    async reject(_id,status,content){
        let code = await this.props.reject(_id,status,content)
        if(code)
        {
            this.props.router.push("/workflow/history")
        }
    }
    render()
    {
        if(this.props.history.fields.length)
        {
            return  <Approve 
                        fields={this.props.history.fields}
                        fieldsDetails={this.props.history.fieldsDetails}
                        name={this.props.history.name}
                        router={()=>this.router()}
                        onOk={async (values,operation_log_length)=>{
                            await this.props.onOk(this.props.history.current_solution._id.$oid,values,operation_log_length)
                        }}
                        onOKLoading={this.props.history.onOKLoading}
                        current_solution={this.props.history.current_solution}
                        pass={(_id,status,content)=>this.pass(_id,status,content)}
                        passLoading={this.props.history.passLoading}
                        reject={(_id,status,content)=>this.reject(_id,status,content)}
                        rejectLoading={this.props.history.rejectLoading}
                        disabled={this.state.disabled}
                        operation={this.props.history.operation}
                />
        }
        else
        {
            return <div></div>
        }
    }
}
const mapStateToProps = (state) => ({
    history: state.history,
    coreLayout: state.coreLayout
})
const mapDispatchToProps = {
    onOk,
    reject,
    pass
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView)
