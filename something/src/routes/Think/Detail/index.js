import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Row, Spin} from 'antd';
import {Toast, Modal as ModalAntd} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Col from 'components/Col';
import Review from 'components/Review';
import Reply from 'components/Reply';
import User from 'components/User';
import ThinkReview from 'appComponents/Think/Review';
import ThinkReply from 'appComponents/Think/Reply';
import MessageTitle from 'components/MessageTitle';
import Avatar from 'components/Avatar';
import Show from 'appComponents/Think/Show';
import Button from 'components/Button';
import Icon from 'components/Icon';
import ScrollLoad from 'components/ScrollLoad';
import Modal from 'components/Modal';
import ModularContainer from 'components/ModularContainer';
import TagSelect from 'components/TagSelect';
import QueueAnim from 'rc-queue-anim';
import $ from 'jquery';

import {getThink, saveReview, getReviews, deleteReview, openReviewLike, closeReviewLike, saveReply, deleteReply} from './action';
import {setLayout, setDefaultLayout} from 'layouts/ThinkLayout/action';

import './style.scss';

class Detail extends Component {
    constructor(props) {
        super(props);

        const time = new Date().getTime();

        this.state = {
            // 是否评论
            isReview        :   false,
            // 评论排序
            reviewOrder     :   'asc'
        };
        // 数据异常
        this.errors = {
            // 评论
            review : null,
            // 回复
            reply : null,
        };
        // 数据
        this.values = {
            // 评论
            review : null,
            // 回复
            reply : null,
        };
        // 评论板块key
        this.reviewKey = time;
        // 评论模态层key
        this.reviewModalKey = time + 100;
        // 回复模态层key
        this.replyModalKey = time + 200;
        // 回复对象ID
        this.replyObjId = null;
        // 回复对象类型 [review, reply]
        this.replyObjType = null;
    }

    componentWillMount() {
        // 获取详情
        this.props.getThink(this.props.params.thinkId,
            status => {
                Toast.info(<ToastContent type="fail" content={'该想法貌似已被删除了。。'} />, 3, null, false);
            }
        );

        // 获取评论
        this.props.getReviews(this.props.params.thinkId, this.props.reducer.gotThinkReviewIds, 5, this.state.reviewOrder);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    // 评论排序切换
    orderReview = () => {
        if(this.props.reducer.fetchGetReviews)
        {
            return;
        }

        const order = this.state.reviewOrder == 'asc' ? 'desc' : 'asc';

        // 获取评论
        this.props.getReviews(this.props.params.thinkId, null, 20, order)

        this.reviewKey = new Date().getTime();
        this.setState({reviewOrder : order});
    }

    // 准备评论
    readyReview = () => {
        this.setState({isReview : true});
    }

    // 取消评论
    cancelReview = () => {
        this.setState({isReview : false});
    }

    // 发表评论
    saveReview = () => {
        if(this.errors.review)
        {
            Toast.info(<ToastContent type="fail" content={this.errors.review} />, 5, null, false);
        }
        else
        {
            this.props.saveReview({...this.values.review, think_id : this.props.params.thinkId});
            // 重置
            this.reviewModalKey = new Date().getTime();
            this.setState({isReview : false});
        }
    }

    // 删除评论
    deleteReview = thinkReviewId => {
        ModalAntd.alert('删除评论', '你确定删除该评论吗？', [
            {text: '再想想', style: 'default'},
            {text: '删除', onPress: () => {
                this.props.deleteReview(thinkReviewId);
            }, style: {fontWeight: 'bold', color: '#ff3433'}},
        ]);
    }

    // 准备回复
    readyReply = (replyObjId, replyObjType) => {
        this.replyObjId = replyObjId;
        this.replyObjType = replyObjType;
        this.setState({isReply : true});
    }

    // 取消回复
    cancelReply = () => {
        this.setState({isReply : false});
    }

    // 发表回复
    saveReply = () => {
        if(this.errors.reply)
        {
            Toast.info(<ToastContent type="fail" content={this.errors.reply} />, 5, null, false);
        }
        else
        {
            // 提交
            this.props.saveReply(this.replyObjId, this.replyObjType, this.values.reply.reply);
            // 重置
            this.replyModalKey = new Date().getTime();
            this.setState({isReply : false});
        }
    }

    // 删除回复
    deleteReply = (thinkReplyId, thinkReviewId) => {
        ModalAntd.alert('删除回复', '你确定删除该回复吗？', [
            {text: '再想想', style: 'default'},
            {text: '删除', onPress: () => {
                this.props.deleteReply(thinkReplyId, thinkReviewId);
            }, style: {fontWeight: 'bold', color: '#ff3433'}},
        ]);
    }

    render() {
        // 想法
        let think = null;
        // 进度动态
        let news = null;
        // 投票
        let vote = null;
        // 评论
        let review = null;
        // 评论模态层
        let reviewModal = null;
        // 回复模态层
        let replyModal = null;
        // 操作
        let operation = [];

        if(this.props.reducer.think)
        {
            // ***想法***
            think =
                <Show
                    className="think"
                    style={{borderTop : 0}}
                    think={this.props.reducer.think}
                    isEnterDetail={false}
                    isShowOperation={false}
                />

            // ***操作***
            let operations = [];
            switch (this.props.reducer.think.type)
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
                    if(this.props.reducer.think.is_vote == 1)
                    {
                        operations.push('vote');
                    }
                    break;
            }

            const minWidth = 120;
            const spanWidth = document.body.clientWidth / 24;
            let span = 0;
            let isLine = false;
            operations.map((v, k) => {
                switch (v)
                {
                    // 关注
                    case 'follow':
                        span = operations.length == 2 && spanWidth * 8 >= minWidth ? 8 : 24 / operations.length;
                        isLine = spanWidth * span >= minWidth;
                        operation.push(
                            <Col key={'follow'} className={`follow ${isLine ? 'line' : 'wrap'}`} span={span}>
                                <Button name={[<div key="name" className="name">关注</div>, this.props.reducer.think.follow_num ? <div key="num" className="num">{this.props.reducer.think.follow_num}</div> : null]} type={'weaken'} isLine={isLine} isSideBorder={k != 0} sideBorderSize={'half'}
                                        icon={<Icon className={`icon ${this.props.reducer.think.is_follow ? 'choose' : ''}`} type={'star-o'}/>} action={() => {}} />
                            </Col>
                        );
                        break;
                    // 评论
                    case 'review':
                        span = operations.length == 2 && spanWidth * 8 >= minWidth ? 16 : 24 / operations.length;
                        isLine = spanWidth * span >= minWidth;
                        operation.push(
                            <Col key={'review'} className={`review ${isLine ? 'line' : 'wrap'}`} span={span}>
                                <Button name={[<div key="name" className="name">评论</div>, this.props.reducer.think.review_num ? <div key="num" className="num">{this.props.reducer.think.review_num}</div> : null]} type={'weaken'} isLine={isLine} isSideBorder={k != 0} sideBorderSize={'half'}
                                        icon={<Icon className={`icon ${this.props.reducer.think.is_review ? 'choose' : ''}`} type={'comments-o'}/>}
                                        action={this.readyReview} />
                            </Col>
                        );
                        break;
                    // 不支持
                    case 'no':
                        span = 24 / operations.length;
                        isLine = spanWidth * span >= minWidth;
                        operation.push(
                            <Col key={'no'} className={`no ${isLine ? 'line' : 'wrap'}`} span={span}>
                                <Button name={[<div key="name" className="name">不支持</div>, this.props.reducer.think.no_num ? <div key="num" className="num">{this.props.reducer.think.no_num}</div> : null]} type={'weaken'} isLine={isLine} isSideBorder={k != 0} sideBorderSize={'half'}
                                        icon={<Icon className={`icon ${this.props.reducer.think.is_no ? 'choose' : ''}`} type={'thumbs-o-down'}/>} action={() => {}} />
                            </Col>
                        );
                        break;
                    // 支持
                    case 'yes':
                        span = 24 / operations.length;
                        isLine = spanWidth * span >= minWidth;
                        operation.push(
                            <Col key={'yes'} className={`yes ${isLine ? 'line' : ''}`} span={span}>
                                <Button name={[<div key="name" className="name">支持</div>, this.props.reducer.think.yes_num ? <div key="num" className="num">{this.props.reducer.think.yes_num}</div> : null]} type={'weaken'} isLine={isLine} isSideBorder={k != 0} sideBorderSize={'half'}
                                        icon={<Icon className={`icon ${this.props.reducer.think.is_yes ? 'choose' : ''}`} type={'thumbs-o-up'}/>} action={() => {}} />
                            </Col>
                        );
                        break;
                    // 点赞
                    case 'like':
                        span = operations.length == 2 && spanWidth * 8 >= minWidth ? 8 : 24 / operations.length;
                        isLine = spanWidth * span >= minWidth;
                        operation.push(
                            <Col key={'like'} className={`like ${isLine ? 'line' : 'wrap'}`} span={span}>
                                <Button name={[<div key="name" className="name">点赞</div>, this.props.reducer.think.yes_num ? <div key="num" className="num">{this.props.reducer.think.yes_num}</div> : null]} type={'weaken'} isLine={isLine} isSideBorder={k != 0} sideBorderSize={'half'}
                                        icon={<Icon className={`icon ${this.props.reducer.think.is_yes ? 'choose' : ''}`} type={'heart-o'}/>} action={() => {}} />
                            </Col>
                        );
                        break;
                    // 投票
                    case 'vote':
                        span = 24 / operations.length;
                        isLine = spanWidth * span >= minWidth;
                        operation.push(
                            <Col key={'vote'} className={`vote ${isLine ? 'line' : 'wrap'}`} span={span}>
                                <Button name={[<div key="name" className="name">投票</div>, this.props.reducer.think.vote_num ? <div key="num" className="num">{this.props.reducer.think.vote_num}</div> : null]} type={'weaken'} isLine={isLine} isSideBorder={k != 0} sideBorderSize={'half'}
                                        icon={<Icon className={`icon ${this.props.reducer.think.is_voted ? 'choose' : ''}`} type={'hand-pointer-o'}/>} action={() => {}} />
                            </Col>
                        );
                        break;
                }
            });

            operation =
                <Row className="operation">
                    {operation}
                </Row>

            // ***评论***
            let reviews = [];
            if(this.props.reducer.reviews)
            {
                this.props.reducer.reviews.map((v, k) => {
                    // 点赞人
                    let likeUsers = [];
                    v.like_users.map((v2, k2) => {
                        likeUsers.push(
                            <User
                                key={k2}
                                userAvatar={v2.avatar}
                                userId={v2.user_id}
                                size={'x-sm'}
                            >
                                {v2.name}
                            </User>
                        );
                    });
                    // 回复
                    let replies = [];
                    v.reply.replies.map((v2, k2) => {
                        // 被回复人
                        let replyUser = null;
                        if(v2.reply_think_reply_id)
                        {
                            replyUser =
                                <User
                                    key={k2}
                                    userAvatar={v2.reply_user_avatar}
                                    userId={v2.reply_user_id}
                                    size={'x-sm'}
                                >
                                    {v2.reply_user_name}
                                </User>
                        }

                        replies.push(
                            <Reply
                                key={k2}
                                user={<User userAvatar={v2.user_avatar} userId={v2.user_id} size={'x-sm'}>{v2.user_name}</User>}
                                replyUser={replyUser}
                                time={v2.create_time}
                                reply={() => this.readyReply(v2.think_reply_id, 'reply')}
                                isDelete={v2.user_id == this.props.publicReducer.userInfo.user_id ? true : false}
                                delete={() => this.deleteReply(v2.think_reply_id, v.think_review_id)}
                            >
                                {v2.reply}
                            </Reply>
                        );
                    })
                    const review =
                        <Review
                            key={v.think_review_id}
                            userId={v.user_id}
                            userAvatar={v.user_avatar}
                            userName={v.user_name}
                            time={v.create_time}
                            likeNum={v.like_num}
                            openLike={() => this.props.openReviewLike(v.think_review_id, this.props.publicReducer.userInfo)}
                            closeLike={() => this.props.closeReviewLike(v.think_review_id, this.props.publicReducer.userInfo)}
                            isLiked={v.is_liked}
                            likeUsers={likeUsers}
                            likeUsersLength={10}
                            replyNum={v.reply_num}
                            replies={replies}
                            isGetReplies={!v.reply.is_end}
                            getReplies={() => this.props.getReplies(v.think_review_id, v.reply.got_reply_ids)}
                            isGettingReplies={v.reply.is_getting}
                            reply={() => this.readyReply(v.think_review_id, 'review')}
                            isDelete={v.user_id == this.props.publicReducer.userInfo.user_id ? true : false}
                            delete={() => this.deleteReview(v.think_review_id)}
                        >
                            {v.review}
                        </Review>
                    reviews.push(review);
                });

                if(reviews.length == 0 && !this.props.reducer.fetchGetReviews)
                {
                    reviews = <MessageTitle type="danger" icon={<Icon type="exclamation-circle"/>} title="暂无评论"/>;
                }
            }

            review =
                <ModularContainer
                    className="review"
                    name={'评论'}
                    marginBottom={false}
                    extra={<div className="review-extra-order" onClick={this.orderReview}><Icon type={`sort-amount-${this.state.reviewOrder}`} /></div>}
                >
                    <QueueAnim
                        type={'left'}
                        ease={'easeOutQuart'}
                    >
                        <ScrollLoad
                            key={this.reviewKey}
                            isLoad={this.props.reducer.hasReview}
                            load={() => this.props.getReviews(this.props.reducer.think.think_id, this.props.reducer.gotThinkReviewIds, 20, this.state.reviewOrder)}
                            offset={60}
                            isLoading={this.props.reducer.fetchGetReviews}
                            loadingClassName={'review-list-loading'}
                        >
                            {reviews}
                        </ScrollLoad>
                    </QueueAnim>
                </ModularContainer>

            // ***进度动态***
            if(this.props.reducer.think.status_life[0] > 100)
            {
                news =
                    <ModularContainer
                        className="news"
                        name={'进度动态'}
                        marginBottom={false}
                    >
                    </ModularContainer>
            }

            // ***投票***
            if(this.props.reducer.think.is_vote == 1)
            {
                vote =
                    <ModularContainer
                        className="vote"
                        name={'投票'}
                        marginBottom={false}
                    >
                    </ModularContainer>
            }

            // ***评论模态层***
            reviewModal=
                <Modal
                    className="review-modal"
                    isShow={this.state.isReview}
                    positionY={'bottom'}
                    hideWidth={document.body.clientWidth}
                    showAnimateName={'easeOutCubic'}
                    modalShowTime={300}
                    contentShowTime={250}
                    hideAnimateName={'easeInCubic'}
                    contentHideTime={250}
                    contentStyle={{backgroundColor : '#f2f2f2'}}
                >
                    <div key={this.reviewModalKey} className="review-border" style={{width : document.body.clientWidth}}>
                        <ThinkReview
                            setErrors={errors => this.errors.review = errors}
                            setValues={values => this.values.review = values}
                        />
                        <Row className="review-button">
                            <Col span={10}>
                                <Button name={'取消'} type={'weaken'} action={this.cancelReview} />
                            </Col>
                            <Col span={14}>
                                <Button name={'发表'} type={'think'} icon={<Icon type={'paper-plane-o'} />} iconStyle={{marginRight : 10, color : '#5AB2A3'}} action={this.saveReview} />
                            </Col>
                        </Row>
                    </div>
                </Modal>

            // ***回复模态层***
            replyModal=
                <Modal
                    className="reply-modal"
                    isShow={this.state.isReply}
                    positionY={'bottom'}
                    hideWidth={document.body.clientWidth}
                    showAnimateName={'easeOutCubic'}
                    modalShowTime={300}
                    contentShowTime={250}
                    hideAnimateName={'easeInCubic'}
                    contentHideTime={250}
                    contentStyle={{backgroundColor : '#f2f2f2'}}
                >
                    <div key={this.replyModalKey} className="reply-border" style={{width : document.body.clientWidth}}>
                        <ThinkReply
                            setErrors={errors => this.errors.reply = errors}
                            setValues={values => this.values.reply = values}
                        />
                        <Row className="reply-button">
                            <Col span={10}>
                                <Button name={'取消'} type={'weaken'} action={this.cancelReply} />
                            </Col>
                            <Col span={14}>
                                <Button name={'发表'} type={'think'} icon={<Icon type={'paper-plane-o'} />} iconStyle={{marginRight : 10, color : '#5AB2A3'}} action={this.saveReply} />
                            </Col>
                        </Row>
                    </div>
                </Modal>
        }

        return(
            <Spin spinning={this.props.reducer.fetchGetThink} style={{height : document.body.clientHeight}}>
                <div className="Think-Detail" style={{minHeight : document.body.clientHeight}}>
                    {/*想法*/}
                    {think}
                    {/*进度动态*/}
                    {news}
                    {/*投票*/}
                    {vote}
                    {/*评论*/}
                    {review}
                    {/*评论模态层*/}
                    {reviewModal}
                    {/*回复模态层*/}
                    {replyModal}
                    {/*操作*/}
                    {operation}
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.detailIndex,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getThink, saveReview, getReviews, deleteReview, openReviewLike, closeReviewLike, saveReply, deleteReply,
    setLayout, setDefaultLayout
}

export default store => ({
    path: 'detail/:thinkId',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'detailIndex', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Detail));
        })
    }
})
