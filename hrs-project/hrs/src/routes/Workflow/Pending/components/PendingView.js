import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button,Table} from 'antd'
import { Link } from 'react-router'
import {getPendingWorkflow,appove} from '../actions/PendingAction'
const { Column, ColumnGroup } = Table
class PendingView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
           p:1
        }
    }
    static propTypes =
    {
        getPendingWorkflow: React.PropTypes.func.isRequired,
        getPendingWorkflowLoading: React.PropTypes.bool,
        dataSource: React.PropTypes.array,
        appove: React.PropTypes.func,
    }
    async componentWillMount()
    {
        await this.props.getPendingWorkflow(1)
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        this.setState({...this.state,p:pager.current})
        this.props.getPendingWorkflow(pager.current)
    }
    render()
    {
        const columns = [{
            title: '审批类型',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '发起人',
            dataIndex: 'creator_user',
            key: 'creator_user',
        },{
            title: '发起时间',
            dataIndex: 'creation_time',
            key: 'creation_time',
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) =>{
                return  <a 
                            onClick={
                                async () => {
                                    await this.props.appove(record.key,record.name)
                                    this.props.router.push("/workflow/pending/approve")
                            }}
                        >
                            审批
                        </a> 
            }
        }]
        return (
            <div >
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}><div className="h1">待我审批</div></Col>
                    </Row>
                    <div className="table-container">
                        <Table 
                            loading={this.props.pending.getPendingWorkflowLoading} 
                            columns={columns} 
                            dataSource = {this.props.pending.dataSource}
                            pagination = {{"pageSize":20,'total':this.props.pending.count,'current':this.props.pending.current}}
                            onChange={this.handleTableChange} 
                        />
                    </div>
                </Layout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    pending: state.pending
})
const mapDispatchToProps = {
    getPendingWorkflow,
    appove
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingView)
