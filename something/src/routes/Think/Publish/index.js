import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Row, Col} from 'antd';
import {Toast} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Button from 'components/Button';
import SegmentedControl from 'components/SegmentedControl';
import Think from 'appComponents/Think/Think';
import Icon from 'components/Icon';
import {setLayout, setDefaultLayout} from 'layouts/ThinkLayout/action';

import {getTagData, publish} from './action';

import './style.scss';

class Publish extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 分类 (1:心情 2:建议 3:征集)
            type        :   this.props.params.type,
            // 心情标签
            tagData1    :   {hot : [], common : []},
            // 建议标签
            tagData2    :   {hot : [], common : []},
            // 征集标签
            tagData3    :   {hot : [], common : []}
        };

        // 数据异常
        this.errors = null;
        // 数据
        this.values = null;
    }

    componentWillMount() {
        // 获取心情标签
        this.props.getTagData(1, data => {
            this.setState({tagData1 : data});
        });

        // 获取建议标签
        this.props.getTagData(2, data => {
            this.setState({tagData2 : data});
        });

        // 获取征集标签
        this.props.getTagData(3, data => {
            this.setState({tagData3 : data});
        });

        this.props.setLayout({
            header:
                <div className="Think-Publish-type">
                    <SegmentedControl
                        values={['心情', '建议', '征集']}
                        initIndex={this.props.params.type - 1}
                        color={'#4E394C'}
                        onChange={index => {
                            this.setState({type : index + 1});
                        }}
                    />
                </div>,
            footer:
                <Row>
                    <Col span={24}>
                        <Button
                            name="发表"
                            type={'think'}
                            action={this.submit}
                            icon={<Icon type={'paper-plane-o'} />}
                            iconStyle={{marginRight : 10, color : '#5AB2A3'}}
                            isLoading={{reducer: 'thinkPublish', isLoading: 'fetchPublish'}}
                        />
                    </Col>
                </Row>
        });
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    submit = () => {
        if(this.values)
        {
            const think = {...this.values, type : this.state.type};
            this.props.publish(think, data => {
                // 跳转详情
                this.props.router.replace(`/think/detail/${data.think_id}`);
            }, status => {
                Toast.info(<ToastContent type="fail" content={status.message} />, 3, false);
            });
        }
        else if(this.errors)
        {
            Toast.info(<ToastContent type="fail" content={this.errors} />, 5, null, false);
        }
    }

    render() {
        // 标签
        let tagData = null;
        // 想法隐藏项
        let hideItems = [];
        switch(parseInt(this.state.type))
        {
            // 心情
            case 1:
                tagData = this.state.tagData1;
                hideItems = ['department_admin_id', 'department_see_ids'];
                break;
            // 建议
            case 2:
                tagData = this.state.tagData2;
                break;
            // 征集
            case 3:
                tagData = this.state.tagData3;
                break;
        }

        return(
            <div className="Think-Publish">
                <Think
                    className="think"
                    tagData={tagData}
                    hideItems={hideItems}
                    setErrors={errors => this.errors = errors}
                    setValues={values => this.values = values}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.thinkPublish,
    thinkReducer : state.thinkLayout,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getTagData, publish,
    setLayout, setDefaultLayout
}

export default store => ({
    path : 'publish/:type',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'thinkPublish', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Publish));
        })
    }
})
