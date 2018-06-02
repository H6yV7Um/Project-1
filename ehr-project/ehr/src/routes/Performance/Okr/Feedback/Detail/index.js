import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin} from 'antd';
import Avatar from 'components/Avatar';
import {Link} from 'react-router';
import Icon from 'components/Icon';
import ModularContainer from 'components/ModularContainer';
import Review from 'components/Review';
import 'jquery-easing';
import $ from 'jquery';
import OkrUserScoreChart from 'appComponents/Okr/UserScoreChart';
import {Tag} from 'antd';

import {getOkr} from './action';
import {setLayout, setDefaultLayout} from 'layouts/Ehr/action';

import './style.scss';

// Okr反馈详情
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.getOkr(this.props.params.feedbackId);

    }

    componentDidMount() {
        this.props.setLayout({
            header : false
        })
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    render() {
        let className = 'routePerformanceOkrFeedbackDetail';

        // console.log(this.props.publicReducer.userInfo.user_id)
        // console.log(this.props.reducer.data.user_id);

        let header = null;
        let objectiveKeyResults = null;
        let feedback = null;
        let question = null;
        let achievement = null;
        let grade = null;
        let review = null;
        let stage = null;
        let isEdit = null;
        let isReview = null;
        if(!this.props.reducer.isFetch)
        {
            let feedbacks = null;
            if(this.props.reducer.data.feedbacks)
            {
                this.props.reducer.data.feedbacks.map((v,k) => {
                    if(v._id == this.props.params.feedbackId){
                        feedbacks = {...v};
                    }
                })
            }

            //Objective Key results列表
            let objectives = [];
            if(this.props.reducer.data.okrs)
            {
                this.props.reducer.data.okrs.map((v,k) => {
                    //OKR feedbacks列表
                    let okrf = [];
                    if(feedbacks.okrs){
                        feedbacks.okrs.map((values,keys) => {
                            okrf.push(
                                <div key={keys}>
                                    {values}
                                </div>
                            )
                        })
                    }

                    //result列表
                    let krs = [];
                    if(v.krs)
                    {
                        v.krs.map((value,key) => {
                            krs.push(
                                <div key={key} className={`${className}-objectives-key-results`}>
                                    <Icon type={'circle-thin'} className={`${className}-objectives-key-results-rank`}></Icon>
                                    <div className={`${className}-objectives-key-results-desc`}>{value}</div>
                                </div>
                            )
                        })
                    }

                    let feedbackOkrs = null;
                    if(feedbacks.okrs[k])
                    {
                        feedbackOkrs =
                            <div className={`${className}-feedback-okrs`}>
                                <div className={`${className}-feedback-okrs-box`}>
                                    <div className={`${className}-feedback-okrs-box-title`}>
                                        目标反馈：
                                    </div>
                                    <div className={`${className}-feedback-okrs-box-content`}>
                                        {feedbacks.okrs[k]}
                                    </div>
                                </div>
                            </div>
                    }

                    objectives.push(
                        <div key={k} className={`${className}-objectives`}>
                            <div className={`${className}-objectives-objective`}>
                                <Icon type={'star-o'} className={`${className}-objectives-objective-rank`}/>
                                <div className={`${className}-objectives-objective-info`}>{v.objective}</div>
                            </div>
                            {krs}
                            {feedbackOkrs}
                        </div>
                    )
                })
            }

            //工作问题列表
            let questions = [];
            if(feedbacks.questions)
            {
                feedbacks.questions.map((v,k) => {
                    questions.push(
                        <div key={k} className={`${className}-feedback-content-total`}>
                            <Icon type={'circle-thin'} className={`${className}-feedback-content-info`}></Icon>
                            <div className={`${className}-feedback-content-desc`}>{v.describe}</div>
                        </div>
                    )
                })
            }

            //工作成果列表
            let achievements = [];
            if(feedbacks.achievements)
            {
                feedbacks.achievements.map((v,k) => {
                    achievements.push(
                        <div key={k} className={`${className}-feedback-content-total`}>
                            <Icon type={'circle-thin'} className={`${className}-feedback-content-info`}></Icon>
                            <div className={`${className}-feedback-content-desc`}>{v.describe}</div>
                        </div>
                    )
                })
            }

            //评论列表
            let reviews = [];
            if(feedbacks.comment_info && feedbacks.comment_info.comments)
            {
                feedbacks.comment_info.comments.map((v,k) => {
                    reviews.push(
                        <Review
                            key={k}
                            showLineNum={10}
                            content={v.comment}
                            userId={v.user_id}
                            userAvatar={v.avatar}
                            userName={v.name}
                            time={v.update_time}
                            isLike={false}
                            isReply={true}
                        >
                        </Review>
                    )
                })
            }

            //计算当前季度
            this.props.reducer.data.attr.stage===1?
                stage = feedbacks.stage
                :
                stage = this.props.reducer.data.attr.stage+feedbacks.stage;

            // 当季评分 分数数据
            let scores = [];
            scores.score = feedbacks.comment_info.score;
            scores.composite_score = feedbacks.comment_info.composite_score;
            scores.process_score = feedbacks.comment_info.process_score;
            scores.achievement_score = feedbacks.comment_info.achievement_score;

            //当季评分 period  时段 [年份, 阶段1, 阶段2]
            let period = [];
            period.push(this.props.reducer.data.attr.year, this.props.reducer.data.attr.stage, feedbacks.stage);
            // period.year = this.props.reducer.data.attr.year;
            // period.sttrStage = this.props.reducer.data.attr.stage;
            // period.feedbackstage = feedbacks.stage;

            //判断是否显示内容编辑按钮
            isEdit =
                <span className={`${className}-editContent`}>
                    <span className={`${className}-editContent-icon`}>编辑</span>
                    <Icon type="pencil-square-o"/>
                </span>
            // isEdit = this.props.publicReducer.userInfo.user_id == this.props.reducer.data.user_id ?
            //     <span className={`${className}-editContent`}>
            //         <span className={`${className}-editContent-icon`}>编辑</span>
            //         <Icon type="pencil-square-o"/>
            //     </span>
            //     :
            //     null;

            //判断是否显示评论编辑按钮
            isReview = <Tag color={'red'}>编辑</Tag>
            // isReview = this.props.publicReducer.userInfo.user_id != this.props.reducer.data.user_id ? <Tag color={'red'}>编辑</Tag> : null;

            header =
                <div>
                    {/*个人信息模块*/}
                    <ModularContainer className={`${className}-header`}>
                        <Avatar className={`${className}-header-avatar`} url={this.props.reducer.data.avatar} />
                        <div className={`${className}-header-info`}>
                            <div className={`${className}-header-name`}>{this.props.reducer.data.name}</div>
                            <div className={`${className}-header-department`}>{this.props.reducer.data.position}</div>
                        </div>
                    </ModularContainer>

                    {/*时间段选择模块*/}
                    <ModularContainer
                        className={`${className}-period`} name={this.props.reducer.data.attr.year+'-Q'+stage}
                        extra={
                            <Link className={`${className}-period-link`}>
                                查看其他时段
                                <span className={`${className}-period-link-extra`}>
                                    <Icon type={'angle-right'} />
                                </span>
                            </Link>
                        }>
                    </ModularContainer>
                </div>

            {/*objective Key results模块*/}
            if(objectives.length===0){
                objectiveKeyResults = null;
            }else{
                objectiveKeyResults =
                    <ModularContainer
                        className={`${className}-objective-key-results`}
                        name={'OKRS'}
                        borderTop={false}
                        extra={isEdit}
                    >
                        <div className={`${className}objective-key-results-content`}>
                            {objectives}
                        </div>
                    </ModularContainer>
            }

            {/*工作反馈模块*/}
            if(feedbacks.describe){
                feedback =
                    <ModularContainer
                        className={`${className}-feedback-title`}
                        name={'工作反馈'}
                        extra={isEdit}
                    >
                        <div className={`${className}-feedback-content`}>
                            <div className={`${className}-feedback-content-total`}>
                                {feedbacks.describe}
                            </div>
                        </div>
                    </ModularContainer>
            }else{
                feedback = null;
            }

            {/*工作问题模块*/}
            if(feedbacks.questions.length===0){
                question = null;
            }else{
                question =
                    <ModularContainer
                        className={`${className}-feedback`}
                        name={'工作问题'}
                        extra={isEdit}
                    >
                        <div className={`${className}-feedback-content`}>
                            {questions}
                        </div>
                    </ModularContainer>
            }

            {/*工作成果模块*/}
            if(feedbacks.achievements.length===0){
                achievement = null;
            }else{
                achievement =
                    <ModularContainer
                        className={`${className}-feedback`}
                        name={'工作成果'}
                        extra={isEdit}
                    >
                        <div className={`${className}-feedback-content`}>
                            {achievements}
                        </div>
                    </ModularContainer>
            }

            {/*当季评分模块*/}
            if(feedbacks.comment_info===null){
                grade = null;
            }else{
                grade =
                    <ModularContainer
                        className={`${className}-grade`} name={'当季评分'}
                        extra={<Icon type={'bar-chart'}
                                     className={`${className}-grade-bar-chart`}/>}
                    >
                        <div className={`${className}-grade-content`}>
                            <OkrUserScoreChart data={scores}/>
                        </div>
                    </ModularContainer>
                review =
                    <ModularContainer
                        name={'点评'}
                        marginBottom={false}
                        extra={isReview}
                    >
                        {reviews}
                    </ModularContainer>
            }
        }

        return(
            <Spin spinning={this.props.reducer.isFetch} style={{height : $(window).height()}}>
                <div className={className}>
                    {header}
                    {objectiveKeyResults}
                    {feedback}
                    {question}
                    {achievement}
                    {grade}
                    {review}
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.performanceOkrFeedbackDetail,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    getOkr, setLayout, setDefaultLayout
}

export default store => ({
    path: '/performance/okr/feedback/detail/:feedbackId',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'performanceOkrFeedbackDetail', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Detail));
        })
    }
})