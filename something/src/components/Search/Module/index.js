import React, {Component, PropTypes} from 'react';

import './style.scss';

class Module extends Component {
	constructor(props){
		super(props);

		this.state = {

		};
	}

	static propTypes = {
		// 模块标题
		title           :   React.PropTypes.string.isRequired,
		// items
		items 		    :   React.PropTypes.array,
        // 是否可清理
        isClear         :   React.PropTypes.bool,
        // 清理
        clear           :   React.PropTypes.func
	}

	static defaultTypes = {
        // 是否可清理
        isClear         :   false,
        // 清理
        clear           :   () => {}
	}

	render() {
		let className = `component-Search-Module`;
		let componentClassName = `${className}`;
		if(this.props.className) {
			componentClassName += ` ${this.props.className}`;
		}

		return(
			<div className={componentClassName}>
				<div className={`${className}-title`}>
                    {this.props.title}
				</div>
				<div className={`${className}-content`}>
					{this.props.items || this.props.children}
				</div>
			</div>
		)
	}
}

export default Module;