import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin} from 'antd';
import Summary from 'appComponents/Book/Summary';
import ScrollLoad from 'components/ScrollLoad';

import {getLike} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class LikeList extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentWillMount() {
		window.scrollTo(0,0);
		this.props.setLayout({title: '猜你喜欢', footer: ' '});
	}

	componentDidMount() {
		if(this.props.reducer.like.length === 0){
			this.props.getLike(4);
		}
	}

	componentWillUnmount() {
		this.props.setDefaultLayout();
	}

	render() {
		let like = null;
		let likeList = [];
		if(this.props.reducer.like.length > 0) {
			this.props.reducer.like.map((item, index) => {
				likeList.push(
					<Summary
						key={index}
						book={item}
					/>
				)
			})
			like = 
				<ScrollLoad
					loadingClassName={'like-list-loading'}
					isLoad={this.props.reducer.hasLikeData}
					offset={0}
					isLoading={this.props.reducer.fetchGetLike}
					load={() => this.props.getLike(20, this.props.reducer.gotBookIds)}
					isAutoFirst={true}
					autoTimes={-1}
				>
					{likeList}
				</ScrollLoad>
		}

		return(
			<Spin spinning={this.props.reducer.like.length == 0 && this.props.reducer.fetchGetLike == true} style={{height : document.body.clientHeight}}>
				<div className="Book-likeList">
					{like}
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
	getLike, setDefaultLayout, setLayout
}

export default store => ({
	path  : 'like_list',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			injectReducer(store, {key : 'bookLikeList', reducer : require('./reducer').default});
			cb(null, connect(mapStateToProps, mapDispatchToProps)(LikeList));
		})
	}
})