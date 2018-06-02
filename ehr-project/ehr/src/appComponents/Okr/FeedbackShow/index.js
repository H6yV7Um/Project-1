import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Tag} from 'antd';
import ModularContainer from 'components/ModularContainer';
import Avatar from 'components/Avatar';
import Text from 'components/Text';

import './style.scss';

// okr反馈展示
class FeedbackShow extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    static propTypes =
    {
        // OKR数据
        okr                     :   React.PropTypes.object.isRequired,
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
        let className = 'appComponentsOkrFeedbackShow';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        let comments = [];
        this.props.feedback.comment_info.comments.map((v, k) => {
            comments.push(
                <div className={`${className}-comment`} key={k}>
                    <Avatar className={`${className}-comment-avatar`} size={'x-sm'} url={v.avatar}/>
                    <Text className={`${className}-comment-info`} lineNum={8}>{v.comment}</Text>
                </div>
            );
        })

        let titleColor = null;
        if(this.props.feedback.comment_info.score < 90)
        {
            titleColor = '#999';
        }
        else if(this.props.feedback.comment_info.score < 100)
        {
            titleColor = 'blue';
        }
        else if(this.props.feedback.comment_info.score < 110)
        {
            titleColor = 'red';
        }
        else if(this.props.feedback.comment_info.score <= 120)
        {
            titleColor = 'purple';
        }

        return(
            <ModularContainer
                className={componentClassName}
                paddingBottom={false}
                onClick={() => {
                    if(this.props.isDetail)
                    {
                        browserHistory.push(`/performance/okr/Feedback/detail/${this.props.feedback._id}`);
                    }
                }}
            >
                <div className={`${className}-header`}>
                    <Avatar className={`${className}-avatar`} url={this.props.okr.avatar}/>
                    <div className={`${className}-info`}>
                        <div className={`${className}-user`}>
                            <div className={`${className}-user-name`}>{this.props.okr.name}</div>
                            <div className={`${className}-user-position`}>{this.props.okr.position}</div>
                        </div>
                        <div className={`${className}-title-border`}>
                            <Tag className={`${className}-title`} color={titleColor}>
                                {`${this.props.okr.attr.year}-Q${this.props.okr.attr.stage == 2 ? this.props.feedback.stage + 2 : this.props.feedback.stage}`}
                            </Tag>
                        </div>
                    </div>
                </div>
                {/*评价*/}
                <div className={`${className}-comment-border`}>
                    {comments}
                </div>
                {/*评分*/}
                <div className={`${className}-score-border`}>
                    {/*工作成果*/}
                    <div className={`${className}-score-info ${className}-score-achievement`}>
                        <div className={`${className}-score-name`}>{'成果'}</div>
                        <div className={`${className}-score`}>{this.props.feedback.comment_info.achievement_score}</div>
                    </div>
                    {/*工作过程*/}
                    <div className={`${className}-score-info ${className}-score-process`}>
                        <div className={`${className}-score-name`}>{'过程'}</div>
                        <div className={`${className}-score`}>{this.props.feedback.comment_info.process_score}</div>
                    </div>
                    {/*综合得分*/}
                    <div className={`${className}-score-info ${className}-score-composite`}>
                        <div className={`${className}-score-name`}>{'综合'}</div>
                        <div className={`${className}-score`}>{this.props.feedback.comment_info.composite_score}</div>
                    </div>
                    {/*最后得分*/}
                    <div className={`${className}-score-info ${className}-score-sum`}>
                        <div className={`${className}-score-name`}>{'总计'}</div>
                        <div className={`${className}-score`}>{this.props.feedback.comment_info.score}</div>
                    </div>
                </div>
            </ModularContainer>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackShow);
