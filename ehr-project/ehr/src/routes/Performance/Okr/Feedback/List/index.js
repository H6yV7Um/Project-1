import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {browserHistory} from 'react-router';
import {Row, Col, Spin} from 'antd';
import Select from 'appComponents/Performance/Select';
import LayoutSelect from 'layouts/Ehr/Select';
import FeedbackShow from 'appComponents/Okr/FeedbackShow';
import Button from 'components/Button';
import ScrollLoad from 'components/ScrollLoad';
import MessageTitle from 'components/MessageTitle';
import Icon from 'components/Icon';
import Container from 'components/Container';
import $ from 'jquery';

import {getOkr, setOkrSelectData, setScrollTop} from './action';
import {setSelectData} from '../../../action';
import {setLayout, setDefaultLayout} from 'layouts/Ehr/action';

import './style.scss';

// OKR反馈列表
class List extends Component {
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
            }
        };
        // 修复筛选数据
        if(this.state.selectData.type == 2)
        {
            this.state.selectData.type = 1;
            this.state.selectData.objIds = [props.publicReducer.userInfo.user_id];
        }

        // 临时筛选数据
        this.selectData = {...this.state.selectData};
        // 获取OKR筛选数据
        this.okrSelectData = this.props.reducer.okrSelectData || {...this.state.selectData};
        // layoutKey
        this.layoutKey = new Date().getTime() + Math.random();
    }

    componentDidMount() {
        this.setLayout();

        // 获取OKR
        if(!this.getOkr(true))
        {
            // 还原滚动位置
            // $('html,body').animate({
            //     scrollTop : this.props.reducer.scrollTop
            // }, 500, 'easeOutQuad');
            // $(window).scrollTop(this.props.reducer.scrollTop);
            setTimeout(() => $(window).scrollTop(this.props.reducer.scrollTop), 150);
        }
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
        // 备份设置获取OKR筛选数据
        this.props.setOkrSelectData(this.selectData);
        // 备份设置滚动位置以便还原
        this.props.setScrollTop($(window).scrollTop());
        // 备份设置筛选数据
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
                                this.setState({selectData : {...this.selectData}});
                                this.getOkr(true, this.selectData);
                                break;
                            // 部门
                            case 2:
                                browserHistory.push(`/performance/love/feedback/list`);
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
                    <Col span={13}>
                        <Button name={'综合分析'} type={'weaken'} action={() => {
                            // 单人分析
                            if(this.selectData.objIds.length == 1)
                            {
                                browserHistory.push(`/performance/user`);
                            }
                            // 多人分析
                            else
                            {
                                browserHistory.push(`/performance/users`);
                            }
                        }}/>
                    </Col>
                    <Col span={11}>
                        <Button name={'OKR详情'} type={'think'}/>
                    </Col>
                </Row>
        });
    }

    /**
     * 获取OKR
     * @param isRefresh 是否刷新
     * @param okrSelectData 获取OKR筛选数据
     */
    getOkr = (isRefresh=false, okrSelectData) => {
        if(!okrSelectData)
        {
            okrSelectData = {...this.state.selectData};
        }

        if(this.props.reducer.okrList.length == 0 && !this.props.reducer.okrIsGetAll)
        {
            isRefresh = true;
        }
        else if(isRefresh)
        {
            // 判断成员ID
            if(this.okrSelectData.objIds.length != okrSelectData.objIds.length)
            {
                isRefresh = true;
            }
            else
            {
                isRefresh = this.okrSelectData.objIds.concat(okrSelectData.objIds).filter(v => this.okrSelectData.objIds.indexOf(v) == -1 || okrSelectData.objIds.indexOf(v) == -1).length > 0;
            }
            // 判断时段
            if(!isRefresh)
            {
                isRefresh = this.okrSelectData.date.concat(okrSelectData.date).filter(v => this.okrSelectData.date.indexOf(v) == -1 || okrSelectData.date.indexOf(v) == -1).length > 0;
            }
            // 刷新
            if(isRefresh)
            {
                this.okrSelectData = {...okrSelectData};
            }
            else
            {
                return false;
            }
        }

        if(isRefresh || !this.props.reducer.okrIsGetAll)
        {
            this.props.getOkr(okrSelectData.objIds, okrSelectData.date, isRefresh ? 1 : this.props.reducer.okrPage + 1, isRefresh);
            return true;
        }
        else
        {
            return false;
        }
    }

    render() {
        let className = 'routePerformanceOkrFeedbackList';

        let feedbacks = [];
        this.props.reducer.okrList.map((v1, k1) => {
            // 预估最大年2050
            const k2 = Math.abs(v1.attr.year - 2050);
            // 预估单年最大OKR次数12
            const k3 = Math.abs(v1.attr.stage - 12);
            if(!feedbacks[k2]) feedbacks[k2] = [];
            if(!feedbacks[k2][k3]) feedbacks[k2][k3] = [];
            v1.feedbacks.map((v4, k4) => {
                // 预估单OKR最大反馈次数12
                const k5 = Math.abs(v4.stage - 12);
                if(!feedbacks[k2][k3][k5]) feedbacks[k2][k3][k5] = [];
                feedbacks[k2][k3][k5].push(<FeedbackShow key={`${k1}-${k4}`} okr={v1} feedback={v4} />);
            })
        })
        if(feedbacks.length == 0 && !this.props.reducer.okrIsFetch)
        {
            feedbacks =
                <MessageTitle
                    className={`${className}-message`}
                    type={'danger'}
                    icon={<Icon type="exclamation-circle"/>}
                >
                    {'暂无数据'}
                </MessageTitle>
        }

        return(
            <Container className={className}>
                <Spin spinning={this.props.reducer.okrIsFetch && this.props.reducer.okrList.length == 0 ? true : false} style={{height : document.body.clientHeight - 100}}>
                    <ScrollLoad
                        className={`${className}-okr`}
                        autoTimes={-1}
                        isLoad={!this.props.reducer.okrIsGetAll}
                        load={this.getOkr}
                        isLoading={this.props.reducer.okrIsFetch && this.props.reducer.okrList.length > 0}
                    >
                        {feedbacks}
                    </ScrollLoad>
                </Spin>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.performanceOkrFeedbackList,
    performanceReducer : state.performance,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout, setSelectData, getOkr, setOkrSelectData, setScrollTop
}

export default store => ({
    path: '/performance/okr/feedback/list',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'performanceOkrFeedbackList', reducer : require('./reducer').default});
            injectReducer(store, {key : 'performance', reducer : require('../../../reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(List));
        })
    }
})
