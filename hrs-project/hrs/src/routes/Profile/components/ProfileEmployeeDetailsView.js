import React, {Component, PropTypes} from 'react'
import { Row ,Col, Button, Layout, Icon, Spin ,Form, Upload,Modal} from 'antd'
import {togglePage} from '../actions/ProfileAction'
import {connect} from 'react-redux'
import {SERVER} from 'config'
const FormItem = Form.Item
class ProfileEmployeeDetailsView extends React.Component {
    state = {
        visible: false,
        className:''
    }
    showModal = (e) => {
        this.setState({
          className: e.target.className
        });
    }
    formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
    }
    static propTypes =
    {
        togglePage:React.PropTypes.func,
        getOneEmployeeDetailsData:React.PropTypes.array,
        fieldsGroup:React.PropTypes.array,
        getSalaryData:React.PropTypes.array,
        getSocialSecurityData:React.PropTypes.array,
        getFundData:React.PropTypes.array,
        getProfileTaxesData:React.PropTypes.array,
        employees:React.PropTypes.array,
        salaries:React.PropTypes.array,
    }
    connectGroupEmployeeDetails(
                                fieldsGroup,
                                getEmployeeDetailsData,
                                getSocialSecurityData,
                                getFundData,
                                getProfileTaxesData,
                                getSalaryData,
                                employees,
                                salaries
    )
    {
        let current = []    
        for(let val of fieldsGroup)
        {
            current.push(
                <Row key={val._id.$oid}  className="groupTitle" style={{marginTop:"20px"}}>
                        <Col span={21}>
                            <div className="h1" style={{cursor:"move"}}>
                                <Icon type="bars" style={{fontSize:'16px'}} /> {val.name}
                            </div>  
                        </Col>
                </Row>
            )
            for(let field of val.fields)
            {
                if(field.type == "input" || field.type == "select" || field.type == "date")
                {
                    current.push(
                        <FormItem
                            {...this.formItemLayout}
                            label={field.name}
                            key = {field.namespace} 
                            className="customFieldProfile"
                            style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  
    
                        >
                            {getEmployeeDetailsData[field.namespace]}
                        </FormItem>
                    )
                }
                else if(field.type == "file")
                {
                    const { previewVisible, previewImage } = this.state
                    if(field.filetype == "picture")
                    {
                        let fileList = []
                        const handleCancel = () => {
                            this.setState({
                              "className": '',
                            })
                        }
                        for(let val of getEmployeeDetailsData[field.namespace])
                        {
                            let url = SERVER+"organization/file/download/"+val._id.$oid
                            fileList.push(
                                <div key = {val._id.$oid}>
                                    <img 
                                        style={{border:"1px solid #ccc",borderRadius:"10px",width:"100px",height:"100px" }} 
                                        className={val._id.$oid}  
                                        src={url} 
                                        onClick={this.showModal} 
                                    />
                                    <Modal 
                                        visible={this.state.className == val._id.$oid ? true :this.state.visible}
                                        width={430}
                                        onCancel={handleCancel}
                                        footer={null}
                                    >
                                        <img style={{width:"400px",height:"400px"}} src = {url} />
                                    </Modal>
                                </div>
                            )
                        }
                        current.push(
                            <FormItem
                                {...this.formItemLayout}
                                label={field.name}
                                key = {field.namespace} 
                                className="customFieldProfile"
                                style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}   
                            >
                               {fileList}
                            </FormItem>
                        )
                    }
                    else
                    {
                        let fileList = []
                        for(let val of getEmployeeDetailsData[field.namespace])
                        {
                            let url = SERVER+"organization/file/download/"+val._id_$oid
                            fileList.push(<a key = {val._id.$oid} href={url}>  {val.filename} </a>)
                        }
                        current.push(
                                <FormItem
                                    {...this.formItemLayout}
                                    label={field.name}
                                    key = {field.name} 
                                    className="customFieldProfile"
                                    style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  
                                >
                                    {fileList}
                                </FormItem>
                            )
                    }
                }
                else if(field.type == "department")
                {
                    let department = ''
                    for(let val of getEmployeeDetailsData[field.namespace])
                    {
                        department += val.label + ' '
                    }
                    current.push(
                        <FormItem
                            {...this.formItemLayout}
                            label={field.name}
                            key = {field.name}
                            className="customFieldProfile"
                            style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  
                        >
                           {department}
                        </FormItem>
                    )
                }
                else if(field.type == "member")
                {   
                    let workreport = ''
                    for(let val of getEmployeeDetailsData[field.namespace])
                    {
                        for(let employee  of employees)
                        {
                            if(val == employee._id.$oid)
                            {
                                workreport += employee.name + ' '
                            }
                        }
                    }
                    current.push(
                        <FormItem
                            {...this.formItemLayout}
                            label={field.name}
                            key = {field.name}
                            className="customFieldProfile"
                            style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  
                        >
                           { workreport}
                        </FormItem>
                    )
                }
            }
        }
        current.push(
            <Row key="1"  className="groupTitle" style={{marginTop:"20px"}}>
                <Col span={21}>
                    <div className="h1" style={{cursor:"move"}}>
                        <Icon type="bars" style={{fontSize:'16px'}} /> 薪酬方案
                    </div>  
                </Col>
            </Row>
        )
        for(let securityData of getSocialSecurityData)
        {
            if(securityData._id.$oid == getEmployeeDetailsData["insurance"].$oid)
            {
                current.push(
                    <FormItem
                            {...this.formItemLayout}
                            label="社保方案"
                            key = {getEmployeeDetailsData["insurance"].$oid} 
                            className="customFieldProfile"
                            style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0",}}  
         
                    >
                        {securityData.name}
                    </FormItem>
                )
            }
        }
        for(let val of getFundData)
        {
            if(val._id.$oid == getEmployeeDetailsData.fund.$oid )
            {
                current.push(
                    <FormItem
                            {...this.formItemLayout}
                            label="公积金方案"
                            key = {getEmployeeDetailsData["fund"].$oid} 
                            className="customFieldProfile"
                            style={{paddingBottom:"10px",paddingTop:"10px",marginBottom: "0"}}  
                    >
                        {val.name}           
                    </FormItem>
                )
            }
        }
        for(let val of getProfileTaxesData)
        {
            if(val._id.$oid == getEmployeeDetailsData["taxes"].$oid)
            current.push(
                <FormItem
                        {...this.formItemLayout}
                        label="计税方案"
                        key = {getEmployeeDetailsData["taxes"].$oid} 
                        className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}}         
                >
                    {val.name}        
                </FormItem>
            )
        }
        for(let val of getSalaryData)
        {
            if(val._id.$oid == getEmployeeDetailsData["salary"].$oid)
            {
                current.push(
                    <FormItem
                            {...this.formItemLayout}
                            label="薪资方案"
                            key = {getEmployeeDetailsData["salary"].$oid} 
                            className="customFieldProfile"
                            style={{paddingBottom:"20px",marginBottom: "0"}}         
                    >
                        {val.name}
                    </FormItem>
                )
            }
        }
        current.push(
            <Row key="2"  className="groupTitle" style={{marginTop:"20px"}}>
                <Col span={21}>
                    <div className="h1" style={{cursor:"move"}}>
                        <Icon type="bars" style={{fontSize:'16px'}} /> 薪酬基本信息
                    </div>  
                </Col>
            </Row>  
        )
        for(let salary of getEmployeeDetailsData.salaries)
        {
            current.push(
                <FormItem
                        {...this.formItemLayout}
                        label={salary.name}
                        key = {salary.salary_id.$oid} 
                        className="customFieldProfile"
                        style={{paddingBottom:"20px",marginBottom: "0"}}         
                >
                    {salary.value}
                </FormItem>
            )
        }
        return current 
    }
    render() {
            return (
                <div>
                    <Layout className="layout-main">
                        <Row className="titleBox" >
                            <Col span={20}><div className="h1">员工基本信息</div></Col>
                            <Col span={4} className="extra"><Button onClick = {()=>{this.props.router.push("/profile")}}  type="primary" >返回</Button></Col>
                        </Row>
                        <div className="table-container">
                            <Form>
                                {this.connectGroupEmployeeDetails(
                                    this.props.data.fieldsGroup,
                                    this.props.data.getOneEmployeeDetailsData,
                                    this.props.data.getSocialSecurityData,
                                    this.props.data.getFundData,
                                    this.props.data.getProfileTaxesData,
                                    this.props.data.getSalaryData,
                                    this.props.data.employees,
                                    this.props.data.remuneration.salaries
                                )}
                            </Form>
                        </div>
                        <Row className="titleBox" >
                            <Col span={24} className="extra">
                                <Button onClick = {()=>{this.props.router.push("/profile")}} type="primary" >返回</Button>
                            </Col>
                        </Row>
                    </Layout>  
                </div>
            )
    }
}
const mapStateToProps = (state) => ({
    data:state.profile
})
const mapDispatchToProps = {
    togglePage,
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEmployeeDetailsView)

