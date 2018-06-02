import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import {List} from 'antd-mobile';
import Upload from 'components/Upload';
import TagItem from 'components/TagItem';
import InputItem from 'components/InputItem';
import TextareaItem from 'components/TextareaItem';
import $ from 'jquery';

import {getTags} from './action';

import './style.scss';

let form = null;
class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 书籍标签数据库
            tagData            : {},
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

        // 获取书籍标签
        this.props.getTags(data => {
            this.setState({tagData : data});
        });
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;
        const Item = List.Item;

        let className = `appComponent-Book-Book`;
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName} style={this.props.style}>
                <List>
                    {
                        $.inArray('name', this.props.hideItems) == -1
                            ?
                            <InputItem
                                {...getFieldProps('name',{initialValue : data && data.name, rules: [
                                    {required : true, message : '请输入书名'},
                                    {whitespace : true, message : '请输入正确的书名'}
                                ]})}
                                editable={$.inArray('name', this.props.readItems) == -1}
                                onChange={name => {
                                    name = name.replace(/《/g,"");
                                    name = name.replace(/》/g,"");
                                    name = name.replace(/<</g,"");
                                    name = name.replace(/>>/g,"");
                                    name = $.trim(name.replace(/\s+/g," "));
                                    setFieldsValue({name});
                                }}
                                clear={true}
                                placeholder="请输入书名">
                                书名
                            </InputItem>
                            :
                            null
                    }
                    {
                        $.inArray('author', this.props.hideItems) == -1
                            ?
                            <InputItem
                                {...getFieldProps('author',{initialValue : data && data.author, rules: [
                                    {required : true, message : '请输入作者'},
                                    {whitespace : true, message : '请输入正确的作者'}
                                ]})}
                                editable={$.inArray('author', this.props.readItems) == -1}
                                onChange={author => {
                                    author = $.trim(author.replace(/\s+/g," "));
                                    setFieldsValue({author});
                                }}
                                clear={true}
                                placeholder="请输入作者">
                                作者
                            </InputItem>
                            :
                            null
                    }
                    {
                        $.inArray('cover', this.props.hideItems) == -1
                            ?
                            <Item>
                                <Upload
                                    labelName={'书封面'}
                                    obj={'book'}
                                    fileType={'image'}
                                    defaultFiles={['book_cover_default1.jpg', 'book_cover_default2.jpg']}
                                    imageSize={{width: 380, height: 528}}
                                    editable={$.inArray('cover', this.props.readItems) == -1}
                                    initialFiles={data && data.cover ? {url: data.cover, url_db: data.cover_db} : null}
                                    {...getFieldProps('cover', {initialValue: data && data.cover_db, rules: [
                                        {required : true, message : '请上传书封面'}
                                    ]})}
                                />
                            </Item>
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
                    {
                        $.inArray('profile', this.props.hideItems) == -1
                            ?
                            <TextareaItem
                                title="内容简介"
                                placeholder="请输入内容简介"
                                defaultValue={data && data.profile}
                                editable={$.inArray('profile', this.props.readItems) == -1}
                                {...getFieldProps('profile',{initialValue : data && data.profile, rules: [
                                    {required : true, message : '请输入内容简介'},
                                    {whitespace : true, message : '请输入正确的内容简介'}
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
        if(errorList && (valueList.name == '' || valueList.name == null || valueList.author == '' || valueList.author == null))
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
            if($.inArray('author', props.hideItems) == -1) values.author = valueList.author;
            if($.inArray('cover', props.hideItems) == -1) values.cover = valueList.cover;
            if($.inArray('book_tag_ids', props.hideItems) == -1) values.book_tag_ids = valueList.book_tag_ids;
            if($.inArray('profile', props.hideItems) == -1) values.profile = valueList.profile;

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
})(Book));