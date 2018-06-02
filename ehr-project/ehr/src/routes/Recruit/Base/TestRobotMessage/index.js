import React, {Component, PropTypes} from 'react';
import { List, WhiteSpace, Button, Toast } from 'antd-mobile';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';
import ResumeIndex from 'appComponents/Wechat/Resume';
import ToastContent from 'components/ToastContent';
import SearchComponent from 'components/Search';
import {sendRobotMessage, sendRobotMessageCv} from './action';

import './style.scss';

class TestRobotMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height : null
        };
    }

    componentWillMount() {
        this.setState({height : document.documentElement.clientHeight});
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    sendMsg = () => {
        let template = {
            name : 'tester',
            phone : 'tester\'s phone',
            position : 'test\'s position',
            hrContact : '15528525583'
        }
        this.props.sendRobotMessage(template.name,template.phone,template.position,template.hrContact, () => {}, () => {});
    }
    sendCvMsg = () => {
        let template = {
            name : 'tester',
            phone : 'tester\'s phone',
            position : 'test\'s position'
        }
        this.props.sendRobotMessageCv(template.name,template.phone,template.position, () => {}, () => {});
    }

    render() {
        let className = 'routesRecruitBaseTestRobotMessage';
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <div className={className} style={{height : this.state.height}}>
                <Button onClick={this.sendMsg}>发送钉钉机器人消息</Button>
                <Button onClick={this.sendCvMsg}>发送钉钉机器人新简历消息</Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.test_robot_message,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    sendRobotMessage, sendRobotMessageCv
}

export default store => ({
    path: 'test_robot_message',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'test_robot_message', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(TestRobotMessage))
        })
    }
})