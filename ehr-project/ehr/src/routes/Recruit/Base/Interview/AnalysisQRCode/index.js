import React, {Component, PropTypes} from 'react';
import { List, WhiteSpace, Button, Toast, Flex } from 'antd-mobile';
import { Input } from 'antd';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';
import ToastContent from 'components/ToastContent';
import $ from 'jquery';
import {sendRobotMessage, checkIn} from './action';

import './style.scss';

class AnalysisQRCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetch : false,
            height : 'auto',
            link : null,
            value : null
        };

        this.value = '';
    }

    componentDidMount(){
        this.focus();
        // 监听变化
        $(this.input).change(() => {
            this.setState({value : $(this.input).val()});
            this.decode();
        });
    }

    componentWillMount() {
        this.setState({height : document.documentElement.clientHeight});
    }

    componentWillUnmount(){

    }

    decode = () => {
        let url = this.state.value.replace('/standard',''),
            str = url,
            SERVER = process.env.NODE_ENV == 'development' ? 'http://172.20.70.62:3002' : 'http://ehr.tap4fun.com',
            params = str.replace(`${SERVER}`, ''),
            paramsArr = params.split('/'),
            name = decodeURIComponent(paramsArr[1]),
            phone = decodeURIComponent(paramsArr[2]),
            openid = decodeURIComponent(paramsArr[3]),
            hrContact = decodeURIComponent(paramsArr[4]),
            position = decodeURIComponent(paramsArr[5]);
        if(name == 'undefined' || phone == 'undefined' || position == 'undefined' || openid == 'undefined' || this.state.value.indexOf(SERVER) == -1) {
            $(this.input).val('');

        }else {
            $(this.input).val('');
            this.props.sendRobotMessage(
                name,
                phone,
                position,
                hrContact,
                () => {this.onSuccess(openid)},
                () => {this.onError()});
        }
    }

    onSuccess = openid => {
        // 修改数据库中的签到状态
        this.props.checkIn(openid);
    }

    onError = () => {}

    focus = () => {
        $(this.input).focus();
    }

    showMessage = (type, content) => {
        let res = null;
        switch (type) {
            case 'success':
                res = content || '面试官已经收到您的消息'+"\r\n"+'请在大厅就坐等待面试!';
                Toast.info(<ToastContent type="success" content={res} />, 6, null, false);
                setTimeout(() => {
                    window.location.reload();
                },6000);
                break;
            case 'error':
                res = content || '网络开小差了!请刷新后重试!';
                Toast.info(<ToastContent type="fail" content={res} />, 2, null, false);
                break;
        }
    }


    render() {
        return(
            <div className="AnalysisQRCode" style={{height : this.state.height}}>
                <div className="logo-container">
                    <div className="logo">
                        <img src={getSrc("PersonalCenter/CheckIn/logo.png")}/>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="container">
                        <input
                            type="text"
                            ref={dom => this.input = dom}
                            onBlur={() => {$(this.input).focus()}}
                        />
                    </div>
                </div>
                <div className="bg">
                    <img src={getSrc("PersonalCenter/CheckIn/bg.png")}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.analysisqrcode,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    sendRobotMessage, checkIn
}

export default store => ({
    path: 'interview/analysisqrcode',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'analysisqrcode', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(AnalysisQRCode))
        })
    }
})