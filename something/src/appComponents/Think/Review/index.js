import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import {List} from 'antd-mobile';
import TextareaItem from 'components/TextareaItem';
import $ from 'jquery';

import './style.scss';

let form = null;
class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        form = props.form;
    }

    static propTypes =
    {
        // 初始数据
        data                :   React.PropTypes.object,
        // 设置异常
        setErrors           :    React.PropTypes.func.isRequired,
        // 设置值
        setValues           :   React.PropTypes.func.isRequired,
        // 只读项
        readItems           :   React.PropTypes.array,
        // 隐藏项
        hideItems           :   React.PropTypes.array
    }

    static defaultProps =
    {
        // 只读项
        readItems           :   [],
        // 隐藏项
        hideItems           :   []
    }

    componentDidMount() {
        // 初始验证
        validateFields(this.props);
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;

        let className = `appComponent-Think-Review`;
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName} style={this.props.style}>
                <List>
                    {
                        $.inArray('review', this.props.hideItems) == -1
                            ?
                            <TextareaItem
                                title="评论"
                                placeholder="随便说说吧~"
                                defaultValue={data && data.review}
                                editable={$.inArray('review', this.props.readItems) == -1}
                                rows={5}
                                {...getFieldProps('review',{initialValue : data && data.review, rules: [
                                    {required : true, message : '随便说说吧~'},
                                    {whitespace : true, message : '随便说说吧~'}
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
            if($.inArray('review', props.hideItems) == -1) values.review = valueList.review;

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
})(Review));