import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin} from 'antd';
import Summary from 'appComponents/Book/Summary';
import ScrollLoad from 'components/ScrollLoad';

import {getBookRecommend} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class BookLikeList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        window.scrollTo(0,0);
        this.props.setLayout({title: '猜你喜欢', footer: false});
    }

    componentDidMount() {
        this.props.getBookRecommend(this.props.params.bookId, 20, true);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    render() {
        let recommend = null;
        let recommendList = [];
        if(this.props.reducer.book_recommend.length > 0){
            this.props.reducer.book_recommend.map((item, index) => {
                recommendList.push(
                    <Summary
                        key={index}
                        book={item}
                    />
                )
            });
        }
        recommend =
            <ScrollLoad
                loadingClassName={'recommend-list-loading'}
                isLoad={this.props.reducer.hasRecommendData}
                offset={0}
                isLoading={this.props.reducer.fetchGetRecommend}
                load={() => {}}
                isAutoFirst={true}
                autoTimes={-1}
            >
                {recommendList}
            </ScrollLoad>

        return(
            <Spin spinning={this.props.reducer.book_recommend.length == 0 && this.props.reducer.fetchGetRecommend == true} style={{height : document.body.clientHeight}}>
                <div className="Book-bookLikeList">
                    {recommend}
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.bookLikeList,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getBookRecommend, setDefaultLayout, setLayout
}

export default store => ({
    path : 'book_recommend_list/:bookId',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'bookLikeList', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(BookLikeList));
        })
    }
})
