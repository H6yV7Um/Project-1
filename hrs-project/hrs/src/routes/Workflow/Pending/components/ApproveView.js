import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button,Table, Form, Input } from 'antd'
import { Link } from 'react-router'
import {pass,reject,onOk} from '../actions/PendingAction'
import Approve from 'components/ApproveDetails'
const { Column, ColumnGroup } = Table
const FormItem = Form.Item
const { TextArea } = Input
class ApproveView extends Component {
    static propTypes =
    {
        fields: React.PropTypes.array,
        fieldsDetails: React.PropTypes.object,
        name: React.PropTypes.string,
        current_solution: React.PropTypes.object,
        pass: React.PropTypes.func,
        passLoading: React.PropTypes.bool,
        reject: React.PropTypes.func,
        rejectLoading: React.PropTypes.bool,
        onOk: React.PropTypes.func,
        onOKLoading: React.PropTypes.bool,
        operation: React.PropTypes.array,
    }
    router()
    {	
    	this.props.router.push('/workflow/pending')
    }
    async pass(_id,status,content){
        let code = await this.props.pass(_id,status,content)
        if(code)
        {
            this.props.router.push("/workflow/pending")
        }
    }
    async reject(_id,status,content){
        let code = await this.props.reject(_id,status,content)
        if(code)
        {
            this.props.router.push("/workflow/pending")
        }
    }
    componentWillMount() {
        if(!this.props.pending.fields.length)
        {
            location="/workflow/pending"
            return
        }
    }
    render()
    {
        if(this.props.pending.fields.length)
        {
            return  <Approve 
                    fields={this.props.pending.fields}
                    fieldsDetails={this.props.pending.fieldsDetails}
                    name={this.props.pending.name}
                    router={()=>this.router()}
                    onOk={async (values,operation_log_length)=>{
                        await this.props.onOk(this.props.pending.current_solution._id.$oid,values,operation_log_length)
                    }}
                    onOKLoading={this.props.pending.onOKLoading}
                    current_solution={this.props.pending.current_solution}
                    pass={(_id,status,content)=>this.pass(_id,status,content)}
                    passLoading={this.props.pending.passLoading}
                    reject={(_id,status,content)=>this.reject(_id,status,content)}
                    rejectLoading={this.props.pending.rejectLoading}
                    disabled={false}
                    operation={this.props.pending.operation}

                />
        }
        else
        {
            return <div></div>
        }
    }
}
const mapStateToProps = (state) => ({
    pending: state.pending
})
const mapDispatchToProps = {
    pass,
    reject,
    onOk
}
export default connect(mapStateToProps, mapDispatchToProps)(ApproveView)
