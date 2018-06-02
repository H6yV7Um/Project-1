import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import Fields from 'components/Fields'
import {
    existsCustomField,
    changeMemberData,
    changeFileData,
    saveCompleted,
    getFieldsGroup, 
    getMyprofile, 
    formatUser,
} from '../actions/CompleteAction'
import { Spin ,Input, Icon,  Row, Col, DatePicker,Upload,Form, Button,Select,Layout} from 'antd'
import {SERVER} from 'config'
const FormItem = Form.Item
class MyprofileView extends React.Component {
    static propTypes =
    {  
        changeMemberData:  React.PropTypes.func,
        existsCustomField: React.PropTypes.func,
        data: React.PropTypes.object,
        changeFileData:  React.PropTypes.func,
        fileOfMemberData: React.PropTypes.object,
        fieldsGroup: React.PropTypes.array,
        displayAllFields: React.PropTypes.number,
        memberData: React.PropTypes.object,
        saveCompleted: React.PropTypes.func.isRequired,
        getFieldsGroup: React.PropTypes.func.isRequired,
        formatUser: React.PropTypes.func,
    }
    constructor(props)
    {
        super(props)
        this.state={
            id:''
        }
    }
    async componentWillMount() {
        await this.props.getFieldsGroup()
    }
    async componentWillReceiveProps(nextProps) {
        if(nextProps.coreLayout.user.hasOwnProperty("selfie") && !this.state.id)
        {
            await this.setState({...this.state,id:nextProps.coreLayout.user._id.$oid})
            await this.props.formatUser({...this.props.coreLayout.user})
        }
    }
    buttonBar =() =>
    {
        return <div>
            <Button loading = {this.props.data.saveCompletedLoading} type="primary"  htmlType="submit" >提交</Button>
        </div>
    }
    submitAction()
    {
        this.props.saveCompleted(this.props.data.memberData)
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
        const loadingToggle = ()=>{
            if( 
                this.props.data.getEmployeesLoading||
                this.props.data.fieldsGroupLoading
            )
            {
                return(
                    <div className="example">
                        <Spin />
                    </div>
                )
            }
            else
            {
                return(
                    <Fields 
                            changeMemberData = {this.props.changeMemberData}
                            changeFileData = {this.props.changeFileData}
                            fieldsGroup = {this.props.data.fieldsGroup}
                            existsCustomField = {this.props.existsCustomField}
                            displayAllFields = {1}
                            buttonBar = {()=>this.buttonBar()}
                            submitAction = {()=>this.submitAction()}
                            memberData = {this.props.data.memberData}
                            fileOfMemberData = {this.props.data.fileOfmemberData}
                    />
                )
            }
        }
        return (
            <div>
                <Layout className="layout-main">
                    <Row className="titleBox">
                        <Col span={20}>
                            <div className="h1">我的档案</div>
                        </Col>
                    </Row>
                    <div className="table-container" >
                        <div style={{marginTop:"20px"}}>
                            <div style={{paddingBottom:'20px', background:'#fff',marginTop:8}}>
                                    
                                    {loadingToggle()}
                            </div>
                        </div>
                    </div>
                </Layout>  
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    data:state.complete,
    coreLayout: state.coreLayout
})
const mapDispatchToProps = {
    changeMemberData,
    existsCustomField,
    changeFileData,
    saveCompleted,
    getFieldsGroup,
    getMyprofile,
    formatUser
}
export default connect(mapStateToProps, mapDispatchToProps)(MyprofileView)

















