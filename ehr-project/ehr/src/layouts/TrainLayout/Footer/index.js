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
                 </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);