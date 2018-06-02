import React, {Component, PropTypes} from 'react';
import { List, WhiteSpace, Button, Toast, Flex } from 'antd-mobile';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import $ from 'jquery';
import 'jquery-qrcode';
import getSrc from 'utils/imgSrc';
import ResumeIndex from 'appComponents/Wechat/Resume';
import ToastContent from 'components/ToastContent';
import QRCode from 'components/QRCode';
import {isCheckIn} from './action';

import './style.scss';

class QRCodes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qrSizes : null,
            notice : '请在前台扫描该二维码签到',
            text : '',
            isFetch : false
        };

    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({qrSizes : $(this.wrapper).width() * 0.9});
        }, 800)
    }

    componentWillMount() {
        this.changeTitle('tap4fun-面试签到');
        this.setText();
        // 查询是否签到
        this.props.isCheckIn(this.props.params.openid, () => {
            setTimeout(() => {
                this.setState({isFetch : true})
            }, 10)
            if(!this.props.reducer.isChecked) {
                this.isChecked();
            }
        });
    }

    componentWillUnmount() {
        this.changeTitle('');
    }

    // 轮询
    isChecked = () => {
        // 轮询是否已经签到
        let timeId = setInterval(() => {
            this.props.isCheckIn(this.props.params.openid);
            if(this.props.reducer.isChecked) {
                // 已经签到
                clearInterval(timeId);
            }
        }, 500)
    }

    setText = () => {
        let SERVER = process.env.NODE_ENV == 'development' ? 'http://172.20.70.62:3002' : 'http://ehr.tap4fun.com',
            fakeStr = '/standard',
            fakeURL = `${SERVER}${fakeStr}/${this.props.params.name}/${this.props.params.phone}/${this.props.params.openid}/${this.props.params.hrcontact}/${this.props.params.position}`;
        this.setState({text : fakeURL})
    }


    changeTitle = title => {
        document.title = `${title}`;
    }

    render() {
        let styleObj = {
            width : this.state.qrSizes ? this.state.qrSizes : null
        },
            layout = null;
        if(this.state.isFetch && !this.props.reducer.isChecked) {
            layout = (
                <div className="container">
                    <div className="header-container">
                        <div className="header" style={styleObj}>
                            <Flex>
                                <Flex.Item>
                                    <div className="img-container">
                                        <img src={getSrc('PersonalCenter/AccountBinding/logo-black.png')}/>
                                    </div>
                                </Flex.Item>
                            </Flex>
                        </div>
                    </div>
                    <div className="wrapper" ref={dom => this.wrapper = dom}>
                        {
                            this.state.qrSizes ?
                                <QRCode
                                    width={this.state.qrSizes * 0.8} // 缩小成当前比例的百分之八十
                                    height={this.state.qrSizes * 0.8}
                                    render={'canvas'}
                                    text={this.state.text}
                                />
                                :
                                null
                        }
                    </div>
                    <div className="footer-container">
                        <div className="footer">
                            {this.state.notice}
                        </div>
                    </div>
                </div>
            )
        }
        if(this.state.isFetch && this.props.reducer.isChecked) {
            layout = (
                <div className="result" style={{height : this.state.height,backgroundColor : '#fff'}}>
                    <div className="show-img">
                        <img src={getSrc("PersonalCenter/Result/checkinimg.png")}/>
                    </div>
                    <div className="show-title">
                        <img src={getSrc("PersonalCenter/Result/checkin.png")}/>
                    </div>
                    <div className="show-logo">
                        <img src={getSrc("PersonalCenter/Result/logo.png")}/>
                    </div>
                </div>
            )
        }

        return(
            <div className="QRCodes" style={{height : document.documentElement.clientHeight}}>
                {layout}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.qrcodes,
    publicReducer : state.wechatLoginLayout
})

const mapDispatchToProps = {
    isCheckIn
}

export default store => ({
    path: 'interview/qrcodes/:name/:phone/:openid/:hrcontact/:position',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'qrcodes', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(QRCodes))
        })
    }
})