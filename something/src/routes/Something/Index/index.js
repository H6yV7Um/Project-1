import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin, Row, Col} from 'antd';
import {Card, WingBlank, WhiteSpace, Result, Icon as IconAntd} from 'antd-mobile';
import Icon from 'components/Icon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import MessageTitle from 'components/MessageTitle';
import QueueAnim from 'rc-queue-anim';

import {} from './action';

import './style.scss';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return(
            <div className="Something-Index">
                {/*广告*/}
                <div className="ad">
                    <img src={require('assets/image/ba1.jpg')} />
                </div>

                {/*APP*/}
                <div className="app-list">
                    <Row>
                        <QueueAnim
                            type={['left', 'right']}
                            ease={['easeOutQuart', 'easeInOutQuart']}>
                            {/*停车*/}
                            <Col key="car" className="app car" span={6}>
                                <Link to="/car">
                                    <div className="icon-border">
                                        <Icon className="icon" type="car" />
                                    </div>
                                    <div>停车场</div>
                                </Link>
                            </Col>
                            {/*读书*/}
                            {
                                process.env.NODE_ENV == 'development'
                                    ?
                                    <Col key="book" className="app book" span={6}>
                                        <Link to="/book">
                                            <div className="icon-border">
                                                <Icon className="icon" type="book" />
                                            </div>
                                            <div>来读书吧</div>
                                        </Link>
                                    </Col>
                                    :
                                    <Col key="book" className="app book" span={6} onClick={() => {this.props.coreComingSoon(true)}}>
                                        <div className="icon-border">
                                            <Icon className="icon" type="book" />
                                        </div>
                                        <div>来读书吧</div>
                                    </Col>
                            }
                            {/*建议*/}
                            <Col key="suggest" className="app suggest" span={6} onClick={this.props.coreComingSoon}>
                                <div className="icon-border">
                                    <Icon className="icon" type="heartbeat" />
                                </div>
                                <div>半熟建议</div>
                            </Col>
                            {/*圈子*/}
                            <Col key="say" className="app say" span={6} onClick={this.props.coreComingSoon}>
                                <div className="icon-border">
                                    <Icon className="icon" type="wechat" />
                                </div>
                                <div>tapper圈</div>
                            </Col>
                        </QueueAnim>
                    </Row>
                    <Row>
                        <QueueAnim
                            type={['right', 'left']}
                            ease={['easeOutQuart', 'easeInOutQuart']}>
                            {/*会议室*/}
                            <Col key="conference" className="app conference" span={6} onClick={this.props.coreComingSoon}>
                                <div className="icon-border">
                                    <Icon className="icon" type="comments" />
                                </div>
                                <div>会议室</div>
                            </Col>
                            {/*内推*/}
                            <Col key="recommend" className="app recommend" span={6} onClick={this.props.coreComingSoon}>
                                <div className="icon-border">
                                    <Glyphicon className="icon" glyph="education" />
                                </div>
                                <div>人才内推</div>
                            </Col>
                            {/*租房*/}
                            <Col key="house" className="app house" span={6} onClick={this.props.coreComingSoon}>
                                <div className="icon-border">
                                    <Icon className="icon" type="home" />
                                </div>
                                <div>快乐租房</div>
                            </Col>
                            {/*活动组织*/}
                            <Col key="activity" className="app activity" span={6} onClick={this.props.coreComingSoon}>
                                <div className="icon-border">
                                    <Glyphicon className="icon" glyph="camera" />
                                </div>
                                <div>结伴活动</div>
                            </Col>
                        </QueueAnim>
                    </Row>
                </div>

                {/*暂无动态*/}
                <div className="message-none">
                    <MessageTitle type="danger" icon={<Icon type="exclamation-circle"/>} title="暂无动态"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.something,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {

}

export default store => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'something', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index))
        })
    }
})
