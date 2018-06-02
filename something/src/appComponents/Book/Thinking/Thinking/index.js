import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import {List} from 'antd-mobile';
import TagItem from 'components/TagItem';
import InputItem from 'components/InputItem';
import TextareaItem from 'components/TextareaItem';
import $ from 'jquery';

import {getTags} from './action';

import './style.scss';

let form = null;
class Thinking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 书籍标签数据库
            tagData     :   {},
        };

        form = props.form;
    }

    static propTypes =
    {
        // 初始数据
        data            :   React.PropTypes.object,
        // 设置异常
        setErrors       :   React.PropTypes.func.isRequired,
        // 设置值
        setValues       :   React.PropTypes.func.isRequired,
        // 只读项
        readItems       :   React.PropTypes.array,
        // 隐藏项
        hideItems       :   React.PropTypes.array,
        // 类型   [分享, 请教]
        type            :   React.PropTypes.oneOf(['share', 'consult'])
    }

    static defaultProps =
    {
        // 只读项
        readItems       :   [],
        // 隐藏项
        hideItems       :   []
    }

    componentDidMount() {
        // 初始验证
        validateFields(this.props);

        // 获取书籍标签
        this.props.getTags(data => {
            this.setState({tagData : data});
        });
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;

        let className = `appComponent-Book-Thinking-Thinking`;
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        let thinkingTitle = '';
        let thinkingPlaceholder = '';
        let thinkingInput = '';
        let thinkingWhitespace = '';

        switch (this.props.type)
        {
            // 分享
            case 'share':
                thinkingTitle = '分享心得';
                thinkingPlaceholder = '在这里尽情分享你的收获心得，关于读书的、关于技术的、关于学习的或关于tap4fun一切的';
                thinkingInput = '请输入分享心得';
                thinkingWhitespace = '请认真分享你的心得';
                break;
            // 请教
            case 'consult':
                thinkingTitle = '心得请教';
                thinkingPlaceholder = '在这里详细描述你想要请教的心得，关于读书的、关于技术的、关于学习的或关于tap4fun一切的，tappers将会热心地向你分享';
                thinkingInput = '请输入心得请教';
                thinkingWhitespace = '请认真描述你想请教的心得';
                break;
        }

        return(
            <div className={componentClassName} style={this.props.style}>
                <List>
                    {
                        $.inArray('title', this.props.hideItems) == -1
                            ?
                            <InputItem
                                {...getFieldProps('title',{initialValue : data && data.title, rules: [
                                    {required : true, message : '请输入标题'},
                                    {whitespace : true, message : '请输入正确的标题'}
                                ]})}
                                editable={$.inArray('title', this.props.readItems) == -1}
                                clear={true}
                                placeholder="请输入标题">
                                标题
                            </InputItem>
                            :
                            null
                    }
                    {
                        $.inArray('thinking', this.props.hideItems) == -1
                            ?
                            <TextareaItem
                                title={thinkingTitle}
                                placeholder={thinkingPlaceholder}
                                rows={4}
                                defaultValue={data && data.thinking}
                                editable={$.inArray('thinking', this.props.readItems) == -1}
                                {...getFieldProps('thinking',{initialValue : data && data.thinking, rules: [
                                    {required : true, message : thinkingInput},
                                    {whitespace : true, message : thinkingWhitespace}
                                ]})}
                            />
                            :
                            null
                    }
                    {
                        $.inArray('book_tag_ids', this.props.hideItems) == -1
                            ?
                            <TagItem
                                labelName={'标签'}
                                maxNum={5}
                                hotTags={this.state.tagData.hot}
                                commonTags={this.state.tagData.common}
                                editable={$.inArray('book_tag_ids', this.props.readItems) == -1}
                                {...getFieldProps('book_tag_ids',{initialValue : data && data.book_tag_ids_db, rules: [
                                    {required : true, message : '请选择标签'}
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

            props.setErrors(<div key={'error-book-thinking'}>{errors}</div>);
            props.setValues(null);
        }
        else
        {
            let values = {};
            if($.inArray('title', props.hideItems) == -1) values.title = valueList.title;
            if($.inArray('thinking', props.hideItems) == -1) values.thinking = valueList.thinking;
            if($.inArray('book_tag_ids', props.hideItems) == -1) values.book_tag_ids = valueList.book_tag_ids;
            // 分类
            switch (props.type)
            {
                // 分享
                case 'share':
                    values.type = 1;
                    break;
                // 请教
                case 'consult':
                    values.type = 2;
                    break;
            }

            props.setValues(values);
            props.setErrors(null);
        }
    })
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    getTags
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
})(Thinking));