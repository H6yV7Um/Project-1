import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {List, Button, Modal, Toast} from 'antd-mobile';
import WechatResume from 'appComponents/Wechat/Resume';
import WechatRegister from 'appComponents/Wechat/Register';
import WechatSmallResume from 'appComponents/Wechat/SmallResume';
import Icon from 'components/Icon';
import ToastContent from 'components/ToastContent';
import getSrc from 'utils/imgSrc';
import {addCv, getCv, updateCv, getJob, sendRobotMessageCv} from './action';

import './style.scss';

class Cv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current : 0,
            height : document.documentElement.clientHeight,
            isFetch : false,
            hideItems : null,
            isAdd : false,
            isShowMessage : false,
            isFirstAdd :  false,
            confirmModel : false
        }

        const time = new Date().getTime();

        this.interviewModalKey = time;

        this.error = null;
        this.values = null;
        this.hideItems = ['link', 'willingposition'];
        this.code = null;
        this.cvData = null;
    }

    componentWillMount() {
        this.changeTitle('tap4fun-我的简历');
        // 获取职位列表
        this.props.getJob();
        // 获取微信重定向之后的免登陆code
        this.code = this.getQueryString('code');
        // 根据openid获取简历详情
        this.props.getCv(this.props.publicReducer.userInfo.openid)
        // 修改是否是第一次注册的状态
        this.setState({
            hideItems : this.first
        })
    }

    componentWillUnmount() {
        this.changeTitle('');
    }

    getQueryString = name => {
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if(r!=null)
            return  unescape(r[2]);
        return null;
    }

    formateDate = date => {
        if(typeof date != 'undefined' && typeof date != 'string') {
            let res = date.format('l').split('');
            let str = [];
            let result = null;
            res.map(v => {
                str.push(v.replace(/[\u4e00-\u9fa5]/, '-'));
            });
            str.pop();
            result = str.join('');
            return result;
        }
    }

    showMessage = (type, content) => {
        let res = null;
        switch (type) {
            case 'success':
                res = content || '面试官已经收到您的消息'+"\r\n"+'请在大厅就坐等待面试!';
                Toast.info(<ToastContent type="success" content={res} />, 2, null, false);
                break;
            case 'error':
                res = content || '网络开小差了!请刷新后重试!';
                Toast.info(<ToastContent type="fail" content={res} />, 2, null, false);
                break;
        }
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
        // 重置
        this.interviewModalKey = new Date().getTime();
    }

    /**
     * 根据id获取职位名称 从reducer中去匹配
     * @param id
     * @returns {Promise}
     */
    getJobName = id => {
        let _this = this;
        return new Promise(function (resolve, reject) {
            if(_this.props.reducer.jobs) {
                _this.props.reducer.jobs.map(v => {
                    if(id == v._id) {
                        resolve(v.job_type_id);
                    }
                })
            }
        })
    }

    // 提交简历
    submit = async () => {
        if(this.values)
        {
            if(typeof this.values.attenddate != "string") {
                this.values.attenddate = this.formateDate(this.values.attenddate);
            }
            if(typeof this.values.graduatedate != "string") {
                this.values.graduatedate = this.formateDate(this.values.graduatedate);
            }
            if(typeof this.values.starttime != "string") {
                this.values.starttime = this.formateDate(this.values.starttime);
            }
            if(typeof this.values.endtime != "string") {
                this.values.endtime = this.formateDate(this.values.endtime);
            }
            let jobTypeId = await this.getJobName(this.values.willingposition[0]);
            this.cvData = Object.assign(this.values, this.cvData, {jobTypeId:jobTypeId});
            if(!this.props.reducer.cv) {
                this.props.addCv(this.cvData, this.props.publicReducer.userInfo, () => {
                    this.link();
                    this.props.sendRobotMessageCv(
                        this.values.name,
                        this.values.phone,
                        this.values.willingposition,
                        () => {console.log('suc')},
                        () => {console.log('fall')}
                    )
                });
            }
        }
        else if(this.errors)
        {
            this.showMessage('error', this.errors);
        }
    }

    link = () => {this.setState({isAdd : true, isFirstAdd : true})}

    // 修改微信浏览器的title
    changeTitle = title => {document.title = `${title}`}

    render() {
        let layout = null,
            jobs = [],
            interviewModal = null;

        // 格式化职位列表数据
        if(this.props.reducer.jobs) {
            this.props.reducer.jobs.map(v => {
                let data = {label: v.name, value: v._id};
                jobs.push(data);
            });
        }

        if(!this.props.reducer.cv && this.props.reducer.isFetch) {
            // 没有注册简历
            layout = (
                <div style={{height : this.state.height, backgroundColor: '#66a3dc'}}>
                    <div className="bg"><img src={getSrc("PersonalCenter/CheckIn/bg-small.png")}/></div>
                    <div className="logo-container">
                        <div className="logo"><img src={getSrc("PersonalCenter/Result/register.png")}/></div>
                    </div>
                    <div className="steps-content">
                        <WechatRegister
                            data={{}}
                            hideItems={['gender']}
                            setErrors={errors => this.errors = errors}
                            setValues={values => this.values = values}
                            jobs={jobs}
                            className={"lists"}
                        />
                        <div className="btn-container">
                            <Button
                                className="btn"
                                type="primary"
                                onClick={() => {this.submit()}}
                            >
                                <Icon className="icon" type="paper-plane" style={{color: '#66a3dc'}}><span style={{color: '#000'}}>   注册</span></Icon>
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
        if((this.props.reducer.cv && this.props.reducer.isFetch) || this.state.isAdd) {
            layout = !this.state.isFirstAdd ?
                (
                    <div style={{height : this.state.height, backgroundColor: '#fff'}}>
                        <div className="header-container">
                            <div className="bg"><img src={this.props.publicReducer.userInfo.headimgurl} alt="微信头像"/></div>
                            <div className="header">
                                <div className="img-container"><img src={this.props.publicReducer.userInfo.headimgurl} alt="微信头像"/></div>
                                <div className="header-nickname">{this.props.publicReducer.userInfo.nickname}</div>
                            </div>
                        </div>
                        <div className="info-container">
                            <div className="edit" onClick={() => {browserHistory.push('/recruit/wechat/personalcenter/cvedit')}}>
                                <Icon className="icon" type="pencil-square-o" style={{color: '#000'}}></Icon>
                            </div>
                            <div className="info">
                                <div className="resume-container">
                                    <div className="resume-item">
                                        <div className="resume-icon"><Icon className="icon" type="user-o" style={{color: '#000'}}></Icon></div>
                                        <div className="resume-content">{this.props.reducer.cv.name}</div>
                                    </div>
                                    <div className="resume-item">
                                        <div className="resume-icon"><Icon className="icon" type="file-text-o" style={{color: '#000'}}></Icon></div>
                                        <div className="resume-content">{this.props.reducer.cv.willingposition}</div>
                                    </div>
                                    <div className="resume-item">
                                        <div className="resume-icon"><Icon className="icon" type="phone" style={{color: '#000'}}></Icon></div>
                                        <div className="resume-content">{this.props.reducer.cv.phone}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="notice"><p>我们将通过该公众号发送面试签到二维码<br/>请注意查收</p></div>
                            <div className="info-logo"><div className="logo"><img src={getSrc("PersonalCenter/Result/logo.png")}/></div></div>
                        </div>
                    </div>
                )
                :
                (
                    <div style={{height : this.state.height,backgroundColor : '#fff'}}>
                        <div className="show-img"><img src={getSrc("PersonalCenter/Result/img.png")}/></div>
                        <div className="show-title"><img src={getSrc("PersonalCenter/Result/title.png")}/></div>
                        <div className="show-logo"><img src={getSrc("PersonalCenter/Result/logo.png")}/></div>
                    </div>
                )
        }

        interviewModal = (
            <Modal
                title={this.state.title}
                key={this.interviewModalKey}
                transparent
                className="RecruitList-interview"
                maskClosable={true}
                visible={this.state.interviewModal}
                onClose={this.onClose('interviewModal')}
                footer={[{ text: '发送邀请', onPress: () => {this.send();this.onClose('interviewModal')}}]}
            >
            </Modal>
        )

        return(
            <div className="Subscription-Cv">
                {layout}
                {/*面试邀请模态框*/}
                {interviewModal}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.cv,
    publicReducer : state.wechatLoginLayout
})

const mapDispatchToProps = {
    addCv, getCv, updateCv, getJob, sendRobotMessageCv
}

export default store => ({
    path : 'personalcenter/cv',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'cv', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Cv));
        })
    }
})
