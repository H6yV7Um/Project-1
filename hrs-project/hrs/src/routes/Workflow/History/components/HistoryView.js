import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout, Row, Col, Button, Select, Tabs, Form, Table, Popconfirm, Spin, message} from 'antd'
import { Link } from 'react-router'
import {getOwnWorkflow,showDetails,withdraw} from '../actions/HistoryAction'
const TabPane = Tabs.TabPane
const Option = Select.Option
const FormItem = Form.Item
const { Column, ColumnGroup } = Table
class HistoryView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
           key:'0',
           withdrawID:''
        }
    }
    static propTypes =
    {
        getOwnWorkflow: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.array,
        withdraw: React.PropTypes.func.isRequired,
        withdrawLoading: React.PropTypes.bool,
    }
    async componentWillMount()
    {
        await this.props.getOwnWorkflow(this.state.key,1)
    }
    async withdraw(key){
        await this.setState({...this.state,withdrawID: key})
        let code  = await this.props.withdraw(key)
        if(code == 1)
        {
            message.success('撤回成功')
        }
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        this.setState({...this.state,p:pager.current})
        this.props.getOwnWorkflow(this.state.key,pager.current)
    }
    formatTable(key)
    {   
        const columns0 = [{
            title: '审批类型',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) =>{
                return  <a 
                            onClick={
                                async () => {
                                    await this.props.showDetails(record.name,record.key)
                                    this.props.router.push("/workflow/history/details")
                            }}
                        >
                            {record.name}
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
                                    await this.props.showDetails(record.name,record.key)
                                    this.props.router.push("/workflow/history/details")
                            }}
                        >
                            {text+"审批中"}
                        </a> 
            }
        },{
            title: '发起时间',
            dataIndex: 'creation_time',
            key: 'creation_time', 
        },{
            title:"操作",
            key:"action",
            render:(text, record) => {
                return (
                    <div>
                        {
                            this.props.history.withdrawLoading && this.props.history.withdrawID == record.key 
                            ? 
                            (<Spin />)
                            :
                            (<Popconfirm title="确定要撤回吗?" onConfirm={() => this.withdraw(record.key)}>
                                <a>撤回</a>
                            </Popconfirm>)
                        }
                    </div>
              )
        }}]

        const columns1 = [{
            title: '审批类型',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) =>{
                return  <a 
                            onClick={
                                async () => {
                                    await this.props.showDetails(record.name,record.key)
                                    this.props.router.push("/workflow/history/details")
                            }}
                        >
                            {record.name}
                        </a> 
            }
        },{
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
        }
        ]
        const columns2 = [{
            title: '审批类型',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) =>{
                return  <a 
                            onClick={
                                async () => {
                                    await this.props.showDetails(record.name,record.key)
                                    this.props.router.push("/workflow/history/details")
                            }}
                        >
                            {record.name}
                        </a> 
            }
        }, {
            title: '发起时间',
            dataIndex: 'creation_time',
            key: 'creation_time', 
        },{
            title: '完成时间',
            dataIndex: 'end_time',
            key: 'end_time',
        }
        ]
        const columns3 = [{
            title: '审批类型',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) =>{
                return  <a 
                            onClick={
                                async () => {
                                    await this.props.showDetails(record.name,record.key)
                                    this.props.router.push("/workflow/history/details")
                            }}
                        >
                            {record.name}
                        </a> 
            }
        },{
            title: '发起人',
            dataIndex: 'creator_user',
            key: 'creator_user',
        },{
            title: '发起时间',
            dataIndex: 'creation_time',
            key: 'creation_time',
        },{
            title: '撤回时间',
            dataIndex: 'end_time',
            key: 'end_time',
        }]
        if(key=='0')
        {
            return <Table 
                        columns={columns0} 
                        dataSource={this.props.history.dataSource} 
                        loading={this.props.history.getOwnWorkflowLoading}
                        pagination = {{"pageSize":20,'total':this.props.history.count,'current':this.props.history.current}}
                        onChange={this.handleTableChange} 
                    />
        }
        else if(key == '1')
        {
            return <Table 
                        columns={columns1} 
                        dataSource={this.props.history.dataSource}
                        loading={this.props.history.getOwnWorkflowLoading}
                        pagination = {{"pageSize":20,'total':this.props.history.count,'current':this.props.history.current}}
                        onChange={this.handleTableChange} 
                    />
        }
        else if(key =='2')
        {
            return <Table 
                        columns={columns2} 
                        dataSource={this.props.history.dataSource}
                        loading={this.props.history.getOwnWorkflowLoading}
                        pagination = {{"pageSize":20,'total':this.props.history.count,'current':this.props.history.current}}
                        onChange={this.handleTableChange} 
                    />
        }
        else if(key =='3')
        {   
            return  <Table
                        columns={columns3} 
                        dataSource={this.props.history.dataSource}
                        loading={this.props.history.getOwnWorkflowLoading}
                        pagination = {{"pageSize":20,'total':this.props.history.count,'current':this.props.history.current}}
                        onChange={this.handleTableChange} 
                    />
        }
    }
    render()
    {

        return (
        <div>
            <Layout className="layout-main">
                <Row className="titleBox" >
                    <Col span={20}><div className="h1">我发起的</div></Col>
                </Row>
                <div className="table-container">
                        <Tabs defaultActiveKey="0" onChange={async (key)=>{
                            await this.setState({...this.state,key:key})
                            await this.props.getOwnWorkflow(key,1)
                        }}>
                            <TabPane tab="审批中" key="0">{this.formatTable("0")}</TabPane>
                            <TabPane tab="已完成" key="1">{this.formatTable("1")}</TabPane>
                            <TabPane tab="已拒绝" key="2">{this.formatTable("2")}</TabPane>
                            <TabPane tab="已撤回" key="3">{this.formatTable("3")}</TabPane>
                        </Tabs>
                </div>
            </Layout>
        </div>
        )
    }
}
const mapStateToProps = (state) => ({
    history: state.history
})
const mapDispatchToProps = {
    getOwnWorkflow,
    showDetails,
    withdraw
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryView)
