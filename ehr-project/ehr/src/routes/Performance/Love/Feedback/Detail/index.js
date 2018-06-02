import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin} from 'antd';
import MessageTitle from 'components/MessageTitle';
import Icon from 'components/Icon';
import ModularContainer from 'components/ModularContainer';
import Review from 'components/Review';
import 'jquery-easing';
import $ from 'jquery';
import Score from 'appComponents/Love/Score';
import TextList from 'components/TextList';
import {Tag} from 'antd';

import {getLove} from './action';
import {setLayout, setDefaultLayout} from 'layouts/Ehr/action';

import './style.scss';

// Love反馈详情
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        this.props.getLove(this.props.params.feedbackId);
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
        let className = 'routePerformanceLoveFeedbackDetail';

        // console.log(this.props.reducer.data);

        let header = null;
        let objective = null;
        let feedback = null;
        let survey = null;
        let work = null;
        let comment = null;
        let workFiles = null;
        let achievement = null;
        let question = null;

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

            if(feedbacks)
            {
                // 部门名模块
                header =
                    <div className={`${className}-header`}>
                        <div className={`${className}-header-department`}>
                            {this.props.reducer.data.name}
                        </div>
                        <div className={`${className}-header-time`}>
                            {this.props.reducer.data.attr.year}-Q{this.props.reducer.data.attr.stage}
                        </div>
                    </div>

                // 目标列表
                let objectives = null;
                let objectivesList = [];
                this.props.reducer.data.loves.map((v,k) => {
                    objectivesList.push(v.objective)
                })
                objectives =
                    <TextList iconSize={'sm'} content={objectivesList}/>

                //组织述职列表
                let workDesc = null;
                let workDescList = [feedbacks.work.describe];
                workDesc =
                    <TextList iconSize={'sm'} content={workDescList} fontSize={'md'}/>

                //工作反馈列表
                let feedbackDesc = null;
                let feedbackDescList = [feedbacks.describe];
                feedbackDesc =
                    <TextList iconSize={'sm'} content={feedbackDescList}/>

                //工作问题列表
                let questions = null;
                let questionsList = [];
                feedbacks.questions.map((v,k) => {
                    questionsList.push(v.describe)
                })
                questions =
                    <TextList iconSize={'sm'} content={questionsList}/>

                //反馈成果列表
                let achievements = null;
                let achievementsList = [];
                feedbacks.achievements.map((v,k) => {
                    achievementsList.push(v.describe)
                })
                achievements =
                    <TextList iconSize={'sm'} content={achievementsList}/>

                //调研情况列表
                let surveys = [];
                if(feedbacks.surveys){
                    let surveysFiles = null;
                    feedbacks.surveys.map((v,k) => {
                        //组织描述附件模块
                        if(v.files.length > 0) {
                            surveysFiles =
                                <div className={`${className}-surveys-files`}>
                                    <a href={v.files[0]}>
                                        <Icon type={'paperclip'} className={`${className}-surveys-files-icon`}></Icon>
                                        附件
                                    </a>
                                </div>
                        }else{
                            surveysFiles = null;
                        }
                        surveys.push(
                            <div key={k} className={`${className}-survey`}>
                                <Review
                                    userId={v.user_id}
                                    userAvatar={v.avatar}
                                    userName={v.name}
                                    content={v.describe}
                                    time={v.update_time}
                                    isLike={false}
                                    isReply={false}
                                    showLineNum={10}
                                >
                                </Review>
                                {surveysFiles}
                            </div>
                        )
                    })
                }

                //组织描述附件模块
                if(feedbacks.work.files.length > 0)
                {
                    workFiles =
                        <div className={`${className}-work-files`}>
                            <a href={feedbacks.work.files[0]}>
                                <Icon type={'paperclip'} className={`${className}-files-icon`}></Icon>
                                附件
                            </a>
                        </div>
                }

                //评论列表
                let reviews = [];
                if(feedbacks.comment_info.comments){
                    feedbacks.comment_info.comments.map((v,k) => {
                        reviews.push(
                            <div key={k} className={`${className}-reviews`}>
                                <Review
                                    userId={v.user_id}
                                    userAvatar={v.avatar}
                                    userName={v.name}
                                    content={v.comment}
                                    time={v.update_time}
                                    isLike={false}
                                    isReply={false}
                                    showLineNum={10}
                                >
                                </Review>
                                <div className={`${className}-reviews-score`}>
                                    <Score color={'red'} size={'md'} score={v.score} content={'评分：'} isShow={true}/>
                                </div>
                            </div>
                        )
                    })
                }

                //成果模块
                if(feedbacks.achievements.length > 0)
                {
                    achievement =
                        <ModularContainer
                            className={`${className}-objective-title-header`}
                            name={'People Love'}
                        >
                            <div className={`${className}-objective-content`}>
                                {achievements}
                            </div>
                        </ModularContainer>
                }

                //问题模块
                if(feedbacks.questions.length > 0)
                {
                    question =
                        <ModularContainer
                            className={`${className}-objective-title`}
                            name={'工作问题'}
                        >
                            <div className={`${className}-objective-content`}>
                                {questions}
                            </div>
                        </ModularContainer>
                }

                // 部门目标模块
                if(this.props.reducer.data.loves.length > 0)
                {
                    objective =
                        <ModularContainer
                            className={`${className}-objective-title`}
                            name={'工作目标'}
                        >
                            <div className={`${className}-objective-content`}>
                                {objectives}
                            </div>
                        </ModularContainer>
                }

                //部门反馈模块
                if(feedbacks.describe)
                {
                    feedback =
                        <ModularContainer
                            className={`${className}-objective-title`}
                            name={'工作反馈'}
                        >
                            <div className={`${className}-objective-content`}>
                                {feedbackDesc}
                            </div>
                        </ModularContainer>
                }

                //调查情况模块
                if(feedbacks.surveys.length > 0)
                {
                    survey =
                        <ModularContainer
                            className={`${className}-objective-title`}
                            name={'调研情况'}
                        >
                            {surveys}
                        </ModularContainer>
                }

                //组织述职模块
                if(feedbacks.work.describe)
                {
                    work =
                        <ModularContainer
                            className={`${className}-objective-title`}
                            name={'组织述职'}
                        >
                            <div className={`${className}-objective-content`}>
                                {workDesc}
                                {workFiles}
                            </div>
                        </ModularContainer>
                }

                //点评模块
                if(feedbacks.comment_info.comments.length > 0)
                {
                    comment =
                        <ModularContainer
                            name={'点评'}
                            marginBottom={false}
                            extra={
                                <span className={`${className}-reviews-tag`}>
                                       <Tag color={'red'}>评分 {feedbacks.comment_info.score}</Tag>
                                       <Tag color={'purple'}>系数 {feedbacks.comment_info.coefficient}</Tag>
                                </span>
                            }
                        >
                            {reviews}
                        </ModularContainer>
                }
            }
            else
            {
                header =
                    <MessageTitle
                        className={`${className}-message`}
                        type={'danger'}
                        icon={<Icon type="exclamation-circle"/>}
                    >
                        {'暂无数据'}
                    </MessageTitle>
            }
        }
        return(
            <Spin spinning={this.props.reducer.isFetch} style={{height : $(window).height()}}>
                <div className={className}>
                    {header}
                    {objective}
                    {achievement}
                    {work}
                    {feedback}
                    {question}
                    {survey}
                    {comment}
                </div>
            </Spin>
        )

    }}

const mapStateToProps = state => ({
    reducer : state.performanceLoveFeedbackDetail,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    getLove, setLayout, setDefaultLayout
}

export default store => ({
    path: '/performance/love/feedback/detail/:feedbackId',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'performanceLoveFeedbackDetail', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Detail));
        })
    }
})