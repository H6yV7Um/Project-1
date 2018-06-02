import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Popconfirm} from 'antd'
import { Link } from 'react-router'
import {switchStatus, getList, remove, setCurrentRecord} from '../actions/TaxesAction'

class TaxesView extends Component {

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
      TaxesStore: React.PropTypes.object.isRequired,
      setCurrentRecord: React.PropTypes.func.isRequired,
    }
    componentWillMount()
    {
        this.props.getList()
    }
    componentWillReceiveProps(nextProps)
    {}
    onDelete(_id)
    {
        this.setState({...this.state, removingID:_id})
        this.props.remove(_id)
    }
    onEdit(record)
    {
        this.props.setCurrentRecord(record)
        this.props.switchStatus('edit')
        this.props.router.push('/remuneration/taxes/add')
    }
    render()
    {
        const columns = [
            {
                title: '方案名称',
                dataIndex: 'name',
                width: 200,
            }, 
            {
                title: '起征点（元）',
                dataIndex: 'threshold',
                width: 600,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) =>{
                    return (
                        <div>
                            {
                                this.props.TaxesStore.removeLoading && record._id.$oid==this.state.removingID ?
                                (<Spin />):
                                (<Popconfirm title="确定要删除计税方案吗?" onConfirm={() => this.onDelete(record._id.$oid)}>
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
                        <Col span={20}><div className="h1">个税方案</div></Col>
                        <Col span={4} className="extra"><Button type="primary" icon="plus"  onClick={()=>{
                            this.props.switchStatus("add")
                            this.props.router.push('/remuneration/taxes/add')
                        }}>新增方案</Button></Col>
                    </Row>
                    <div className="table-container">
                    <Table
                            columns={columns}
                            loading={this.props.TaxesStore.getListLoading}
                            dataSource={this.props.TaxesStore.data}
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
  TaxesStore: state.taxes
})

const mapDispatchToProps = {
  switchStatus, getList, remove, setCurrentRecord
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxesView)
