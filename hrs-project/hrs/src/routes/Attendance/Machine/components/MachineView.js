import moment from 'moment'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Popconfirm} from 'antd'
import { Link } from 'react-router'
import {switchStatus, getList, remove, setCurrentRecord} from '../actions/MachineAction'
import MachineAddView from './MachineAddView'
class MachineView extends Component {

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
      MachineStore: React.PropTypes.object.isRequired,
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
        this.props.router.push('/attendance/machine/add')
    }
    render()
    {
    
        const columns = [
            {
                title: '机器编号',
                dataIndex: 'serial_number',
                width: 100,
            },
            {
                title: 'IP地址',
                dataIndex: 'ip_address',
                width: 200,
            },
            {
                title: '机器位置',
                dataIndex: 'location',
                width: 300,
            },
            {
                title: '最后同步时间',
                dataIndex: 'updatetime.$date',
                width: 200,
                render: (text, record, index) =>{
                    return moment(text).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) =>{
                    return (
                        <div>
                            {
                                this.props.MachineStore.removeLoading && record._id.$oid==this.state.removingID ?
                                (<Spin />):
                                (<Popconfirm title="确定要删除考勤机吗?" onConfirm={() => this.onDelete(record._id.$oid)}>
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
                        <Col span={20}><div className="h1">考勤机管理</div></Col>
                        <Col span={4} className="extra"><Button type="primary" icon="plus"  onClick={()=>{
                            this.props.switchStatus("add")
                            this.props.router.push('/attendance/machine/add')
                        }}>新增考勤机</Button></Col>
                    </Row>
                    <div className="table-container">
                    <Table
                            columns={columns}
                            loading={this.props.MachineStore.getListLoading}
                            dataSource={this.props.MachineStore.data}
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
  MachineStore: state.machine
})

const mapDispatchToProps = {
  switchStatus, getList, remove, setCurrentRecord
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineView)
