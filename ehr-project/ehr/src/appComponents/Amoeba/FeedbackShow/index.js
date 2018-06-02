import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Tag} from 'antd';
import ModularContainer from 'components/ModularContainer';
import Icon from 'components/Icon';
import Text from 'components/Text';
import TextList from 'components/TextList'

import './style.scss';

// AMB反馈展示
class FeedbackShow extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    static propTypes =
    {
        // AMB数据
        amoeba                    :   React.PropTypes.object.isRequired,
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
        let className = 'appComponentsAmoebaFeedbackShow';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        let feedbacks = [];
        this.props.feedback.questions.map((v, k) => {
            feedbacks.push(
                // <div className={`${className}-feedbacks`} key={k}>
                //     <Icon type={'circle-thin'} className={`${className}-objectives-key-results-rank`}></Icon>
                //     <Text className={`${className}-feedbacks-info`} lineNum={8}>{v.describe}</Text>
                // </div>
                v.describe
            );
        })

        let describe = this.props.feedback.describe ?
            <div className={`${className}-comment-border`}>
                <div className={`${className}-comment`}>
                    {this.props.feedback.describe}
                </div>
            </div> : ''

        let question = feedbacks.length>1 ?
            <TextList content={feedbacks} fontSize={'sm'} iconSize={'sm'} className={`${className}-text-list`}/>
            : ''

        let income;
        if(this.props.feedback.income_increases){
            income =
                <div className={`${className+'-long-arrow-'}${parseFloat(this.props.feedback.income_increases)>=0 ? 'up' : 'down'}`}>
                    <Icon type={`long-arrow-${parseFloat(this.props.feedback.income_increases)>=0 ? 'up' : 'down'}`} style={{marginRight:3}}></Icon>
                    {(parseFloat(this.props.feedback.income_increases) * 100).toFixed(2)}%
                </div>
        }

        let profit;
        if(this.props.feedback.profit_increases){
            profit =
                <div className={`${className+'-long-arrow-'}${parseFloat(this.props.feedback.profit_increases)>=0 ? 'up' : 'down'}`}>
                    <Icon type={`long-arrow-${parseFloat(this.props.feedback.profit_increases)>=0 ? 'up' : 'down'}`} style={{marginRight:3}}></Icon>
                    {(parseFloat(this.props.feedback.profit_increases) * 100).toFixed(2)}%
                </div>
        }
        let hr;
        if(this.props.feedback.describe && feedbacks.length>1){
            hr = <div className={`${className}-hr`}></div>
        }

        let titleColor = null;
        if(this.props.feedback.coefficient < 0)
        {
            titleColor = '#999';
        }
        else if(this.props.feedback.coefficient < 1)
        {
            titleColor = 'blue';
        }
        else if(this.props.feedback.coefficient < 2)
        {
            titleColor = 'red';
        }
        else
        {
            titleColor = 'purple';
        }

        let incomeBlock;
        if(this.props.feedback.income){
            incomeBlock =
                (
                    <div>
                        <div className={`${className}-score-name`}>
                            收入 {this.props.feedback.income/10000} 万
                        </div>
                        {income}
                    </div>
                )
        }

        let profitBlock;
        if(this.props.feedback.profit){
            profitBlock =
                (
                    <div>
                        <div className={`${className}-score-name`}>
                            利润 {this.props.feedback.profit/10000} 万
                        </div>
                        {profit}
                    </div>
                )
        }

        let coefficient;
        if(this.props.feedback.coefficient){
            coefficient =
                <div className={`${className}-score`}>系数 {this.props.feedback.coefficient}</div>
        }

        let scoreBlock;
        if(this.props.feedback.income || this.props.feedback.profit || this.props.feedback.coefficient){
            scoreBlock =
                (
                    <div className={`${className}-score-border`}>
                        <div className={`${className}-score`}>
                            {/*收入*/}
                            <div className={`${className}-score-info ${className}-score-income`}>
                                {incomeBlock}
                            </div>
                            {/*利润*/}
                            <div className={`${className}-score-info ${className}-score-profit`}>
                                {profitBlock}
                            </div>
                        </div>
                        {/*系数*/}
                        <div className={`${className}-score-coefficient`}>
                            {coefficient}
                        </div>
                    </div>
                )
        }else{
            scoreBlock = ''
        }

        return(
            <ModularContainer
                className={componentClassName}
                paddingBottom={false}
            >
                <div className={`${className}-header`}>
                    <div className={`${className}-info`}>
                        <div className={`${className}-user`}>
                            <div className={`${className}-user-position`}>{this.props.amoeba.name}</div>
                            {/*<div className={`${className}-user-score`}>{`${this.props.feedback.comment_info.score ? '- ' + this.props.feedback.comment_info.score + '分' : ''}`}</div>*/}
                        </div>
                        <div className={`${className}-title-border`}>
                            <Tag className={`${className}-title`} color={titleColor}>
                                {`${this.props.amoeba.attr.year}-Q${this.props.amoeba.attr.stage}`}
                            </Tag>
                        </div>
                    </div>
                </div>
                {/*描述*/}
                {describe}
                {/*分割线*/}
                {hr}
                {/*问题*/}
                {question}
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
