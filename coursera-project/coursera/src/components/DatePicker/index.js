import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {DatePicker as PcDatePicker, Row, Col, Select} from 'antd';
import {DatePicker as DatePickerAntd} from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import browserAttr from 'utils/browserAttr';


import './style.scss';

const maxDate = moment('2020-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2010-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class DatePicker extends Component {
    static propTypes =
    {
        // pc端的placeHolder
        placeHolder             :   React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
        // 父组件的onChange事件
        handleChange            :   React.PropTypes.func
    }

    static defaultProps =
    {
        // pc端的placeHolder
        placeHolder             :   '请选择时间',
        // 父组件的onChange事件
        handleChange            :   () => {}
    }

    // 解析时间
    getDate = date => {
        if(typeof date != 'undefined' && typeof date != 'string') {
            let res = date.format('MMMM Do YYYY, h:mm:ss a').split('');
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


    render()
    {
        let props = {...this.props};
        let className = 'component-DatePicker';
        if(props.disabled || props.editable == false)
        {
            props.disabled = true;
            className += ' component-DatePicker-readonly';
        }
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }


        return(
            <div className={className}>
                {
                    browserAttr.versions.mobile ?
                        <DatePickerAntd
                            {...props}
                        >
                            {this.props.children}
                        </DatePickerAntd>
                        :
                        <Row>
                            <Col span={24}>
                                <PcDatePicker
                                    style={{ width: 200 }}
                                    showTime
                                    onChange={date => {
                                        this.props.handleChange(date);
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={this.props.placeHolder}
                                />
                            </Col>
                        </Row>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);