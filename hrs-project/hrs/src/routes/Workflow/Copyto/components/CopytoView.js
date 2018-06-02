import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button,Table } from 'antd'
import { Link } from 'react-router'
import {getOwnCopytoWorkflow, copytodetails} from '../actions/CopytoAction'
class CopytoView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            p:1
        }
    }
    static propTypes =
    {
        getOwnCopytoWorkflow: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.array,
        copytodetails: React.PropTypes.func,
        getFindOwnDoneWorkflowLoading: React.PropTypes.bool,
    }
    componentWillMount()
    {
        this.props.getOwnCopytoWorkflow(1)
    } 
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        this.setState({...this.state,p:pager.current})
        this.props.getOwnCopytoWorkflow(pager.current)
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
                                    await this.props.copytodetails(record.key,record.name)
                                    this.props.router.push("/workflow/copyto/copytodetails")
                            }}
                        >
                            {text}
                        </a> 
            }
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) =>{
                return  <a 
                            onClick={
                                async () => {
                                    await this.props.copytodetails(record.key,record.name)
                                    this.props.router.push("/workflow/copyto/copytodetails")
                            }}
                        >
                            {text}
                        </a> 
            }
        }, {
            title: '发起人',
            dataIndex: 'creator_user',
            key: 'creator_user',
        }, {
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
                            loading={this.props.copyto.getOwnCopytoWorkflowLoading}
                            columns={columns} 
                            dataSource={this.props.copyto.dataSource}
                            pagination = {{"pageSize":20,'total':this.props.copyto.count,'current':this.props.copyto.current}}
                            onChange={this.handleTableChange} 
                        />
                    </div>
                </Layout>
            </div>
        )
        return <div> heelo</div>
    }
}
const mapStateToProps = (state) => ({
    copyto: state.copyto
})
const mapDispatchToProps = {
    getOwnCopytoWorkflow,
    copytodetails
}
export default connect(mapStateToProps, mapDispatchToProps)(CopytoView)
