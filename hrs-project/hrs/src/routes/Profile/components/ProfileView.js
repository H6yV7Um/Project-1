import './ProfileView.scss'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import ProfileEmployeeDetailsView from './ProfileEmployeeDetailsView'
import ProfileHeadView from './ProfileHeadView'
import ProfileTableView from './ProfileTableView'
import {Pagination, AutoComplete, Select, Menu, Dropdown, Button, Icon, message, Row, Col, Table, Layout, Spin, TreeSelect, Input} from 'antd'
import {
        getProfileTaxes, 
        getSocialSecurity, 
        getSalary, 
        getFund, 
        getEmployeeStatus, 
        emptyMemberData, 
        getFieldsGroup, 
        togglePage,
        getEmployees 
} from '../actions/ProfileAction'
import {SERVER} from 'config'
import noimage from 'assets/no-user-image.jpg'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const Search = Input.Search
const Option = Select.Option
class ProfileView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            'value': '',
            dataSource: [],
        }    
    }
    static propTypes =
    {
        getFieldsGroup: React.PropTypes.func.isRequired,
        emptyMemberData: React.PropTypes.func.isRequired,
        getEmployeeStatus: React.PropTypes.func.isRequired,
        getProfileTaxes: React.PropTypes.func.isRequired,
        getDepartmentLoading: React.PropTypes.bool,
        getEmployeesLoading: React.PropTypes.bool,
        getProfileTaxesLoading: React.PropTypes.bool,
        fieldsGroupLoading: React.PropTypes.bool, 
        getSocialSecurityLoading: React.PropTypes.bool, 
        getSalaryLoading: React.PropTypes.bool, 
        getFundLoading: React.PropTypes.bool,
        getEmployeeStatusLoading: React.PropTypes.bool,
        togglePage: React.PropTypes.func.isRequired,
        getEmployees: React.PropTypes.func.isRequired,
    }
    componentWillMount(){
        if(this.props.data.fieldsGroup.length)
        {
            return
        }
        this.props.getEmployeeStatus(this.props.data.condition,1)
        this.props.getProfileTaxes()
        this.props.getSocialSecurity()
        this.props.getSalary()
        this.props.getFund()
        this.props.getFieldsGroup()
        this.props.getEmployees()
    }
    render()
    { 
        const loadingToggle = ()=>{
            if( 
                this.props.data.getEmployeesLoading||
                this.props.data.getProfileTaxesLoading||
                this.props.data.fieldsGroupLoading||
                this.props.data.getSocialSecurityLoading||
                this.props.data.getSalaryLoading|| 
                this.props.data.getFundLoading
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
                    <div className="table-container">
                        <ProfileHeadView />
                        <ProfileTableView  router = {this.props.router} />
                    </div>
                )
            }
        }
        return (
            <div>
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}><div className="h1">档案管理</div></Col>
                        <Col span={4} className="extra">
                            <Button 
                                onClick = {
                                    ()=>{
                                        this.props.togglePage(0)
                                        this.props.router.push("/profile/stepfirst")
                                        this.props.emptyMemberData() 
                                    }
                                } 
                                type="primary" >添加员工
                            </Button>
                        </Col>
                    </Row>
                    {loadingToggle()}
                </Layout>  
            </div>
          )
    } 
}
const mapStateToProps = (state) => ({
    data:state.profile
})
const mapDispatchToProps = {
    getFieldsGroup,
    emptyMemberData,
    getEmployeeStatus,
    getProfileTaxes,
    getSocialSecurity,
    getSalary,
    getFund,
    togglePage,
    getEmployees
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)
