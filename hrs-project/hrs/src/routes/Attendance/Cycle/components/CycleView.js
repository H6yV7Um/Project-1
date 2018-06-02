import moment from 'moment'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Popconfirm} from 'antd'
import { Link } from 'react-router'
import {switchStatus, save, getList, remove, setCurrentRecord} from '../actions/CycleAction'

class CycleView extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            removingID:'',
            currentRecord:{}
        }
    }
    static propTypes =
    {
      switchStatus: React.PropTypes.func.isRequired,
      getList: React.PropTypes.func.isRequired,
      CycleStore: React.PropTypes.object.isRequired,
      setCurrentRecord: React.PropTypes.func.isRequired
    }
    componentWillMount()
    {
        this.props.getList()
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
        this.props.router.push('/attendance/cycle/add')
    }
    render()
    {
        const columns = [
            {
                title: '上班时间',
                dataIndex: 'start_time',
                width: 150,
            },
            {
                title: '下班时间',
                dataIndex: 'end_time',
                width: 150,
            },
            {
                title: '午休开始时间',
                dataIndex: 'lunch_start_time',
                width: 150,
            },
            {
                title: '午休结束时间',
                dataIndex: 'lunch_end_time',
                width: 150,
            },
            {
                title: '加班开始时间',
                dataIndex: 'overtime_start_time',
                width: 150,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) =>{
                    return (
                        <div>
                            {
                                this.props.CycleStore.removeLoading && record._id.$oid==this.state.removingID ?
                                (<Spin />):
                                (<Popconfirm title="确定要删除考勤周期吗?" onConfirm={() => this.onDelete(record._id.$oid)}>
                                    <a>删除</a>
                                </Popconfirm>)
                            }
                            &nbsp;
                            <a onClick={() => this.onEdit(record)}>编辑</a>
                        </div>
                    )
                }
            }];
        return (
            <div >
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}><div className="h1">考勤周期管理</div></Col>
                        <Col span={4} className="extra"><Button type="primary" icon="plus"  onClick={()=>{
                            this.props.switchStatus("add")
                            this.props.router.push('/attendance/cycle/add')
                            
                        }}>新增考勤周期</Button></Col>
                    </Row>
                    <div className="table-container">
                    <Table
                            columns={columns}
                            loading={this.props.CycleStore.getListLoading}
                            dataSource={this.props.CycleStore.data}
                            pagination={false}
                            rowKey={(e)=>{
                                return e._id.$oid
                            }} />
                    </div>
                </Layout>
            </div>
        )
    
    }
}

const mapStateToProps = (state) => ({
  CycleStore: state.cycle
})

const mapDispatchToProps = {
  switchStatus, getList, remove, setCurrentRecord
}

export default connect(mapStateToProps, mapDispatchToProps)(CycleView)
