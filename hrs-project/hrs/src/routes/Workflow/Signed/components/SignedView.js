import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button,Table } from 'antd'
import { Link } from 'react-router'
import {getFindOwnDoneWorkflow,signeddetails} from '../actions/SignedAction'
class SignedView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            p:1
        }
    }
    static propTypes =
    {
        getFindOwnDoneWorkflow: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.array,
        signeddetails: React.PropTypes.func,
        getFindOwnDoneWorkflowLoading: React.PropTypes.bool,
    }
    componentWillMount()
    {
        this.props.getFindOwnDoneWorkflow(1)
    } 
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        this.setState({...this.state,p:pager.current})
        this.props.getFindOwnDoneWorkflow(pager.current)
    }
    render()
    {
        const columns = [{
            title: '审批类型',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) =>{
                return  <a 
                            onClick={
                                async () => {
                                    await this.props.signeddetails(record.key,record.name)
                                    this.props.router.push("/workflow/signed/signeddetails")
                            }}
                        >
                            {text}
                        </a> 
            } 
        },{
            title: '发起人',
            dataIndex: 'creator_user',
            key: 'creator_user',
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) =>{
                return  <a 
                            onClick={
                                async () => {
                                    await this.props.signeddetails(record.key,record.name)
                                    this.props.router.push("/workflow/signed/signeddetails")
                            }}
                        >
                            {text}
                        </a> 
            }
        },{
            title: '发起时间',
            dataIndex: 'creation_time',
            key: 'creation_time',
        },{
            title: '完成时间',
            dataIndex: 'end_time',
            key: 'end_time',
        }]
        return (
            <div >
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}><div className="h1">我已审批</div></Col>
                    </Row>
                    <div className="table-container">
                        <Table 
                            loading={this.props.signed.getFindOwnDoneWorkflowLoading}
                            columns={columns} 
                            dataSource={this.props.signed.dataSource}
                            pagination = {{"pageSize":20,'total':this.props.signed.count,'current':this.props.signed.current}}
                            onChange={this.handleTableChange} 
                        />
                    </div>
                </Layout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    signed: state.signed
})
const mapDispatchToProps = {
    getFindOwnDoneWorkflow,
    signeddetails
}
export default connect(mapStateToProps, mapDispatchToProps)(SignedView)
