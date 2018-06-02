import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Tag} from 'antd';
import ModularContainer from 'components/ModularContainer';
import Icon from 'components/Icon';
import Text from 'components/Text';
import TextList from 'components/TextList'
import MessageTitle from 'components/MessageTitle';

import './style.scss';

// love反馈展示
class FeedbackShow extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    static propTypes =
    {
        // LOVE数据
        love                    :   React.PropTypes.object.isRequired,
        // 反馈数据
        feedback                :   React.PropTypes.object.isRequired,
        // 是否跳转详情
        isDetail                :   React.PropTypes.bool
    }

    static defaultProps =
    {
        isDetail                :   true
    }

    render() {
        let className = 'appComponentsLoveFeedbackShow';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        let achievementsList;
        let achievements = [];
        this.props.feedback.achievements.map((v, k) => {
            achievements.push(
                // <div className={`${className}-achievements`} key={k}>
                //     <Icon type={'circle-thin'} className={`${className}-objectives-key-results-rank`}></Icon>
                //     <Text className={`${className}-achievements-info`} lineNum={8}>{v.describe}</Text>
                // </div>
                v.describe
            );
        })
        if(achievements.length <1){
            achievementsList =
                <MessageTitle
                    className={`${className}-message`}
                    type={'danger'}
                    icon={<Icon type="exclamation-circle"/>}
                >
                    {'暂无PEOPLE LOVE'}
                </MessageTitle>
        }else{
            achievementsList =
                <TextList content={achievements} fontSize={'sm'}/>

        }

        let titleColor = null;
        if(this.props.feedback.comment_info.coefficient < 0)
        {
            titleColor = '#999';
        }
        else if(this.props.feedback.comment_info.coefficient < 1)
        {
            titleColor = 'blue';
        }
        else if(this.props.feedback.comment_info.coefficient < 2)
        {
            titleColor = 'red';
        }
        else
        {
            titleColor = 'purple';
        }

        let score ;
        if(this.props.feedback.comment_info.score){
            score =
                <div className={`${className}-score-info ${className}-score-income`}>
                    <div className={`${className}-score`}>
                        <div className={`${className}-score-name`}>
                            评分 {this.props.feedback.comment_info.score} 分
                        </div>
                    </div>
                </div>
        }

        let coefficient;
        if(this.props.feedback.comment_info.coefficient){
            coefficient =
                <div className={`${className}-score-info ${className}-score-coefficient`}>
                    <div className={`${className}-score`}>
                        <div className={`${className}-score-name`}>
                            系数 {this.props.feedback.comment_info.coefficient}
                        </div>
                    </div>
                </div>
        }

        let scoreBlock;
        if(this.props.feedback.comment_info.coefficient || this.props.feedback.comment_info.score){
            scoreBlock =
                <div className={`${className}-score-border`}>
                    {/*收入*/}
                    {score}
                    {/*系数*/}
                    {coefficient}
                </div>
        }

        return(
            <ModularContainer
                className={componentClassName}
                paddingBottom={false}
                onClick={() => {
                    if(this.props.isDetail)
                    {
                        browserHistory.push(`/performance/love/feedback/detail/`+this.props.feedback._id);
                    }
                }}
            >
                <div className={`${className}-header`}>
                    <div className={`${className}-info`}>
                        <div className={`${className}-user`}>
                            <div className={`${className}-user-position`}>{this.props.love.name}</div>
                        </div>
                        <div className={`${className}-title-border`}>
                            <Tag className={`${className}-title`} color={titleColor}>
                                {`${this.props.love.attr.year}-Q${this.props.love.attr.stage}`}
                            </Tag>
                        </div>
                    </div>
                </div>
                {/*成果*/}
                {achievementsList}
                {/*评分*/}
                {scoreBlock}
            </ModularContainer>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackShow);
