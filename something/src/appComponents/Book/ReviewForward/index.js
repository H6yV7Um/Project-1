import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import {List} from 'antd-mobile';
import TextareaItem from 'components/TextareaItem';
import $ from 'jquery';

import './style.scss';

let form = null;
class ReviewForward extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        form = props.form;
    }

    static propTypes =
    {
        // 初始数据
        data            : React.PropTypes.object,
        // 设置异常
        setErrors       : React.PropTypes.func.isRequired,
        // 设置值
        setValues       : React.PropTypes.func.isRequired,
        // 只读项
        readItems       : React.PropTypes.array,
        // 隐藏项
        hideItems       : React.PropTypes.array
    }

    static defaultProps =
    {
        // 只读项
        readItems       : [],
        // 隐藏项
        hideItems       : []
    }

    componentDidMount() {
        // 初始验证
        validateFields(this.props);
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;

        let className = `appComponent-Book-ReviewForward`;
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName} style={this.props.style}>
                <List>
                    {
                        $.inArray('forward', this.props.hideItems) == -1
                            ?
                            <TextareaItem
                                title="转发"
                                placeholder="顺便评论下吧"
                                defaultValue={data && data.forward}
                                editable={$.inArray('forward', this.props.readItems) == -1}
                                {...getFieldProps('forward',{initialValue : data && data.forward, rules: [
                                    {required : true, message : '请输入转发评论'},
                                    {whitespace : true, message : '请输入正确的转发评论'}
                                ]})}
                            />
                            :
                            null
                    }
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

            props.setErrors(<div key={'error-review'}>{errors}</div>);
            props.setValues(null);
        }
        else
        {
            let values = {};
            if($.inArray('forward', props.hideItems) == -1) values.forward = valueList.forward;

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
})(ReviewForward));