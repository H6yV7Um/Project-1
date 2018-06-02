import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import Summary from 'appComponents/Book/Summary';
import ScrollLoad from 'components/ScrollLoad';

import {getRecommend} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class RecommendList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        window.scrollTo(0,0);
        this.props.setLayout({title: 'Tap4fun推荐', footer: ' '});
    }

    componentDidMount() {
        if(this.props.reducer.recommend.length === 0){
            this.props.getRecommend(4);
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    render() {
        let recommend = null;
        let recommendList = [];
        if(this.props.reducer.recommend.length > 0){
            this.props.reducer.recommend.map((item, index) => {
                recommendList.push(
                    <Summary
                        key={index}
                        book={item}
                    />
                )
            });

            recommend =
                <ScrollLoad
                    loadingClassName={'recommend-list-loading'}
                    isLoad={this.props.reducer.hasRecommendData}
                    offset={0}
                    isLoading={this.props.reducer.fetchGetRecommend}
                    load={() => this.props.getRecommend(20, this.props.reducer.gotBookIds)}
                    isAutoFirst={true}
                    autoTimes={-1}
                >
                    {recommendList}
                </ScrollLoad>
        }

        return(
            <div className="Book-RecommendList">
                {recommend}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.bookRecommendList,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getRecommend, setDefaultLayout, setLayout
}

export default store => ({
    path : 'recommend_list',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'bookRecommendList', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(RecommendList));
        })
    }
})
