import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {browserHistory} from 'react-router';
import {Row, Col, Spin} from 'antd';
import Select from 'appComponents/Performance/Select';
import LayoutSelect from 'layouts/Ehr/Select';
import FeedbackShow from 'appComponents/Love/FeedbackShow';
import Button from 'components/Button';
import ScrollLoad from 'components/ScrollLoad';
import MessageTitle from 'components/MessageTitle';
import Icon from 'components/Icon';
import Container from 'components/Container';
import $ from 'jquery';

import {setLoveSelectData,setScrollTop,getLove} from './action';
import {setSelectData} from '../../../action';
import {setLayout, setDefaultLayout} from 'layouts/Ehr/action';

import './style.scss';

// LOVE成果列表
class List extends Component {
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
            }
        };

        // 修复筛选数据
        if(this.state.selectData.type == 1)
        {
            this.state.selectData.type = 2;
            this.state.selectData.objIds = Array.from(props.publicReducer.userInfo.leader_department_ids, id => id.toString());
        }

        // 临时筛选数据
        this.selectData = {...this.state.selectData};
        // 获取Love筛选数据
        this.loveSelectData = this.props.reducer.loveSelectData || {...this.state.selectData};
        // layoutKey
        this.layoutKey = new Date().getTime() + Math.random();
    }

    componentDidMount() {
        this.setLayout();

        // 获取LOVE
        if(!this.getLove(true))
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
        // 备份设置获取Love筛选数据
        this.props.setLoveSelectData(this.selectData);
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
                            this.selectData.objIds = Array.from(this.props.publicReducer.userInfo.leader_department_ids, id => id.toString());
                            this.setLayout({objIds : this.selectData.objIds});
                        }

                        switch (this.selectData.type)
                        {
                            // 成员
                            case 1:
                                browserHistory.push(`/performance/okr/feedback/list`);
                            // 部门
                            case 2:
                                // 部门列表
                                this.setState({selectData : {...this.selectData}});
                                this.getLove(true, this.selectData);
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
                        <Button name={'综合分析'} type={'weaken'} action={() => {
                            // 单部门分析
                            if(this.selectData.objIds.length == 1)
                            {
                                browserHistory.push(`/performance/department`);
                            }
                            // 多部门分析
                            else
                            {
                                browserHistory.push(`/performance/departments`);
                            }
                        }}/>
                    </Col>
                    <Col span={6}>
                        <Button name={'业绩详情'} isSideBorder={true} sideBorderSize={'half'} type={'weaken'} action={() => {
                            browserHistory.push(`/performance/amb/feedback/list`);
                        }} />
                    </Col>
                    <Col span={12}>
                        <Button name={'PEOPLE LOVE详情'} type={'think'}/>
                    </Col>
                </Row>
        });
    }

    /**
     * 获取Love
     * @param isRefresh 是否刷新
     * @param loveSelectData 获取love筛选数据
     */
    getLove = (isRefresh=false, loveSelectData) => {
        if(!loveSelectData)
        {
            loveSelectData = {...this.state.selectData};
        }

        if(this.props.reducer.loveList.length == 0 && !this.props.reducer.loveIsGetAll)
        {
            isRefresh = true;
        }
        else if(isRefresh)
        {
            // 判断成员ID
            if(this.loveSelectData.objIds.length != loveSelectData.objIds.length)
            {
                isRefresh = true;
            }
            else
            {
                isRefresh = this.loveSelectData.objIds.concat(loveSelectData.objIds).filter(v => this.loveSelectData.objIds.indexOf(v) == -1 || loveSelectData.objIds.indexOf(v) == -1).length > 0;
            }
            // 判断时段
            if(!isRefresh)
            {
                isRefresh = this.loveSelectData.date.concat(loveSelectData.date).filter(v => this.loveSelectData.date.indexOf(v) == -1 || loveSelectData.date.indexOf(v) == -1).length > 0;
            }
            // 刷新
            if(isRefresh)
            {
                this.loveSelectData = {...loveSelectData};
            }
            else
            {
                return false;
            }
        }

        if(isRefresh || !this.props.reducer.loveIsGetAll)
        {
            // console.log(loveSelectData.objIds);
            this.props.getLove(loveSelectData.objIds, loveSelectData.date, isRefresh ? 1 : this.props.reducer.lovePage + 1, isRefresh);
            return true;
        }
        else
        {
            return false;
        }
    }

    render() {
        let className = 'routePerformanceLoveFeedbackList';

        let feedbacks = [];

        this.props.reducer.loveList.map((v1, k1) => {
            v1.feedbacks.map((v2, k2) => {
                feedbacks.push(<FeedbackShow key={`${k1}-${k2}`} love={v1} feedback={v2} />);
            })
        })
        if(feedbacks.length == 0 && !this.props.reducer.loveIsFetch)
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
                <Spin spinning={this.props.reducer.loveIsFetch && this.props.reducer.loveList.length == 0 ? true : false} style={{height : document.body.clientHeight - 100}}>
                    <ScrollLoad
                        className={`${className}-love`}
                        autoTimes={-1}
                        isLoad={!this.props.reducer.loveIsGetAll}
                        load={this.getLove}
                        isLoading={this.props.reducer.loveIsFetch && this.props.reducer.loveList.length > 0}
                    >
                        {feedbacks}
                    </ScrollLoad>
                </Spin>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.performanceLoveFeedbackList,
    performanceReducer : state.performance,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout, setSelectData, setLoveSelectData, setScrollTop,getLove
}

export default store => ({
    path: '/performance/love/feedback/list',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'performanceLoveFeedbackList', reducer : require('./reducer').default});
            injectReducer(store, {key : 'performance', reducer : require('../../../reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(List));
        })
    }
})
