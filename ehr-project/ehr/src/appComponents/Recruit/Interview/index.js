import React, {Component, PropTypes} from 'react';
import { Select, DatePicker as PcDatePicker, Row, Col } from 'antd';
import {List, SegmentedControl, WhiteSpace, Button, Flex, Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import InputItem from 'components/InputItem';
import Picker from 'components/Picker';
import DatePicker from 'components/DatePicker';
import Pattern from 'config/pattern';
import browserAttr from 'utils/browserAttr';
import moment from 'moment';
import 'moment/locale/zh-cn';
import $ from 'jquery';

import './style.scss';

let form = null;

const maxDate = moment('2020-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2010-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);


let values = {};
class Interview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 用户原生求职意向
            originWillingPosition : null,
            // 当前登录hr
            originHr : null,
            // 面试地点
            interviewaddress : null,
            // 面试类型
            interviewtype : null
        };

        form = props.form;

        // 面试地点数据
        this.interviewaddress = [
            {label: '成都市高新区天府软件园A区A3座三楼',value:'成都市高新区天府软件园A区A3座三楼'},
            {label: '北京市海淀区科学院南路2号融科资讯大厦',value:'北京市海淀区科学院南路2号融科资讯大厦'}
        ];

        // 是否数据
        this.interviewtype = [
            {label: '技术面试',value:'技术面试'},
            {label: '综合面试',value:'综合面试'},
            {label: '终面',value:'终面'}
        ]

        this.interviewposition = [
            {label: 'web开发',value:'web开发'},
            {label: '大数据',value:'大数据'},
        ]
    }

    static propTypes =
    {
        // 初始数据
        data                :   React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func]),
        // 设置异常
        setErrors           :   React.PropTypes.func.isRequired,
        // 设置值
        setValues           :   React.PropTypes.func.isRequired,
        // 只读项
        readItems           :   React.PropTypes.array,
        // 隐藏项
        hideItems           :   React.PropTypes.array,
        // 职位列表数据
        jobs                :   React.PropTypes.array,
        // HR联系方式
        hrs                 :   React.PropTypes.array,
        // 用户原生求职意向
        originPosition      :   React.PropTypes.string,
        // 当前登录的hr姓名
        originHr            :   React.PropTypes.string
    }

    static defaultProps =
    {
        // 初始数据
        data                :   null,
        // 只读项
        readItems           :   [],
        // 隐藏项
        hideItems           :   [],
        // 职位列表数据
        jobs                :   [],
        // HR联系方式
        hrs                 :   []
    }

    componentWillMount() {
        // 初始化原生用户求职意向
        this.initialOriginPosition(this.props);
        // 初始化当前登录hr
        this.initialOriginHr(this.props);
        // 初始化面试地点
        this.initialAddress();
        // 初始化面试类型
        this.initialInterviewType();
    }

    componentDidMount() {
        // 初始验证
        validateFields(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.handleChange('interviewposition', nextProps.originPosition);
        this.setState({
            originWillingPosition : nextProps.originPosition
        });
    }

    /**
     * 转换时间
     * @param date
     * @returns {*}
     */
    getDate = date => {
        if(typeof date != 'undefined' && typeof date != 'string') {
            let res = date.format('llll').split('');
            let str = [];
            let result = null;
            res.map(v => {str.push(v.replace(/[\u4e00-\u9fa5]/, '-'))});
            str.pop();
            result = str.join('');
            return result;
        }
    }


    /**
     * 格式化日期
     * @param date
     * @returns {*}
     */
    formatDate = date => {if(date){return (moment(`${date} +0800`, 'YYYY-MM-DD Z').utcOffset(8))}}

    /**
     * 监听picker变化
     * @param key
     * @param value
     */
    handleChange = (key, value) => {
        values[key] = value;
        this.props.setValues(values);
    }


    /**
     * 初始化用户原生求职意向
     */
    initialOriginPosition = data => {
        // 初始化用户原生求职意向
        if(data.originPosition) {
            data.jobs.map(v => {
                if(v.label == data.originPosition) {
                    this.handleChange('interviewposition', v.label);
                    this.setState({originWillingPosition : v.label});
                }
            })
        }
    }

    /**
     * 初始化用当前登录hr
     */
    initialOriginHr = data => {
        data.hrs.map(v => {
            if(v.value == data.originHr) {
                this.handleChange('phone', v.label);
                this.setState({originHr : v.label});
            }
        })
    }

    /**
     * 初始化面试地点
     */
    initialAddress = () => {
        this.handleChange('interviewaddress', '成都市高新区天府软件园A区A3座三楼');
        this.setState({interviewaddress : '成都市高新区天府软件园A区A3座三楼'});
    }

    /**
     * 初始化面试类型
     */
    initialInterviewType = () => {
        this.handleChange('interviewtype', '技术面试');
        this.setState({interviewtype : '技术面试'});
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;
        const Item = List.Item;

        let className = `component-Interview`;
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <div className={className} style={this.props.style}>
                {
                    $.inArray('interviewtype', this.props.hideItems) == -1
                        ?
                        <Picker
                            data={this.interviewtype}
                            cols={1}
                            placeHolder={'请选择面试类型'}
                            initialValue={this.state.interviewtype}
                            handleChange={value => {
                                this.handleChange('interviewtype', value)
                            }}
                            {...getFieldProps('interviewtype', {
                                initialValue : data && data.interviewtype, rules: [
                                    {required : true, message : '请选择面试类型'}
                                ]})}
                            >
                            <List.Item arrow="horizontal">面试类型</List.Item>
                        </Picker>
                        :
                        null
                }
                {
                    $.inArray('interviewdate', this.props.hideItems) == -1
                        ?
                        <DatePicker
                            className="forss"
                            mode="datetime"
                            placeHolder={'请选择面试时间'}
                            handleChange={value => {
                                this.handleChange('interviewdate', value)
                            }}
                            {...getFieldProps('interviewdate', {
                                initialValue : data && this.formatDate(data.interviewdate), rules: [
                                    {required : true, message : '请选择面试时间'}
                                ]})}
                            minDate={minDate}
                            maxDate={maxDate}
                        >
                            <List.Item arrow="horizontal">面试时间</List.Item>
                        </DatePicker>
                        :
                        null
                }
                {
                    $.inArray('interviewposition', this.props.hideItems) == -1
                        ?
                        <Picker
                            data={this.props.jobs}
                            cols={1}
                            initialValue={this.state.originWillingPosition}
                            handleChange={value => {
                                this.handleChange('interviewposition', value)
                            }}
                            placeHolder={'请选择面试岗位'}
                            {...getFieldProps('interviewposition', {
                                initialValue : data && data.interviewposition, rules: [
                                    {required : true, message : '请选择面试岗位'}
                                ]})}
                            >
                            <List.Item arrow="horizontal">面试岗位</List.Item>
                        </Picker>
                        :
                        null
                }
                {
                    $.inArray('interviewaddress', this.props.hideItems) == -1
                        ?
                        <Picker
                            data={this.interviewaddress}
                            cols={1}
                            initialValue={this.state.interviewaddress}
                            handleChange={value => {
                                this.handleChange('interviewaddress', value)
                            }}
                            placeHolder={'请选择面试地点'}
                            {...getFieldProps('interviewaddress', {
                                initialValue: ['成都市高新区天府软件园A区A3座三楼'],rules: [
                                    {required : true, message : '请选择面试地点'}
                                ]
                            })}>
                            <List.Item arrow="horizontal">面试地点</List.Item>
                        </Picker>
                        :
                        null
                }
                {
                    $.inArray('phone', this.props.hideItems) == -1
                        ?
                        <Picker
                            data={this.props.hrs}
                            cols={1}
                            initialValue={this.state.originHr}
                            handleChange={value => {
                                this.handleChange('phone', value)
                            }}
                            placeHolder={'请选择HR联系方式'}
                            {...getFieldProps('phone', {
                                initialValue: [browserAttr.versions.mobile ? this.props.hrs[0].value : this.props.hrs[0].label],rules: [
                                    {required : true, message : '请选择HR联系方式'}
                                ]
                            })}>
                            <List.Item arrow="horizontal">HR联系方式</List.Item>
                        </Picker>
                        :
                        null
                }

            </div>
        )
    }
}

/**
 * 表单验证
 * @param props
 */
const validateFields = props => {
    form.validateFields((errorList, valueList) => {
        if(errorList)
        {
            let errors = [];
            for(const k1 in errorList) {
                for(const k2 in errorList[k1]['errors']) {
                    errors.push(<div key={`${k1}_${k2}`}>{errorList[k1]['errors'][k2]['message']}<br/></div>);
                }
            }

            props.setErrors(<div key={'error-book'}>{errors}</div>);
            props.setValues(null);
        }
        else
        {
            let values = {};
            if($.inArray('interviewdate', props.hideItems) == -1) values.interviewdate = valueList.interviewdate;
            if($.inArray('interviewaddress', props.hideItems) == -1) values.interviewaddress = valueList.interviewaddress;
            if($.inArray('interviewcontact', props.hideItems) == -1) values.interviewcontact = valueList.interviewcontact;
            if($.inArray('phone', props.hideItems) == -1) values.phone = valueList.phone;
            if($.inArray('interviewtype', props.hideItems) == -1) values.interviewtype = valueList.interviewtype;
            if($.inArray('interviewposition', props.hideItems) == -1) values.interviewposition = valueList.interviewposition;

            props.setValues(values);
            props.setErrors(null);
        }
    })
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(createForm({
    // 任一表单值发生改变时回调
    onValuesChange : props => {
        setTimeout(
            () => {
                validateFields(props);
            },100
        );
    }
})(Interview));