import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Popconfirm, Input, Select} from 'antd'
import { Link } from 'react-router'
import {getSolution,onEdit,clear,remove} from '../actions/SolutionAction'
const Option = Select.Option
class SolutionView extends Component {
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
      getSolution: React.PropTypes.func.isRequired,
      solutionStore: React.PropTypes.object.isRequired,
      onEdit: React.PropTypes.func.isRequired,
      clear: React.PropTypes.func.isRequired,
      remove: React.PropTypes.func.isRequired, 
    }
    async componentWillMount()
    {
        await this.props.getSolution()
    }
    async remove(id){
        await this.setState({...this.state,removingID:id})
        let code  = await this.props.remove(id)
        if(code == 1)
        {
            message.success('删除成功')
        }
    }
    onEdit(id)
    {
        this.props.onEdit(id)
        this.props.router.push('/workflow/solution/add')
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
                                this.props.solutionStore.removeLoading && this.state.removingID  == record.key ?
                                (<Spin />):
                                (<Popconfirm title="确定要删除审批方案吗?" onConfirm={() => this.remove(record.key)}>
                                    <a>删除</a>
                                </Popconfirm>)
                            }
                            &nbsp;
                            <a onClick={() => this.onEdit(record.key)}>编辑</a> 
                        </div>
                    )
                }
            }]
          return (
              <div >
                  <Layout className="layout-main">
                      <Row className="titleBox" >
                          <Col span={20}><div className="h1">审批方案</div></Col>
                          <Col span={4} className="extra"><Button type="primary" icon="plus"  onClick={()=>{
                                this.props.router.push('/workflow/solution/add')
                                this.props.clear()
                            }}>新增方案</Button></Col>
                      </Row>
                      <div className="table-container">
                        <Table
                                columns={columns}
                                loading={this.props.solutionStore.getSolutionLoading}
                                dataSource={this.props.solutionStore.dataSource}
                                pagination={false}
                        />
                      </div>
                  </Layout>
              </div>
          )
    }
}
const mapStateToProps = (state) => ({
  solutionStore: state.solution
})
const mapDispatchToProps = {
  getSolution,
  onEdit,
  clear,
  remove
}
export default connect(mapStateToProps, mapDispatchToProps)(SolutionView)
