import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Row, Col, Spin} from 'antd';
import {Toast, List} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Button from 'components/Button';
import ModularContainer from 'components/ModularContainer';
import Remind from 'appComponents/Dingding/Remind';
import getSrc from 'utils/imgSrc';
import getUrl from 'utils/url';
import {getDetail} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount() {
        this.props.setLayout({title: ' ', footer: ' '});
    }

    componentDidMount() {
        // 获取详情
        this.props.getDetail(this.props.params.bookThinkingId,
            data => {
                // 标题
                this.props.setLayout({
                    title : data.title,
                    footer:
                        <Row key={new Date().getTime()}>
                            <Col span={24}>
                                <Button name={'发表评论'} action={this.readyReview} />
                            </Col>
                        </Row>
                });
            },
            status => {
                Toast.info(<ToastContent type="fail" content={status.message} />, 3, null, false);
            }
        );
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    // 准备评论
    readyReview = () => {

    }

    render() {
        // 心得
        let thinking = null;

        if(this.props.reducer.thinking)
        {
            thinking =
                <ModularContainer>
                    {this.props.reducer.thinking.title}
                </ModularContainer>
        }

        return (
            <Spin spinning={this.props.reducer.fetchGetDetail ? true : false} style={{height : document.body.clientHeight}}>
                <div className="Book-Thinking-Detail">
                    {/*心得*/}
                    {thinking}
                </div>
            </Spin>
        );
    }
}

const mapStateToProps = state => ({
    reducer : state.bookThinkingDetail,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getDetail,
    setLayout, setDefaultLayout
}

export default store => ({
    path : 'thinking/detail/:bookThinkingId',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'bookThinkingDetail', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Detail));
        })
    }
})
