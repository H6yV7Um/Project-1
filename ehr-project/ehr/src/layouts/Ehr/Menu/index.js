import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';
import {List, Toast} from 'antd-mobile';
import browserAttr from 'utils/browserAttr';
import $ from 'jquery';

import {setPage} from '../action';

import './style.scss';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.width = $(window).width() - 100 > 500 ? 500 : $(window).width() - 100;
    }

    static propTypes =
    {
        // 当前菜单
        menu       : React.PropTypes.string
    }

    // 选中菜单
    choose = menu => {
        this.props.setPage('main');
        setTimeout(() => {
            if(menu)
            {
                browserHistory.push(`/${menu}`);
            }
            else
            {
                browserHistory.push('/');
            }
        }, 200);
    }

    render() {
        let className = 'layoutEhrMenu';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName} style={{width : this.width, minHeight : $(window).height()}}>
                <div className={`${className}-title`} style={{width : this.width, marginTop : $(window).height() - 38}}>Make something people love</div>

                {/*个人信息*/}
                <div className={`${className}-user`}>
                    {/*头像*/}
                    <Avatar className={`${className}-user-avatar`} url={this.props.publicReducer.userInfo.avatar} />
                    <div className={`${className}-user-info`}>
                        {/*名字*/}
                        <div className={`${className}-user-name`}>{this.props.publicReducer.userInfo.name}</div>
                        {/*EHR信息*/}
                        <div className={`${className}-user-ehr`}>
                            <Icon className={`${className}-user-icon`} type={'drivers-license'}/>
                        </div>
                    </div>
                </div>

                <List className={`${className}-menu`}>
                    {/*综合*/}
                    <List.Item
                        className={`${className}-menu-item ${this.props.menu == '' ? `${className}-menu-item-check` : null} ${className}-menu-item-global`}
                        onClick={e => this.choose(null)}
                        thumb={<Icon className={`${className}-menu-icon`} type={'area-chart'}/>}
                        extra={this.props.menu == null ? <Icon className={`${className}-menu-extra`} type={'circle-o'}/> : null}
                    >
                        综合
                    </List.Item>
                    {/*绩效*/}
                    <List.Item
                        className={`${className}-menu-item ${this.props.menu == 'performance' ? `${className}-menu-item-check` : null} ${className}-menu-item-performance`}
                        onClick={e => this.choose('performance/user')}
                        thumb={<Icon className={`${className}-menu-icon`} type={'calendar-check-o'}/>}
                        extra={this.props.menu == 'performance' ? <Icon className={`${className}-menu-extra`} type={'circle-o'}/> : null}
                    >
                        绩效
                    </List.Item>
                    {/*面试*/}
                    <List.Item
                        className={`${className}-menu-item ${this.props.menu == 'recruit' ? `${className}-menu-item-check` : null} ${className}-menu-item-recruit`}
                        onClick={e => this.choose('recruit')}
                        thumb={<Icon className={`${className}-menu-icon`} type={'heartbeat'}/>}
                        extra={this.props.menu == 'recruit' ? <Icon className={`${className}-menu-extra`} type={'circle-o'}/> : null}
                    >
                        招聘
                    </List.Item>
                    {/*转正*/}
                    <List.Item
                        className={`${className}-menu-item ${this.props.menu == 'become' ? `${className}-menu-item-check` : null} ${className}-menu-item-become`}
                        onClick={e => this.choose('become')}
                        thumb={<Icon className={`${className}-menu-icon`} type={'handshake-o'}/>}
                        extra={this.props.menu == 'become' ? <Icon className={`${className}-menu-extra`} type={'circle-o'}/> : null}
                    >
                        转正
                    </List.Item>
                    {/*离职*/}
                    <List.Item
                        className={`${className}-menu-item ${this.props.menu == 'leave' ? `${className}-menu-item-check` : null} ${className}-menu-item-leave`}
                        onClick={e => this.choose('leave')}
                        thumb={<Icon className={`${className}-menu-icon`} type={'envelope-open-o'}/>}
                        extra={this.props.menu == 'leave' ? <Icon className={`${className}-menu-extra`} type={'circle-o'}/> : null}
                    >
                        离职
                    </List.Item>
                    {/*晋升*/}
                    <List.Item
                        className={`${className}-menu-item ${this.props.menu == 'promotion' ? `${className}-menu-item-check` : null} ${className}-menu-item-promotion`}
                        onClick={e => this.choose('promotion')}
                        thumb={<Icon className={`${className}-menu-icon`} type={'graduation-cap'}/>}
                        extra={this.props.menu == 'promotion' ? <Icon className={`${className}-menu-extra`} type={'circle-o'}/> : null}
                    >
                        晋升
                    </List.Item>
                    {/*培训*/}
                    <List.Item
                        className={`${className}-menu-item ${this.props.menu == 'train' ? `${className}-menu-item-check` : null} ${className}-menu-item-train`}
                        onClick={e => this.choose('train')}
                        thumb={<Icon className={`${className}-menu-icon`} type={'book'}/>}
                        extra={this.props.menu == 'train' ? <Icon className={`${className}-menu-extra`} type={'circle-o'}/> : null}
                    >
                        培训
                    </List.Item>
                </List>

                {
                    !browserAttr.versions.mobile
                        ?
                        <List className={`${className}-menu`}>
                            {/*数据录入*/}
                            <List.Item
                                className={`${className}-menu-item ${this.props.menu == 'input' ? `${className}-menu-item-check` : null} ${className}-menu-item-input`}
                                onClick={e => this.choose('input')}
                                thumb={<Icon className={`${className}-menu-icon`} type={'cloud-upload'}/>}
                                extra={this.props.menu == 'input' ? <Icon className={`${className}-menu-extra`} type={'circle-o'}/> : null}
                            >
                                数据录入
                            </List.Item>
                        </List>
                        :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);