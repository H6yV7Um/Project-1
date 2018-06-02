import React, {Component, PropTypes} from 'react';
import Icon from 'components/Icon';
import {List, Toast} from 'antd-mobile';
import InputItem from 'components/InputItem';
import {createForm} from 'rc-form';
import PATTERN from 'config/pattern';

import './style.scss';

let form = null;
class Offer extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        form = props.form;

    }

    static propTypes =
    {
        // 初始数据
        data        : React.PropTypes.object,
        // 设置异常
        setErrors   : React.PropTypes.func,
        // 设置值
        setValues   : React.PropTypes.func
    }

    componentDidMount() {
        // 初始验证
        validateFields(this.props);
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    render()
    {
        let className = 'appComponentOffer';

        const {getFieldProps} = this.props.form;
        const {data} = this.props;

        return(
            <div>
                <List
                    renderHeader={() =>
                        <Icon className="icon" type={'file-text-o'}  style={{color: '#FF3433'}}>
                            <span style={{color: '#000'}}>录用者信息</span>
                        </Icon>}
                >
                    <InputItem
                        {...getFieldProps('applicantName',{initialValue : data && data.applicantName, rules: [
                            {required : true, message : '请输入姓名'},
                            {whitespace : true, message : '请输入姓名'},
                        ]})}
                        clear={true}
                        placeholder="请输入姓名">
                        姓名
                    </InputItem>
                    <InputItem
                        {...getFieldProps('applicantEmail',{initialValue : data && data.applicantEmail, rules: [
                            {required : true, message : '请输入邮箱'},
                            {whitespace : true, message : '请输入邮箱'},
                            {pattern : PATTERN.EMAIL ,message : '邮箱格式不对'}
                        ]})}
                        clear={true}
                        placeholder="请输入邮箱">
                        邮箱
                    </InputItem>
                    <InputItem
                        {...getFieldProps('applicantPosition',{initialValue : data && data.applicantPosition, rules: [
                            {required : true, message : '请输入职位'},
                            {whitespace : true, message : '请输入职位'},
                        ]})}
                        clear={true}
                        placeholder="请输入职位">
                        职位
                    </InputItem>
                    <InputItem
                        {...getFieldProps('applicantDepartment',{initialValue : data && data.applicantDepartment, rules: [
                            {required : true, message : '请输入部门'},
                            {whitespace : true, message : '请输入部门'},
                        ]})}
                        clear={true}
                        placeholder="请输入部门">
                        部门
                    </InputItem>
                    <InputItem
                        {...getFieldProps('applicantPay',{initialValue : data && data.applicantPay, rules: [
                            {required : true, message : '请输入税前月薪'},
                            {whitespace : true, message : '请输入税前月薪'},
                        ]})}
                        clear={true}
                        placeholder="请输入税前月薪">
                        税前月薪
                    </InputItem>
                    <InputItem
                        {...getFieldProps('applicantDate',{initialValue : data && data.applicantDate, rules: [
                            {required : true, message : '请输入报道日期'},
                            {whitespace : true, message : '请输入报道日期'},
                        ]})}
                        clear={true}
                        placeholder="请输入报到日期">
                        报道日期
                    </InputItem>
                    <InputItem
                        {...getFieldProps('applicantTime',{initialValue : data && data.applicantTime, rules: [
                            {required : true, message : '请输入报道时间点'},
                            {whitespace : true, message : '请输入报道时间点'},
                        ]})}
                        clear={true}
                        placeholder="请输入报到时间点">
                        报道时间点
                    </InputItem>
                </List>
                <List
                    renderHeader={() =>
                        <Icon className="icon" type="home" style={{color: '#186DB7'}}>
                            <span style={{color: '#000'}}>公司信息</span>
                        </Icon>}
                >
                    <InputItem
                        {...getFieldProps('companyLocation',{initialValue : data && data.companyLocation, rules: [
                            {required : true, message : '请输入公司地址'},
                            {whitespace : true, message : '请输入公司地址'},
                        ]})}
                        clear={true}
                        placeholder="请输入公司地址">
                        公司地址
                    </InputItem>
                    <InputItem
                        {...getFieldProps('companyLink',{initialValue : data && data.companyLink, rules: [
                            {required : true, message : '请输入相关链接'},
                            {whitespace : true, message : '请输入相关链接'},
                        ]})}
                        clear={true}
                        placeholder="请输入相关链接">
                        相关链接
                    </InputItem>
                    <InputItem
                        {...getFieldProps('companyContacts',{initialValue : data && data.companyContacts, rules: [
                            {required : true, message : '请输入联系人'},
                            {whitespace : true, message : '请输入联系人'},
                        ]})}
                        clear={true}
                        placeholder="请输入联系人">
                        联系人
                    </InputItem>
                    <InputItem
                        {...getFieldProps('contactsTel',{initialValue : data && data.contactsTel, rules: [
                            {required : true, message : '请输入联系电话'},
                            {whitespace : true, message : '请输入联系电话'},
                        ]})}
                        clear={true}
                        placeholder="请输入联系电话">
                        联系电话
                    </InputItem>
                    <InputItem
                        {...getFieldProps('currentDate',{initialValue : data && data.currentDate, rules: [
                            {required : true, message : '请输入落款日期'},
                            {whitespace : true, message : '请输入落款日期'},
                        ]})}
                        clear={true}
                        placeholder="请输入落款日期">
                        落款日期
                    </InputItem>
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

            props.children[1](<div key={'error-offer'}>{errors}</div>);   //setErrors
            props.children[3](null);    //setValues

        }
        else
        {
            let values = {};
            values.applicantName        =   valueList.applicantName;
            values.applicantEmail       =   valueList.applicantEmail;
            values.applicantPosition    =   valueList.applicantPosition;
            values.applicantDepartment  =   valueList.applicantDepartment;
            values.applicantPay         =   valueList.applicantPay;
            values.applicantDate        =   valueList.applicantDate;
            values.applicantTime        =   valueList.applicantTime;
            values.companyLocation      =   valueList.companyLocation;
            values.companyLink          =   valueList.companyLink;
            values.companyContacts      =   valueList.companyContacts;
            values.contactsTel          =   valueList.contactsTel;
            values.currentDate          =   valueList.currentDate;

            props.children[3](values);    //setValues
            props.children[1](null);    //setErrors


        }
    })
}

export default createForm({
    // 任一表单值发生改变时回调
    onValuesChange : props => {
        setTimeout(
            () => {
                validateFields(props);
            },100
        );
    }
})(Offer);