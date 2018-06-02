import {connect} from 'react-redux' 
import React, {Component, PropTypes} from 'react'
import {Spin, message, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,InputNumber,Layout,Steps } from 'antd'
import {changeRemunerationData} from '../actions/MyprofileAction'
const FormItem = Form.Item
const Option = Select.Option
class Remuneration extends React.Component {
    static propTypes =
    {
        changeRemunerationData: React.PropTypes.func,
        getProfileTaxes: React.PropTypes.func,
        getSocialSecurity: React.PropTypes.func,
        getSalary: React.PropTypes.func,
        getFund: React.PropTypes.func,
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            }
        }
        const isTrainee = (salaryData,loading)=>{
            if(loading)
            {
                return (
                    <div className="example">
                        <Spin />
                    </div>
                )
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
                            <InputNumber 
                                    value={this.props.data.remuneration.salaries[i].value}
                            		disabled
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
                            this.props.data.getSocialSecurityLoading
                            ?
                            <Spin />
                            :
                            <Select
                            	disabled
                                style={{ width: '60%' }}
                                allowClear={true}
                                value={this.props.data.remuneration.insurance}
                            >
                                {socialSecurityOptions(this.props.data.getSocialSecurityData)}
                            </Select>
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
                            this.props.data.getSocialSecurityLoading
                            ?
                            (<Spin />)
                            :
                            <Select 
                            	disabled 
                                style={{ width: '60%'}}
                                allowClear={true} 
                                value={this.props.data.remuneration.fund}
                            >
                                {fundOptions(this.props.data.getFundData)}
                            </Select>
                        }
                    </FormItem>
                    <FormItem
                            {...formItemLayout}
                            label="计税方案"
                            hasFeedback
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}}
                    >
                        {
                            this.props.data.getProfileTaxesLoading
                            ?
                            (<Spin />)
                            : 
                            <Select 
                                value={this.props.data.remuneration.taxes}
                        		disabled 
                                style={{ width: '60%' }} 
                            >
                                {taxesOptions(this.props.data.getProfileTaxesData)}
                            </Select>
                        }
                    </FormItem>
                    <FormItem
                            {...formItemLayout}
                            label="薪资方案"
                            hasFeedback
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}}
                    >
                        {
                            this.props.data.getSalaryLoading
                            ?
                            (<Spin />)
                            :
                            <Select 
                                disabled  
                                style={{ width: '60%' }} 
                                onChange={(value)=>
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
                                }}
                                value={this.props.data.remuneration.salary}
                            >
                                {salaryOptions(this.props.data.getSalaryData)}
                            </Select>
                        }
                    </FormItem>
                    <Row  className="groupTitle">
                        <Col span={21}>
	                        <div className="h1" style={{cursor:"move"}}>
	                            <Icon type="bars" style={{fontSize:'16px'}} /> 薪酬基本信息
	                        </div>  
                        </Col>
                    </Row>                  
                    {isTrainee(this.props.data.remuneration.salaries,this.props.data.getSalaryLoading)}
                </div>
        )
    }
}
const mapStateToProps = (state) => ({
   	data:state.myprofile,
})
const mapDispatchToProps = {
    changeRemunerationData,
}
export default connect(mapStateToProps, mapDispatchToProps)(Remuneration)



