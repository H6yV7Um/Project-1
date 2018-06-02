import React, {Component, PropTypes} from 'react'
import { Upload, Button, Icon ,message} from 'antd'
import {SERVER, UPLOAD_HTTP_HEADER} from 'config'
class UploadArchive extends React.Component {
    static propTypes =
    {
        maximum:React.PropTypes.number,
        size: React.PropTypes.number,
        fieldID: React.PropTypes.string,
        changeFileOfMemberData: React.PropTypes.func,
        fileList: React.PropTypes.array,
        disabled: React.PropTypes.bool,
    }
    handleChange=({ fileList })=>{
        if(this.props.disabled)
        {
            return 
        }
        this.props.onChange(fileList,this.props.namespace)
    }
    beforeUpload = (file)=> {
        const isZIP = file.type === 'application/zip'
        const isRAR = file.type === 'application/ocelet-stream'
        let limitSize = this.props.size
        let isLimitSize = file.size < this.props.size*1024
        if(isLimitSize)
        {
            if(isZIP)
            {
                return isZIP 
            }
            else if(isRAR)
            {
                return isRAR
            }
            else{
                message.error("请上传正确格式的文件")
                return false
            }   
        }
        else
        {
            message.error('文件不能超过'+this.props.size+'KB!')
            return isLimitSize
        }
    }
    render() {        
        let fileList = this.props.fileList
        return (
            <Upload
                    action={SERVER+"organization/file/upload"} 
                    multiple={true}
                    accept="aplication/zip,application/ocelet-stream"
                    withCredentials={true}
                    fileList = {fileList}
                    name={this.props.namespace}
                    data={{'_id': this.props.fieldID}}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                    disabled={this.props.disabled}
            >
                {fileList.length<this.props.maximum?
                     (<Button>
                      <Icon type="upload" /> Upload
                     </Button>)
                     :null
                 }
            </Upload>
        )
    }
}
export default UploadArchive