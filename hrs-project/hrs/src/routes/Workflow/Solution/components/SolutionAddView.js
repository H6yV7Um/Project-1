import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Form, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Input, InputNumber, Radio, Switch, Select,Steps } from 'antd'
import { Link } from 'react-router'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import {onEdit, onChange, saveName,onDelete,onChangeCopyto, saveRemark, onChangeRemark} from '../actions/SolutionAction'
import FieldsDesigner from 'components/FieldsDesigner'
import  './SolutionStyle.scss'
import MembersSelect from 'components/MembersSelect'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const Step = Steps.Step
class SolutionAddView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            formItemLayout:
            {
                labelCol: 
                {
                    sm: { span: 2 }
                },
                wrapperCol: 
                {
                    sm: { span: 12 }
                }
            },
            formItemLayoutWithOutLabel: 
            {
                wrapperCol: 
                {
                    sm: { span: 12, offset: 2 }
                }
            }
        }
    }
    static propTypes =
    {
        solutionStore: React.PropTypes.object,
        onEdit: React.PropTypes.func,
        fields: React.PropTypes.array,
        saveName: React.PropTypes.func,
        name: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onChangeCopyto: React.PropTypes.func,
        pageState: React.PropTypes.string,
        remark: React.PropTypes.array,
        saveRemark: React.PropTypes.func, 
        onChangeRemark: React.PropTypes.func, 
    }
    componentWillMount() {
        if(!this.props.solutionStore.fields.length && this.props.solutionStore.pageState == "edit")
        {
            this.props.router.push('/workflow/solution/')
            return 
        } 
    }
    onChange(fields)
    {
        this.props.onChange(fields)
    }
    onChangeCopyto(value,name){
        this.props.onChangeCopyto(value)
    }
    onChangeRemark(value){
        this.props.onChangeRemark(value)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.saveName(values.name)
                this.props.saveRemark(values.remark)
                this.props.router.push('/workflow/solution/flowdesign')
            }
        })
    }
    render()
    {
        const { getFieldDecorator } = this.props.form
        let field = []
        const steps = [
            {
                title: '表单设计',
                content: 'First-content',
            },
            {
                title: '流程设计',
                content: 'Second-content',
            }
        ]
        const formItemLayout =
        {
            labelCol: 
            {
                sm: { span: 4 }
            },
            wrapperCol: 
            {
                sm: { span: 17 }
            },
        }
        return (
            <div>
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}>
                            {!this.props.solutionStore.EDITID?(<div className="h1"> </div>):(<div className="h1">编辑审批方案</div>)}
                        </Col>
                        <Col span={4} className="extra">
                            <Button
                                   type="primary"
                                   icon="rollback"
                                   onClick={()=>{this.props.router.push('/workflow/solution')}}>
                                   返回
                            </Button>
                        </Col>
                    </Row>
                    <div className="table-container">
                        <Steps current={0}>
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>

                        <Row className="groupTitle" style={{marginTop:"20px"}}>
                            <Col span={21}>
                                <div className="h1" style={{cursor:"move"}}>
                                    <Icon type="bars" style={{fontSize:'16px'}} /> 基本信息
                                </div>  
                            </Col>
                        </Row>
                        <Form  onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="名称"
                                className="customFieldProfile"
                                style={{paddingBottom:"20px",marginBottom: "0",paddingLeft:"4px"}}
                            >
                                {getFieldDecorator("name", {
                                    rules: [{ required: true, message: '请输入方案名称!' }],
                                    initialValue: this.props.solutionStore.name
                                })(
                                    <Input
                                        style={{width:"265px"}}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="抄送人" 
                                
                                className="customFieldProfile"
                                style={{paddingBottom:"20px",marginBottom: "0",paddingLeft:"5px"}}
                            >
                                {getFieldDecorator('copyto', {
                                    initialValue: this.props.solutionStore.copyto,
                                })(
                                    <MembersSelect 
                                        width={'42%'}
                                        disabled={false}
                                        multiple={true}
                                        onChange={
                                            (value,name)=>this.onChangeCopyto(value,name)
                                        }
                                    />
                                )}              
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="备注" 
                                
                                className="customFieldProfile"
                                style={{paddingBottom:"20px",marginBottom: "0",paddingLeft:"5px"}}
                            >
                                {getFieldDecorator('remark', {
                                    initialValue: this.props.solutionStore.remark,
                                })(
                                    <Input
                                        type={'textarea'}
                                        rows={10}
                                        style={{width:"265px"}}
                                        onChange={
                                            (value)=>this.onChangeRemark(value)
                                        }
                                    />
                                )}              
                            </FormItem>
                            <FieldsDesigner
                                onChange={(fields)=>this.onChange(fields)}
                                onDelete={(namespace,deletedOption)=>{this.props.onDelete(namespace,deletedOption)}}
                                value={this.props.solutionStore.fields} 
                            />
                            <FormItem>
                                {this.props.solutionStore.fields.length>=1 ? <Button type="primary" htmlType="submit">下一步</Button> :''}
                            </FormItem>
                        </Form>
                    </div>
                </Layout>
            </div>
        )
    }
}
SolutionAddView = Form.create()(SolutionAddView)
const mapStateToProps = (state) => ({
    solutionStore: state.solution
})
const mapDispatchToProps = {
    onEdit,
    onChange,
    saveName,
    onDelete,
    onChangeCopyto,
    saveRemark,
    onChangeRemark
}
export default connect(mapStateToProps, mapDispatchToProps)(SolutionAddView)