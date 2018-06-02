import React, {Component, PropTypes} from 'react';
import { List, Flex } from 'antd-mobile';
import { Row, Col, Tag, Button, Menu, Dropdown} from 'antd';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';
import $ from 'jquery';

import './style.scss';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobName : null,
            // 每行的高度
            rowHeight : null
        };
    }

    static propTypes = {
        // 用户数据
        userInfo            :   React.PropTypes.object.isRequired,
        // 点击邀请面试时触发事件
        onInterview         :   React.PropTypes.func,
        // 点击标记为已入职时触发事件
        onEntry             :   React.PropTypes.func,
        // 点击标记为未通过时触发事件
        onNotPass           :   React.PropTypes.func,
        // 职位原始数据
        jobsOrigin          :   React.PropTypes.array
    }

    static defaultProps = {
        // 点击邀请面试时触发事件
        onInterview         :   () => {},
        // 点击标记为已入职时触发事件
        onEntry             :   () => {},
        // 点击标记为未通过时触发事件
        onNotPass           :   () => {},
        // 职位原始数据
        jobsOrigin          :   []
    }

    componentWillMount(){
        this.getJob();
    }

    componentDidMount() {
        this.setState({rowHeight : $(this.row).height()});
    }


    getJob = async () => {
        if(this.props.userInfo.willingposition.length == 24) {
            let job = await this.getJobName(this.props.userInfo.willingposition);
            this.setState({jobName : job})
        }else {
            this.setState({jobName : this.props.userInfo.willingposition})
        }
    }

    getTagInfo = type => {
        let data = null;
        switch (this.props.userInfo.state) {
            case 0:
                data = type == 'color' ? '#fd3736' : '未通过';
                break;
            case 10:
                data = type == 'color' ? '#fca331' : '待邀请';
                break;
            case 20:
                data = type == 'color' ? '#1cc0cf' : '待技术面';
                break;
            case 30:
                data = type == 'color' ? '#2d8beb' : '待综合面';
                break;
            case 40:
                data = type == 'color' ? '#ad3efb' : '待终面';
                break;
            case 50:
                data = type == 'color' ? '#2fb62f' : '已入职';
                break;
        }
        return data;
    }

    formatTime = _time => {
        let time = new Date(Number(_time)),
            year = time.getFullYear(),
            month = time.getMonth()+1,
            date = time.getDate(),
            hours = String(time.getHours()),
            minutes = String(time.getMinutes()),
            formattedTime = null;
        // 处理分钟小时 一位数显示问题
        hours = hours.length == 1 ? `0${hours}` : hours;
        minutes = minutes.length == 1 ? `0${minutes}` : minutes;
        formattedTime = `${year}-${month}-${date} ${hours}:${minutes}`;
        return formattedTime;
    }

    /**
     * 根据id获取职位名称 从reducer中去匹配
     * @param id
     * @returns {Promise}
     */
    getJobName = id => {
        let _this = this;
        return new Promise(function (resolve, reject) {
            if(_this.props.jobsOrigin) {
                _this.props.jobsOrigin.map(v => {
                    if(id == v._id) {
                        resolve(v.name);
                    }
                })
            }
        })
    }

    render() {
        let className = `appComponent-Recruit-UserProfile`;
        let componentClassName = `${className}`;
        if(this.props.className) {
            componentClassName += ` ${this.props.className}`;
        }

        const menu = (
            <Menu>
                <Menu.Item><a onClick={this.props.onInterview}><Icon type="paper-plane" style={{color: '#66a3dc'}}><span style={{color: '#000'}}>   邀请面试</span></Icon></a></Menu.Item>
                <Menu.Item>
                    <a onClick={this.props.onEntry}><Icon type="check-square-o" style={{color: '#00BA84'}}><span style={{color: '#000'}}>   标记为已入职</span></Icon></a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.props.onNotPass}><Icon type="ban" style={{color: '#FF2B44'}}><span style={{color: '#000'}}>   标记为未通过</span></Icon></a>
                </Menu.Item>
            </Menu>
        )

        return (
            <div className={componentClassName} ref={dom => this.row = dom}>
                <Row>
                    <Col span={2}><div className={`${className}-avatar`}><Avatar url={this.props.userInfo.headimgurl} isAddSize={false}/></div></Col>
                    <Col span={4}>
                        <div className={`${className}-userinfo`}>
                            <div className={`${className}-userinfo-name`}>{`${this.props.userInfo.name}`}</div>
                            <div className={`${className}-userinfo-time`}>{this.formatTime(this.props.userInfo.delivery_time)}</div>
                        </div>
                    </Col>
                    <Col span={6}><div className={`${className}-position`} style={{height:$(this.row).height()}}>{this.state.jobName}</div></Col>
                    <Col span={4}><div className={`${className}-phone`} style={{height:$(this.row).height()}}>{this.props.userInfo.phone}</div></Col>
                    <Col span={4}><div className={`${className}-status`} style={{height:$(this.row).height()}}><Tag color={this.getTagInfo('color')}>{this.getTagInfo('state')}</Tag></div></Col>
                    <Col span={4}>
                        <div className={`${className}-btn`} style={{height:$(this.row).height()}}>
                            <Dropdown overlay={menu} placement="topLeft"><Button type="primary"><Icon type={'cog'}/></Button></Dropdown>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default UserProfile;