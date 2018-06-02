import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Form, Icon, Input, Button ,Row,Col,Layout,InputNumber,Table,Popconfirm,Spin} from 'antd'
const FormItem = Form.Item
class InsuranceView extends Component {
    static propTypes ={}
    constructor(props)
    {
        super(props)
        this.state = {
            removingID:'',
        }
    }
    componentWillMount(){
        this.props.listInsurance()
    }
    onDelete(_id)
    {
        this.setState({...this.state, removingID:_id})
        this.props.remove(_id)
    }
    onEdit(record)
    {
        this.setState({...this.state, currentRecord:record})
        this.props.switchStatus('edit')
    }
    render()
    { 
	    const columns = [{
			  title: '方案名称',
			  dataIndex: 'name',
			  key: 'name',
			 
			}, {
			  title: '操作',
			  key: 'action',
			  width: 80,
			  render: (text, record, index) =>{
                        return (
                            <div>
                                {
                                    this.props.removeLoading && record.key == this.state.removingID ?
                                    (<Spin />):
                                    (<Popconfirm title="确定要删除计税方案吗?" onConfirm={() => this.onDelete(record.key)}>
                                        <a>删除</a>
                                    </Popconfirm>)
                                }
                                &nbsp;
                                <a onClick={() => this.props.oneditInsurance(record.key)}>编辑</a>
                            </div>
                        )
            }
		}]
        const format = (data)=>{
            let current = []
            for(let key of data)
            {
                current.push({
                    key:key._id.$oid,
                    name:key.name
                })
            }
            return current
        }
    	return (
    		<div >
                  <Layout className="layout-main">
                      <Row className="titleBox" >
                          <Col span={20}><div className="h1">社保方案</div></Col>
                          <Col span={4} className="extra"><Button type="primary" icon="plus"  onClick={()=>{
                                this.props.switchStatus("add")
                            }}>添加方案</Button></Col>
                      </Row>
                      <div className="table-container">
                         <Table loading = {this.props.listLoading} pagination = {false} columns={columns} dataSource={format(this.props.listInsuranceData)} />
                      </div>
                  </Layout>
              </div>
    	)
    }
}
export default InsuranceView
