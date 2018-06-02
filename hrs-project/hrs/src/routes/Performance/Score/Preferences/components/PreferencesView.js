import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import { Table, Layout, Button, Row, Col,message} from 'antd'
import ListView from './ListView'
import AddView from './AddView'
import {getList, getPerformanceList,save,setErrorGetlist,setErrorGetPerformancelist,setErrorSave,setErrorRemove,edit,remove,toggle} from '../actions/PreferencesAction'

class PreferencesView extends Component {
    constructor(props)
    {
        super(props)
    }

    static propTypes =
    {
        getList: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        getPerformanceList:  React.PropTypes.func.isRequired,
        setErrorGetlist:React.PropTypes.func.isRequired,
        setErrorGetPerformancelist:React.PropTypes.func.isRequired,
        setErrorSave:React.PropTypes.func.isRequired,
        setErrorRemove:React.PropTypes.func.isRequired,
        edit:React.PropTypes.func.isRequired,
        remove:React.PropTypes.func.isRequired,
        preferencesData: React.PropTypes.object.isRequired
    }

    componentWillMount()
    {
        this.props.getList()
        this.props.getPerformanceList()
    }
    componentDidMount()
    {}
    componentWillReceiveProps(nextProps)
    {  
        if(this.props.preferencesData.getPerformanceListError == '' &&  nextProps.preferencesData.getPerformanceListError!= '')
        { 
            this.errorNoticeThird(nextProps.preferencesData.getPerformanceListError)
        }
        if(this.props.preferencesData.saveError == '' && nextProps.preferencesData.saveError != '' )
        { 
            this.errorNoticeFirst(nextProps.preferencesData.saveError)
        } 
        if(this.props.preferencesData.getListError == '' && nextProps.preferencesData.getListError !='')  
        {
            this.errorNoticeSecond(nextProps.preferencesData.getListError)
        }
        if(this.props.preferencesData.getPerformanceRemoveError == '' && nextProps.preferencesData.getPerformanceRemoveError != '')
        {
            this.errorNoticeFourth(nextProps.preferencesData.getPerformanceRemoveError)
        }   
        if(this.props.preferencesData.saveLoading && !nextProps.preferencesData.saveLoading && !nextProps.preferencesData.saveError)
        {
            this.props.getPerformanceList()
            this.props.toggle('list')
        }
    }
    errorNoticeFirst(message)
    {
        message.error(message, 3, () => {
            this.props.setErrorGetlist('')
        })
    }
    errorNoticeSecond(message)
    {
        message.error(message, 3, () => {
            this.props.setErrorGetPerformancelist('')
        })
    }
    errorNoticeThird(message)
    {
        message.error(message, 3, () => {
            this.props.setErrorSave('')
        })
    }
    errorNoticeFourth(message)
    {   
        message.error(message, 1.5, () => {
            this.props.setErrorRemove('')
        })
    }
    getContainer()
    {   
        let eState = this.props.preferencesData.currentPage
        if(eState == 'list')
        {
            return (
                    <div>
                        <Row className="titleBox">
                            <Col span={20}><div className="h1">评分设置</div></Col>
                            <Col span={4} className="extra"><Button type="primary" icon="plus" onClick={(e) => this.props.toggle('add')}>新增评分设置</Button></Col>
                        </Row>
                        <div className="table-container">
                            <ListView removeLoadings={this.props.preferencesData.getPerformanceRemoveLoading} preferences = {this.props.preferencesData} remove = {this.props.remove} edit={this.props.edit} loading={this.props.preferencesData.getPerformanceListLoading} preferencesData={this.props.preferencesData.preferences}></ListView>
                        </div>
                    </div>
                    )
        }
        else if(eState == 'update'){
            return (
                <div>
                    <Row className="titleBox">
                        <Col span={20}><div className="h1">新增评分设置</div></Col>
                        <Col span={4} className="extra"><Button type="primary" icon="rollback" onClick={(e) => this.props.toggle('list')}>返回评分设置列表</Button></Col>
                    </Row>
                    <div className="table-container">
                        <AddView toggle={this.props.toggle} loading={this.props.preferencesData.addLoading} data={this.props.preferencesData} method="update" save={this.props.save}></AddView>
                    </div>
                </div>
                )
        }
        else
        {
            return (
                <div>
                    <Row className="titleBox">
                        <Col span={20}><div className="h1">新增评分设置</div></Col>
                        <Col span={4} className="extra"><Button type="primary" icon="rollback" onClick={(e) => this.props.toggle('list')}>返回评分设置列表</Button></Col>
                    </Row>
                    <div className="table-container">
                        <AddView toggle={this.props.toggle} loading={this.props.preferencesData.addLoading} data={this.props.preferencesData} method="add" save={this.props.save}></AddView>
                    </div>
                </div>
                )
        }
        
    }
    render()
    {
        if(this.props.preferencesData.listLoading)
        {
            return(
                <div className="TableLoading">
                    <Spin size="large"></Spin>
                </div>
            )
        }
        return (
            <Layout className="layout-main">
                {this.getContainer()}
            </Layout>
        )
    }
}
const mapStateToProps = (state) => ({
    preferencesData:state.preferences
})

const mapDispatchToProps = {
    save,
    getList,
    getPerformanceList,
    setErrorGetlist,
    setErrorGetPerformancelist,
    setErrorSave,
    setErrorRemove,
    edit,
    remove,
    toggle
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesView)
