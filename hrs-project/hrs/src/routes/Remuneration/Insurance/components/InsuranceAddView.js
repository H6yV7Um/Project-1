import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Form, Icon, Input, Button ,Row,Col,Layout,InputNumber,Table} from 'antd'
import "./InsuranceStyle.scss"
const FormItem = Form.Item
class InsuranceAddView extends Component {
    static propTypes =
    {
       loading: React.PropTypes.bool,
    }
    constructor(props)
    {
        super(props)
        this.state ={}
    }
    componentWillMount(){
        this.setState(...this.state,this.props.data)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.save(
                    this.state._id,
                    this.state.name,
                    this.state.pension,
                    this.state.medical,
                    this.state.serious_illness,
                    this.state.unemployment,
                    this.state.occupational_injury,
                    this.state.birth,
                )
            }
        })
    }
    render()
    { 
        const columns = [
        {
            title: '缴纳科目',
            dataIndex: 'subject',
            width: 150,
        }, 
        {
            title: '基数下限',
            dataIndex: 'base_down',
            width: 150,
            render: (text, record) => (
                <FormItem style={{margin:'0'}}>
                    {
                        getFieldDecorator(record.key+'base_down', 
                        {
                            initialValue: this.state[record.key].base_down,
                        })
                        (
                        <InputNumber   size="small" min={1} step={0.01} max={100000}
                            onChange={(e)=>
                            {
                                let result = {...this.state[record.key]}
                                result.base_down = e
                                this.setState({[record.key]: {...this.state[record.key],...result}})
                            }}
                        />
                    )}
                </FormItem>
              ),
        }, 
        {
            title: '基数上限',
            dataIndex: 'base_top',
            width: 150,
            render: (text, record) => (
                <FormItem style={{margin:'0'}}>
                    {
                        getFieldDecorator(record.key + 'base_top', 
                        {
                            initialValue: this.state[record.key].base_top,
                        })
                        (    
                            <InputNumber   size="small" min={1} step={0.01} max={100000}
                            onChange={(e)=>
                            {
                                let result = {...this.state[record.key]}
                                result.base_top = e
                                this.setState({[record.key]: {...this.state[record.key],...result}})
                            }}
                        />

                        )}
                </FormItem>
              ),
        }, 
        {
            title: '公司比例',
            dataIndex: 'company_ratio',
            width:150,
            render:(text,record) =>(
                <FormItem style={{margin:'0'}}>
                {
                    getFieldDecorator(record.key+'company_ratio', 
                    {
                        initialValue: this.state[record.key].company_ratio,
                    })
                    (
                        <InputNumber size="small"  min={0.01} max={100} step={0.01} formatter={value =>`${value} %`}
                            onChange={(e)=>
                            {
                               let result = {...this.state[record.key]}
                                result.company_ratio = e
                                this.setState({[record.key]: {...this.state[record.key],...result}})
                            }}
                        />
                    )}    
                </FormItem>
            )
        },
        {
            title: '个人比例',
            dataIndex: 'personal_ratio',
            width:150,
            render:(text,record) =>(
                <FormItem style={{margin:'0'}}>
                    {
                        getFieldDecorator(record.key + "personal_ratio", 
                        {
                            initialValue:  this.state[record.key].personal_ratio,
                        })
                        (
                         <InputNumber  size="small" min={0.01} max={100} step={0.01} formatter={value =>`${value} %`}
                            onChange={(e)=>
                            {
                               let result = {...this.state[record.key]}
                                result.personal_ratio = e
                                this.setState({[record.key]: {...this.state[record.key],...result}})
                            }}
                        /> 
                    )}
                </FormItem>
            )
        }
        ]
        const data = [{
          key: 'pension',
          subject: '养老',
         
        }, {
          key: 'medical',
          subject: '医疗',
          
        },{
          key: 'serious_illness',
          subject: '大病医疗保',
          
        },{
          key: 'unemployment',
          subject: '失业',
          
        },{
          key: 'occupational_injury',
          subject: '工伤',
          
        },{
          key: 'birth',
          subject: '生育',
          
        }]
        const { getFieldDecorator} = this.props.form
        const { form } = this.props
        return (
            <Layout className="layout-main">
                <Row className="titleBox" >
                    <Col span={20}><div className="h1">新增社保方案</div></Col>
                    <Col className="extra" span={4}><Button type="primary" icon="rollback"  onClick={()=>{
                                this.props.switchStatus("list")
                            }}>返回</Button></Col>
                </Row>
                <div className="table-container">
                    <Form onSubmit = {(e)=>{this.handleSubmit(e)}} >
                        <Row type="flex" justify="center" style={{marginBottom:"20px"}} >
                            <Col>
                                <div className="h1">
                                    <FormItem>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入方案名称!' }],
                                            initialValue: this.state.name,

                                        })(
                                            <Input className="name-input" placeholder="请输入方案名称" size="large" onChange={(e)=>
                                            {
                                                this.setState({...this.state, name: e.target.value})
                                                return e
                                            }}/>
                                        )}
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                        <Table dataSource={data} columns={columns}  pagination={false} />
                        <div style={{marginTop:10}}>
                            <Button loading={this.props.saveLoading} type="primary" htmlType="submit" size="large" >提交</Button>
                            <Button style={{marginLeft:8}} size="large" onClick={()=>{this.props.switchStatus("list")}}>返回</Button>
                        </div>
                    </Form>
                </div>
            </Layout>   
        )
    }
}
InsuranceAddView = Form.create()(InsuranceAddView)
export default InsuranceAddView

