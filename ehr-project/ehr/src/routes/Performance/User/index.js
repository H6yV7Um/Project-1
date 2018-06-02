import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {browserHistory} from 'react-router';
import {Row, Col} from 'antd';
import Select from 'appComponents/Performance/Select';
import LayoutSelect from 'layouts/Ehr/Select';
import OkrUserChart from 'appComponents/Okr/UserChart';
import OkrDimensionChart from 'appComponents/Okr/DimensionChart';
import ModularContainer from 'components/ModularContainer';
import Button from 'components/Button';
import Container from 'components/Container';

import {setSelectData} from '../action';
import {setLayout, setDefaultLayout} from 'layouts/Ehr/action';

import './style.scss';

// 绩效成员分析
class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 筛选数据
            selectData : this.props.performanceReducer.selectData || {
                // 分类 [1:成员, 2:部门]
                type : 1,
                // 对象ID
                objIds : [props.publicReducer.userInfo.user_id],
                // 时段 [起始年, 终止年]
                date : [new Date().getFullYear() - 1, new Date().getFullYear()]
            },
            // 成员数据
            userData : null
        };

        // 修复筛选数据
        if(this.state.selectData.type == 2)
        {
            this.state.selectData.type = 1;
            this.state.selectData.objIds = [props.publicReducer.userInfo.user_id];
        }
        else if(this.state.selectData.objIds.length > 1)
        {
            this.state.selectData.objIds = [props.publicReducer.userInfo.user_id];
        }

        // 临时筛选数据
        this.selectData = {...this.state.selectData};
        // layoutKey
        this.layoutKey = new Date().getTime() + Math.random();
    }

    componentDidMount() {
        this.setLayout();
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
        this.props.setSelectData(this.selectData);
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
                        // 缺省自己
                        if(this.selectData.objIds.length == 0)
                        {
                            this.selectData.objIds = [this.props.publicReducer.userInfo.user_id];
                            this.setLayout({objIds : this.selectData.objIds});
                        }

                        switch (this.selectData.type)
                        {
                            // 成员
                            case 1:
                                if(this.selectData.objIds.length == 1)
                                {
                                    this.setState({selectData : {...this.selectData}});
                                }
                                else
                                {
                                    // 多人分析
                                    browserHistory.replace(`/performance/users`);
                                }
                                break;
                            // 部门
                            case 2:
                                if(this.selectData.objIds.length == 1)
                                {
                                    // 单部门分析
                                    browserHistory.push(`/performance/department`);
                                }
                                else
                                {
                                    // 多部门分析
                                    browserHistory.push(`/performance/departments`);
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
                    <Col span={11}>
                        <Button name={'综合分析'} type={'think'}/>
                    </Col>
                    <Col span={13}>
                        <Button name={'OKR详情'} type={'weaken'} action={() => {
                            browserHistory.push(`/performance/okr/feedback/list`);
                        }} />
                    </Col>
                </Row>
        });
    }

    render() {
        let className = 'routePerformanceUser';

        return(
            <Container className={className}>
                {/*OKR得分情况*/}
                <ModularContainer
                    name={'OKR得分情况'}
                >
                    <OkrUserChart
                        userId={this.state.selectData.objIds[0]}
                        date={this.state.selectData.date}
                        onChange={userData => this.setState({userData})}
                    />
                </ModularContainer>
                {/*OKR分析*/}
                <ModularContainer
                    name={'OKR分析'}
                >
                    <OkrDimensionChart
                        isGetData={false}
                        data={this.state.userData}
                    />
                </ModularContainer>
                {/*综合评定分析*/}
                <ModularContainer
                    name={'综合评定分析'}
                >

                </ModularContainer>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.performanceUser,
    performanceReducer : state.performance,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout, setSelectData
}

export default store => ({
    path: '/performance/user',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'performanceUser', reducer : require('./reducer').default});
            injectReducer(store, {key : 'performance', reducer : require('../reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(User));
        })
    }
})
