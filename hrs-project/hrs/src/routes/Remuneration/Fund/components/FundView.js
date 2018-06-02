import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Popconfirm} from 'antd'
import { Link } from 'react-router'
import {switchStatus, getList, remove, setCurrentRecord} from '../actions/FundAction'
class FundView extends Component {

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
      fundStore: React.PropTypes.object.isRequired,
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
        this.props.router.push('/remuneration/fund/add')
    }
    render()
    {
        const columns = [
            {
                title: '方案名称',
                dataIndex: 'name',
                width: 800,
            }, 
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) =>{
                    return (
                        <div>
                            {
                                this.props.fundStore.removeLoading && record._id.$oid==this.state.removingID ?
                                (<Spin />):
                                (<Popconfirm title="确定要删除公积金方案吗?" onConfirm={() => this.onDelete(record._id.$oid)}>
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
                        <Col span={20}><div className="h1">公积金方案</div></Col>
                        <Col span={4} className="extra"><Button type="primary" icon="plus"  onClick={()=>{
                            this.props.switchStatus("add")
                            this.props.router.push('/remuneration/fund/add')
                        }}>新增方案</Button></Col>
                    </Row>
                    <div className="table-container">
                    <Table
                            columns={columns}
                            loading={this.props.fundStore.getListLoading}
                            dataSource={this.props.fundStore.data}
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
  fundStore: state.fund
})

const mapDispatchToProps = {
  switchStatus, getList, remove, setCurrentRecord
}

export default connect(mapStateToProps, mapDispatchToProps)(FundView)
