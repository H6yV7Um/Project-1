import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin} from 'antd';
import Avatar from 'components/Avatar';
import {Link} from 'react-router';
import Icon from 'components/Icon';
import 'jquery-easing';
import $ from 'jquery';
import {List, Toast} from 'antd-mobile';
import {Row, Col} from 'antd';
import Button from 'components/Button';
import FeedbackEdit from 'appComponents/Okr/FeedbackEdit';

import {getOkr} from './action';
import {setLayout, setDefaultLayout} from 'layouts/Ehr/action';

import './style.scss';

// Okr编辑详情
let form = null;
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        // this.props.getOkr('5a0e8efe4b22582887f76236');
        this.props.setLayout({
            title: '修改个人反馈',
            footer:
                <Row>
                    <Col span={24}>
                        <Button name="确认" style={{backgroundColor:'#4e394c', border: 'none'}}/>
                    </Col>
                </Row>
        })
    }

    componentDidMount() {
        this.props.setLayout({
            header : false
        })
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    render() {
        let className = 'routePerformanceOkrFeedbackEdit';

        // if(!this.props.reducer.isFetch)
        // {
        //
        //     }

        return(
            //<Spin spinning={this.props.reducer.isFetch} style={{height : $(window).height()}}>
                <div className={className}>
                    <FeedbackEdit></FeedbackEdit>
                </div>
            // </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.showPerformanceOkrFeedbackEdit,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout
}

export default store => ({
    path: '/performance/okr/feedback/edit',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'performanceOkrFeedbackEdit', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Edit));
        })
    }
})