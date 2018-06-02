import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import Fields from 'components/Fields'
import {existsCustomField,changeMemberData,changeFileData,togglePage} from '../actions/ProfileAction'
import { Spin ,Input, Icon,  Row, Col, DatePicker,Upload, Steps ,Form, Button,Select,Layout} from 'antd'
import {SERVER} from 'config'
const Step = Steps.Step
const steps = [
    {
        title: '基本信息',
    }, 
    {
        title: '薪酬信息',
    }
]
class ProfileAddStepFirstView extends React.Component {
    static propTypes =
    {  
        currentStep: React.PropTypes.number,
        changeMemberData:  React.PropTypes.func,
        existsCustomField: React.PropTypes.func,
        data: React.PropTypes.object,
        currentPage: React.PropTypes.string,
        togglePage: React.PropTypes.func,
        changeFileData:  React.PropTypes.func,
        fileOfMemberData: React.PropTypes.object,
        fieldsGroup: React.PropTypes.array,
        displayAllFields: React.PropTypes.number,
        memberData: React.PropTypes.object,
    }
    constructor(props)
    {
        super(props)
    }
    componentWillMount() {
        if(!this.props.data.fieldsGroup.length)
        {
             this.props.router.push("/profile")
        }
    }
    buttonBar()
    {
        return(<div>
            {
               
                <Button type="primary" htmlType="submit" >下一步</Button>
            }
        </div>)
    }
   
    submitAction()
    {
        this.props.router.push( "/profile/stepsecond")
    }
    render() {
        const data = this.props.data.fieldsGroup
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
        return (
            <div>
                <Layout className="layout-main">
                    <Row className="titleBox">
                        <Col span={20}>
                            {this.props.data.displayAllFields ? (<div className="h1">编辑员工档案</div>) : (<div className="h1">添加员工</div>)}
                        </Col>
                        <Col span={4} className="extra">
                            <Button 
                                onClick = {()=>{this.props.router.push("/profile")}} 
                                type="primary" >返回
                            </Button>
                        </Col>
                    </Row>
                    <div className="table-container" >
                        <Steps current= {0}>
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div style={{marginTop:"20px"}}>
                            <div style={{paddingBottom:'20px', background:'#fff',marginTop:8}}>
                                    <Fields 
                                            changeMemberData = {this.props.changeMemberData}
                                            changeFileData = {this.props.changeFileData}
                                            fieldsGroup = {this.props.data.fieldsGroup}
                                            existsCustomField = {this.props.existsCustomField} 
                                            displayAllFields = {this.props.data.displayAllFields}
                                            buttonBar = {this.buttonBar}
                                            submitAction = {()=>this.submitAction()}
                                            memberData = {this.props.data.memberData}
                                            fileOfMemberData = {this.props.data.fileOfmemberData}
                                    />
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
    changeMemberData,
    existsCustomField,
    changeFileData,
    togglePage,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAddStepFirstView)

















