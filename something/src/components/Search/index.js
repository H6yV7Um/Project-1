import React, {Component, PropTypes} from 'react';
import {Row, Tag, Spin} from 'antd';
import Col from 'components/Col';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Modal from 'components/ModalAntd';
import $ from 'jquery';

import {setLayout, setDefaultLayout} from 'layouts/CoreLayout/action';
import './style.scss';

class Search extends Component {
	constructor(props){
		super(props);

        const time = new Date().getTime();

		this.state = {
            // 按钮色
            buttonColor     :   '#999',
            // 是否有搜索结果
            isResult        :   false,
            // 上次输入的时间戳
            prevTimeStamp   :   null
		};
	}

	static propTypes = {
	    // 搜索
        search          :   React.PropTypes.func.isRequired,
		// 默认搜索        
		default         :   React.PropTypes.string,
        // modules
        modules         :   React.PropTypes.array,
        // 结果
        result          :   React.PropTypes.array,
        // 搜索的间隔阙值
        interval        :   React.PropTypes.number
	}

	static defaultTypes = {
        // 搜索
        search          :   () => {},
        // 默认搜索
        default         :   "",
        // modules
        modules         :   [],
        // 结果
        result          :   [],
        // 搜索的间隔阙值
        interval        :   200
	}

    componentWillReceiveProps(nextProps) {
        if(nextProps.result.props) {
            this.setState({isResult : true})
        }
    }


    handleClick = () => {
        this.setState({
            isSearch : true
        });
        console.log(this.refs);
    }

    inputOnChange = () => {
        let timeStamp = new Date().getTime(),
            interval = null,
            inputValue = $.trim($(this.input).val());
        // 第一次输入
        if(inputValue.length == 1) {
            // 执行搜索
            this.props.search(inputValue, inputObj);
            // 当前时间戳记为上次输入的时间
            this.setState({prevTimeStamp : timeStamp});
            this.setState({buttonColor : '#000'});
            return;
        }
        // 不是第一次输入
        if(inputValue.length > 1) {
            // 得到时间间隔
            interval = timeStamp - this.state.prevTimeStamp;
            if(interval > this.props.interval) {
                // 执行搜索
                this.props.search(inputValue, inputObj);
            }
            // 当前时间戳记为上次输入的时间
            this.setState({prevTimeStamp : timeStamp});
            return;
        }
        // 没有输入
        this.setState({isResult : false})
        this.setState({buttonColor : '#999'});
        this.setState({prevTimeStamp : timeStamp});
    }

	render() {
		let className = `component-Search`;
		let componentClassName = `${className}`;
		if(this.props.className) {
			componentClassName += ` ${this.props.className}`;
		}


        let content =
            <div className={`${className}-module-content`}>
                {this.props.modules || this.props.children}
            </div>

        // 结果
        let result = null;
        if(this.props.result)
        {
            result =
                <div className={`${className}-result`}>
                    {this.props.result}
                </div>
        }
		
		return(
			<div className={componentClassName}>
                <div className={`${className}-search-box`}>
                    <div className={`${className}-search-content`}>
                        <Icon className={`${className}-icon`} classType="it" type={'sousuo-sousuo'}/>
                        <input
                            type="text"
                            placeholder={this.props.default}
                            ref={dom => this.input = dom}
                            onChange={this.inputOnChange}
                        />
                    </div>
                    <Button
                        name={'搜索'}
                        type={'null'}
                        className={`${className}-search-button`}
                        action={() => {
                            if($(this.input).val()) {
                                this.props.search($(this.input).val());
                            }else{
                                this.props.search(this.props.default);
                                $(this.input).val(this.props.default);
                            }
                        }}
                        nameStyle={{transition : 'color 500ms', color : this.state.buttonColor}}
                    />
                </div>
                {this.state.isResult ? result : content}
			</div>
		)
	}
}

export default Search;