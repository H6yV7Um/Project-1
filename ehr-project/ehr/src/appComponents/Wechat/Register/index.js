import React, {Component, PropTypes} from 'react';
import {List, SegmentedControl, WhiteSpace, Button, Flex, DatePicker, Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import InputItem from 'components/InputItem';
import Picker from 'components/Picker';
import Pattern from 'config/pattern';
import district from 'config/district';
import moment from 'moment';
import 'moment/locale/zh-cn';
import $ from 'jquery';

import './style.scss';

let form = null;

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        form = props.form;

        // 学历数据
        this.edu = [
            {label: '中专',value: '中专'},
            {label: '大专',value: '大专'},
            {label: '本科',value: '本科'},
            {label: '硕士',value: '硕士'},
            {label: '博士',value: '博士'}
        ];

        // 性别数据
        this.gender = [
            {label: '男',value:'男'},
            {label: '女',value:'女'}
        ];
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
        // 是否显示input框的标题
        isShowItemTitle     :   React.PropTypes.bool,
        // 职位数据
        jobs                :   React.PropTypes.array
    }

    static defaultProps =
    {
        // 只读项
        readItems       : [],
        // 隐藏项
        hideItems       : [],
        // 是否显示input框的标题
        isShowItemTitle : true,
        // 职位数据
        jobs            : []
    }

    componentDidMount() {
        // 初始验证
        validateFields(this.props);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps){

    }
    
    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;
        const Item = List.Item;

        let className = `component-Register`;
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        let addressData = null;
        if(data && data.address) {
            addressData = data.address.split(',');
        }

        let hiddenObj = {
            display : 'none'
        };

        return(
            <div className={className} style={this.props.style}>
                <List>
                    <InputItem
                        {...getFieldProps('name',{initialValue : data && data.name, rules: $.inArray('name', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入姓名'},
                                {whitespace : true, message : '请输入正确的姓名'}
                            ]
                            :
                            []})}
                        editable={$.inArray('name', this.props.readItems) == -1}
                        style={$.inArray('name', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入姓名">
                        {this.props.isShowItemTitle ? '姓名' : null}
                    </InputItem>
                    <InputItem
                        {...getFieldProps('phone',{initialValue : data && data.phone, rules: $.inArray('phone', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入电话号码'},
                                {whitespace : true, message : '请输入正确的电话号码'},
                                {pattern : Pattern.PHONE, message : '请输入正确的电话号码'}
                            ]
                            :
                            []})}
                        editable={$.inArray('phone', this.props.readItems) == -1}
                        style={$.inArray('phone', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入电话号码">
                        {this.props.isShowItemTitle ? '电话号码' : null}
                    </InputItem>
                    {/*<Picker*/}
                        {/*data={this.gender}*/}
                        {/*cols={1}*/}
                        {/*{...getFieldProps('gender',{initialValue : data && data.gender ? [data && data.gender] : data && data.gender, rules: $.inArray('gender', this.props.hideItems) == -1 ?*/}
                            {/*[*/}
                                {/*{required : true, message : '请选择性别'},*/}
                            {/*]*/}
                            {/*:*/}
                            {/*[]})}*/}
                    {/*>*/}
                        {/*<List.Item arrow="horizontal">{this.props.isShowItemTitle ? '性别' : null}</List.Item>*/}
                    {/*</Picker>*/}
                    <Picker
                        data={this.props.jobs}
                        cols={1}
                        {...getFieldProps('willingposition',{initialValue : data && data.willingposition ? [data && data.willingposition] : data && data.willingposition, rules: $.inArray('willingposition', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请选择求职意向'},
                            ]
                            :
                            []})}
                    >
                        <List.Item arrow="horizontal">{this.props.isShowItemTitle ? '求职意向' : null}</List.Item>
                    </Picker>
                </List>
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
            if($.inArray('name', props.hideItems) == -1) values.name = valueList.name;
            if($.inArray('gender', props.hideItems) == -1) values.gender = valueList.gender;
            if($.inArray('willingposition', props.hideItems) == -1) values.willingposition = valueList.willingposition;
            if($.inArray('phone', props.hideItems) == -1) values.phone = valueList.phone;

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
})(Register));