import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import {List} from 'antd-mobile';
import Upload from 'components/Upload';
import TagItem from 'components/TagItem';
import Switch from 'components/Switch';
import TextareaItem from 'components/TextareaItem';
import DepartmentsPickerItem from 'appComponents/Dingding/DepartmentsPickerItem';
import $ from 'jquery';

import './style.scss';

let form = null;
class Think extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 是否匿名
            isAnonymous         :   props.data && props.data.is_anonymous == 1 ? true : false,
        };
        this.prevProps = [];

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
        // 标签数据库
        tagData         :   React.PropTypes.object
    }

    static defaultProps =
    {
        // 只读项
        readItems       :   [],
        // 隐藏项
        hideItems       :   [],
        // 标签数据库
        tagData         :   {hot : [], common : []}
    }

    componentDidMount() {
        // 初始验证
        validateFields(this.props);
    }

    componentDidUpdate() {
        if(this.prevProps.hideItems && this.props.hideItems)
        {
            let props1 = null;
            let props2 = null;
            if(this.prevProps.hideItems.length >= this.props.hideItems)
            {
                props1 = this.prevProps.hideItems;
                props2 = this.props.hideItems;
            }
            else
            {
                props1 = this.props.hideItems;
                props2 = this.prevProps.hideItems;
            }

            for(const v of props1)
            {
                if($.inArray(v, props2) == -1)
                {
                    validateFields(this.props);
                    break;
                }
            }
        }
        else if(this.prevProps.hideItems != this.props.hideItems)
        {
            validateFields(this.props);
        }
        this.prevProps = {...this.props};
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;
        const Item = List.Item;

        let className = `appComponent-Think-Think`;
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName} style={this.props.style}>
                {
                    $.inArray('content', this.props.hideItems) == -1
                        ?
                        <List className={`${className}-content`}>
                            <TextareaItem
                                title="描述"
                                placeholder="尽量详细点吧~"
                                rows={4}
                                defaultValue={data && data.content}
                                editable={$.inArray('content', this.props.readItems) == -1}
                                {...getFieldProps('content',{initialValue : data && data.content, rules: [
                                    {required : true, message : '请输入描述'},
                                    {whitespace : true, message : '请输入正确的描述'}
                                ]})}
                            />
                        </List>
                        :
                        null
                }
                <List className={`${className}-attr`}>
                    {
                        $.inArray('photos', this.props.hideItems) == -1
                            ?
                            <Item>
                                <Upload
                                    labelName={'配图'}
                                    obj={'think'}
                                    fileType={'image'}
                                    fileLength={-1}
                                    editable={$.inArray('photos', this.props.readItems) == -1}
                                    initialFiles={data && data.photos ? {url: data.photos, url_db: data.photos_db} : null}
                                    {...getFieldProps('photos', {initialValue: data && data.photos_db})}
                                />
                            </Item>
                            :
                            null
                    }
                    {
                        $.inArray('think_tag_ids', this.props.hideItems) == -1
                            ?
                            <TagItem
                                labelName={'标签'}
                                maxNum={5}
                                hotTags={this.props.tagData.hot}
                                commonTags={this.props.tagData.common}
                                submitButtonType={'think'}
                                editable={$.inArray('think_tag_ids', this.props.readItems) == -1}
                                {...getFieldProps('think_tag_ids', {initialValue : data && data.think_tag_ids_db})}
                            />
                            :
                            null
                    }
                </List>
                {
                    $.inArray('department_admin_id', this.props.hideItems) == -1
                        ?
                        <List className={`${className}-admin`}>
                            <DepartmentsPickerItem
                                labelName={'负责部门'}
                                agentName={'think'}
                                maxNum={1}
                                brief={'该部门的管理员将会来处理哦'}
                                {...getFieldProps('department_admin_id', {initialValue : data && data.department_admin_id, rules: [
                                    {required : true, message : '请选择负责部门'}
                                ]})}
                            />
                        </List>
                        :
                        null
                }
                {
                    $.inArray('department_see_ids', this.props.hideItems) == -1
                        ?
                        <List className={`${className}-see`}>
                            <DepartmentsPickerItem
                                labelName={'可见部门'}
                                agentName={'think'}
                                brief={'默认对全员可见'}
                                defaultDepartments={[{id : '1', name : '全员可见', key : 'all'}]}
                                {...getFieldProps('department_see_ids', {initialValue : data && data.department_see_ids})}
                            />
                        </List>
                        :
                        null
                }
                {
                    $.inArray('is_anonymous', this.props.hideItems) == -1
                        ?
                        <List className={`${className}-anonymous`}>
                            <Item extra={
                                <Switch
                                    checked={this.state.isAnonymous}
                                    {...getFieldProps('is_anonymous', {initialValue: data && data.is_anonymous == 1 ? 1 : 2})}
                                    onChange={checked => {
                                        this.setState({isAnonymous: checked});
                                        setFieldsValue({is_anonymous: checked ? 1 : 2});
                                    }}
                                />
                            }>
                                匿名发表
                            </Item>
                        </List>
                        :
                        null
                }
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

            props.setErrors(<div key={'error-think'}>{errors}</div>);
            props.setValues(null);
        }
        else
        {
            let values = {};
            if($.inArray('content', props.hideItems) == -1) values.content = valueList.content;
            if($.inArray('photos', props.hideItems) == -1) values.photos = valueList.photos;
            if($.inArray('think_tag_ids', props.hideItems) == -1) values.think_tag_ids = valueList.think_tag_ids;
            if($.inArray('department_admin_id', props.hideItems) == -1) values.department_admin_id = valueList.department_admin_id[0].id;
            if($.inArray('department_see_ids', props.hideItems) == -1)
            {
                valueList.department_see_ids.map((v, k) => {
                    values.department_see_ids = values.department_see_ids ? `${values.department_see_ids},${v.id}` : v.id;
                })
            }
            if($.inArray('is_anonymous', props.hideItems) == -1) values.is_anonymous = valueList.is_anonymous;

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
})(Think));