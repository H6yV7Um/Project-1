import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Popconfirm, Input, Select} from 'antd'
import { Link } from 'react-router'
import {switchStatus, getList, remove, findSetting, updateSetting, setCurrentRecord} from '../actions/SalaryAction'
import SalaryAddView from './SalaryAddView'
const Option = Select.Option
class SalaryView extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            removingID:'',
            cycle: 31
        }
    }
    static propTypes =
    {
      switchStatus: React.PropTypes.func.isRequired,
      getList: React.PropTypes.func.isRequired,
      salariestore: React.PropTypes.object.isRequired,
      findSetting: React.PropTypes.func.isRequired,
      updateSetting: React.PropTypes.func.isRequired,
      setCurrentRecord: React.PropTypes.func.isRequired
    }
    componentWillMount()
    {
        this.props.getList()
        this.props.findSetting()
    }
    componentWillReceiveProps(nextProps)
    {
        if(this.props.salariestore.settingLoading && !nextProps.salariestore.settingLoading)
        {
            this.setState({...this.state, cycle: nextProps.salariestore.setting.cycle.toString()})
        }
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
        this.props.router.push('/remuneration/salary/add')
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
                                    this.props.salariestore.removeLoading && record._id.$oid==this.state.removingID ?
                                    (<Spin />):
                                    (<Popconfirm title="确定要删除薪资方案吗?" onConfirm={() => this.onDelete(record._id.$oid)}>
                                        <a>删除</a>
                                    </Popconfirm>)
                                }
                                &nbsp;
                                <a onClick={() => this.onEdit(record)}>编辑</a>
                            </div>
                        )
                    }
                }];
            let options = []

            for (let i=1;i<31;i++)
            {
                options.push(<Option key={i.toString()} value={i.toString()}>每月{i}日</Option>)
            }
                                    
          return (
              <div >
                  <Layout className="layout-main">
                      <Row className="titleBox" >
                          <Col span={20}><div className="h1">薪资设定</div></Col>
                          <Col span={4} className="extra"></Col>
                      </Row>
                      <div className="table-container">
                          {
                              this.props.salariestore.settingLoading?
                              (<Spin />):
                              (
                                <div>
                                    <Row>
                                        <Col span={2}>计薪日期：</Col>
                                        <Col span={12}>
                                            <Select
                                                   style={{width:'100%'}}
                                                   defaultValue={this.state.cycle.toString()}
                                                   onChange={(e)=>{
                                                    this.setState({...this.state, cycle: e})
                                                }}>
                                                <Option value={"31"} key={"31"}>每月的最后一天</Option>
                                                {options}
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:'20px'}}>
                                        <Col span={2}></Col>
                                        <Col span={12}>
                                            <Button
                                                   type="primary"
                                                   onClick={()=>this.props.updateSetting(this.state.cycle)}
                                                   loading={this.props.salariestore.settingUpdateLoading}>
                                                   保存
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                              )
                          }
                      </div>

                      <Row className="titleBox" >
                          <Col span={20}><div className="h1">薪资方案</div></Col>
                          <Col span={4} className="extra"><Button type="primary" icon="plus"  onClick={()=>{
                                this.props.switchStatus("add")
                                this.props.router.push('/remuneration/salary/add')
                            }}>新增方案</Button></Col>
                      </Row>
                      <div className="table-container">
                        <Table
                              columns={columns}
                              loading={this.props.salariestore.getListLoading}
                              dataSource={this.props.salariestore.data}
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
  salariestore: state.salary
})

const mapDispatchToProps = {
  switchStatus, getList, remove, findSetting, updateSetting, setCurrentRecord
}

export default connect(mapStateToProps, mapDispatchToProps)(SalaryView)
