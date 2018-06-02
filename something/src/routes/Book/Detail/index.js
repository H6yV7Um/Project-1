import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Row, Tag, Spin} from 'antd';
import Col from 'components/Col';
import {WingBlank, SwipeAction, Toast, List, Modal as ModalAntd} from 'antd-mobile';
import Review from 'components/Review';
import Reply from 'components/Reply';
import BookReply from 'appComponents/Book/Reply';
import Icon from 'components/Icon';
import ToastContent from 'components/ToastContent';
import Button from 'components/Button';
import Modal from 'components/ModalAntd';
import Cover from 'appComponents/Book/Cover';
import Avatar from 'components/Avatar';
import Rate from 'components/Rate';
import ModularContainer from 'components/ModularContainer';
import Text from 'components/Text';
import BookShow from 'appComponents/Book/Show';
import Grid from 'components/Grid';
import getSrc from 'utils/imgSrc';
import BookReview from 'appComponents/Book/Review';
import ReviewForward from 'appComponents/Book/ReviewForward';
import Forward from 'appComponents/Book/Forward';
import Remind from 'appComponents/Dingding/Remind';
import MessageTitle from 'components/MessageTitle';
import User from 'components/User';
import UserList from 'components/UserList';
import ScrollFixed from 'components/ScrollFixed';
import ScrollLoad from 'components/ScrollLoad';
import getUrl from 'utils/url';
import browserAttr from 'utils/browserAttr';
import QueueAnim from 'rc-queue-anim';

import {getDetail, getAkin, getSns, saveScore, openLike, closeLike, openCollection, closeCollection, openForward, closeForward,
    getShowReview, getWonderfulReview, getCommonReview, clearCommonReview, openReviewLike, closeReviewLike, openReviewFollow, closeReviewFollow, saveReview, deleteReview,
    openReviewForward, closeReviewForward, submitReply, deleteReply, getReplies, clear} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class Detail extends Component {
    constructor(props) {
        super(props);

        const time = new Date().getTime();

        this.state = {
            // 是否书评
            isReview : false,
            // 是否评分
            isScore : false,
            // 是否转发
            isForward : false,
            // 是否回复
            isReply : false,
            // 是否转发书评
            isForwardReview : false,
            // 普通书评排序
            commonReviewOrder : 'asc',
            // 是否展示书sns信息
            isShowSns : false
        };

        // 数据异常
        this.errors = {
            // 书评
            review : null,
            // 评分
            score : null,
            // 转发
            forward : null,
            // 回复
            reply : null,
            // 书评转发
            reviewForward : null
        };
        // 数据
        this.values = {
            // 书评
            review : null,
            // 书评提醒
            reviewRemind : null,
            // 评分
            score : null,
            // 转发
            forward : null,
            // 回复
            reply : null,
            // 书评转发
            reviewForward : null
        };
        // 执行书评Ding
        this.reviewRunDing = null;
        // 书评模态层key
        this.reviewModalKey = time;
        // 评分模态层key
        this.scoreModalKey = time + 100;
        // 转发模态层key
        this.forwardModalKey = time + 200;
        // 回复模态层key
        this.replyModalKey = time + 300;
        // 书评转发模态层key
        this.reviewForwardModalKey = time + 400;
        // 回复对象ID
        this.replyObjId = null;
        // 回复对象类型 [review, reply]
        this.replyObjType = null;
        // 转发书评ID
        this.forwardReviewId = null;
        // 普通书评板块key
        this.commonReviewKey = time + 500;
    }

    componentWillMount() {
        this.props.setLayout({title: ' ', footer: false});
    }

    componentDidMount() {
        // 获取详情
        this.props.getDetail(this.props.params.bookId,
            data => {
                // 标题
                this.props.setLayout({
                    title : `《${data.name}》`,
                    footer:
                        <Row key={new Date().getTime()}>
                            <Col span={6}>
                                <Button name={'推荐'} style={{}} type={'weaken'} action={this.recommend} />
                            </Col>
                            <Col span={12}>
                                <Button name={'发表书评'} type={'weaken'} action={this.readyReview} isSideBorder={true} sideBorderSize={'half'} />
                            </Col>
                            <Col span={6}>
                                <Button name={'阅读'} action={()=>{}} />
                            </Col>
                        </Row>
                });
            },
            status => {
                Toast.info(<ToastContent type="fail" content={status.message} />, 3, null, false);
            }
        );

        // 获取相似书
        this.props.getAkin(this.props.params.bookId, Math.floor((document.body.clientWidth - 15) / ((browserAttr.versions.mobile ? 55 : 75) + 15)));

        // 获取初始展示书评
        this.props.getShowReview(this.props.params.bookId);

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
        this.props.clear();
    }

    // 获取书sns信息
    getSns = () => {
        this.setState({isShowSns : true});
        this.props.getSns(this.props.reducer.book.book_id);
    }

    // 推荐
    recommend = () => {
        const name = this.props.reducer.book.name.replace(/\//g,'%2F');
        const author = this.props.reducer.book.author.replace(/\//g,'%2F');
        this.props.router.push(`/book/recommend/${name}/${author}`);
    }

    // 点赞书
    changeLike = () => {
        if(this.props.reducer.book.is_liked)
        {
            // 取消点赞
            this.props.closeLike(this.props.reducer.book.book_id, this.props.publicReducer.userInfo);
        }
        else
        {
            // 点赞
            this.props.openLike(this.props.reducer.book.book_id, this.props.publicReducer.userInfo);
        }
    }

    // 收藏书
    changeCollection = () => {
        if(this.props.reducer.book.is_collected)
        {
            // 取消收藏
            this.props.closeCollection(this.props.reducer.book.book_id, this.props.publicReducer.userInfo);
        }
        else
        {
            // 收藏
            this.props.openCollection(this.props.reducer.book.book_id, this.props.publicReducer.userInfo);
        }
    }

    // 关注书评
    changeFollowReview = () => {
        if(this.props.reducer.book.is_followed_review)
        {
            // 取消关注书评
            this.props.closeReviewFollow(this.props.reducer.book.book_id);
            Toast.info(<ToastContent type="info" content={'你将不再收到该书最新书评'} />, 3, null, false);
        }
        else
        {
            // 关注书评
            this.props.openReviewFollow(this.props.reducer.book.book_id);
            Toast.info(<ToastContent type="info" content={'你将会收到该书最新书评'} />, 3, null, false);
        }
    }

    // 准备书评
    readyReview = () => {
        this.setState({isReview : true});
    }

    // 取消书评
    cancelReview = () => {
        this.setState({isReview : false});
    }

    // 发表书评
    saveReview = () => {
        if(this.errors.review)
        {
            Toast.info(<ToastContent type="fail" content={this.errors.review} />, 5, null, false);
        }
        else
        {
            // 书评
            this.props.saveReview(this.props.reducer.book.book_id, this.values.review.review, this.values.reviewRemind, data => {
                // Ding
                this.reviewRunDing(
                    this.values.reviewRemind,
                    this.values.review.review,
                    `《${this.props.reducer.book.name}》`,
                    this.props.reducer.book.profile,
                    getUrl(`/book/detail/${this.props.reducer.book.book_id}`),
                    getSrc(this.props.reducer.book.cover)
                );
            });
            // 重置
            this.reviewModalKey = new Date().getTime();
            this.setState({isReview : false});
        }
    }

    // 删除书评
    deleteReview = (bookReviewId, isWonderful) => {
        ModalAntd.alert('删除书评', '你确定删除该书评吗？', [
            {text: '再想想', style: 'default'},
            {text: '删除', onPress: () => {
                this.props.deleteReview(bookReviewId, isWonderful);
            }, style: {fontWeight: 'bold', color: '#ff3433'}},
        ]);
    }

    // 准备评分
    readyScore = () => {
        this.setState({isScore : true});
    }

    // 取消评分
    cancelScore = () => {
        this.setState({isScore : false});
        // 重置
        this.scoreModalKey = new Date().getTime();
    }

    // 保存评分
    saveScore = () => {
        if(this.errors.score)
        {
            Toast.info(<ToastContent type="fail" content={this.errors.score} />, 5, null, false);
        }
        else
        {
            this.props.saveScore(this.props.reducer.book.book_id, this.values.score.score);
            this.setState({isScore : false});
        }
    }

    // 准备转发
    readyForward = () => {
        this.setState({isForward : true});
    }

    // 取消转发
    cancelForward = () => {
        this.setState({isForward : false});
    }

    // 发表转发
    saveForward = () => {
        if(this.errors.forward)
        {
            Toast.info(<ToastContent type="fail" content={this.errors.forward} />, 5, null, false);
        }
        else
        {
            // 提交
            this.props.openForward(this.props.reducer.book.book_id, this.values.forward.forward, this.props.publicReducer.userInfo);
            // 重置
            this.forwardModalKey = new Date().getTime();
            this.setState({isForward : false});
        }
    }

    // 转发
    changeForward = () => {
        if(this.props.reducer.book.user_id == this.props.publicReducer.userInfo.user_id)
        {
            Toast.info(<ToastContent type="info" content={'不能转发自己管理的书哦~'} />, 5, null, false);
            return;
        }

        if(this.props.reducer.book.is_forwarded)
        {
            // 取消转发
            this.props.closeForward(this.props.reducer.book.book_id, this.props.publicReducer.userInfo);
        }
        else
        {
            // 转发
            this.readyForward();
        }
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
    submitReply = () => {
        if(this.errors.reply)
        {
            Toast.info(<ToastContent type="fail" content={this.errors.reply} />, 5, null, false);
        }
        else
        {
            // 提交
            this.props.submitReply(this.replyObjId, this.replyObjType, this.values.reply.reply);
            // 重置
            this.replyModalKey = new Date().getTime();
            this.setState({isReply : false});
        }
    }

    // 删除回复
    deleteReply = (bookReplyId, bookReviewId) => {
        ModalAntd.alert('删除回复', '你确定删除该回复吗？', [
            {text: '再想想', style: 'default'},
            {text: '删除', onPress: () => {
                this.props.deleteReply(bookReplyId, bookReviewId);
            }, style: {fontWeight: 'bold', color: '#ff3433'}},
        ]);
    }

    // 准备转发书评
    readyReviewForward = reviewId => {
        this.forwardReviewId = reviewId;
        this.setState({isForwardReview : true});
    }

    // 取消转发书评
    cancelReviewForward = () => {
        this.setState({isForwardReview : false});
    }

    // 发表转发书评
    saveReviewForward = () => {
        if(this.errors.reviewForward)
        {
            Toast.info(<ToastContent type="fail" content={this.errors.reviewForward} />, 5, null, false);
        }
        else
        {
            // 提交
            this.props.openReviewForward(this.forwardReviewId, this.values.reviewForward.forward, this.props.publicReducer.userInfo);
            // 重置
            this.reviewForwardModalKey = new Date().getTime();
            this.setState({isForwardReview : false});
        }
    }

    // 普通书评排序切换
    orderCommonReview = () => {
        if(this.props.reducer.fetchGetCommonReviews)
        {
            return;
        }

        const order = this.state.commonReviewOrder == 'asc' ? 'desc' : 'asc';

        // 清空普通书评
        this.props.clearCommonReview();

        // 获取普通书评
        this.props.getCommonReview(this.props.reducer.book.book_id, this.props.reducer.commonReviewGotIds, order)

        this.commonReviewKey = new Date().getTime();
        this.setState({commonReviewOrder : order});
    }

    render() {
        let bookBorder = null;
        // 书
        let book = null;
        // 书操作
        let bookOperation = null;
        // 书sns信息
        let bookSns = null;
        // 简介
        let profile = null;
        // 推荐书列表
        let recommendBooks = null;
        // 精彩书评列表
        let wonderfulReviews = null;
        // 普通书评列表
        let commonReviews = null;
        // 书评
        let reviewModal = null;
        // 评分
        let scoreModal = null;
        // 转发
        let forwardModal = null;
        // 回复
        let replyModal = null;
        // 书评转发
        let reviewForwardModal = null;

        if(this.props.reducer.book)
        {
            book =
                <div className="book-info clear">
                    {/*封面*/}
                    <Cover className="cover" cover={this.props.reducer.book.cover} size={'normal'} />
                    {/*书名*/}
                    <div className="name">{this.props.reducer.book.name}</div>
                    {/*作者*/}
                    <div className="author clear">
                        <div>{this.props.reducer.book.author}</div>
                    </div>
                    {/*推荐*/}
                    <div className="user clear">
                        <div className="user-label">推荐</div>
                        <Avatar className="user-avatar" url={this.props.reducer.book.user_avatar} userId={this.props.reducer.book.user_id} />
                        <div className="user-name">
                            {this.props.reducer.book.user_name}
                        </div>
                    </div>
                    {/*评分*/}
                    <div className="score clear">
                        <div className="score-label">星级</div>
                        <Rate className="rate" value={this.props.reducer.book.score} disabled={true} allowHalf={true} />
                    </div>
                    {/*时间*/}
                    <div className="time">
                        {this.props.reducer.book.create_time}
                    </div>
                </div>

            // 书操作
            bookOperation =
                <div className="operation-border" ref={dom => this.operationDom = dom}>
                    <ScrollFixed
                        className={'operation-fixed'}
                        name={'operation'}
                        targetDom={this.operationDom}
                    >
                        <Row className="operation">
                            <Col span={6}>
                                <Button
                                    name={`评分${this.props.reducer.book.score_num ? ` (${this.props.reducer.book.score_num})` : ''}`}
                                    action={this.readyScore}
                                    icon={<Icon className={`icon-score ${this.props.reducer.book.my_score ? 'choose' : ''}`} type={'pencil-square-o'} />}
                                    type={'null'} isLine={false} nameStyle={{fontSize: 12}} iconStyle={{marginTop: 0.5}}
                                />
                            </Col>
                            <Col span={6}>
                                <Button
                                    name={`转发${this.props.reducer.book.forward_num ? ` (${this.props.reducer.book.forward_num})` : ''}`}
                                    action={this.changeForward}
                                    icon={<Icon className={`icon-forward ${this.props.reducer.book.is_forwarded ? 'choose' : ''}`} type={'skip'} classType={'it'} />}
                                    type={'null'} isLine={false} nameStyle={{fontSize: 12}} iconStyle={{marginTop: 3}}
                                />
                            </Col>
                            <Col span={6}>
                                <Button
                                    name={`收藏${this.props.reducer.book.collection_num > 0 ? ` (${this.props.reducer.book.collection_num})` : ''}`}
                                    action={this.changeCollection}
                                    icon={<Icon className={`icon-collection ${this.props.reducer.book.is_collected ? 'choose' : ''}`} type={'star-o'} />}
                                    type={'null'} isLine={false} nameStyle={{fontSize: 12}}
                                />
                            </Col>
                            <Col span={6}>
                                <Button
                                    name={`点赞${this.props.reducer.book.like_num > 0 ? ` (${this.props.reducer.book.like_num})` : ''}`}
                                    action={this.changeLike}
                                    icon={<Icon className={`icon-like ${this.props.reducer.book.is_liked ? 'choose' : ''}`} type={'heart-o'} />}
                                    type={'null'} isLine={false} nameStyle={{fontSize: 12}}
                                />
                            </Col>
                        </Row>
                    </ScrollFixed>
                </div>

            // 书sns信息
            if(this.props.reducer.book.forward_num || this.props.reducer.book.collection_num || this.props.reducer.book.like_num)
            {
                // 转发人
                let forwardUsers = [];
                this.props.reducer.book.forward_users.map((v, k) => {
                    forwardUsers.push(
                        <User
                            key={k}
                            userAvatar={v.avatar}
                            userId={v.user_id}
                            size={'x-sm'}
                        >
                            {v.name}
                        </User>
                    );
                });
                // 收藏人
                let collectionUsers = [];
                this.props.reducer.book.collection_users.map((v, k) => {
                    collectionUsers.push(
                        <User
                            key={k}
                            userAvatar={v.avatar}
                            userId={v.user_id}
                            size={'x-sm'}
                        >
                            {v.name}
                        </User>
                    );
                });
                // 点赞人
                let likeUsers = [];
                this.props.reducer.book.like_users.map((v, k) => {
                    likeUsers.push(
                        <User
                            key={k}
                            userAvatar={v.avatar}
                            userId={v.user_id}
                            size={'x-sm'}
                        >
                            {v.name}
                        </User>
                    );
                });
                bookSns =
                    <div className="sns-border">
                        <div className="sns-show" style={{display : this.state.isShowSns ? 'block' : 'none'}}>
                            {/*转发*/}
                            <UserList
                                users={forwardUsers}
                                length={10}
                                icon={<Icon className={'sns-icon-forward'} type={'skip'} classType={'it'} />}
                                size={'x-sm'}
                            />
                            {/*收藏*/}
                            <UserList
                                users={collectionUsers}
                                length={10}
                                icon={<Icon className={'sns-icon-collection'} type={'star-o'} />}
                                size={'x-sm'}
                            />
                            {/*点赞*/}
                            <UserList
                                users={likeUsers}
                                length={10}
                                icon={<Icon className={'sns-icon-like'} type={'heart-o'} />}
                                size={'x-sm'}
                            />
                        </div>
                        <div style={{display : this.state.isShowSns && !this.props.reducer.fetchGetSns ? 'none' : 'block'}}>
                            <Spin spinning={this.props.reducer.fetchGetSns ? true : false}>
                                <div className="sns-lock" onClick={this.getSns}>
                                    <Icon type={'ellipsis-h'} />
                                </div>
                            </Spin>
                        </div>
                    </div>
            }

            bookBorder =
                <ModularContainer borderTop={false} paddingBottom={false}>
                    {/*书*/}
                    {book}
                    {/*书操作*/}
                    {bookOperation}
                    {/*书sns信息*/}
                    {bookSns}
                </ModularContainer>

            // 简介
            const bookTagNames = this.props.reducer.book.book_tag_ids ? this.props.reducer.book.book_tag_ids.split(',') : [];
            let bookTags = [];
            bookTagNames.map((v, k) => {
                bookTags.push(<Tag key={k} color={'red'}>{v}</Tag>);
            });
            profile =
                <ModularContainer
                    name="简介"
                    explain={
                        <div className="tags">{bookTags}</div>
                    }
                >
                    <Text className="profile" lineNum={4} marginBottom={-15}>{this.props.reducer.book.profile}</Text>
                </ModularContainer>

            // 猜你喜欢
            if(this.props.reducer.akinBooks && this.props.reducer.akinBooks.length > 0)
            {
                let books = [];
                this.props.reducer.akinBooks.map((v, k) => {
                    books.push(
                        <BookShow
                            key={k}
                            book={v}
                            size={'x-small'}
                        />
                    );
                })

                recommendBooks =
                    <ModularContainer
                        name="猜你喜欢"
                        extra={<Link to={`${"/book/book_recommend_list/"}` + this.props.params.bookId}><div className="recommend-extra-more"><Icon type={'angle-right'} /></div></Link>}
                    >
                        <Spin spinning={this.props.reducer.fetchGetAkin}>
                            <Grid
                                style={{marginBottom : -9}}
                                width={browserAttr.versions.mobile ? 55 : 75}
                                itemList={books}
                            />
                        </Spin>
                    </ModularContainer>
            }

            // 书评
            if(this.props.reducer.reviews)
            {
                // 关注书评
                let followReview =
                    <div className="reviews-extra-follow" key="follow" onClick={this.changeFollowReview}>
                        <Icon className={this.props.reducer.book.is_followed_review ? 'followed-review' : 'follow-review'} type={'dengpao'} classType={'it'} />
                        <div className="follow-review-msg">关注书评{this.props.reducer.book.follow_review_num ? ` (${this.props.reducer.book.follow_review_num})` : null}</div>
                    </div>

                let commonReviewList = [];
                let wonderfulReviewList = [];
                this.props.reducer.reviews.map((v, k) => {
                    // 转发人
                    let forwardUsers = [];
                    v.forward_users.map((v2, k2) => {
                        forwardUsers.push(
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
                    v.reply_list.replies.map((v2, k2) => {
                        // 被回复人
                        let replyUser = null;
                        if(v2.reply_book_reply_id)
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
                                reply={() => this.readyReply(v2.book_reply_id, 'reply')}
                                isDelete={v2.user_id == this.props.publicReducer.userInfo.user_id ? true : false}
                                delete={() => this.deleteReply(v2.book_reply_id, v.book_review_id)}
                            >
                                {v2.reply}
                            </Reply>
                        );
                    })
                    const review =
                        <Review
                            key={v.book_review_id}
                            userId={v.user_id}
                            userAvatar={v.user_avatar}
                            userName={v.user_name}
                            time={v.create_time}
                            isForward={v.user_id != this.props.publicReducer.userInfo.user_id}
                            forwardNum={v.forward_num}
                            openForward={() => this.readyReviewForward(v.book_review_id)}
                            closeForward={() => this.props.closeReviewForward(v.book_review_id, this.props.publicReducer.userInfo)}
                            isForwarded={v.is_forwarded ? true : false}
                            forwardUsers={forwardUsers}
                            forwardUsersLength={10}
                            likeNum={v.like_num}
                            openLike={() => this.props.openReviewLike(v.book_review_id, this.props.publicReducer.userInfo)}
                            closeLike={() => this.props.closeReviewLike(v.book_review_id, this.props.publicReducer.userInfo)}
                            isLiked={v.is_liked ? true : false}
                            likeUsers={likeUsers}
                            likeUsersLength={10}
                            replyNum={v.reply_num}
                            replies={replies}
                            isGetReplies={v.reply_list.is_end ? false : true}
                            getReplies={() => this.props.getReplies(v.book_review_id, v.reply_list.got_reply_ids)}
                            isGettingReplies={v.reply_list.is_getting}
                            reply={() => this.readyReply(v.book_review_id, 'review')}
                            isDelete={v.user_id == this.props.publicReducer.userInfo.user_id ? true : false}
                            delete={() => this.deleteReview(v.book_review_id, v.wonderful)}
                        >
                            {v.review}
                        </Review>
                    if(v.wonderful)
                    {
                        wonderfulReviewList.push(review);
                    }
                    else
                    {
                        commonReviewList.push(review);
                    }
                });

                let wonderfulReviewMore = null;
                if(this.props.reducer.hasWonderfulReviews)
                {
                    wonderfulReviewMore =
                        <Spin spinning={this.props.reducer.fetchGetWonderfulReviews ? true : false}>
                            <div className="wonderful-review-more" onClick={() => this.props.getWonderfulReview(this.props.reducer.book.book_id, this.props.reducer.wonderfulReviewGotIds)}>
                                <Icon type={'ellipsis-h'} />
                            </div>
                        </Spin>
                }

                if(wonderfulReviewList.length > 0)
                {
                    wonderfulReviews =
                        <ModularContainer className="wonderful-review" name={`精彩书评 (${this.props.reducer.wonderfulReviewCount})`} extra={followReview}>
                            <QueueAnim
                                type={'left'}
                                ease={'easeOutQuart'}
                            >
                                {wonderfulReviewList}
                                {wonderfulReviewMore}
                            </QueueAnim>
                        </ModularContainer>
                }

                if(commonReviewList.length == 0 && !this.props.reducer.fetchGetCommonReviews)
                {
                    commonReviewList = <MessageTitle type="danger" icon={<Icon type="exclamation-circle"/>} title="暂无书评"/>;
                }

                commonReviews =
                    <ModularContainer
                        className="common-review"
                        name={wonderfulReviews == null ? `书评${this.props.reducer.commonReviewCount ? ` (${this.props.reducer.commonReviewCount})` : ''}` : `其他书评${this.props.reducer.commonReviewCount ? ` (${this.props.reducer.commonReviewCount})` : ''}`}
                        marginBottom={false}
                        extra={
                            <div>
                                {wonderfulReviews == null ? followReview : null}
                                <div className="reviews-extra-order" key="order" onClick={this.orderCommonReview}><Icon type={`sort-amount-${this.state.commonReviewOrder}`} /></div>
                            </div>
                        }
                    >
                        <QueueAnim
                            type={'left'}
                            ease={'easeOutQuart'}
                        >
                            <ScrollLoad
                                key={this.commonReviewKey}
                                isLoad={this.props.reducer.hasCommonReviews}
                                load={() => this.props.getCommonReview(this.props.reducer.book.book_id, this.props.reducer.commonReviewGotIds, this.state.commonReviewOrder)}
                                offset={60}
                                isLoading={this.props.reducer.fetchGetCommonReviews}
                                loadingClassName={'common-review-list-loading'}
                            >
                                {commonReviewList}
                            </ScrollLoad>
                        </QueueAnim>
                    </ModularContainer>
            }

            // 书评
            reviewModal =
                <Modal className="Book-Detail-review-modal" visible={this.state.isReview} position={'bottom'} key={this.reviewModalKey}>
                    <div className="review-border">
                        <BookReview
                            hideItems={['follow_review', 'score']}
                            setErrors={errors => this.errors.review = errors}
                            setValues={values => this.values.review = values}
                        />
                        <List className="review-remind">
                            <Remind
                                setRunDing={runDing => this.reviewRunDing = runDing}
                                setValues={values => {
                                    this.values.reviewRemind = values.userIds;
                                }}
                            />
                        </List>
                        <Row className="review-button">
                            <Col span={10}>
                                <Button name={'取消'} type={'weaken'} action={this.cancelReview} />
                            </Col>
                            <Col span={14}>
                                <Button name={'发表'} action={this.saveReview} />
                            </Col>
                        </Row>
                    </div>
                </Modal>

            // 评分
            scoreModal =
                <Modal className="Book-Detail-score-modal" visible={this.state.isScore} position={'bottom'} key={this.scoreModalKey}>
                    <div className="score-border">
                        <BookReview
                            hideItems={['review', 'follow_review']}
                            data={{score : this.props.reducer.book.my_score}}
                            setErrors={errors => this.errors.score = errors}
                            setValues={values => this.values.score = values}
                        />
                        <Row className="score-button">
                            <Col span={10}>
                                <Button name={'取消'} type={'weaken'} action={this.cancelScore} />
                            </Col>
                            <Col span={14}>
                                <Button name={'评分'} action={this.saveScore} />
                            </Col>
                        </Row>
                    </div>
                </Modal>

            // 转发
            forwardModal =
                <Modal className="Book-Detail-forward-modal" visible={this.state.isForward} position={'bottom'} key={this.forwardModalKey}>
                    <div className="forward-border">
                        <Forward
                            setErrors={errors => this.errors.forward = errors}
                            setValues={values => this.values.forward = values}
                        />
                        <Row className="forward-button">
                            <Col span={10}>
                                <Button name={'取消'} type={'weaken'} action={this.cancelForward} />
                            </Col>
                            <Col span={14}>
                                <Button name={'转发'} action={this.saveForward} />
                            </Col>
                        </Row>
                    </div>
                </Modal>

            // 回复
            replyModal =
                <Modal className="Book-Detail-reply-modal" visible={this.state.isReply} position={'bottom'} key={this.replyModalKey}>
                    <div className="reply-border">
                        <BookReply
                            setErrors={errors => this.errors.reply = errors}
                            setValues={values => this.values.reply = values}
                        />
                        <Row className="reply-button">
                            <Col span={10}>
                                <Button name={'取消'} type={'weaken'} action={this.cancelReply} />
                            </Col>
                            <Col span={14}>
                                <Button name={'回复'} action={this.submitReply} />
                            </Col>
                        </Row>
                    </div>
                </Modal>

            // 书评转发
            reviewForwardModal =
                <Modal className="Book-Detail-reviewForward-modal" visible={this.state.isForwardReview} position={'bottom'} key={this.reviewForwardModalKey}>
                    <div className="reviewForward-border">
                        <ReviewForward
                            setErrors={errors => this.errors.reviewForward = errors}
                            setValues={values => this.values.reviewForward = values}
                        />
                        <Row className="reviewForward-button">
                            <Col span={10}>
                                <Button name={'取消'} type={'weaken'} action={this.cancelReviewForward} />
                            </Col>
                            <Col span={14}>
                                <Button name={'转发'} action={this.saveReviewForward} />
                            </Col>
                        </Row>
                    </div>
                </Modal>
        }

        return(
            <Spin spinning={this.props.reducer.fetchGetDetail ? true : false} style={{height : document.body.clientHeight}}>
                <div className="Book-Detail">
                    {/*书*/}
                    {bookBorder}
                    {/*简介*/}
                    {profile}
                    {/*推荐书列表*/}
                    {recommendBooks}
                    {/*精彩书评列表*/}
                    {wonderfulReviews}
                    {/*普通书评列表*/}
                    {commonReviews}
                    {/*书评*/}
                    {reviewModal}
                    {/*评分*/}
                    {scoreModal}
                    {/*转发*/}
                    {forwardModal}
                    {/*回复*/}
                    {replyModal}
                    {/*书评转发*/}
                    {reviewForwardModal}
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.bookDetail,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout, getDetail, getAkin, getSns, saveScore, openLike, closeLike, openCollection, closeCollection, openForward, closeForward,
    getShowReview, getWonderfulReview, getCommonReview, clearCommonReview, openReviewLike, closeReviewLike, openReviewFollow, closeReviewFollow, saveReview, deleteReview, openReviewForward, closeReviewForward,
    submitReply, deleteReply, getReplies, clear
}

export default store => ({
    path : 'detail/:bookId',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'bookDetail', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Detail));
        })
    }
})
