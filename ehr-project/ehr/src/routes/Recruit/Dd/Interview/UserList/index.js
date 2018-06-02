import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Input, Modal as PcModal, Button as PcButton, Radio, Select } from 'antd';
import {List, WhiteSpace, Button, Flex, DatePicker, Modal, Toast} from 'antd-mobile';
import {injectReducer} from 'store/reducers';
import UserProfile from 'appComponents/Recruit/UserProfile';
import Interview from 'appComponents/Recruit/Interview';
import ScrollLoad from 'components/ScrollLoad';
import ToastContent from 'components/ToastContent';
import getSrc from 'utils/imgSrc';
import browserAttr from 'utils/browserAttr';
import {hostName} from 'config/wechat';

import {addCv, getJob, getJobById, sendMsg, getWechatUser, findWechatUserByName, unCheckIn, getHrContact, getJobType, changeState} from './action';

import './style.scss';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// 面试综合信息
class UserList extends Component {
    constructor(props) {
        super(props);

        // 每次展示的条数
        this.pageSize = 40;

        this.state = {
            // 查询条件
            condition               :   {
                            orderType           :   'desc',
                            jobType             :   'all',
                            currState           :   'all',
                            name                :   '',
                            limit               :   this.pageSize,
                            skip                :   0
            },
            // 面试邀请模态框是否可见
            interviewPcModal        :   false,
            // 二维码地址
            link                    :   null,
            // 当前的用户信息
            user                    :   null
        };

        // 面试邀请表单隐藏项
        this.hideItems = [];
        // 面试邀请表单错误信息
        this.error = null;
        // 面试邀请表单数据
        this.values = null;

        // 筛选-职位类别
        this.jobType = [
            {name : '所有', value : 'all'},
            {name : '程序', value : 'program'},
            {name : '美术', value : 'art'},
            {name : '策划', value : 'support'},
            {name : '运营', value : 'operation'},
            {name : '市场', value : 'market'},
            {name : '职能', value : 'function'},
            {name : 'IT', value : 'it'}];
        // 筛选-当前状态
        this.currState = [
            {name : '所有', value : 'all'},
            {name : '未通过', value : '0'},
            {name : '待邀请', value : '10'},
            {name : '待技术面', value : '20'},
            {name : '待综合面', value : '30'},
            {name : '待终面', value : '40'},
            {name : '已入职', value : '50'}];
    }

    componentWillMount() {
        // 获取用户列表数据
        this.getWechatUserInfo();
        // 获取职位数据
        this.props.getJob();
        // 获取职位分类数据
        this.props.getJobType();
        // 获取hr联系方式
        this.props.getHrContact();
    }

    /**
     * 设置列表条件
     * @param condition 获取用户条件
     */
    setCondition = condition => {
        const newCondition = {...this.state.condition, ...condition};
        this.setState({condition : newCondition});
    }

    /**
     * 点击面试邀请触发
     */
    onInterview = v => {
        // 切换模态框状态
        this.toggleInterviewModal();
        // 将选择的用户信息存入state
        this.setState({user:v});
    }

    /**
     * 格式化日期时间 moment.js
     */
    formateDate = date => {
        if(typeof date != 'undefined' && typeof date != 'string') {
            let res = date.format('llll');
            return res;
        }
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
                        // 生成二维码
                        _this.generateQRCode(v.name);
                        resolve(v.name);
                    }
                })
            }
        })
    }

    /**
     * 发送面试邀请
     */
    submit = async () => {
        if(this.values)
        {
            if(typeof this.values.interviewdate != "string") {
                this.values.interviewdate = this.formateDate(this.values.interviewdate);
            }
            let position = await this.getJobName(this.values.interviewposition);
            let interview = {
                interviewaddress : this.values.interviewaddress,
                interviewdate : this.values.interviewdate,
                interviewposition : position,
                interviewtype : this.values.interviewtype,
                phone : this.values.phone
            }
            let data = Object.assign(interview, {link:this.state.link}, {openid:this.state.user.openid});
            this.toggleInterviewModal();
            this.props.sendMsg(data, () => {
                Toast.info(<ToastContent type="success" content={'对方已收到微信面试邀请'} />, 2, null, false);
                this.props.unCheckIn(this.state.user.openid);
                this.values = null;
                this.errors = null;
            },() => {
                Toast.info(<ToastContent type="fail" content={'网络开小差了!请稍后重试'} />, 2, null, false);
            });
        }
        else if(this.errors)
        {
            Toast.info(<ToastContent type="fail" content={this.errors} />, 2, null, false);
        }
    }

    /**
     * 生成二维码
     */
    generateQRCode = position => {
        let qrLink = `${hostName}/recruit/base/interview/qrcodes/`;
        qrLink += `${encodeURI(this.state.user.name)}/`;
        qrLink += `${encodeURI(this.state.user.phone)}/`;
        qrLink += `${encodeURI(this.state.user.openid)}/`;
        qrLink += `${encodeURI(this.values.phone)}/`;
        qrLink += `${encodeURI(position)}`;
        this.setState({link : encodeURI(qrLink)})
    }

    /**
     * 关闭模态框
     */
    cancel = () => {this.toggleInterviewModal()}

    toggleInterviewModal = () => {this.setState({ interviewPcModal: !this.state.interviewPcModal })}

    /**
     * 获取用户列表信息
     * @param isSkip 是否要分页取数据
     */
    getWechatUserInfo = isSkip => {
        let isClear = false;
        if(isSkip) {
            this.setCondition({skip : this.state.condition.skip + this.pageSize});
        }else {
            this.setCondition({skip : 0});
            isClear = true;
        }
        this.props.getWechatUser(this.state.condition, ()=>{}, ()=>{}, isClear);
    }

    /**
     * 延迟获取用户列表数据
     */
    delayGetWechatUserInfo = () => {setTimeout(() => {this.getWechatUserInfo()}, 20)}

    render() {
        let className = `RecruitDdInterviewUserList`;
        if(this.props.className) {
            className += ` ${this.props.className}`;
        }

        let stateSelection = [],
            jobTypeSelection = [],
            searchLayout = null,
            interviewModal = null,
            user = null,
            userList = [],
            jobs = [],
            hrs = [],
            notFound = null;

        // 没有数据
        notFound = <div className={`${className}-not-found`} style={{}}><img src={getSrc("PersonalCenter/Result/noUser.png")}/></div>;

        // 格式化招聘流程状态选择框数据
        this.currState.map((v, k) => {
            let select = (<RadioButton key={k} value={v.value}>{v.name}</RadioButton>)
            stateSelection.push(select);
        });
        // 格式化职位数据
        if(this.props.reducer.jobs) {
            this.props.reducer.jobs.map(v => {
                let data = {
                    label: browserAttr.versions.mobile ? v.name : v._id,
                    value: browserAttr.versions.mobile ? v._id : v.name
                }
                jobs.push(data);
            });
        }
        // 格式化职位分类搜索选择框数据
        if(this.props.reducer.jobTypes) {
            jobTypeSelection.push((<RadioButton key={-1} value={'all'}>所有</RadioButton>));
            this.props.reducer.jobTypes.map((v, k) => {
                let select = (<RadioButton key={k} value={v._id}>{v.name}</RadioButton>)
                jobTypeSelection.push(select);
            });
        }
        // 格式化HR联系方式数据
        if(this.props.reducer.hrs) {
            this.props.reducer.hrs.map(v => {
                let hr = {
                    label: browserAttr.versions.mobile ? v.name : v.phone,
                    value: browserAttr.versions.mobile ? v.phone : v.name,
                }
                hrs.push(hr);
            })
        }

        // 构建用户列表 必须有了职位数据才能加载
        if(this.props.reducer.userList && this.props.reducer.jobs) {
            this.props.reducer.userList.map((v, k) => {
                let _user = <UserProfile
                    class={`${className}-list-item`}
                    jobsOrigin={this.props.reducer.jobs}
                    onEntry={()=>{this.props.changeState(v.openid, 50)}}
                    onNotPass={()=>{this.props.changeState(v.openid, 0)}}
                    key={k}
                    userInfo={v}
                    onInterview={()=>{this.onInterview(v)}}
                />
                userList.push(_user);
            });
            user = (
                <div className={`${className}-container`}>
                    <div className={`${className}-list`}>
                        <ScrollLoad
                            loadingClassName={'user-list-loading'}
                            className={`${className}-list-scroll`}
                            isLoad={this.props.reducer.hasuserData}
                            offset={0}
                            isLoading={this.props.reducer.fetchGetuser}
                            load={() => {this.getWechatUserInfo(true)}}
                            isAutoFirst={false}
                            autoTimes={-1}
                        >
                            {this.props.reducer.isEmpty ? notFound : userList}
                        </ScrollLoad>
                    </div>
                </div>)
        }

        // 搜索
        searchLayout = (
            <div className={`${className}-header`}>
                <div className={`${className}-search`}>
                    <div className={`${className}-search-item`}>
                        <RadioGroup defaultValue={this.state.condition.orderType} onChange={e => {
                            this.setCondition({orderType : e.target.value});
                            this.delayGetWechatUserInfo();
                        }}>
                            <RadioButton value="desc">降序</RadioButton>
                            <RadioButton value="esc">升序</RadioButton>
                        </RadioGroup>
                    </div>
                    <div className={`${className}-search-item`}>
                        <RadioGroup defaultValue={this.state.condition.currState} onChange={e => {
                            this.setCondition({currState : e.target.value});
                            this.delayGetWechatUserInfo();
                        }}>{stateSelection}</RadioGroup>
                    </div>
                    <div className={`${className}-search-item`}>
                        <RadioGroup defaultValue={this.state.condition.jobType} onChange={e => {
                            this.setCondition({jobType : e.target.value});
                            this.delayGetWechatUserInfo();
                        }}>
                            {jobTypeSelection}
                        </RadioGroup>
                    </div>
                    <div className={`${className}-search-item`}>
                        <Input
                            placeholder={'请输入你想查找的姓名关键字'}
                            className={`${className}-name-search`}
                            onChange={e => {
                                this.setCondition({name : e.target.value});
                                this.delayGetWechatUserInfo();
                            }}
                        />
                    </div>
                </div>
            </div>);

        // 邀请面试模态框
        interviewModal =(
            <PcModal
                visible={this.state.interviewPcModal}
                title={`将要发送面试邀请给 ${this.state.user ? this.state.user.name : ''}`}
                onOk={this.submit}
                onCancel={this.cancel}
                footer={[
                    <PcButton key="back" size="large" onClick={this.cancel}>关闭</PcButton>,
                    <PcButton key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.submit}>确认</PcButton>,
                ]}
            >
                {this.props.reducer.jobs && this.state.user ?
                    <Interview
                        hideItems={this.hideItems}
                        setErrors={errors => this.errors = errors}
                        setValues={values => this.values = values}
                        jobs={jobs}
                        originPosition={this.state.user.willingposition}
                        originHr={this.props.publicReducer.userInfo.name}
                        hrs={hrs}
                        className={"lists"}/>
                    : null}
            </PcModal>)

        return(
            <div className={className}>
                {/*搜索*/}
                {searchLayout}
                {/*列表*/}
                {user}
                {/*面试邀请模态框*/}
                {interviewModal}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.userList,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    getHrContact, addCv, getJob, getJobById, sendMsg, getWechatUser, findWechatUserByName, unCheckIn, getJobType, changeState
}

export default store => ({
    path: 'interview/userlist',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'userList', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(UserList));
        })
    }
})