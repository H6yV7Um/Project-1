import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import {List, Toast} from 'antd-mobile';
import TextareaItem from 'components/TextareaItem';
import RateItem from 'components/RateItem';
import Switch from 'components/Switch';
import $ from 'jquery';

import './style.scss';

let form = null;
class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 是否关注书评
            isFollowReview      : !props.data ? true : props.data.follow_review == 1 ? true : false,
            // 评分
            score               : props.data && props.data.score ? props.data.score.split(',') : null
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

    /**
     * 评分
     * @param id    评分项
     * @param value 分值
     */
    setScore = (id, value) => {
        let score = this.state.score || [];
        // 占比
        const scale = [0.5, 0.3, 0.2];

        // 综合
        if(id == 0)
        {
            score = [value, value, value, value];
        }
        else
        {
            score[id] = value;
            score[0] = 0;
            score.map((v, k) => {
                if(k != 0)
                {
                    score[0] += v * scale[k - 1];
                }
            })
            score[0] = parseFloat(score[0].toFixed(1));
        }

        this.setState({score});
        return score;
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;
        const Item = List.Item;

        let className = `appComponent-Book-Review`;
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
                                title="书评"
                                placeholder="请输入书评"
                                defaultValue={data && data.review}
                                editable={$.inArray('review', this.props.readItems) == -1}
                                {...getFieldProps('review',{initialValue : data && data.review, rules: [
                                    {required : true, message : '请输入书评'},
                                    {whitespace : true, message : '请输入正确的书评'}
                                ]})}
                            />
                            :
                            null
                    }
                    {
                        $.inArray('follow_review', this.props.hideItems) == -1
                            ?
                            <Item extra={
                                <Switch
                                    checked={this.state.isFollowReview}
                                    {...getFieldProps('follow_review', {initialValue: !data ? 1 : data.follow_review == 1 ? 1 : 2})}
                                    onChange={checked => {
                                        this.setState({isFollowReview : checked});
                                        setFieldsValue({follow_review : checked ? 1 : 2});
                                    }}
                                />
                            }>
                                关注书评
                                <Item.Brief>开启后你将收到该书最新书评</Item.Brief>
                            </Item>
                            :
                            null
                    }
                    {
                        $.inArray('score', this.props.hideItems) == -1
                            ?
                            <RateItem
                                labelName="综合评分"
                                value={this.state.score && this.state.score[0]}
                                {...getFieldProps('score', {initialValue: this.state.score && this.state.score[0], rules: [
                                    {required : true, message : '请评分'}
                                ]})}
                                onChange={value => {
                                    const score = this.setScore(0, value);
                                    setFieldsValue({score: score[0]});
                                    if(getFieldProps('score_1').value)
                                    {
                                        setFieldsValue({score_1: score[1]});
                                        setFieldsValue({score_2: score[2]});
                                        setFieldsValue({score_3: score[3]});
                                    }
                                }}
                            >
                                {this.state.score ? '各项评分影响综合评分比例有所不同' : ''}
                            </RateItem>
                            :
                            null
                    }
                    {
                        $.inArray('score', this.props.hideItems) == -1 && this.state.score
                            ?
                            <RateItem
                                labelName="收获度"
                                value={this.state.score[1]}
                                {...getFieldProps('score_1', {initialValue: this.state.score[1], rules: [
                                    {required : true, message : '请评分'}
                                ]})}
                                onChange={value => {
                                    const score = this.setScore(1, value);
                                    setFieldsValue({score: score[0]});
                                    setFieldsValue({score_1: score[1]});
                                }}
                            />
                            :
                            null
                    }
                    {
                        $.inArray('score', this.props.hideItems) == -1 && this.state.score
                            ?
                            <RateItem
                                labelName="认同度"
                                value={this.state.score[2]}
                                {...getFieldProps('score_2', {initialValue: this.state.score[2], rules: [
                                    {required : true, message : '请评分'}
                                ]})}
                                onChange={value => {
                                    const score = this.setScore(2, value);
                                    setFieldsValue({score: score[0]});
                                    setFieldsValue({score_2: score[2]});
                                }}
                            />
                            :
                            null
                    }
                    {
                        $.inArray('score', this.props.hideItems) == -1 && this.state.score
                            ?
                            <RateItem
                                labelName="丰富度"
                                value={this.state.score[3]}
                                {...getFieldProps('score_3', {initialValue: this.state.score[3], rules: [
                                    {required : true, message : '请评分'}
                                ]})}
                                onChange={value => {
                                    const score = this.setScore(3, value);
                                    setFieldsValue({score: score[0]});
                                    setFieldsValue({score_3: score[3]});
                                }}
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
            if($.inArray('follow_review', props.hideItems) == -1) values.follow_review = valueList.follow_review;
            if($.inArray('score', props.hideItems) == -1)
            {
                values.score = [];
                values.score[0] = valueList.score;
                values.score[1] = valueList.score_1;
                values.score[2] = valueList.score_2;
                values.score[3] = valueList.score_3;
                values.score = values.score.join(',');
            }

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