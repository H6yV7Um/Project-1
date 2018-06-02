import React, {Component, PropTypes} from 'react';
import Icon from 'components/Icon';
import Upload from 'components/Upload';
import ToastContent from 'components/ToastContent';
import {List, Toast} from 'antd-mobile';
import InputItem from 'components/InputItem';
import Picker from 'components/Picker';
import {createForm} from 'rc-form';
import PATTERN from 'config/pattern';

let form = null;
class Car extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        form = props.form;

        // 车色数据库
        this.colorData = [
            {label: '黑',value: '黑'},{label: '白',value: '白'},{label: '红',value: '红'},
            {label: '黄',value: '黄'},{label: '绿',value: '绿'},{label: '蓝',value: '蓝'},{label: '紫',value: '紫'},{label: '棕',value: '棕'},
            {label: '金',value: '金'},{label: '其他',value: '其他'}
        ];

        // 停车频率数据库
        this.frequencyData = [
            {label: '频繁',value: '频繁'},{label: '偶尔',value: '偶尔'},{label: '很少',value: '很少'}
        ];
    }

    static propTypes =
    {
        // 初始数据
        data        : React.PropTypes.object,
        // 设置异常
        setErrors   : React.PropTypes.func.isRequired,
        // 设置值
        setValues   : React.PropTypes.func.isRequired
    }

    componentDidMount() {
        // 初始验证
        validateFields(this.props);
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;
        const Item = List.Item;

        let className = 'appComponent-Car';
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <div className={className} style={this.props.style}>
                <List
                      renderHeader={() => <Icon className="icon" type="star-o" style={{color: '#D9403C'}}><span style={{color: '#000'}}>基本信息</span></Icon>}>
                    <InputItem
                        {...getFieldProps('num',{initialValue : data && data.num, rules: [
                            {required : true, message : '请输入车牌号'},
                            {whitespace : true, message : '请输入真实的车牌号'},
                            {pattern : PATTERN.CAR_NUM, message : '请输入真实的车牌号'}
                            ]})}
                        clear={true}
                        placeholder="请输入车牌号">
                        车牌号
                    </InputItem>
                    <Item>
                        <Upload
                            labelName={'爱车靓照'}
                            obj={'car'}
                            fileType={'image'}
                            defaultFiles={['car_photo_default.jpg']}
                            initialFiles={data && data.photo_db ? {url: data.photo, url_db: data.photo_db} : null}
                            {...getFieldProps('photo', {initialValue : data && data.photo_db, rules: [
                                {required : true, message : '请上传爱车靓照'}
                            ]})}
                        />
                    </Item>
                </List>
                <List
                      renderHeader={() => <Icon className="icon" type="file-text-o" style={{color: '#186DB7'}}><span style={{color: '#000'}}>其他信息</span></Icon>}>
                    <InputItem
                        {...getFieldProps('parking',{initialValue : data && data.parking, rules: [
                            {whitespace : true, message : '请输入真实的车位'}
                        ]})}
                        clear={true}
                        placeholder="请输入车位">
                        车位
                    </InputItem>
                    <Picker
                        data={this.colorData}
                        cols={1}
                        {...getFieldProps('color', data && data.color ? {initialValue : [data.color]} : {})}>
                        <List.Item arrow="horizontal">车身主色</List.Item>
                    </Picker>
                    <Picker
                        data={this.frequencyData}
                        cols={1}
                        {...getFieldProps('frequency', data && data.frequency ? {initialValue : [data.frequency]} : {})}>
                        <List.Item arrow="horizontal">停车频率</List.Item>
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

            props.setErrors(<div key={'error-car'}>{errors}</div>);
            props.setValues(null);
        }
        else
        {
            let values = {};
            values.num = valueList.num;
            values.photo = valueList.photo;
            if(valueList.parking) values.parking = valueList.parking;
            if(valueList.color) values.color = valueList.color[0];
            if(valueList.frequency) values.frequency = valueList.frequency[0];

            props.setValues(values);
            props.setErrors(null);
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
})(Car);