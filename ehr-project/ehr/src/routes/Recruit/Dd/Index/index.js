import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import { Input, Modal as PcModal, Button as PcButton, Menu as PcMenu} from 'antd';
import {List, WhiteSpace, Button, Flex, DatePicker, Modal, Toast, TabBar} from 'antd-mobile';
import {injectReducer} from 'store/reducers';
import UserProfile from 'appComponents/Recruit/UserProfile';
import Interview from 'appComponents/Recruit/Interview';
import ScrollLoad from 'components/ScrollLoad';
import Icon from 'components/Icon';
import ToastContent from 'components/ToastContent';
import getSrc from 'utils/imgSrc';
import browserAttr from 'utils/browserAttr';
import {hostName} from 'config/wechat';
import $ from 'jquery';
import 'jquery-easing';

import {addCv, getJob, sendMsg, getWechatUser, findWechatUserByName, unCheckIn} from './action';

import './style.scss';

const Search = Input.Search;
const SubMenu = PcMenu.SubMenu;

// 面试综合信息
class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            interviewModal      :   false,
            interviewPcModal    :   false,
            loading             :   false,
            title               :   null,
            currUserInfo        :   null,
            link                :   null,
            isFetch             :   false,
            isSearch            :   false,
            userList            :   [],
            isEmpty             :   false,
            height              :   null,
            openKeys            :   ['sub1'],
            currPage            :   'userList'
        };

        this.hideItems = [];
        this.error = null;
        this.values = null;
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    }

    componentDidMount() {
       
    }

    componentWillMount() {
        // 获取职位列表
        this.props.getJob(() => {
            setTimeout(() => {
                this.setState({isFetch : true})
            }, 10)
        });

        this.setState({
            title : '面试邀请',
            height : document.documentElement.clientHeight
        })
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    // 提示信息函数
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
    }


    formateDate = date => {
        if(typeof date != 'undefined' && typeof date != 'string') {
            let res = date.format('llll');
            return res;
        }
    }

    // 生成二维码
    generateQRCode = position => {
        let SERVER = hostName,
            qrLink = `${SERVER}/recruit/personalcenter/qrcodes/`;
        qrLink += `${encodeURI(this.state.currUserInfo.name)}/`;
        qrLink += `${encodeURI(this.state.currUserInfo.phone)}/`;
        qrLink += `${encodeURI(this.state.currUserInfo.openid)}/`;
        qrLink += `${encodeURI(position)}`
        this.setState({link : encodeURI(qrLink)})
    }

    // 发送面试邀请
    send = () => {
        if(this.values)
        {
            if(typeof this.values.interviewdate != "string") {
                this.values.interviewdate = this.formateDate(this.values.interviewdate);
            }
            this.generateQRCode(this.values.interviewposition);
            setTimeout(() => {
                let data = Object.assign(this.values, {link:this.state.link}, {openid:this.state.currUserInfo.openid});
                this.props.sendMsg(data, () => {
                    this.showMessage('success', '对方已收到微信面试邀请');
                    this.props.unCheckIn(this.state.currUserInfo.openid);
                },() => {
                    this.showMessage('fail', '网络开小差了!请稍后重试');
                });
            }, 50)
        }
        else if(this.errors)
        {
            this.showMessage('error', this.errors);
        }
    }

    onSearch = value => {
        let keyword = $.trim(value);
        if(keyword == '') {
            this.showMessage('fail', '请输入你想查找的用户名');
            return;
        }
        this.props.findWechatUserByName(keyword, () => {
            setTimeout(() => {
                if(this.props.reducer.searchResult.length == 0) {
                    this.setState({
                        isEmpty : true
                    })
                }else {
                    this.setState({
                        isEmpty : false
                    })
                    this.initialList(this.props.reducer.searchResult)
                }
            }, 10)
        });
        // 改状态为显示搜索结果的状态
        this.setState({
            isSearch : true,
        });
    }

    // 根据数据初始化列表
    initialList = data => {
        let user = null,
            userList = [];
        if(data){
            data.map((item, index) => {
                userList.push(
                    <UserProfile
                        key={index}
                        userInfo={item}
                        onInterview={() => {
                            if(browserAttr.versions.mobile) {
                                this.setState({
                                    interviewModal : true,
                                    currUserInfo   : item
                                });
                            }else{
                                this.setState({
                                    interviewPcModal : true,
                                    currUserInfo   : item
                                });
                            }
                        }}
                    />
                )
            });

            user =
                <ScrollLoad
                    loadingClassName={'user-list-loading'}
                    isLoad={this.props.reducer.hasuserData}
                    offset={0}
                    isLoading={this.props.reducer.fetchGetuser}
                    load={() => this.props.getuser(20, this.props.reducer.gotBookIds)}
                    isAutoFirst={true}
                    autoTimes={-1}
                >
                    {userList}
                </ScrollLoad>
        }
        this.setState({
            userList : user
        })
    }

    // 点击pc端模态框确认按钮
    handleOk = () => {
        this.send();
        this.setState({ interviewPcModal: false });
    }

    // 点击pc端返回按钮
    handleCancel = () => {
        this.setState({ interviewPcModal: false });
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    // 当选择pc端菜单时
    handleSelect = item => {
        switch (item.key) {
            case '1':
                browserHistory.push('/recruit/userlist')
                break;
            case '2':
                break;
            case '3':
                break;
        }
    }


    render() {
        let jobs = [],
            layout = null,
            notFoundObj = {
                backgroundColor : '#fff',
                height : this.state.height
            };


        // 格式化职位数据
        if(this.props.reducer.jobs) {
            this.props.reducer.jobs.map(v => {
                let data = {
                    label: v.name,
                    value: v.name
                }
                jobs.push(data);
            });
        }

        // // 根据点击不同的菜单项渲染不同的layout, 仅仅在pc端
        // if(!browserAttr.versions.mobile) {
        //     switch (this.state.currPage) {
        //         case 'userList':
        //             layout = {}
        //             break;
        //     }
        // }

        return(
            <div className="Recruit-Index" style={{height:this.state.height}}>
                <h1>首页</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.showRecruit,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    addCv, getJob, sendMsg, getWechatUser, findWechatUserByName, unCheckIn
}

export default store => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'showRecruit', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index));
        })
    }
})
