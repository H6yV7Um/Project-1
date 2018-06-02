import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import dd from 'utils/dingding';
import $ from 'jquery';

import {} from './action';

import './style.scss';

import Footer from './Footer';

class CarLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyPaddingBottom : 0
        };
        // 默认标题
        this.defaultTitle = '停车场';
    }

    static propTypes =
    {

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        // 标题
        if(dd.os != 'pc') dd.biz.navigation.setTitle({title : nextProps.reducer.title || this.defaultTitle});

        setTimeout(()=>{
            const bodyPaddingBottom = $(this.footerDom).outerHeight(true);
            if(this.state.bodyPaddingBottom != bodyPaddingBottom)
            {
                this.setState({bodyPaddingBottom});
            }
        }, 50);
    }

    render() {
        let className = 'CarLayout';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName}>
                <div className={`${className}-body`} style={{paddingBottom: this.state.bodyPaddingBottom}}>
                    {this.props.children}
                </div>

                <div className={`${className}-footer`} ref={dom => this.footerDom = dom}>{this.props.reducer.footer === false || this.props.coreReducer.isShowKeyboard ? null : this.props.reducer.footer || <Footer />}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.carLayout,
    coreReducer : state.coreLayout
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CarLayout);