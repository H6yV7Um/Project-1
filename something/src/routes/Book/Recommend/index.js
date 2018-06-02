import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Row, Col, Spin} from 'antd';
import {WingBlank, SwipeAction, Modal, Toast, List} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Button from 'components/Button';
import Book from 'appComponents/Book/Book';
import ComponentRecommend from 'appComponents/Book/Recommend';
import Review from 'appComponents/Book/Review';
import Remind from 'appComponents/Dingding/Remind';
import getSrc from 'utils/imgSrc';
import getUrl from 'utils/url';
import {getRecommendInfo, recommend, clear} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class Recommend extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        // 数据异常
        this.errors = {
            // 书
            book : null,
            // 推荐
            recommend : null,
            // 评分
            score : null
        };
        // 数据
        this.values = {
            // 书
            book : null,
            // 推荐
            recommend : null,
            // 评分
            score : null,
            // 提醒
            remind : null
        };

        // 执行Ding
        this.runDing = null;
    }

    componentWillMount() {
        window.scrollTo(0,0);
        this.props.setLayout({title: `推荐《${this.props.params.name}》`, footer: false});
    }

    componentDidMount() {
        // 获取推荐信息
        this.props.getRecommendInfo(this.props.params.name, this.props.params.author,
            data => {
                // 推荐提示
                if(!data.recommend)
                {
                    Toast.info(<ToastContent type="info" content={<div>该书已被别人推荐过<br/>你可以补充推荐</div>} />, 3, null, false);
                }
                else
                {
                    Toast.info(<ToastContent type="info" content={<div>你曾推荐过该书<br/>你可以再次编辑</div>} />, 3, null, false);
                }

                this.props.setLayout({
                    footer:
                        <Row>
                            <Col span={10}>
                                <Button name="查看该书" type={'weaken'} action={()=>this.props.router.push(`/book/detail/${data.book.book_id}`)} />
                            </Col>
                            <Col span={14}>
                                <Button name="推荐" action={this.submit} isLoading={{reducer: 'bookRecommend', isLoading: 'fetchRecommend'}} />
                            </Col>
                        </Row>
                })
            },
            status => {
                // 推荐提示
                Toast.info(<ToastContent type="info" content={<div>该书还未被推荐<br/>快推荐吧</div>} />, 3, null, false);

                this.props.setLayout({
                    footer:
                        <Row>
                            <Col span={24}>
                                <Button name="推荐" action={this.submit} isLoading={{reducer: 'bookRecommend', isLoading: 'fetchRecommend'}} />
                            </Col>
                        </Row>
                })
            }
        );
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
        this.props.clear();
    }

    /**
     *  提交
     */
    submit = () => {
        if(this.values.book && this.values.recommend && this.values.score)
        {
            this.props.recommend(this.values.book, this.values.recommend, this.values.score, this.values.remind, data => {
                // Ding
                this.runDing(
                    this.values.remind,
                    '这本书不错，快来看看吧~',
                    `《${this.values.book.name}》`,
                    this.values.book.profile,
                    getUrl(`/book/detail/${data.book_id}`),
                    getSrc(data.cover)
                );
                // 跳转详情
                this.props.router.push(`/book/detail/${data.book_id}`);
            }, status => {
                Toast.info(<ToastContent type="fail" content={status.message} />, 3, false);
            });
        }
        else if(this.errors.book || this.errors.recommend || this.errors.score)
        {
            let errors = [];
            errors.push(this.errors.book);
            errors.push(this.errors.recommend);
            errors.push(this.errors.score);
            Toast.info(<ToastContent type="fail" content={errors} />, 5, null, false);
        }
    }

    render() {
        let recommend = null;

        if(this.props.reducer.book)
        {
            recommend =
                <div className="Book-Recommend">
                    <Book
                        data={this.props.reducer.book}
                        readItems={this.props.reducer.book.user_id == this.props.publicReducer.userInfo.user_id || !this.props.reducer.book.user_id && !this.props.reducer.recommend ? ['name', 'author'] : ['name', 'author', 'cover', 'book_tag_ids', 'profile']}
                        setErrors={errors => this.errors.book = errors}
                        setValues={values => this.values.book = values}
                    />
                    <ComponentRecommend
                        data={this.props.reducer.recommend}
                        className="recommend"
                        setErrors={errors => this.errors.recommend = errors}
                        setValues={values => this.values.recommend = values}
                    />
                    <Review
                        data={this.props.reducer.score}
                        hideItems={['review', 'follow_review']}
                        className="score"
                        setErrors={errors => this.errors.score = errors}
                        setValues={values => this.values.score = values}
                    />
                    <List className="remind">
                        <Remind
                            setRunDing={runDing => this.runDing = runDing}
                            setValues={values => {
                                this.values.remind = values.userIds;
                            }}
                        />
                    </List>
                </div>
        }

        return (
            <Spin spinning={this.props.reducer.fetchGet ? true : false} style={{height : document.body.clientHeight}}>
                {recommend}
            </Spin>
        );
    }
}

const mapStateToProps = state => ({
    reducer : state.bookRecommend,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout, getRecommendInfo, recommend, clear
}

export default store => ({
    path : 'recommend/:name/:author',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'bookRecommend', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Recommend));
        })
    }
})
