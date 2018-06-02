import './ProfileView.scss'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import {Pagination, Select, Table ,TreeSelect, Input} from 'antd'
import {
        getEmployeeStatus, 
        getEditEmployeeDetails, 
        getOneEmployeeDetails,
        togglePage 
} from '../actions/ProfileAction'
import {SERVER} from 'config'
import noimage from 'assets/no-user-image.jpg'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const Search = Input.Search
const Option = Select.Option
class ProfileTableView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            'value': '',
            dataSource: [],
            selectedRowKeys: [],
        }    
    }
    static propTypes =
    {
    	getEditEmployeeDetails: React.PropTypes.func.isRequired,
    	getEmployeeStatusData: React.PropTypes.array,
        getOneEmployeeDetails: React.PropTypes.func,
        getEmployeeStatus: React.PropTypes.func,
        togglePage: React.PropTypes.func,
    }
    edit(userId){
        this.props.togglePage(2)
        this.props.getEditEmployeeDetails(userId)
    }
    getEmployeeDetails(pages,userId)
    {
        this.props.router.push("/profile/details")
        this.props.getOneEmployeeDetails(userId)
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        this.props.getEmployeeStatus(this.props.data.condition,pager.current)
    }
    render()
    { 
        const { selectedRowKeys } = this.state
        const rowSelection = {
          selectedRowKeys,
        }
        const columns = [
        {
            title: "头像",
            key: 'head',
            render: (text, record) => {
                if(record.id)
                {
                  return <img style={{maxWidth:"64px",maxHeight:"64px",border:"1px solid #ccc",borderRadius:"10px" }} src={SERVER+"organization/file/download/"+record.id}/>
                }
                else
                {
                  return <img style={{maxWidth:"64px",maxHeight:"64px",border:"1px solid #ccc",borderRadius:"10px" }} src={noimage}/>
                }
            },
        },
        {
            title: '工号／姓名／职位／部门',
            key: 'name_department_position',
            render: (text, record) => {
                return (
                    <span>
                        <span>
                           {record.employeeNumber} 
                        </span>
                        <br />
                        <span>
                            <a 
                                onClick = { async ()=>{ await this.getEmployeeDetails("employeeDetailsPage",record.user_id )}}
                            >
                                {record.name}
                            </a>  / {record.position}
                        </span>
                        <br />
                        <span>{record.department}</span>
                    </span>
                )
            },
        }, 
        {
            title: '员工状态',
            dataIndex: 'employeeStatus',
            key: 'employeeStatus',
        },{
            title: '员工类型',
            dataIndex: 'employeeType',
            key: 'employeeType',
        },{
            title: '入职日期',
            dataIndex: 'entryDate',
            key: 'entryDate',
        },{
            title: '转正日期',
            dataIndex: 'regularizationdate',
            key: 'regularizationdate',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render:(text, record)=>{
            return (
                <a
                    onClick = {
                        async ()=>{
                            await this.edit(record.user_id)
                            this.props.router.push("/profile/stepfirst")
                        }
                    }
                >
                    编辑
                </a>
            )
          }
        }]
        return(
            <Table 
                pagination = {{"pageSize":40,"total":this.props.data.total,"current":this.props.data.current}}
                scroll={{x:0,y:0}}  
                style={{marginTop:20}} 
                columns={columns} 
                dataSource={this.props.data.getEmployeeStatusData}
                onChange={this.handleTableChange} 
                loading= {this.props.data.getEmployeeStatusLoading}
            /> 
        )
    }
}
const mapStateToProps = (state) => ({
    data:state.profile
})
const mapDispatchToProps = {
    getEditEmployeeDetails,
    getOneEmployeeDetails,
    getEmployeeStatus,
    togglePage,
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileTableView)
