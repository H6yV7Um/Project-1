import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Row, Col} from 'antd';
import {Icon as IconAntd, Toast, Modal, ActionSheet} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import ActionSheetIcon from 'components/ActionSheetIcon';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';
import dd from 'utils/dingding';

import {findUserForCarNum} from './action';

import './style.scss';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     *  搜一搜
     */
    sou = () => {
        Modal.prompt('搜一搜', '又挡道了？找它主人来。。',
            [
                {text : '取消'},
                {
                    text : '确定',
                    onPress : value => {
                        if(value.length < 5 || value.length > 7)
                        {
                            Toast.info(<ToastContent type="fail" content="该车牌号不存在哦" />, 5, null, false);
                        }
                        else
                        {
                            this.findUserForCarNum(value);
                        }
                    },
                },
            ]
        )
    }

    /**
     *  二维码扫一扫
     */
    scanQrCode = () => {
        if(dd.os != 'pc')
        {
            dd.biz.util.scan({
                type: 'qrCode',
                onSuccess: data => {
                    data = data.text.split(':');
                    switch (data[0])
                    {
                        // 车牌号查找用户
                        case 'tap4fun_something_findUserForCarNum':
                            this.findUserForCarNum(data[1]);
                            break;
                        // 无法识别
                        default:
                            Toast.info(<ToastContent type="fail" content="很抱歉！暂无法识别此码" />, 3, null, false);
                            break;
                    }
                },
                onFail : e => {
                    console.log(e)
                }
            })
        }
        else
        {
            Toast.info(<ToastContent type="info" content="PC端暂不支持扫一扫" />, 3, null, false);
        }
    }

    /**
     * 车牌号查找用户
     * @param carNum    车牌号
     */
    findUserForCarNum = carNum => {
        this.props.findUserForCarNum(carNum, user => {
            if(user.user_id == this.props.reducer.userInfo.user_id)
            {
                Toast.info(<ToastContent type="info" content="你怎么连自己的车都忘了呢" />, 5, null, false);
            }
            else
            {
                // pc暂无会话和电话,alert提示
                if(dd.os == 'pc')
                {
                    Modal.alert(
                        <Avatar style={{display : 'inline-block'}} url={user.avatar} size="lg" />,
                        <span>
                            <span style={{color : '#000', marginRight : 15}}>{user.name}</span>
                            <Icon type="phone" style={{marginRight : 5}}/>{user.mobile}
                        </span>,
                        [{text: '好的', onPress: () => {}}]
                    )
                }
                else
                {
                    let options = null;
                    // 公司员工
                    if(!user.set)
                    {
                        options =
                            [
                                {
                                    title : '钉钉',
                                    icon : <ActionSheetIcon type="chat" userId={user.user_id}/>
                                },
                                {
                                    title : '电话',
                                    icon : <ActionSheetIcon type="chat_mobile" userId={user.user_id}/>
                                }
                            ];
                    }
                    // 外来人员
                    else
                    {
                        options =
                            [
                                {
                                    title : '电话',
                                    icon : <ActionSheetIcon type="mobile" mobile={user.mobile}/>
                                }
                            ];
                    }
                    ActionSheet.showShareActionSheetWithOptions(
                        {
                            options : options,
                            message :
                                <span>
                                    <Avatar style={{display : 'inline-block'}} url={user.avatar} size="lg" />
                                    <br/>
                                    <span style={{color : '#000'}}>{user.name}</span>
                                </span>
                        }
                    );
                }
            }
        }, status => {
            Toast.info(<ToastContent type="fail" content={status.message} />, 5, null, false);
        });
    }

    render() {
        return(
            <div className="CarLayout-Footer">
                {/*菜单*/}
                <Row>
                    {/*首页*/}
                    <Col className="button-action menu index" span={6}>
                        <Link to="/car">
                            <div className="icon-border">
                                <Icon type="car" />
                            </div>
                            <div>我的爱车</div>
                        </Link>
                    </Col>
                    {/*扫一扫*/}
                    <Col className="button-action menu qr" span={6} onClick={this.scanQrCode}>
                        <div className="icon-border">
                            <IconAntd type={require('assets/svg/saoyisao.svg')} size="md"/>
                        </div>
                        <div>扫一扫</div>
                    </Col>
                    {/*搜一搜*/}
                    <Col className="button-action menu search" span={6} onClick={this.sou}>
                        <div className="icon-border">
                            <Icon type="search" />
                        </div>
                        <div>搜一搜</div>
                    </Col>
                    {/*新增*/}
                    <Col className="button-action menu add" span={6}>
                        <Link to="/car/add">
                            <div className="icon-border">
                                <Icon type="plus" />
                            </div>
                            <div>添加爱车</div>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.coreLayout
})

const mapDispatchToProps = {
    findUserForCarNum
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);