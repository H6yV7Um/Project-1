import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {browserHistory} from 'react-router';
import {Row, Col} from 'antd';
import Select from 'appComponents/Performance/Select';
import LayoutSelect from 'layouts/Ehr/Select';
import AmoebaChart from 'appComponents/Amoeba/Chart';
import LoveChartHistogramLine from 'appComponents/Love/DepartmentsChart';
import ModularContainer from 'components/ModularContainer';
import Button from 'components/Button';
import Container from 'components/Container';
import Switch from 'components/Switch';
import { List } from 'antd-mobile';

import {setSelectData} from '../action';
import {setLoveArguments} from './action';
import {setLayout, setDefaultLayout} from 'layouts/Ehr/action';

import './style.scss';

// 绩效多部门分析
class Departments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 筛选数据
            selectData : this.props.performanceReducer.selectData || {
                // 分类 [1:成员, 2:部门]
                type : 2,
                // 对象ID
                objIds : Array.from(props.publicReducer.userInfo.leader_department_ids, id => id.toString()),
                // 时段 [起始年, 终止年]
                date : [new Date().getFullYear() - 1, new Date().getFullYear()]
            },
            show : [true,true]
        };
        // 修复筛选数据
        if(this.state.selectData.type == 1)
        {
            this.state.selectData.type = 2;
            this.state.selectData.objIds = Array.from(props.publicReducer.userInfo.leader_department_ids, id => id.toString());
        }
        else if(this.state.selectData.objIds.length <= 1)
        {
            this.state.selectData.objIds = Array.from(props.publicReducer.userInfo.leader_department_ids, id => id.toString());
        }

        // 临时筛选数据
        this.selectData = {...this.state.selectData};
        // layoutKey
        this.layoutKey = new Date().getTime() + Math.random();
    }

    componentWillMount(){
        this.setState({show:this.props.reducer.loveArguments || this.state.show})
    }

    componentDidMount() {
        this.setLayout();
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
        this.props.setSelectData(this.selectData);
        this.props.setLoveArguments(this.state.show);
    }

    /**
     *  设置布局
     *  @param selectData   筛选数据
     */
    setLayout = selectData => {
        this.selectData = {...this.selectData, ...selectData};

        this.props.setLayout({
            onChangePage : (page, prevPage) => {
                if(page == 2 && prevPage == 1)
                {
                    setTimeout(() => {
                        // 缺省自己管理部门
                        if(this.selectData.objIds.length == 0)
                        {
                            this.selectData.objIds = Array.from(this.props.publicReducer.userInfo.leader_department_ids, id => id.toString());
                            this.setLayout({objIds : this.selectData.objIds});
                        }

                        switch (this.selectData.type)
                        {
                            // 成员
                            case 1:
                                if(this.selectData.objIds.length == 1)
                                {
                                    // 单人分析
                                    browserHistory.push(`/performance/user`);
                                }
                                else
                                {
                                    // 多人分析
                                    browserHistory.push(`/performance/users`);
                                }
                                break;
                            // 部门
                            case 2:
                                if(this.selectData.objIds.length == 1)
                                {
                                    // 单部门分析
                                    browserHistory.replace(`/performance/department`);
                                }
                                else
                                {
                                    // 多部门分析
                                    this.setState({selectData : {...this.selectData}});
                                }
                                break;
                        }
                    }, 200);
                }
            },
            leftBody :
                <LayoutSelect key={this.layoutKey}>
                    <Select
                        type={this.selectData.type}
                        onChangeType={type => this.setLayout({type})}
                        objIds={this.selectData.objIds}
                        onChangeObj={objIds => this.setLayout({objIds})}
                        date={this.selectData.date}
                        onChangeDate={date => this.setLayout({date})}
                    />
                </LayoutSelect>,
            footer :
                <Row key={this.layoutKey}>
                    <Col span={6}>
                        <Button name={'综合分析'} type={'think'}/>
                    </Col>
                    <Col span={6}>
                        <Button name={'业绩详情'} type={'weaken'} action={() => {
                            browserHistory.push(`/performance/amb/feedback/list`);
                        }} />
                    </Col>
                    <Col span={12}>
                        <Button name={'PEOPLE LOVE详情'} isSideBorder={true} sideBorderSize={'half'} type={'weaken'} action={() => {
                            browserHistory.push(`/performance/love/feedback/list`);
                        }} />
                    </Col>
                </Row>
        });
    }

    render() {
        let className = 'routePerformanceDepartments';

        return(
            <Container className={className}>
                {/*业绩*/}
                <ModularContainer
                    name={'业绩'}
                >
                    <AmoebaChart
                        departmentIds={this.state.selectData.objIds}
                        date={this.state.selectData.date}
                    />
                </ModularContainer>
                {/*people love*/}
                <ModularContainer
                    name={'PEOPLE LOVE'}
                >
                    <LoveChartHistogramLine
                        departmentIds={this.state.selectData.objIds}
                        date={this.state.selectData.date}
                        show={this.state.show}
                        onChangeShow={ show => {
                            this.setState({show:show})
                        }}
                    />
                </ModularContainer>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.performanceDepartments,
    performanceReducer : state.performance,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout, setSelectData,setLoveArguments
}

export default store => ({
    path: '/performance/departments',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'performanceDepartments', reducer : require('./reducer').default});
            injectReducer(store, {key : 'performance', reducer : require('../reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Departments));
        })
    }
})
