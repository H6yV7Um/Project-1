import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button,Table, Form, Input } from 'antd'
import { Link } from 'react-router'
import {pass,reject} from '../actions/SignedAction'
import Approve from 'components/ApproveDetails'
import {onOk} from '../actions/SignedAction'
const { Column, ColumnGroup } = Table
const FormItem = Form.Item
const { TextArea } = Input
class SignedDetailsView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
           disabled:true
        }
    }
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
    	this.props.router.push('/workflow/signed')
    }
    async componentWillMount() {
        if(!this.props.signed.fields.length)
        {
            location="/workflow/signed"
            return  
        }
        let current_solution = {...this.props.signed.current_solution}
        let user = {...this.props.coreLayout.user}
        if(user._id.$oid == current_solution.next.$oid && !current_solution.status)
        {
            await this.setState({...this.state,disabled:false})
        }
    }
    render()
    {
        if(this.props.signed.fields.length)
        {
            return <Approve 
                        fields={this.props.signed.fields}
                        fieldsDetails={this.props.signed.fieldsDetails}
                        name={this.props.signed.name}
                        router={()=>this.router()}
                        onOk={async (values,operation_log_length)=>{
                            await this.props.onOk(this.props.signed.current_solution._id.$oid,values,operation_log_length)
                        }}
                        onOKLoading={this.props.signed.onOKLoading}
                        current_solution={this.props.signed.current_solution}
                        pass={(_id,status,content)=>{}}
                        passLoading={false}
                        reject={(_id,status,content)=>{}}
                        rejectLoading={false}
                        disabled={this.state.disabled}
                        operation={this.props.signed.operation}
                    />
        }
        else
        {
            return <div></div>
        }
    }
}
const mapStateToProps = (state) => ({
    signed: state.signed,
    coreLayout: state.coreLayout
})
const mapDispatchToProps = {
    onOk
}
export default connect(mapStateToProps, mapDispatchToProps)(SignedDetailsView)
