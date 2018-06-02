import './ProfileView.scss'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import DepartmentSelect from 'components/DepartmentSelect'
import {AutoComplete, Select, Button, Icon, Row ,Col, TreeSelect, Input} from 'antd'
import {searchUser, getListName, getEmployeeStatus} from '../actions/ProfileAction'
import noimage from 'assets/no-user-image.jpg'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const Search = Input.Search
const Option = Select.Option
class ProfileHeadView extends Component {
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
       searchUser: React.PropTypes.func,
       getListName: React.PropTypes.func,
       getEmployeeStatus: React.PropTypes.func,
       searchData: React.PropTypes.array,
       getListNameData: React.PropTypes.array,
       fieldsGroup: React.PropTypes.array,
    }
    getEmployeeType(data,key)
    {
        let current = []
        for(let val of data)
        {
            for(let field of val.fields)
            { 
                if(field.namespace == key)
                {
                    
                    for(let option of field.options)
                    {
                        current.push(<Option key={option}>{option}</Option>)
                    }
                    return current
                }
            }
        }  
    }
    handleChange(value){
            if(value == undefined)
            {
                value = ''
            }
            this.props.getListName(value)
            let searchData ={...this.props.data.searchData}
            searchData["name"] = value
            this.props.searchUser(searchData)
    }
    render()
    { 
        return(
                <Row justify="start">
                    <Col className="gutter-row" span={3} >
                    <AutoComplete
                                dataSource={this.props.data.getListNameData}
                                style={{ width: 110}}
                                allowClear={true}
                                onChange={(value)=>this.handleChange(value)}
                                placeholder="输入姓名查询"
                                value={this.props.data.searchData.name?this.props.data.searchData.name:undefined}
                    />
                    </Col>
                    <Col className="gutter-row" span={4} style={{marginLeft:11  }}>
                        <DepartmentSelect
                                         width={"154px"}
                                         maxHeight={'100px'}
                                         multiple={true}
                                         treeCheckStrictly={true}
                                         onChange={(e)=>{
                                            if(e == undefined)
                                            {
                                                e = ''
                                            }
                                            let searchData ={...this.props.data.searchData}
                                            searchData["department"] = e
                                            this.props.searchUser(searchData)
                                         }}
                                         value={this.props.data.searchData.department?this.props.data.searchData.department:undefined}

                                         multiple={true}
                        />                          
                    </Col>
                    <Col className="gutter-row" span={2} style={{marginLeft:16}}>
	                    <Select 
	                            allowClear={true}
	                            placeholder="员工状态"
	                            style={{ width: 80 }}
	                            value={this.props.data.searchData.status?this.props.data.searchData.status:undefined}
	                            onChange={(e)=>{
	                                if(e == undefined)
	                                {
	                                    e = ''
	                                }
	                                let searchData ={...this.props.data.searchData}
	                                searchData["status"] = e
	                                this.props.searchUser(searchData)
	                            }}
	                    >
	                        <Option value="passed">通过面试</Option>
	                        <Option value="admitted">在职</Option>
	                        <Option value="dimission" >离职</Option>
	                    </Select>
                    </Col>
                    <Col className="gutter-row" span={2} style={{marginLeft:16}}>
                        <Select 
                            allowClear={true} 
                            placeholder="员工类型"  
                            style={{ width: 80 }}
                            value={this.props.data.searchData.type?this.props.data.searchData.type:undefined}   
                            onChange={(e)=>{
                                if(e == undefined)
                                {
                                    e = ''
                                }
                                let searchData ={...this.props.data.searchData}
                                searchData["type"] = e
                                this.props.searchUser(searchData)

                            }}>
                            {this.getEmployeeType(this.props.data.fieldsGroup,"type")}
                        </Select>
                    </Col>
                    <Col className="gutter-row" span={2} style={{marginLeft:16}}>
                        <Select 
                            allowClear={true} 
                            placeholder="是否转正"  
                            style={{ width: 80 }}
                            value={this.props.data.searchData.regularizationdate?this.props.data.searchData.regularizationdate:undefined}   
                            onChange={(e)=>{
                                if(e == undefined)
                                {
                                    e = ''
                                }
                                let searchData ={...this.props.data.searchData}
                                searchData["regularizationdate"] = e
                                this.props.searchUser(searchData)
                            }}
                        >
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                        </Select>
                    </Col>
                    <Col className="gutter-row" span={2} style={{marginLeft:16}}>
                        <Select 
                            allowClear={true} 
                            placeholder="选择职类"  
                            style={{ width: 80 }} 
                            value={this.props.data.searchData.jobcategory?this.props.data.searchData.jobcategory:undefined}   
                            onChange={(e)=>{
                                if(e == undefined)
                                {
                                    e = ''
                                }
                                let searchData ={...this.props.data.searchData}
                                searchData["jobcategory"] = e
                                this.props.searchUser(searchData)
                            }}
                        >
                            {this.getEmployeeType(this.props.data.fieldsGroup,"jobcategory")}
                        </Select>
                    </Col>
                    <Col className="gutter-row" span={2} style={{marginLeft:16}}>
                        <Select 
                            allowClear={true} 
                            placeholder="职位级别"  
                            style={{ width: 80 }} 
                            value={this.props.data.searchData.position_level?this.props.data.searchData.position_level:undefined}   
                            onChange={(e)=>{
                                if(e == undefined)
                                {
                                    e = ''
                                }
                                let searchData ={...this.props.data.searchData}
                                searchData["position_level"] = e
                                this.props.searchUser(searchData)
                            }}>
                                {this.getEmployeeType(this.props.data.fieldsGroup,"position_level")}
                        </Select>
                    </Col>
                    <Col className="gutter-row" span={2} style={{marginLeft:16}}>
                        <Select 
                            allowClear={true} 
                            placeholder="薪资级别"  
                            style={{ width: 80 }}
                            value={this.props.data.searchData.salary_level?this.props.data.searchData.salary_level:undefined}  
                            onChange={(e)=>{
                                if(e == undefined)
                                {
                                    e = ''
                                }
                                let searchData ={...this.props.data.searchData}
                                searchData["salary_level"] = e
                                this.props.searchUser(searchData)
                            }}
                        >
                            {this.getEmployeeType(this.props.data.fieldsGroup,"salary_level")}
                        </Select>
                    </Col>
                    <Col className="gutter-row" span={1} push={1}>
                        <Button shape="circle" onClick={()=>{this.props.getEmployeeStatus(this.props.data.searchData,1)}}  icon="search" />
                    </Col>
                </Row>
        )
    } 
}
const mapStateToProps = (state) => ({
    data:state.profile
})
const mapDispatchToProps = {
    getEmployeeStatus,
    getListName,
    searchUser,
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeadView)
