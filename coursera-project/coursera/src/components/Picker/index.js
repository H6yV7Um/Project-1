import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {DatePicker as PcDatePicker, Row, Col, Select} from 'antd';
import {Picker as PickerAntd} from 'antd-mobile';
import browserAttr from 'utils/browserAttr';


import './style.scss';

class Picker extends Component {
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
        placeHolder             :  '请选择',
        // 父组件的onChange事件
        handleChange            :   () => {}
    }

    render()
    {
        let props = {...this.props};
        let className = 'component-Picker';
        if(props.disabled || props.editable == false)
        {
            props.disabled = true;
            className += ' component-Picker-readonly';
        }
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        let arr = [];

        if(!browserAttr.versions.mobile) {
            // pc端数据格式化
            this.props.data.map((v, k) => {
                let item = (<Select.Option value={v.label} key={k}>{v.value}</Select.Option>);
                arr.push(item);
            })
        }

        return(
            <div className={className}>
                {
                    browserAttr.versions.mobile ?
                        <PickerAntd
                            {...props}
                        >
                            {this.props.children}
                        </PickerAntd>
                        :
                        <Row>
                            <Col span={24}>
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder={this.props.placeHolder}
                                    defaultValue={this.props.initialValue}
                                    optionFilterProp="children"
                                    onChange={value => {this.props.handleChange(value)}}
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {arr}
                                </Select>
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

export default connect(mapStateToProps, mapDispatchToProps)(Picker);