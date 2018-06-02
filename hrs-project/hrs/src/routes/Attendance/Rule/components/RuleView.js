import moment from 'moment'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Popconfirm, Tabs} from 'antd'
import { Link } from 'react-router'
import {switchStatus, switchTabStatus, getList, getListOthers, remove, setCurrentRecord, setCurrentOtherRecord} from '../actions/RuleAction'

const TabPane = Tabs.TabPane;
class RuleView extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            removingID:'',
            currentRecord:{},
            tabState:1
        }
    }
    static propTypes =
    {
      switchStatus: React.PropTypes.func.isRequired,
      getList: React.PropTypes.func.isRequired,
      getListOthers: React.PropTypes.func.isRequired,
      RuleStore: React.PropTypes.object.isRequired,
      setCurrentRecord: React.PropTypes.func.isRequired,
      setCurrentOtherRecord: React.PropTypes.func.isRequired,
      switchTabStatus: React.PropTypes.func.isRequired
    }
    componentWillMount()
    {
        this.props.getList()
        this.props.getListOthers()
    }
    componentWillReceiveProps(nextProps)
    {
    }
    onDelete(_id)
    {
        this.setState({...this.state, removingID:_id})
        this.props.remove(_id)
    }
    onEdit(record)
    {
        this.props.setCurrentRecord(record)
        this.props.switchStatus('edit')
        this.props.router.push('/attendance/rule/leaveadd')
    }
    onOtherEdit(record)
    {
        this.props.setCurrentOtherRecord(record)
        this.props.switchStatus('otherEdit')
        this.props.router.push('/attendance/rule/add')

    }
    render()
    {
        const columns = [
            {
                title: '项目',
                dataIndex: 'name',
                width: 200,
            },
            {
                title: '扣除类型',
                dataIndex: 'deduct_type',
                width: 200,
                render:(text, record, index)=>{
                    return (
                        text=='fixed'?'固定金额':'工资比例'
                    )
                }
            },
            {
                title: '扣除费用',
                dataIndex: 'fee',
                width: 200,
                render:(text, record, index)=>{
                    
                    return (
                        
                        record.deduct_type=='fixed'?"￥"+text:text+'%'
                    )
                }
            },
            {
                title: '是否扣除补贴',
                dataIndex: 'deduct_subsidy',
                width: 200,
                render:(text, record, index)=>{
                    return (
                        text?'是':'否'
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) =>{
                    return (
                        <div>
                            {
                                this.props.RuleStore.removeLoading && record._id.$oid==this.state.removingID ?
                                (<Spin />):
                                (<Popconfirm title="确定要删除请假规则吗?" onConfirm={() => this.onDelete(record._id.$oid)}>
                                    <a>删除</a>
                                </Popconfirm>)
                            }
                            &nbsp;
                            <a onClick={() => this.onEdit(record)}>编辑</a>
                        </div>
                    )
                }
            }]
        const otherscolumns = [
            {
                title: '类别',
                dataIndex: 'type',
                width: 800,
                render: (text, record, index) =>{
                    switch(text)
                    {
                        case "late":
                            return("迟到、早退")
                        case "absenteeism":
                            return ("旷工")
                        case "annualvacation":
                            return ("年假")
                        case "businesstrip":
                            return ("出差")
                        case "daysoff":
                            return ("调休")
                        case "overtime":
                            return ("加班")
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) =>{
                    return (
                        <div>
                            <a onClick={() => this.onOtherEdit(record)}>编辑</a>
                        </div>
                    )
                }
            }]
        const addLeaveButton=(
            this.props.RuleStore.tabState=="1"?<Button type="primary" icon="plus"  onClick={()=>{
                                                            this.props.switchStatus("add")
                                                            this.props.router.push('/attendance/rule/leaveadd')
                                                        }}>新增请假规则</Button>
            :null
        )
        return (
            <div>
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}><div className="h1">考勤规则管理</div></Col>
                        <Col span={4} className="extra">
                        </Col>
                    </Row>
                    <div className="table-container">
                    <Tabs activeKey={this.props.RuleStore.tabState.toString()} tabBarExtraContent={addLeaveButton} onChange={(e)=>{
                        this.props.switchTabStatus(e)
                        return e
                    }}>
                        <TabPane tab="请假规则管理" key="1">
                            <Table
                            columns={columns}
                            loading={this.props.RuleStore.getListLoading}
                            dataSource={this.props.RuleStore.data}
                            pagination={false}
                            rowKey={(e)=>{
                                return e._id.$oid
                            }} />
                        </TabPane>
                        <TabPane tab="其他考勤规则管理" key="2">
                            <Table
                            columns={otherscolumns}
                            loading={this.props.RuleStore.getListOthersLoading}
                            dataSource={this.props.RuleStore.others}
                            pagination={false}
                            rowKey={(e)=>{
                                return e._id.$oid
                            }} />
                        </TabPane>
                    </Tabs>
                    
                    </div>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  RuleStore: state.rule
})

const mapDispatchToProps = {
  switchStatus, switchTabStatus, getList, getListOthers, remove, setCurrentRecord, setCurrentOtherRecord
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleView)
