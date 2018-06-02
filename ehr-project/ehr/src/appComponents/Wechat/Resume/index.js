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

const maxDate = moment('2020-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2010-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff', padding: '0 0.3rem' }}
    >
        <div style={{ display: 'flex', height: '3rem', lineHeight: '3rem' }}>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',marginLeft : '0.8rem',textAlign : 'left' }}>{props.children}</div>
            <div style={{ textAlign: 'right', color: '#000' }}>{props.extra}</div>
        </div>
    </div>
);
class Resume extends Component {
    constructor(props) {
        super(props);

        this.state = {
            work : 'block',
            _education : 'block',
            link : 'block',
            basic : 'block',
            contact : 'block'
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

        // 是否数据
        this.whether = [
            {label: '是',value:'是'},
            {label: '否',value:'否'}
        ]
    }

    static propTypes =
    {
        // 初始数据
        data                :   React.PropTypes.Object,
        // 设置异常
        setErrors           :   React.PropTypes.func.isRequired,
        // 设置值
        setValues           :   React.PropTypes.func.isRequired,
        // 只读项
        readItems           :   React.PropTypes.array,
        // 隐藏项
        hideItems           :   React.PropTypes.array,
        // 基本信息标题
        basicTitle          :   React.PropTypes.string,
        // 联系方式标题
        contactTitle        :   React.PropTypes.string,
        // 工作经历标题
        workTitle           :   React.PropTypes.string,
        // 是否显示input框的标题
        isShowItemTitle     :   React.PropTypes.bool,
        // 职位的placeholder
        positionPlaceholder :   React.PropTypes.string,
        // 二维码链接的值
        link                :   React.PropTypes.string
    }

    static defaultProps =
    {
        // 只读项
        readItems       : [],
        // 隐藏项
        hideItems       : [],
        // 基本信息标题
        basicTitle      : '基本信息',
        // 联系方式标题
        contactTitle    : '联系方式',
        // 工作经历标题
        workTitle       : '工作经历',
        // 是否显示input框的标题
        isShowItemTitle : true,
        // 职位的placeholder
        positionPlaceholder : '请输入职位'
    }

    componentDidMount() {
        // 初始验证
        validateFields(this.props);
        let obj = $(this.work)[0].props.children;
        console.log(obj)
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps){
        console.log('receive props......');
        this.hideItemsByProps(nextProps);
        // this.isShow('basic');
        // this.isShow('contact');
        // this.isShow('work');
        // this.isShow('_education');
        // this.isShow('link');
    }

    getDate = date => {
        if(typeof date != 'undefined' && typeof date != 'string') {
            let res = date.format('l').split('');
            let str = [];
            let result = null;
            res.map(v => {
                str.push(v.replace(/[\u4e00-\u9fa5]/, '-'));
            });
            str.pop();
            result = str.join('');
            return result;
        }
    }

    hideItemsByProps = nextProps => {
        let hideItemsLen = nextProps.hideItems.length;
        if(hideItemsLen < 13) {
            if($.inArray('link', this.props.hideItems) != -1) {
                this.setState({
                    basic : 'block',
                    contact : 'block',
                    work : 'block',
                    _education : 'block',
                    link : 'none'
                })
            }
        }
    }

    // 判断类别标签是否需要隐藏
    isShow = type => {
        let obj = null,
            isShow = false;
        switch (type) {
            case 'basic':
                obj = $(this.basic)[0].props.children;
                console.log(obj)
                for(let i = 0;i < obj.length;i++) {
                    if(obj[i].props.style == null) {
                        isShow = true
                    }
                }
                if(!isShow) {
                    this.setState({basic : 'none'})
                }
                break;
            case 'contact':
                obj = $(this.contact)[0].props.children;
                console.log(obj)
                for(let i = 0;i < obj.length;i++) {
                    if(obj[i].props.style == null) {
                        isShow = true
                    }
                }
                if(!isShow) {
                    this.setState({contact : 'none'})
                }
                break;
            case 'work':
                obj = $(this.work)[0].props.children;
                console.log(obj)
                for(let i = 0;i < obj.length;i++) {
                    if(obj[i].props.style == null) {
                        isShow = true
                    }
                }
                if(!isShow) {
                    this.setState({work : 'none'})
                }
                break;
            case '_education':
                obj = $(this._education)[0].props.children;
                console.log(obj)
                for(let i = 0;i < obj.length;i++) {
                    if(obj[i].props.style == null) {
                        isShow = true
                    }
                }
                if(!isShow) {
                    this.setState({_education : 'none'})
                }
                break;
            case 'link':
                obj = $(this.link)[0].props.children;
                console.log(obj)
                for(let i = 0;i < obj.length;i++) {
                    if(obj[i].props.style == null) {
                        isShow = true
                    }
                }
                if(!isShow) {
                    this.setState({link : 'none'})
                }
                break;
        }
    }

    formatDate = date => {
        if(date){
            return (moment(`${date} +0800`, 'YYYY-MM-DD Z').utcOffset(8));
        }
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;
        const Item = List.Item;
        console.log(this.props.hideItems);

        let className = `component-Resume`;
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
                <List renderHeader={() => this.props.basicTitle} ref={dom => this.basic = dom} style={{display : this.state.basic}}>
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
                    <div style={$.inArray('gender', this.props.hideItems) == -1 ? null : hiddenObj}>
                        <Picker
                            data={this.gender}
                            cols={1}
                            {...getFieldProps('gender',{initialValue : data && data.gender, rules: $.inArray('gender', this.props.hideItems) == -1 ?
                                [
                                    {required : true, message : '请选择性别'},
                                ]
                                :
                                []})}
                        >
                            <List.Item arrow="horizontal">{this.props.isShowItemTitle ? '性别' : null}</List.Item>
                        </Picker>
                    </div>
                    <InputItem
                        {...getFieldProps('idcard',{initialValue : data && data.idcard, rules: $.inArray('idcard', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入身份证'},
                                {whitespace : true, message : '请输入正确的身份证'},
                                {pattern : Pattern.IDCARD, message : '请输入正确的电话号码'}
                            ]
                            :
                            []})}
                        editable={$.inArray('idcard', this.props.readItems) == -1}
                        style={$.inArray('idcard', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入身份证号码">
                        {this.props.isShowItemTitle ? '身份证' : null}
                    </InputItem>
                    <InputItem
                        {...getFieldProps('willingposition',{initialValue : data && data.willingposition, rules: $.inArray('willingposition', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入求职意向'},
                                {whitespace : true, message : '请输入正确的求职意向'}
                            ]
                            :
                            []})}
                        editable={$.inArray('willingposition', this.props.readItems) == -1}
                        style={$.inArray('willingposition', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入求职意向">
                        求职意向
                    </InputItem>
                </List>
                <List renderHeader={() => this.props.contactTitle} ref={dom => this.contact = dom} style={{display : this.state.contact}}>
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
                    <InputItem
                        {...getFieldProps('email',{initialValue : data && data.email, rules: $.inArray('phone', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入邮箱'},
                                {whitespace : true, message : '请输入正确的邮箱'},
                                {pattern : Pattern.EMAIL, message : '请输入正确的邮箱'}
                            ]
                            :
                            []})}
                        editable={$.inArray('email', this.props.readItems) == -1}
                        style={$.inArray('email', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入邮箱">
                        {this.props.isShowItemTitle ? '邮箱' : null}
                    </InputItem>
                    <div style={$.inArray('address', this.props.hideItems) == -1 ? null : hiddenObj}>
                        <Picker
                            title="所在地"
                            extra="请选择"
                            {...getFieldProps('address',{initialValue : addressData, rules: $.inArray('address', this.props.hideItems) == -1 ?
                                [
                                    {required : true, message : '请选择所在地'},
                                ]
                                :
                                []})}
                            data={district}
                        >
                            <CustomChildren>{this.props.isShowItemTitle ? '所在地' : null}</CustomChildren>
                        </Picker>
                    </div>
                </List>
                <List renderHeader={() => '教育经历 (请填写最高学历)'} ref={dom => this._education = dom} style={{display : this.state._education}}>
                    <InputItem
                        {...getFieldProps('university',{initialValue : data && data.university, rules: $.inArray('university', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入毕业院校'},
                                {whitespace : true, message : '请选择正确的毕业院校'}
                            ]
                            :
                            []})}
                        editable={$.inArray('university', this.props.readItems) == -1}
                        style={$.inArray('university', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入毕业院校">
                        {this.props.isShowItemTitle ? '毕业院校' : null}
                    </InputItem>
                    <div style={$.inArray('education', this.props.hideItems) == -1 ? null : hiddenObj}>
                        <Picker
                            data={this.edu}
                            cols={1}
                            {...getFieldProps('education',{initialValue : data && data.education, rules: $.inArray('education', this.props.hideItems) == -1 ?
                                [
                                    {required : true, message : '请选择学历'},
                                ]
                                :
                                []})}
                        >
                            <List.Item arrow="horizontal">{this.props.isShowItemTitle ? '学历' : null}</List.Item>
                        </Picker>
                    </div>
                    {/*{*/}
                        {/*$.inArray('education', this.props.hideItems) == -1*/}
                            {/*?*/}
                            {/*<Picker*/}
                                {/*data={this.edu}*/}
                                {/*cols={1}*/}
                                {/*{...getFieldProps('education', data && data.education ? {initialValue : [data.education]} : {})}>*/}
                                {/*<List.Item arrow="horizontal">{this.props.isShowItemTitle ? '学历' : null}</List.Item>*/}
                            {/*</Picker>*/}
                            {/*:*/}
                            {/*null*/}
                    {/*}*/}
                    <div style={$.inArray('attenddate', this.props.hideItems) == -1 ? null : hiddenObj}>
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            {...getFieldProps('attenddate', {
                                initialValue : data && this.formatDate(data.attenddate), rules: $.inArray('attenddate', this.props.hideItems) == -1 ?
                                    [
                                        {required : true, message : '请选择入学日期'},
                                    ]
                                    :
                                    []})}
                            minDate={minDate}
                            maxDate={maxDate}
                        >
                            <List.Item arrow="horizontal">{this.props.isShowItemTitle ? '入学日期' : null}</List.Item>
                        </DatePicker>
                    </div>
                    <div style={$.inArray('graduatedate', this.props.hideItems) == -1 ? null : hiddenObj}>
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            {...getFieldProps('graduatedate', {
                                initialValue : data && this.formatDate(data.graduatedate), rules: $.inArray('graduatedate', this.props.hideItems) == -1 ?
                                    [
                                        {required : true, message : '请选择毕业日期'},
                                    ]
                                    :
                                    []})}
                            minDate={minDate}
                            maxDate={maxDate}
                        >
                            <List.Item arrow="horizontal">{this.props.isShowItemTitle ? '毕业日期' : null}</List.Item>
                        </DatePicker>
                    </div>
                    <InputItem
                        {...getFieldProps('profession',{initialValue : data && data.profession, rules: $.inArray('profession', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入专业'},
                                {whitespace : true, message : '请输入正确的专业'}
                            ]
                            :
                            []})}
                        editable={$.inArray('profession', this.props.readItems) == -1}
                        style={$.inArray('profession', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入专业">
                        {this.props.isShowItemTitle ? '专业' : null}
                    </InputItem>
                </List>
                <List renderHeader={() => this.props.workTitle} ref={dom => this.work = dom} style={{display : this.state.work}}>
                    <InputItem
                        {...getFieldProps('company',{initialValue : data && data.company, rules: $.inArray('company', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入所在公司'},
                                {whitespace : true, message : '请输入正确的所在公司'}
                            ]
                            :
                            []
                        })}
                        editable={$.inArray('company', this.props.readItems) == -1}
                        style={$.inArray('company', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入所在公司">
                        {this.props.isShowItemTitle ? '所在公司' : null}
                    </InputItem>
                    <div style={$.inArray('starttime', this.props.hideItems) == -1 ? null : hiddenObj}>
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            {...getFieldProps('starttime', {
                                initialValue : data && this.formatDate(data.starttime), rules: $.inArray('starttime', this.props.hideItems) == -1 ?
                                    [
                                        {required : true, message : '请输入入职时间'},
                                    ]
                                    :
                                    []})}
                            minDate={minDate}
                            maxDate={maxDate}
                        >
                            <List.Item arrow="horizontal">{this.props.isShowItemTitle ? '入职时间' : null}</List.Item>
                        </DatePicker>
                    </div>
                    <div style={$.inArray('endtime', this.props.hideItems) == -1 ? null : hiddenObj}>
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            {...getFieldProps('endtime', {
                                initialValue : data && this.formatDate(data.endtime), rules: $.inArray('endtime', this.props.hideItems) == -1 ?
                                    [
                                        {required : true, message : '请输入离职时间'},
                                    ]
                                    :
                                    []})}
                            minDate={minDate}
                            maxDate={maxDate}
                        >
                            <List.Item arrow="horizontal">{this.props.isShowItemTitle ? '离职时间' : null}</List.Item>
                        </DatePicker>
                    </div>
                    <div style={$.inArray('isduty', this.props.hideItems) == -1 ? null : hiddenObj}>
                        <Picker
                            data={this.whether}
                            cols={1}
                            {...getFieldProps('isduty', data && data.isduty ? {initialValue : [data.isduty]} : {})}>
                            <List.Item arrow="horizontal">{this.props.isShowItemTitle ? '是否在职' : null}</List.Item>
                        </Picker>
                    </div>
                    <InputItem
                        {...getFieldProps('position',{initialValue : data && data.position, rules: $.inArray('position', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入职位'},
                                {whitespace : true, message : '请输入正确的职位'}
                            ]
                            :
                            []})}
                        editable={$.inArray('position', this.props.readItems) == -1}
                        style={$.inArray('position', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder={this.props.positionPlaceholder}>
                        {this.props.isShowItemTitle ? '职位' : null}
                    </InputItem>
                    <InputItem
                        {...getFieldProps('duty',{initialValue : data && data.duty, rules: $.inArray('duty', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入职责'},
                                {whitespace : true, message : '请输入正确的职责'}
                            ]
                            :
                            []})}
                        editable={$.inArray('duty', this.props.readItems) == -1}
                        style={$.inArray('duty', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入职责">
                        {this.props.isShowItemTitle ? '职责' : null}
                    </InputItem>
                    <InputItem
                        {...getFieldProps('skills',{initialValue : data && data.skills, rules: $.inArray('skills', this.props.hideItems) == -1 ?
                            [
                                {required : true, message : '请输入专业技能'},
                                {whitespace : true, message : '请输入正确的专业技能'}
                            ]
                            :
                            []})}
                        editable={$.inArray('skills', this.props.readItems) == -1}
                        style={$.inArray('skills', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        placeholder="请输入专业技能">
                        {this.props.isShowItemTitle ? '专业技能' : null}
                    </InputItem>
                </List>
                <List renderHeader={() => '二维码链接'} ref={dom => this.link = dom} style={{display : this.state.link}}>
                    <InputItem
                        {...getFieldProps('link',{initialValue : data && data.position, rules: []})}
                        editable={$.inArray('link', this.props.readItems) == -1}
                        style={$.inArray('link', this.props.hideItems) == -1 ? null : hiddenObj}
                        clear={true}
                        value={this.props.link}
                        placeholder={'二维码链接(自动生成)'}>
                        {this.props.isShowItemTitle ? '二维码邀请链接' : null}
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

            props.setErrors(<div key={'error-book'}>{errors}</div>);
            props.setValues(null);
        }
        else
        {
            let values = {};
            if($.inArray('name', props.hideItems) == -1) values.name = valueList.name;
            if($.inArray('gender', props.hideItems) == -1) values.gender = valueList.gender;
            if($.inArray('idcard', props.hideItems) == -1) values.idcard = valueList.idcard;
            if($.inArray('willingposition', props.hideItems) == -1) values.willingposition = valueList.willingposition;
            if($.inArray('phone', props.hideItems) == -1) values.phone = valueList.phone;
            if($.inArray('email', props.hideItems) == -1) values.email = valueList.email;
            if($.inArray('address', props.hideItems) == -1) values.address = valueList.address;
            if($.inArray('attenddate', props.hideItems) == -1) values.attenddate = valueList.attenddate;
            if($.inArray('graduatedate', props.hideItems) == -1) values.graduatedate = valueList.graduatedate;
            if($.inArray('university', props.hideItems) == -1) values.university = valueList.university;
            if($.inArray('education', props.hideItems) == -1) values.education = valueList.education;
            if($.inArray('profession', props.hideItems) == -1) values.profession = valueList.profession;
            if($.inArray('isduty', props.hideItems) == -1) values.isduty = valueList.isduty;
            if($.inArray('starttime', props.hideItems) == -1) values.starttime = valueList.starttime;
            if($.inArray('endtime', props.hideItems) == -1) values.endtime = valueList.endtime;
            if($.inArray('position', props.hideItems) == -1) values.position = valueList.position;
            if($.inArray('company', props.hideItems) == -1) values.company = valueList.company;
            if($.inArray('skills', props.hideItems) == -1) values.skills = valueList.skills;
            if($.inArray('duty', props.hideItems) == -1) values.duty = valueList.duty;

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
})(Resume));