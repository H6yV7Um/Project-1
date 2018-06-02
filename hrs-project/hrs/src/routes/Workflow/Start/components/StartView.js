import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Layout,Row,Col,Button } from 'antd'
import { Link } from 'react-router'
import {getSolution,getOneSolution} from '../actions/StartAction'
import './StartViewStyle.scss'
class StartView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
        }
    }
    static propTypes =
    {
        getSolution: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.array,
        getOneSolution: React.PropTypes.func
    }
    componentWillMount()
    {
        this.props.getSolution()
    }
    formatMoudle(){
        let dataSource = [...this.props.start.dataSource]
        let moudle = []
        for(let val of dataSource)
        {
            moudle.push(<a id={val.key} className="start-style" key={val.key}>{val.name}</a>)
        }
        return moudle
    }
    async startApproval(id)
    {
        await this.props.getOneSolution(id)
        this.props.router.push('/workflow/start/startapproval')
    }
    render()
    {
        return (
            <div >
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}><div className="h1">发起审批</div></Col>
                    </Row>
                    <div 
                        className="table-container" 
                        onClick={(e)=>{
                            if(e.target && e.target.nodeName == "A")
                            {
                                this.startApproval(e.target.id)
                            }
                        }}
                    >
                        {this.formatMoudle()}
                    </div>
                </Layout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    start: state.start
})
const mapDispatchToProps = {
    getSolution,
    getOneSolution
}
export default connect(mapStateToProps, mapDispatchToProps)(StartView)
