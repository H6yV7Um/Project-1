import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Button,Steps,message,Layout, Row, Col,Popconfirm} from 'antd'
import { Link } from 'react-router'
import {complete,update} from '../actions/SolutionAction'
import ChartView from './ChartView'
const Step = Steps.Step;
class SolutionFlowDesignView extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            flow:[]
        }
    }
    static propTypes =
    {
        complete: React.PropTypes.func,
        name: React.PropTypes.string,
        fields: React.PropTypes.array,
        EDITID: React.PropTypes.string,
        update: React.PropTypes.func,
        remark: React.PropTypes.string,
    }
    async componentWillMount() {
        if(!this.props.solutionStore.fields.length && this.props.solutionStore.pageState == "edit")
        {
            this.props.router.push('/workflow/solution/')
            return 
        } 
        let flow = [...this.props.solutionStore.flow]
        await this.setState({...this.state,flow:flow})
    }
    async complete(){
        if(this.props.solutionStore.EDITID)
        {
            let code = await this.props.update( this.props.solutionStore.EDITID,
                                                this.props.solutionStore.name,
                                                this.props.solutionStore.copyto,
                                                this.props.solutionStore.remark,
                                                this.props.solutionStore.fields,
                                                this.state.flow
                                            )
            if(code == 1)
            {
                message.success('更新成功')
                this.props.router.push('/workflow/solution/')
            }
        }
        else
        {
            let code = await this.props.complete(
                                                    this.props.solutionStore.name,
                                                    this.props.solutionStore.copyto,
                                                    this.props.solutionStore.remark,
                                                    this.props.solutionStore.fields,
                                                    this.state.flow
                                                )
            if(code == 1)
            {
                message.success('提交成功')
                this.props.router.push('/workflow/solution/')
            }
        }
    }
    render()
    {
       	const steps = [
            {
                title: '表单设计',
                content: 'First-content',
            },
            {
                title: '流程设计',
                content: 'Second-content',
            }
        ]
        return (	
        	<div>
                <Layout className="layout-main">
                    <Row className="titleBox">
                        <Col span={20}>
                            <div className="h1">新增审批方案</div>
                        </Col>
                        <Col span={4} className="extra">
                            <Button
                                   type="primary"
                                   icon="rollback"
                                   onClick={()=>{this.props.router.push('/workflow/solution/')}}>
                                   返回
                            </Button>
                        </Col>
                    </Row>
                    <div className="table-container">
                        <Steps current={1}>
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div>
                        <ChartView
                            fields={this.props.solutionStore.fields}
                            flow={this.state.flow}
                            onChange={(flow)=>{
                                this.setState({...this.state,flow:flow})
                            }}
                        />
                        </div>
                        <Button 
                            loading={this.props.solutionStore.completeLoading || this.props.solutionStore.updateLoading? true:false} 
                            disabled={this.state.flow.length ? false : true } 
                            type="primary"  
                            onClick={
                                () => this.complete()
                            }
                        >
                            提交
                        </Button>
                        <Popconfirm 
                            title="返回上一步当前页面数据将会被清空" 
                            onConfirm={() => this.props.router.push('/workflow/solution/add')}  
                            okText="是" 
                            cancelText="否"
                        >
                            <Button  style={{ marginLeft: 8 }}>上一步</Button>
                        </Popconfirm>
                    </div>
                </Layout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
  	solutionStore: state.solution
})
const mapDispatchToProps = {
    complete,
    update
}
export default connect(mapStateToProps, mapDispatchToProps)(SolutionFlowDesignView)








