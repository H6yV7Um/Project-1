import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {Tag} from 'antd';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';
import Text from 'components/Text';
import ImageGrid from 'components/ImageGrid';

import './style.scss';

class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    static propTypes =
    {
        // 想法数据
        think               :   React.PropTypes.object.isRequired,
        // 是否显示操作项
        isShowOperation     :   React.PropTypes.bool,
        // 是否跳转详情
        isEnterDetail       :   React.PropTypes.bool
    }

    static defaultProps =
    {
        // 是否显示操作项
        isShowOperation     :   true,
        // 是否跳转详情
        isEnterDetail       :   true
    }

    componentDidMount() {

    }

    render()
    {
        let className = `appComponent-Think-Show`;
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }
        if(this.props.isEnterDetail)
        {
            componentClassName += ` ${className}-enter`;
        }

        // 标签
        let tag = null;
        if(this.props.think.think_tag_ids)
        {
            let tags = [];
            this.props.think.think_tag_ids[1].split(',').map((v, k) => {
                tags.push(<Tag key={k} color={'red'}>{v}</Tag>);
            });
            tag = <div className={`${className}-tag`}>{tags}</div>;
        }

        // 操作
        let operation = [];
        if(this.props.isShowOperation)
        {
            let operations = [];
            switch (this.props.think.type)
            {
                // 心情
                case 1:
                    operations = ['review', 'like'];
                    break;
                // 建议
                case 2:
                    operations = ['follow', 'review', 'no', 'yes'];
                    break;
                // 征集
                case 3:
                    operations = ['follow', 'review'];
                    if(this.props.think.is_vote == 1)
                    {
                        operations.push('vote');
                    }
                    break;
            }

            const operationItemWidth = `${100/operations.length}%`;
            operations.map((v, k) => {
                switch (v)
                {
                    // 关注
                    case 'follow':
                        operation.push(
                            <div key={v} className={`${className}-operation-item ${className}-follow`} style={{width : operationItemWidth}}>
                                <Icon className={`${className}-operation-icon ${this.props.think.is_follow ? `${className}-operation-choose` : ''}`} type={'star-o'} />
                                {this.props.think.follow_num ? <div className={`${className}-operation-num`}>{this.props.think.follow_num}</div> : null}
                            </div>
                        );
                        break;
                    // 评论
                    case 'review':
                        operation.push(
                            <div key={v} className={`${className}-operation-item ${className}-review`} style={{width : operationItemWidth}}>
                                <Icon className={`${className}-operation-icon ${this.props.think.is_review ? `${className}-operation-choose` : ''}`} type={'comments-o'} />
                                {this.props.think.review_num ? <div className={`${className}-operation-num`}>{this.props.think.review_num}</div> : null}
                            </div>
                        );
                        break;
                    // 不支持
                    case 'no':
                        operation.push(
                            <div key={v} className={`${className}-operation-item ${className}-no`} style={{width : operationItemWidth}}>
                                <Icon className={`${className}-operation-icon ${this.props.think.is_no ? `${className}-operation-choose` : ''}`} type={'thumbs-o-down'} />
                                {this.props.think.no_num ? <div className={`${className}-operation-num`}>{this.props.think.no_num}</div> : null}
                            </div>
                        );
                        break;
                    // 支持
                    case 'yes':
                        operation.push(
                            <div key={v} className={`${className}-operation-item ${className}-yes`} style={{width : operationItemWidth}} onClick={ e => {
                                {/*console.log(2)*/}
                                e.stopPropagation();
                            }}>
                                <Icon className={`${className}-operation-icon ${this.props.think.is_yes ? `${className}-operation-choose` : ''}`} type={'thumbs-o-up'} />
                                {this.props.think.yes_num ? <div className={`${className}-operation-num`}>{this.props.think.yes_num}</div> : null}
                            </div>
                        );
                        break;
                    // 赞
                    case 'like':
                        operation.push(
                            <div key={v} className={`${className}-operation-item ${className}-like`} style={{width : operationItemWidth}}>
                                <Icon className={`${className}-operation-icon ${this.props.think.is_yes ? `${className}-operation-choose` : ''}`} type={'heart-o'} />
                                {this.props.think.yes_num ? <div className={`${className}-operation-num`}>{this.props.think.yes_num}</div> : null}
                            </div>
                        );
                        break;
                    // 投票
                    case 'vote':
                        operation.push(
                            <div key={v} className={`${className}-operation-item ${className}-vote`} style={{width : operationItemWidth}}>
                                <Icon className={`${className}-operation-icon ${this.props.think.is_voted ? `${className}-operation-choose` : ''}`} type={'hand-pointer-o'} />
                                {this.props.think.vote_num ? <div className={`${className}-operation-num`}>{this.props.think.vote_num}</div> : null}
                            </div>
                        );
                        break;
                }
            });

            operation =
                <div className={`${className}-operation`}>
                    {operation}
                </div>
        }

        let style = this.props.style;
        if(!this.props.isShowOperation)
        {
            style.paddingBottom = 10;
        }

        return(
            <div
                className={componentClassName}
                style={style}
                onClick={() => {
                    if(this.props.isEnterDetail)
                    {
                        browserHistory.push(`/think/detail/${this.props.think.think_id}`);
                    }
                }}
            >
                {/*头像*/}
                <Avatar className={`${className}-user-avatar`} url={this.props.think.user_avatar} />
                <div className={`${className}-info`}>
                    {/*昵称*/}
                    <div className={`${className}-user-name`}>{this.props.think.user_name}</div>
                    {/*发表时间*/}
                    <div className={`${className}-time`}>{this.props.think.create_time}</div>
                </div>
                {/*状态*/}
                <div className={`${className}-status ${className}-status-${this.props.think.status_life[0]}`}>
                    <div className={`${className}-status-name`}>{this.props.think.status_life[1]}</div>
                    <Icon className={`${className}-status-icon`} type={'sort-up'} />
                </div>
                <div className={`${className}-body`}>
                    {/*内容*/}
                    <Text className={`${className}-content`} lineNum={10} fontSize={14} marginBottom={-3} style={{marginBottom : -5}}>{this.props.think.content}</Text>
                    {/*配图*/}
                    <ImageGrid
                        className={`${className}-photos`}
                        url={this.props.think.photos}
                        width={88}
                        height={88}
                        onClickImage={e => e.stopPropagation()}
                    />
                    {/*标签*/}
                    {tag}
                    {/*操作*/}
                    {operation}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
