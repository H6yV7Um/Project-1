import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'antd';
import {Icon as IconAntd, Toast} from 'antd-mobile';
import Icon from 'components/Icon';

import './style.scss';

export default class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return(
            <div className="IndexLayout-Footer">
                {/*菜单*/}
                <Row>
                    {/*首页*/}
                    <Col className="button-action menu index" span={5}>
                        <Link to="/">
                            <div className="icon-border">
                                <Icon type="home" />
                            </div>
                            <div>首页</div>
                        </Link>
                    </Col>
                    {/*扫一扫*/}
                    <Col className="button-action menu qr" span={5} onClick={this.props.scanQrCode}>
                        <div className="icon-border">
                            <IconAntd type={require('assets/svg/saoyisao.svg')} size="md"/>
                        </div>
                        <div>扫一扫</div>
                    </Col>
                    {/*新增*/}
                    <Col className="button-action menu add" span={5} onClick={this.props.comingSoon}>
                        <Icon type="plus" />
                    </Col>
                    {/*消息*/}
                    <Col className="button-action menu message" span={5} onClick={this.props.comingSoon}>
                        <div className="icon-border">
                            <Icon type="commenting" />
                        </div>
                        <div>消息</div>
                    </Col>
                    {/*设置*/}
                    <Col className="button-action menu set" span={5} onClick={this.props.comingSoon}>
                        <div className="icon-border">
                            <Icon type="cog" />
                        </div>
                        <div>设置</div>
                    </Col>
                </Row>
            </div>
        )
    }
}