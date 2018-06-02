import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Row, Col, Modal} from 'antd';
import TweenOne from 'rc-tween-one';
import Icon from 'components/Icon';

import './style.scss';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    showAdd = () => {
        this.setState({isShowAdd : true, isHideAdd : false});
    }

    hideAdd = () => {
        this.setState({isHideAdd : true});
        setTimeout(()=>{
            this.setState({isShowAdd : false});
        }, 300);
    }

    render() {
        return(
            <div className="BookLayout-Footer">
                {/*菜单*/}
                <Row>
                    {/*发现*/}
                    <Col className="button-action menu index" span={5}>
                        <div>
                            <Link to="/book">
                                <div className="icon-border">
                                    <Icon type="diamond" />
                                </div>
                                发现
                            </Link>
                        </div>
                    </Col>
                    {/*书库*/}
                    <Col className="button-action menu books" span={5}>
                        <div>
                            <Link to="/book/library">
                                <div className="icon-border">
                                    <Icon classType="it" type="ziliaoshouce-xianxing" />
                                </div>
                                书库
                            </Link>
                        </div>
                    </Col>
                    {/*新增*/}
                    <Col className="button-action menu add" span={5} onClick={this.showAdd}>
                        <div className="icon-border">
                            <div className="icon-bg" style={{display : this.state.isShowAdd ? 'none' : 'flex'}}>
                                <Icon type="plus"/>
                            </div>
                        </div>
                    </Col>
                    {/*心得*/}
                    <Col className="button-action menu think" span={5}>
                        <div className="icon-border">
                            <Icon classType="it" type="liaotianduihua-xianxing" />
                        </div>
                        <div>心得</div>
                    </Col>
                    {/*我*/}
                    <Col className="button-action menu home" span={5}>
                        <Link to="/book/personal_center">
                            <div className="icon-border">
                                <Icon classType="it" type="yonghu-xianxing" />
                            </div>
                            <div>我</div>
                        </Link>
                    </Col>
                </Row>

                <Modal
                    className="book-add-border ant-modal-empty"
                    visible={this.state.isShowAdd} footer={null} closable={false} width={document.body.clientWidth}
                    style={{paddingTop : document.body.clientHeight - 225}}>
                    <div className="add-menu-border">
                        <div className="add-menu-comment">
                            <Link to="/book/thinking/publish/share">
                                <div className="button-action add-menu-bg-border">
                                    <div className="add-menu-bg">
                                        <Icon classType="it" type="xie" />
                                        <div>分享心得</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="add-menu-recommend">
                            <Link to="/book/recommend_ready">
                                <div className="button-action add-menu-bg-border">
                                    <div className="add-menu-bg">
                                        <Icon type="book" />
                                        <div>推荐读书</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="add-menu-find">
                            <div className="button-action add-menu-bg-border">
                                <Link to="/book/thinking/publish/consult">
                                    <div className="add-menu-bg">
                                        <Icon classType="it" type="sousuo-sousuo" />
                                        <div>心得请教</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="add-button-border">
                        <TweenOne
                            animation={{rotate: 45, repeat: 0, duration: 300}}
                            reverse={this.state.isHideAdd}
                        >
                            <div className="button-action add-button-bg" onClick={this.hideAdd}>
                                <Icon type="plus" />
                            </div>
                        </TweenOne>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);