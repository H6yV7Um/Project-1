import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Row, Col} from 'antd';
import {Toast, List} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Button from 'components/Button';
import Remind from 'appComponents/Dingding/Remind';
import Thinking from 'appComponents/Book/Thinking/Thinking';
import getSrc from 'utils/imgSrc';
import getUrl from 'utils/url';
import {publish} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class Publish extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        // 数据异常
        this.errors = {
            // 心得
            thinking : null
        };
        // 数据
        this.values = {
            // 心得
            thinking : null,
            // 提醒
            remind : null
        };

        // 执行Ding
        this.runDing = null;
    }

    componentWillMount() {
        this.props.setLayout({
            title: this.props.params.type == 'share' ? '分享心得' : '心得请教',
            footer:
                <Row>
                    <Col span={24}>
                        <Button name="发表" action={this.submit} isLoading={{reducer: 'bookThinkingPublish', isLoading: 'fetchPublish'}} />
                    </Col>
                </Row>
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    /**
     *  提交
     */
    submit = () => {
        if(this.values.thinking)
        {
            this.props.publish(this.values.thinking, this.values.remind, data => {
                // Ding
                this.runDing(
                    this.values.remind,
                    this.props.params.type == 'share' ? '刚刚分享了一些心得，来看看吧~' : '向你请教一些心得！',
                    this.values.thinking.title,
                    this.values.thinking.thinking,
                    getUrl(`/book/thinking/detail/${data.book_thinking_id}`),
                    getSrc('book_cover_default3.jpg')
                );
                // // 跳转详情
                // this.props.router.push(`/book/detail/${data.book_id}`);
            }, status => {
                Toast.info(<ToastContent type="fail" content={status.message} />, 3, false);
            });
        }
        else if(this.errors.thinking)
        {
            Toast.info(<ToastContent type="fail" content={this.errors.thinking} />, 5, null, false);
        }
    }

    render() {
        return (
            <div className="Book-Thinking-Publish">
                <Thinking
                    type={this.props.params.type}
                    setErrors={errors => this.errors.thinking = errors}
                    setValues={values => this.values.thinking = values}
                />
                <List className="remind">
                    <Remind
                        setRunDing={runDing => this.runDing = runDing}
                        setValues={values => {
                            this.values.remind = values.userIds;
                        }}
                    />
                </List>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducer : state.bookThinkingPublish,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    publish,
    setLayout, setDefaultLayout
}

export default store => ({
    path : 'thinking/publish/:type',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'bookThinkingPublish', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Publish));
        })
    }
})
