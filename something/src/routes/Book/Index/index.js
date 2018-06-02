import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {WingBlank, SwipeAction, Modal, Toast} from 'antd-mobile';
import ModularContainer from 'components/ModularContainer';
import Icon from 'components/Icon';
import BookShow from 'appComponents/Book/Show';
import Grid from 'components/Grid';
import Banner from 'components/Banner';
import getSrc from 'utils/imgSrc';
import {getRecommend, getLike} from './action';

import './style.scss';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {
        if(!this.props.reducer.recommend)
        {
            const limit = Math.floor((document.body.clientWidth - 15) / (75 + 15));
            // 获取Tap4fun推荐
            this.props.getRecommend(limit,
                data => {
                    // 获取猜你喜欢
                    this.props.getLike(data.got_ids, limit);
                }
            );
        }
    }

    render() {
        // Tap4fun推荐
        let recommend = null;
        if(this.props.reducer.recommend)
        {
            let recommendBooks = [];
            this.props.reducer.recommend.map((v, k) => {
                recommendBooks.push(
                    <BookShow
                        key={k}
                        book={v}
                        size={'small'}
                    />
                );
            })
            recommend =
                <Grid
                    style={{marginBottom : -7}}
                    width={75}
                    itemList={recommendBooks}
                />
        }

        // 猜你喜欢
        let like = null;
        if(this.props.reducer.like)
        {
            let likeBooks = [];
            this.props.reducer.like.map((v, k) => {
                likeBooks.push(
                    <BookShow
                        key={k}
                        book={v}
                        size={'small'}
                    />
                );
            })
            like =
                <Grid
                    style={{marginBottom : -7}}
                    width={75}
                    itemList={likeBooks}
                />
        }

        return(
            <div className="Book-Index">
                {/*广告*/}
                <Banner
                    isAutoPlay={false}
                    contentList={[
                        {imgUrl : getSrc('ba.jpg'), title : 'TAP4FUN', text : 'Make something people love', link : '/book/detail/1'},
                        {imgUrl : getSrc('ba1.jpg'), title : 'READING ROOM'}
                    ]}
                />

                {/*Tap4fun推荐*/}
                <ModularContainer name={'Tap4fun推荐'} borderTop={false} extra={<Link to="/book/recommend_list"><div className="books-more"><Icon type={'angle-right'} /></div></Link>}>
                    {recommend}
                </ModularContainer>

                {/*猜你喜欢*/}
                <ModularContainer name={'猜你喜欢'} extra={<Link to="/book/like_list"><div className="books-more"><Icon type={'angle-right'} /></div></Link>}>
                    {like}
                </ModularContainer>

                {/*Tapper心得*/}
                <ModularContainer name={'Tapper心得'} extra={<div className="books-more"><Icon type={'angle-right'} /></div>}>

                </ModularContainer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.book,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getRecommend, getLike
}

export default store => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'book', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index));
        })
    }
})
