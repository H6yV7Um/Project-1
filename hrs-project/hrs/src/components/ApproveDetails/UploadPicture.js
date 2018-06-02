import React, {Component, PropTypes} from 'react'
import { Upload, Icon, message,Modal } from 'antd'
import {SERVER} from 'config'
import {upload} from 'util/Common'
class UploadPicture extends React.Component {  
    state = {
        previewVisible: false,
        previewImage: ''
    }
    static propTypes =
    {
        maximum:React.PropTypes.number,
        size: React.PropTypes.number,
        fieldID: React.PropTypes.string,
        namespace: React.PropTypes.string,
        onChange: React.PropTypes.func,
        fileList: React.PropTypes.array,
    }

    beforeUpload = (file)=> {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isGIF = file.type === 'image/gif'
        let isLimitSize = file.size < this.props.size*1024
        if(isLimitSize)
        {
            if(isJPG)
            {
                return isJPG
            }
            else if(isPNG)
            {
                return isPNG
            }
            else if(isGIF)
            {
                return isGIF
            }
            else{
                message.error("请上传正确格式的图片")
                return false
            }
        }
        else
        {
            message.error('图片不能超过'+this.props.size+'KB!')
            return isLimitSize
        }
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        })
    }
    handleChange=({ fileList })=>{
        this.props.onChange(fileList,this.props.namespace)
    }
    render() {        
        const { previewVisible, previewImage } = this.state
        const fileList = this.props.fileList
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <div className="clearfix">
                <Upload
                        action={SERVER+"workflow/file/upload_image"}
                        listType="picture-card"
                        multiple={true}
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        beforeUpload={this.beforeUpload}
                        accept="image/gif, image/png, image/jpeg"
                        withCredentials={true}
                        name={this.props.namespace}
                        data={{'solution_id': this.props.fieldID,'namespace': this.props.namespace}}
                >
                    {fileList.length >= this.props.maximum ? null : uploadButton}
                </Upload>
                <Modal 
                    width="800px" 
                    visible={previewVisible} 
                    footer={null} 
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
export default UploadPicture






