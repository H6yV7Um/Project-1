import {connect} from 'react-redux' 
import React, {Component, PropTypes} from 'react'
import {Spin, message, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,InputNumber,Layout,Steps } from 'antd'
import {getEntryUpdate,getEntrySave, changeRemunerationData, getEmployeeStatus} from '../actions/ProfileAction'
const FormItem = Form.Item
const Option = Select.Option

const Step = Steps.Step
const steps = [
    {
        title: '基本信息',
    }, 
    {
        title: '薪酬信息',
    }
]
class ProfileAddStepSecondView extends React.Component {
    static propTypes =
    {
        getProfileTaxes: React.PropTypes.func,
        getSocialSecurity: React.PropTypes.func,
        getSalary: React.PropTypes.func,
        getFund: React.PropTypes.func,
        changeRemunerationData: React.PropTypes.func,
        getEntrySave: React.PropTypes.func,
        getEntryUpdate: React.PropTypes.func,
        getEmployeeStatus: React.PropTypes.func,
        currentStep: React.PropTypes.number,
    }
    handleSubmit =  (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                if(this.props.data.displayAllFields)
                {
                    await this.props.getEntryUpdate(
                                        this.props.data.user_id,
                                        this.props.data.memberData,
                                        this.props.data.remuneration.insurance, 
                                        this.props.data.remuneration.taxes, 
                                        this.props.data.remuneration.fund, 
                                        this.props.data.remuneration.salary, 
                                        this.props.data.remuneration.salaries
                    )
                }
                else
                {
                    await this.props.getEntrySave(
                                        this.props.data.memberData,
                                        this.props.data.remuneration.insurance, 
                                        this.props.data.remuneration.taxes, 
                                        this.props.data.remuneration.fund, 
                                        this.props.data.remuneration.salary, 
                                        this.props.data.remuneration.salaries
                    )
                }
            }
        })
    }
    componentWillMount() {
        if(!this.props.data.fieldsGroup.length)
        {
             this.props.router.push("/profile")
        }
    }
    componentWillReceiveProps(nextProps) {
        
        if(nextProps.data.saveSuccessData && !nextProps.data.getEmployeeStatusLoading && nextProps.data.updateProfile)
        {
            message.success('添加成功！',1, async ()=>{
                await this.props.getEmployeeStatus({},1)
                this.props.router.push("/profile")
            })
                
        }
        else if(nextProps.data.updateSuccessData && !nextProps.data.getEmployeeStatusLoading && nextProps.data.updateProfile)
        {
            message.success('更新成功！',1, async ()=>{
                await this.props.getEmployeeStatus(this.props.data.condition,this.props.data.current)
                this.props.router.push("/profile")
            })
        }
    }
    render() {
        const { getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }
        const isTrainee = (salaryData,loading)=>{
            if(loading)
            {
                return (
                    <div className="example">
                        <Spin />
                   </div>)
            }
            else
            {
                let current =[]
                for(let i=0; i < salaryData.length; i++)
                {
                    
                    current.push(
                                <FormItem
                                        {...formItemLayout}
                                        key={"salary_"+i}
                                        label= {salaryData[i].name}
                                        className="customFieldProfile"
                                        style={{paddingBottom:"20px",marginBottom: "0"}} 
                                >
                                    {getFieldDecorator('salery_'+i, {
                                        rules: [{
                                          required: true, message: "请输入" + salaryData[i].name,
                                        }],
                                        initialValue: this.props.data.remuneration.salaries[i].value
                                    })(
                                        <InputNumber 
                                                min={1} 
                                                max={1000000} 
                                                formatter={value =>`￥ ${value}`}  
                                                onChange={(value)=>
                                                {
                                                    let remuneration = {...this.props.data.remuneration}
                                                    remuneration.salaries[i].value = value
                                                    this.props.changeRemunerationData(remuneration)
                                                }}
                                                style={{ width: '60%' }}
                                        />
                                    )}
                                </FormItem> 
                            )
                }
                return current
            }
        }
        const taxesOptions = (data)=>{
         
            let options = []
            for(let val of data)
            {
                options.push(<Option key={val._id.$oid}>{val.name}</Option>)
            }
            return options
        }
        const socialSecurityOptions = (data,loading) =>{
            let options = []
            for(let val of data)
            {
                options.push(<Option key={val._id.$oid}>{val.name}</Option>)
            }
            return options
        }
        const salaryOptions = (data,loading) =>{
            let options = []
            for(let val of data)
            {
                options.push(<Option key={val._id.$oid}>{val.name}</Option>)
            }
            return options
        }
        const fundOptions = (data,loading) =>{
            let options = []
            for(let val of data)
            {
                options.push(<Option key={val._id.$oid}>{val.name}</Option>)
            }
            return options
        }
        return (
                <div>
                    <Layout className="layout-main">
                        <Row className="titleBox">
                            <Col span={20}>
                                {this.props.data.currentPage  == "edit" ? (<div className="h1">编辑员工档案</div>) : (<div className="h1">添加员工</div>)}
                            </Col>
                            <Col span={4} className="extra">
                                <Button 
                                    onClick = {()=>{this.props.router.push("/profile")}} 
                                    type="primary" >返回
                                </Button>
                            </Col>
                        </Row>
                        <div className="table-container" >
                            <Steps current={1}>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>
                        {/*这部分*/}
                            <div style={{marginTop:"20px"}}>

                                <div style={{paddingBottom:'20px', background:'#fff',marginTop:8}}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row  className="groupTitle">
                                            <Col span={21}>
                                            <div className="h1" style={{cursor:"move"}}>
                                                <Icon type="bars" style={{fontSize:'16px'}} /> 薪酬方案
                                            </div>  
                                            </Col>
                                        </Row>

                                        <FormItem
                                                {...formItemLayout}
                                                label="社保方案"
                                                hasFeedback
                                                className="customFieldProfile"
                                                style={{paddingBottom:"20px",marginBottom: "0"}} 
                                        >
                                            {
                                                this.props.data.getSocialSecurityLoading?(<Spin />):
                                                getFieldDecorator('insurance', 
                                                {
                                                    initialValue: this.props.data.remuneration.insurance
                                                })
                                                (
                                                    <Select
                                                        style={{ width: '60%' }}
                                                        allowClear={true}
                                                        onChange={(value)=>
                                                        {
                                                            let remuneration = {...this.props.data.remuneration}
                                                            remuneration.insurance = value
                                                            this.props.changeRemunerationData(remuneration)
                                                           
                                                        }}
                                                    >
                                                        {socialSecurityOptions(this.props.data.getSocialSecurityData)}
                                                    </Select>
                                                )
                                                
                                            }
                                        </FormItem>

                                        <FormItem
                                                {...formItemLayout}
                                                label="公积金方案"
                                                hasFeedback
                                                className="customFieldProfile"
                                                style={{paddingBottom:"20px",marginBottom: "0"}}
                                        >
                                            {
                                                this.props.data.getSocialSecurityLoading?(<Spin />):getFieldDecorator('fund', {
                                                initialValue: this.props.data.remuneration.fund
                                            })(

                                                <Select  
                                                    style={{ width: '60%'}}
                                                    allowClear={true} 
                                                    onChange={(value)=>
                                                    {
                                                        let remuneration = {...this.props.data.remuneration}
                                                        remuneration.fund = value
                                                        this.props.changeRemunerationData(remuneration)
                                                    }}
                                                >
                                                    {fundOptions(this.props.data.getFundData)}
                                                </Select>
                                           )}
                                        </FormItem>

                                        <FormItem
                                                {...formItemLayout}
                                                label="计税方案"
                                                hasFeedback
                                                className="customFieldProfile"
                                                style={{paddingBottom:"20px",marginBottom: "0"}}
                                        >
                                            {this.props.data.getProfileTaxesLoading?(<Spin />):getFieldDecorator('taxes', {
                                                rules: [{
                                                  required: true, message: '请选择计税方案',
                                                }],
                                                initialValue: this.props.data.remuneration.taxes
                                            })(  
                                                <Select  
                                                        style={{ width: '60%' }} 
                                                        onChange={(value)=>
                                                        {
                                                            let remuneration = {...this.props.data.remuneration}
                                                            remuneration.taxes = value
                                                            this.props.changeRemunerationData(remuneration)
                                                        }}>
                                                        {taxesOptions(this.props.data.getProfileTaxesData)}
                                                </Select>
                                          )}
                                        </FormItem>

                                        <FormItem
                                                {...formItemLayout}
                                                label="薪资方案"
                                                hasFeedback
                                                className="customFieldProfile"
                                                style={{paddingBottom:"20px",marginBottom: "0"}}

                                        >
                                            {this.props.data.getSalaryLoading?(<Spin />):getFieldDecorator('salary', {
                                                rules: [{
                                                  required: true, message: '请选择薪资方案',
                                                }],
                                                initialValue: this.props.data.remuneration.salary,
                                            })(
                                            (<Select  style={{ width: '60%' }} onChange={(value)=>
                                                {
                                                    let remuneration = {...this.props.data.remuneration}
                                                    remuneration.salary = value
                                                    remuneration.salaries = []
                                                    for(let salary of this.props.data.getSalaryData)
                                                    {
                                                        if(salary._id.$oid == value)
                                                        {
                                                            for(let item of salary.salaries)
                                                            {
                                                                remuneration.salaries.push({"salary_id":item._id, "value":0,"name":item.name})
                                                            }
                                                            break
                                                        }
                                                    }
                                                    this.props.changeRemunerationData(remuneration)
                                                }}>
                                                {salaryOptions(this.props.data.getSalaryData)}
                                            </Select>)
                                            
                                          )}
                                        </FormItem>
                                        <Row  className="groupTitle">
                                            <Col span={21}>
                                            <div className="h1" style={{cursor:"move"}}>
                                                <Icon type="bars" style={{fontSize:'16px'}} /> 薪酬基本信息
                                            </div>  
                                            </Col>
                                        </Row>                  
                                        {isTrainee(this.props.data.remuneration.salaries,this.props.data.getSalaryLoading)}
                                        
                                            
                                            <Button 
                                                
                                                htmlType="submit"
                                                loading= {this.props.data.getEntrySaveLoading || this.props.data.getEntryUpdateLoading}     
                                            >
                                                提交
                                            </Button>
                                            <Button style={{ marginLeft: 8 }}  type="primary" onClick={() => {this.props.router.push("/profile/stepfirst")}}>
                                                上一步
                                            </Button>
                                    </Form>
                                </div>
                                
                            </div>
                        </div>
                    </Layout>  
                </div>
        )
    }
}
const mapStateToProps = (state) => ({
    data:state.profile
})
const mapDispatchToProps = {
    changeRemunerationData,
    getEntrySave,
    getEntryUpdate,
    getEmployeeStatus
}
ProfileAddStepSecondView = Form.create()(ProfileAddStepSecondView)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileAddStepSecondView)



