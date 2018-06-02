import React, {Component, PropTypes} from 'react';
import { Select, DatePicker as PcDatePicker, Row, Col, Form, Input } from 'antd';
import {List, SegmentedControl, WhiteSpace, Button, Flex, Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import Picker from 'components/Picker';
import DatePicker from 'components/DatePicker';
import Pattern from 'config/pattern';
import browserAttr from 'utils/browserAttr';
import moment from 'moment';
import 'moment/locale/zh-cn';
import $ from 'jquery';

import './style.scss';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkNick: false,
            isCallCheck : false
        };


    }

    static propTypes =
    {
        // 初始数据
        data                :   React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func]),
        // 只读项
        readItems           :   React.PropTypes.array,
        // 隐藏项
        hideItems           :   React.PropTypes.array,
        // 职位列表数据
        jobs                :   React.PropTypes.array,
        // 是否调用检查函数
        isCallCheck         :   React.PropTypes.bool
    }

    static defaultProps =
    {
        // 初始数据
        data            :   null,
        // 只读项
        readItems       :   [],
        // 隐藏项
        hideItems       :   [],
        // 职位列表数据
        jobs            :   [],
        // 是否调用检查函数
        isCallCheck     :   false
    }

    componentDidMount() {
        // 初始验证
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate() {
        this.check();
        return true;
    }

    check = () => {
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    console.info('success');
                }
            },
        );
    }

    handleChange = (e) => {
        this.setState({
            checkNick: e.target.checked,
        }, () => {
            this.props.form.validateFields(['nickname'], { force: true });
        });
    }

    render()
    {
        const { getFieldDecorator } = this.props.form;
        const {data} = this.props;
        const Item = List.Item;

        let className = `appComponent-BackStage`;
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <div className={className} style={this.props.style}>
                {
                    $.inArray('interviewtype', this.props.hideItems) == -1
                        ?
                        <FormItem {...formItemLayout} label="Name">
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your name',
                                }],
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </FormItem>
                        :
                        null
                }
            </div>
        )
    }
}

const BackStage = Form.create()(Demo);

export default BackStage;