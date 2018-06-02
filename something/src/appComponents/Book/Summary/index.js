import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Cover from 'appComponents/Book/Cover';
import Text from 'components/Text';
import User from 'components/User';
import {browserHistory} from 'react-router';

import './style.scss';

class Summary extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	static propTypes = {
		// 书数据
        book            :   React.PropTypes.object.isRequired
	}

	static defaultProps = {

	}

	componentWillReceiveProps(nextProps) {
		
	}

	jumpToDetail = () => {
		// 进行函数内路由跳转
		browserHistory.push(`/book/detail/${this.props.book.book_id}`);
	}

	render() {
		let className = `appComponent-Book-Summary`;
		let componentClassName = `${className}`;
		let bookId = this.props.book.book_id;
		if(this.props.className) {
			componentClassName += ` ${this.props.className}`;
		}
		
		return (
			<div className={componentClassName}>
				<Link to={`/book/detail/${bookId}`}>
					<Cover className={`${className}-cover`} cover={this.props.book.cover} size={100} />
				</Link>
				<div className={`${className}-content`}>
					<Link to={`/book/detail/${bookId}`}>
						<h4>{this.props.book.name}</h4>
					</Link>
					<div className={`${className}-author`}><span className={`${className}-divider`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{` ${this.props.book.author}`}</div>
					<Text
						className={`${className}-profile`}
						fontSize={12}
						lineNum={3}
						textClassName={`${className}-profile-content`}
						onClickText={this.jumpToDetail}
					>
						{this.props.book.profile}
					</Text>
					<div className={`${className}-footer`}>
						<User
							userAvatar={this.props.book.user_avatar}
							userId={this.props.book.user_id}
							userName={this.props.book.user_name}
							size={"x-sm"}
						/>
						<span className={`${className}-time`}>{this.props.book.create_time}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Summary;