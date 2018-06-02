import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin} from 'antd';
import Avatar from 'components/Avatar';
import Show from 'appComponents/Think/Show';
import Icon from 'components/Icon';
import ScrollLoad from 'components/ScrollLoad';
import Modal from 'components/Modal';
import ModularContainer from 'components/ModularContainer';
import TagSelect from 'components/TagSelect';
import QueueAnim from 'rc-queue-anim';
import $ from 'jquery';

import {getTag, setCondition, getThinks} from './action';
import {setLayout, setDefaultLayout, setPage} from 'layouts/ThinkLayout/action';

import './style.scss';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 筛选分类 [0:无, 1:心情, 2:建议, 3:征集]
            selectType  :   0,
            // 列表条件
            condition   :   props.reducer.condition,
            // 心情标签
            tag1        :   [],
            // 建议标签
            tag2        :   [],
            // 征集标签
            tag3        :   []
        };
        // 是否筛选
        this.isSelect = false;
    }

    componentWillMount() {
        // 初始获取列表
        if(this.props.reducer.thinks.length == 0)
        {
            this.props.getThinks(this.state.condition, this.props.reducer.gotThinkIds, true);
        }

        // 获取心情标签
        this.props.getTag(1, data => {
            this.setState({tag1 : this.getTag(data)});
        });

        // 获取建议标签
        this.props.getTag(2, data => {
            this.setState({tag2 : this.getTag(data)});
        });

        // 获取征集标签
        this.props.getTag(3, data => {
            this.setState({tag3 : this.getTag(data)});
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if(this.props.reducer.thinks.length == 0)
        {
            // 还原获取条件
            this.props.setCondition({
                type : 1,
                keywords : null,
                thinkTagIds : null,
                statusLife : null,
                orderName : 'time',
                orderType : 'desc'
            });
        }
        else
        {
            this.props.setCondition(this.state.condition);
        }
    }

    // 获取筛选标签
    getTag = data => {
        let tag = [];
        data.map((v, k) => {
            tag.push({name : v.name, value : v.think_tag_id});
        });
        return tag;
    }

    // 设置列表条件
    setCondition = condition => {
        const newCondition = {...this.state.condition, ...condition};
        this.setState({condition : newCondition});
    }

    /**
     * 关闭筛选
     * @param isGetThinks 是否强制获取想法
     * @param condition 获取想法条件
     * @param callback 回调
     */
    closeSelect = (isGetThinks, condition, callback) => {
        setTimeout(() => {
            if(!condition) condition = this.state.condition;
            if(isGetThinks || this.isSelect)
            {
                this.props.getThinks(condition, this.props.reducer.gotThinkIds, true);
            }
            this.isSelect = false;
            if(callback) callback();
        }, this.state.selectType == 0 ? 0 : 800);
        this.setState({selectType : 0});
    }

    render() {
        // 想法列表
        let thinks = [];
        this.props.reducer.thinks.map((v, k) => {
            thinks.push(
                <Show
                    key={v.think_id}
                    className="think"
                    think={v}
                />
            );
        });

        // 分类
        let types = [];
        ['心情', '建议', '征集'].map((v, k) => {
            types.push(
                <div key={k} className={`type ${this.state.condition.type != k+1 ? 'blur' : ''}`} onClick={() => {
                    if(this.state.condition.type != k+1)
                    {
                        const condition = {
                            type : k+1,
                            keywords : null,
                            thinkTagIds : null,
                            statusLife : null,
                            orderName : 'time',
                            orderType : 'desc'
                        }
                        // 关闭筛选
                        this.closeSelect(true, condition, () => this.setCondition(condition));
                    }
                    else
                    {
                        if(this.state.selectType == 0)
                        {
                            // 筛选
                            this.setState({selectType : k+1});
                        }
                        else
                        {
                            // 关闭筛选
                            this.closeSelect(false, this.state.condition);
                        }
                    }
                }}>
                    <div className="type-name">
                        {v}
                        <Icon className="type-icon" type={'sort-down'} style={{transform : this.state.selectType == k+1 ? 'rotate(180deg)' : 'rotate(0deg)'}} />
                    </div>
                </div>
            );
        });

        // 筛选
        let tagSelectTags = [];
        let statusSelectTags = [];
        let orderNameSelectTags = [];
        switch (this.state.condition.type)
        {
            // 心情
            case 1:
                tagSelectTags = this.state.tag1;
                orderNameSelectTags = [{name : '发表时间', value : 'time'}, {name : '人气', value : 'popularity'}, {name : '赞', value : 'yes'}];
                break;
            // 建议
            case 2:
                tagSelectTags = this.state.tag2;
                statusSelectTags = [{name : '待审核', value : 100}, {name : '已采纳', value : 200}, {name : '未通过', value : 300}, {name : '已完成', value : 400}];
                orderNameSelectTags = [{name : '发表时间', value : 'time'}, {name : '人气', value : 'popularity'}, {name : '支持', value : 'yes'}, {name : '不支持', value : 'no'}];
                break;
            // 征集
            case 3:
                tagSelectTags = this.state.tag3;
                statusSelectTags = [{name : '待审核', value : 100}, {name : '已采纳', value : 200}, {name : '未通过', value : 300}, {name : '已完成', value : 400}, {name : '无', value : 10}];
                orderNameSelectTags = [{name : '发表时间', value : 'time'}, {name : '人气', value : 'popularity'}];
                break;
        }

        // 筛选-热门标签
        const tag =
            <ModularContainer name={'热门标签'} borderTop={false}>
                <TagSelect
                    tags={tagSelectTags}
                    selectedColor={'red'}
                    value={this.state.condition.thinkTagIds}
                    onChange={value => {
                        this.isSelect = true;
                        this.setCondition({thinkTagIds : value});
                    }}
                />
            </ModularContainer>

        // 筛选-处理状态
        let status = null;
        if(this.state.condition.type != 1)
        {
            status =
                <ModularContainer name={'处理状态'}>
                    <TagSelect
                        tags={statusSelectTags}
                        selectedColor={'purple'}
                        value={this.state.condition.statusLife}
                        onChange={value => {
                            this.isSelect = true;
                            this.setCondition({statusLife : value});
                        }}
                    />
                </ModularContainer>
        }

        // 筛选-排序分类
        const orderName =
            <ModularContainer name={'排序分类'}>
                <TagSelect
                    tags={orderNameSelectTags}
                    selectedColor={'purple'}
                    maxSelected={1}
                    minSelected={1}
                    value={this.state.condition.orderName}
                    onChange={value => {
                        this.isSelect = true;
                        this.setCondition({orderName : value});
                    }}
                />
            </ModularContainer>

        // 筛选-排序方式
        const orderType =
            <ModularContainer name={'排序方式'}>
                <TagSelect
                    tags={[{name : '降序', value : 'desc'}, {name : '升序', value : 'asc'}]}
                    selectedColor={'purple'}
                    maxSelected={1}
                    minSelected={0}
                    value={this.state.condition.orderType}
                    onChange={value => {
                        this.isSelect = true;
                        this.setCondition({orderType : value});
                    }}
                />
            </ModularContainer>

        return(
            <div className="Think-Index">
                <div className="header">
                    <div className="admin" onClick={() => this.props.setPage(1)}>
                        <Icon type={'reorder'} />
                    </div>
                    <div className="type-border">
                        {types}
                    </div>
                    <div className="home-border" onClick={() => this.props.setPage(3)}>
                        <Avatar className="home" url={this.props.publicReducer.userInfo.avatar} />
                    </div>
                </div>

                {/*筛选*/}
                <Modal
                    isShow={this.state.selectType != 0}
                    style={{height : $(window).height() - 59, top : 60}}
                    hideWidth={$(window).width()}
                    positionY={'top'}
                    onClickBg={() => {
                        // 关闭筛选
                        this.closeSelect(false, this.state.condition);
                    }}
                    contentStyle={{backgroundColor : '#f2f2f2'}}
                >
                    <div style={{width : $(window).width()}}>
                        {/*热门标签*/}
                        {tag}
                        {/*处理状态*/}
                        {status}
                        {/*排序分类*/}
                        {orderName}
                        {/*排序方式*/}
                        {orderType}
                    </div>
                </Modal>

                {/*发表*/}
                <div
                    className="publish-border"
                    onClick={() => this.props.router.push(`/think/publish/${this.state.condition.type}`)}
                >
                    <div className="publish">
                        <Icon className="publish-button" type="pencil-square-o" />
                    </div>
                </div>

                {/*列表*/}
                <div className="list-border">
                    <Spin spinning={this.props.reducer.fetchGetThinks && this.props.reducer.thinks.length == 0 ? true : false} style={{height : document.body.clientHeight - 150}}>
                        {/*<QueueAnim*/}
                            {/*type={'left'}*/}
                            {/*ease={'easeOutQuart'}*/}
                        {/*>*/}
                            <ScrollLoad
                                key={'list'}
                                className="list"
                                isAutoFirst={true}
                                autoTimes={-1}
                                isLoad={!this.props.reducer.isEnd && this.props.reducer.thinks.length > 0}
                                load={() => this.props.getThinks(this.state.condition, this.props.reducer.gotThinkIds, false)}
                                isLoading={this.props.reducer.fetchGetThinks}
                                loadingClassName={'list-loading'}
                            >
                                {thinks}
                            </ScrollLoad>
                        {/*</QueueAnim>*/}
                    </Spin>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.thinkIndex,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getTag, setCondition, getThinks,
    setLayout, setDefaultLayout, setPage
}

export default store => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'thinkIndex', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index));
        })
    }
})
