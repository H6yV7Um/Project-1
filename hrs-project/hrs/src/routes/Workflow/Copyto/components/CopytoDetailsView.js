import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button,Select,Tabs,Form,Table, Modal } from 'antd'
import { Link } from 'react-router'
import Approve from 'components/ApproveDetails'
import {onOk,reject,pass} from '../actions/CopytoAction'
const FormItem = Form.Item
class CopytoDetailsView extends Component {
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
    	this.props.router.push('/workflow/copyto')
    }
    async componentWillMount() {
        if(!this.props.copyto.fields.length)
        {
            location="/workflow/copyto"
            return
        }
        let current_solution = {...this.props.copyto.current_solution}
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
            this.props.router.push("/workflow/copyto")
        }
    }
    async reject(_id,status,content){
        let code = await this.props.reject(_id,status,content)
        if(code)
        {
            this.props.router.push("/workflow/copyto")
        }
    }
    render()
    {
        if(this.props.copyto.fields.length)
        {
            return  <Approve 
                    fields={this.props.copyto.fields}
                    fieldsDetails={this.props.copyto.fieldsDetails}
                    name={this.props.copyto.name}
                    router={()=>this.router()}
                    onOk={async (values,operation_log_length)=>{
                        await this.props.onOk(this.props.copyto.current_solution._id.$oid,values,operation_log_length)
                    }}
                    onOKLoading={this.props.copyto.onOKLoading}
                    current_solution={this.props.copyto.current_solution}
                    pass={(_id,status,content)=>this.pass(_id,status,content)}
                    passLoading={this.props.copyto.passLoading}
                    reject={(_id,status,content)=>this.reject(_id,status,content)}
                    rejectLoading={this.props.copyto.rejectLoading}
                    disabled={this.state.disabled}
                    operation={this.props.copyto.operation}
                />
        }
        else
        {
            return <div></div>
        }
    }
}
const mapStateToProps = (state) => ({
    copyto: state.copyto,
    coreLayout: state.coreLayout
})
const mapDispatchToProps = {
    onOk,
    reject,
    pass
}
export default connect(mapStateToProps, mapDispatchToProps)(CopytoDetailsView)
