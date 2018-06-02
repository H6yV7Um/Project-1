import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import {List, Toast} from 'antd-mobile';
import Upload from 'components/Upload';
import Switch from 'components/Switch';
import TextareaItem from 'components/TextareaItem';
import PATTERN from 'config/pattern';
import $ from 'jquery';

import './style.scss';

let form = null;
class Recommend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 是否分享书
            isShareBook      : props.data && props.data.book == 1 ? true : false,
            // 是否分享附件
            isShareFile      : props.data && props.data.file,
            // 是否分享链接
            isShareUrl       : props.data && props.data.url,
        };

        form = props.form;

        // 是否验证
        this.isValidateFields = false;
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

    componentDidUpdate() {
        // 验证
        if(this.isValidateFields)
        {
            this.isValidateFields = false;
            validateFields(this.props);
        }
    }

    render()
    {
        const {getFieldProps, setFieldsValue} = this.props.form;
        const {data} = this.props;
        const Item = List.Item;

        let className = `appComponent-Book-Recommend`;
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        // 分享书
        let shareBook = [];
        if($.inArray('book', this.props.hideItems) == -1)
        {
            shareBook.push(
                <Item key="shareBook" extra={
                    <Switch
                        checked={this.state.isShareBook}
                        {...getFieldProps('book', {initialValue: data && data.book == 1 ? 1 : 2})}
                        onChange={checked => {
                            this.setState({isShareBook: checked});
                            setFieldsValue({book: checked ? 1 : 2});
                        }}
                    />
                }>
                    分享书
                </Item>
            );
        }

        // 分享附件
        let shareFile = [];
        if($.inArray('file', this.props.hideItems) == -1)
        {
            shareFile.push(
                <Item key="shareFile" extra={
                    <Switch
                        checked={this.state.isShareFile}
                        onChange={checked => {
                            this.setState({isShareFile: checked});
                            this.isValidateFields = true;
                        }}
                    />
                }>
                    分享附件
                </Item>
            );

            if(this.state.isShareFile)
            {
                shareFile.push(
                    <Item key="file">
                        <Upload
                            labelName={'附件'}
                            obj={'book'}
                            fileType={'file'}
                            fileLength={-1}
                            initialFiles={data && data.file ? {url: data.file, url_db: data.file_db} : null}
                            {...getFieldProps('file', {initialValue: data && data.file_db, rules: [
                                {required : true, message : '请上传附件'}
                            ]})}
                        />
                    </Item>
                );
            }
        }

        // 分享链接
        let shareUrl = [];
        if($.inArray('url', this.props.hideItems) == -1)
        {
            shareUrl.push(
                <Item key="shareUrl" extra={
                    <Switch
                        checked={this.state.isShareUrl}
                        onChange={checked => {
                            this.setState({isShareUrl: checked});
                            this.isValidateFields = true;
                        }}
                    />
                }>
                    分享链接
                </Item>
            );

            if(this.state.isShareUrl)
            {
                shareUrl.push(
                    <TextareaItem
                        key="url"
                        title="链接"
                        placeholder="请输入链接（多个链接请用,隔开）"
                        defaultValue={data && data.url}
                        {...getFieldProps('url',{initialValue : data && data.url, rules: [
                            {required : true, message : '请输入链接'},
                            {validator : (rule, value, callback) =>
                            {
                                if(value)
                                {
                                    const values = value.split(',');
                                    values.map((v ,k) => {
                                        if(!PATTERN.URL.test(v))
                                        {
                                            callback('请输入正确的链接');
                                        }
                                    });
                                }
                                callback();
                            }}
                        ]})}
                    />
                );
            }
        }

        return(
            <div className={componentClassName} style={this.props.style}>
                <List>
                    {shareBook}
                    {shareFile}
                    {shareUrl}
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

            props.setErrors(<div key={'error-recommend'}>{errors}</div>);
            props.setValues(null);
        }
        else
        {
            let values = {};
            if($.inArray('book', props.hideItems) == -1) values.book = valueList.book;
            if($.inArray('file', props.hideItems) == -1) values.file = valueList.file;
            if($.inArray('url', props.hideItems) == -1) values.url = valueList.url;

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
})(Recommend));