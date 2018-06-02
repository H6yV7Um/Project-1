import React, {Component, PropTypes} from 'react';

import './style.scss';

class Item extends Component {
	constructor(props){
		super(props);

		this.state = {

		};
	}

	static propTypes = {
		// 内容
		content         :   React.PropTypes.string.isRequired,
		// 编号: 正整数
		num             :   React.PropTypes.number,
        // 选中
        choose          :   React.PropTypes.func
	}

	static defaultTypes = {
		// 编号: 正整数
        num             :   0,
        // 选中
        choose          :   () => {}
	}

	render() {
		let className = `component-Search-Item`;
		let componentClassName = `${className}`;
		if(this.props.className) {
			componentClassName += ` ${this.props.className}`;
		}

		// 编号
		let num = null;
        if(this.props.num > 0)
        {
            num = <div className={`${className}-num`}>{this.props.num}</div>
        }

		return(
			<div className={componentClassName} onClick={this.props.choose}>
                {num}
                <div className={`${className}-content`}>{this.props.content}</div>
			</div>
		)
	}
}

export default Item;