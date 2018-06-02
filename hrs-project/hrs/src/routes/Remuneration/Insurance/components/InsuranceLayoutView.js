import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table,Layout,Spin,TreeSelect} from 'antd'
import { Link } from 'react-router'
import {switchStatus,listInsurance,save,remove,editInsurance,setErrorList} from '../actions/InsuranceAction'
import InsuranceAddView  from './InsuranceAddView'
import InsuranceView from './InsuranceView'
class InsuranceLayoutView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            "_id":"",
            "name":"",
            "pension":{
                "base_down":11,
                "base_top":11,
                "company_ratio":11,
                "personal_ratio":11  
            },
            "medical":{
                "base_down":11,
                "base_top":11,
                "company_ratio":11,
                "personal_ratio":11  
            },
            "serious_illness":{
                "base_down":11,
                "base_top":11,
                "company_ratio":11,
                "personal_ratio":11  
            },
            "unemployment":{
                "base_down":11,
                "base_top":11,
                "company_ratio":11,
                "personal_ratio":11  
            },
            "occupational_injury":{
                "base_down":11,
                "base_top":11,
                "company_ratio":11,
                "personal_ratio":11  
            },
            "birth":{
                "base_down":11,
                "base_top":11,
                "company_ratio":11,
                "personal_ratio":11  
            }
        }
    }
    static propTypes =
    {
        switchStatus: React.PropTypes.func.isRequired,
        insurances: React.PropTypes.object.isRequired,
        listInsurance: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        remove: React.PropTypes.func.isRequired,
        editInsurance: React.PropTypes.func.isRequired,
        setErrorList: React.PropTypes.func.isRequired,
        listLoading: React.PropTypes.bool,
        removeLoading: React.PropTypes.bool,
        data: React.PropTypes.object,
        listInsuranceData: React.PropTypes.object,
    }
    componentWillReceiveProps(nextProps)
    {
        if(this.props.insurances.list_insurance_error == '' &&  nextProps.insurances.list_insurance_error!= '')
        { 
            this.errorNoticeFirst(nextProps.insurances.list_insurance_error)
        }
    }
    errorNoticeFirst(message)
    {
        message.error(message, 3, () => {
            this.props.setErrorList('')
        })
    }
    render()
    {
        if(this.props.insurances.pageState =='list')
        { 
            return (
                <InsuranceView listLoading = {this.props.insurances.list_insurance_loading} oneditInsurance = {this.props.editInsurance} removeLoading = {this.props.insurances.removeLoading} remove ={this.props.remove}  listInsuranceData = {this.props.insurances.list_insurance} listInsurance = {this.props.listInsurance} switchStatus={this.props.switchStatus}/>
            )
        }
        else
        {
            if(this.props.insurances.pageState == "edit")
            {
                return(<InsuranceAddView  data = {this.props.insurances.currentRecord} saveLoading = {this.props.insurances.save_insurance_loading} save = {this.props.save} switchStatus={this.props.switchStatus}/>)
            }
            else
            {
                return(
                    <InsuranceAddView data = {this.state} saveLoading = {this.props.insurances.save_insurance_loading} save = {this.props.save} switchStatus={this.props.switchStatus}/>
                )
            }
        }
    }
}
const mapStateToProps = (state) => ({
  insurances: state.insurance
})
const mapDispatchToProps = {
    switchStatus,
    listInsurance,
    save,
    remove,
    editInsurance,
    setErrorList 
}
export default connect(mapStateToProps, mapDispatchToProps)(InsuranceLayoutView)
