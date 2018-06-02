import React, {Component, PropTypes} from 'react';
import {Upload as UploadAntd} from 'antd';
import {Toast, Modal} from 'antd-mobile';
import Icon from 'components/Icon';
import ToastContent from 'components/ToastContent';
import {getFileAccepts} from 'utils/fileAccept';
import API from '../../middlewares/api';
import $ from 'jquery';

import './style.scss';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        // 文件类型
        this.fileAccepts = 'all';
        // 文件列表
        this.files = null;
    }

    static propTypes =
    {
        // key
        classKey            : React.PropTypes.string.isRequired,
        // 标签名
        labelName           : React.PropTypes.string,
        // 对象名 (此参数将上传服务器)
        name                : React.PropTypes.oneOf(['car', 'book']).isRequired,
        // 文件分类 (此参数将上传服务器)
        type                : React.PropTypes.oneOf(['image', 'video', 'file']).isRequired,
        // 文件后缀 (格式如: jpg,gif,png)
        accept              : React.PropTypes.string,
        // 文件最大大小 (单位: KB)
        maxSize             : React.PropTypes.number,
        // 文件最大上传个数
        maxLength           : React.PropTypes.number,
        // 设置已上传文件值 (如: files => this.files = files)
        setFiles            : React.PropTypes.func.isRequired,
        // 默认文件数据 (多文件用,隔开)
        initialFiles        : React.PropTypes.string,
        // 默认文件展示数据 (多文件用,隔开)
        initialFilesShow    : React.PropTypes.string
    }

    componentWillMount() {
        // 获取文件类型
        if(this.props.accept)
        {
            this.fileAccepts = getFileAccepts(this.props.accept);
        }
    }

    beforeUpload = file => {
        // 判断文件个数
        // if(this.props.maxLength && this.files && this.files.length == this.props.maxLength)
        // {
        //     Toast.info(<ToastContent type="fail" content={<div>已达到最大上传个数<br/>你可以点击已上传的{this.props.labelName}进行删除</div>} />, 5, null, false);
        //     return false;
        // }

        // 判断文件类型
        if(this.fileAccepts != 'all' && $.inArray(file.type, this.fileAccepts) == -1)
        {
            Toast.info(<ToastContent type="fail" content={<div>请上传正确的{this.props.labelName}<br/>应是{this.props.accept}文件</div>} />, 5, null, false);
            return false;
        }

        // 判断文件大小
        if(this.props.maxSize && file.size / 1024 > this.props.maxSize)
        {
            Toast.info(<ToastContent type="fail" content={`${this.props.labelName}不能大于${this.props.maxSize}KB`} />, 5, null, false);
            return false;
        }

        return true;
    }

    onChange = info => {
        if (info.file.status === 'done' || info.file.status === 'removed') {
            let files = [];
            for (const key in info.fileList) {
                files.push(info.fileList[key].response.data);
            }
            this.props.setFiles(files.join(','));
            this.files = info.fileList;

            this.testLength();
        }
    }

    testLength = isInit => {
        setTimeout(() => {
            // 组件无接口处理。。
            if(this.props.maxLength && this.files.length == this.props.maxLength)
            {
                $(`.Upload-My.${this.props.classKey} .ant-upload-select`).fadeOut(250);
            }
            else
            {
                $(`.Upload-My.${this.props.classKey} .ant-upload-select`).fadeIn(250);
            }
        }, isInit ? 200 : 0);
    }

    render()
    {
        const Alert = Modal.alert;

        let className = `component-Upload ${this.props.classKey}`;
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        let props = {...this.props};
        props.className = '';
        props.style = {};
        props.action = `${API.COMMON_UPLOAD_FILE}?name=${props.name}&type=${props.type}`;
        props.onChange = this.onChange;
        props.beforeUpload = this.beforeUpload;
        props.listType = 'picture-card';
        props.name = 'file';
        props.showUploadList = {showPreviewIcon : false, showRemoveIcon : true};
        props.accept = this.fileAccepts == 'all' ? 'all' : this.fileAccepts.join(',');

        // 初始值
        if(props.initialFiles && !this.files)
        {
            props.defaultFileList = [];
            const initialFilesShow = props.initialFilesShow.split(',');
            props.initialFiles.split(',').map((v, k) => {
                props.defaultFileList.push(
                    {
                        uid : v,
                        name : v,
                        status : 'done',
                        response : {data : v},
                        url : initialFilesShow[k]
                    }
                );
            })

            this.files = props.defaultFileList;
            this.testLength(true);
        }

        props.onRemove = file => {
            const thisComponent = this;
            return new Promise(function(resolve, reject) {
                Alert(`删除${thisComponent.props.labelName}`, `你确定删除该${thisComponent.props.labelName}吗？`, [
                    {text: '否', onPress: () => resolve(false), style: 'default'},
                    {text: '是', onPress: () => resolve(true), style: {fontWeight: 'bold'}},
                ]);
            });
        }

        return(
            <div className={className} style={this.props.style ? this.props.style : {}}>
                <div className="list-label">{this.props.labelName}</div>
                <UploadAntd {...props}>
                    <div className="icon-border">
                        <Icon className="icon" type="plus" />
                    </div>
                </UploadAntd>

            </div>
        )
    }
}

export default Upload;
