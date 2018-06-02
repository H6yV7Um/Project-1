import React, {Component, PropTypes} from 'react';
import {Row, Tag, Spin} from 'antd';
import Col from 'components/Col';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Modal from 'components/ModalAntd';
import $ from 'jquery';

import {setLayout, setDefaultLayout} from 'layouts/DdLayout/action';
import './style.scss';

class Search extends Component {
	constructor(props){
		super(props);

		this.state = {

		};
	}

	static propTypes = {

	}

	static defaultTypes = {

	}

	render() {
		let className = `component-Search`;
		let componentClassName = `${className}`;
		if(this.props.className) {
			componentClassName += ` ${this.props.className}`;
		}
		
		return(
			<div className={componentClassName}>

			</div>
		)
	}
}

export default Search;