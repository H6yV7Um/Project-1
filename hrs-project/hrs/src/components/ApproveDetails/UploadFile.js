import React, {Component, PropTypes} from 'react'
import { Upload, Button, Icon ,message} from 'antd'
import {SERVER, UPLOAD_HTTP_HEADER} from 'config'
class UploadFile extends React.Component {
    static propTypes =
    {
        maximum:React.PropTypes.number,
        size: React.PropTypes.number,
        fieldID: React.PropTypes.string,
        changeFileOfMemberData: React.PropTypes.func,
        fileList: React.PropTypes.array,
    }
    handleChange=({ fileList })=>{
        this.props.onChange(fileList,this.props.namespace)
    }  
    beforeUpload = (file)=> {
        const isPDF = file.type === 'application/pdf'
      	const isPPT = file.type === 'application/vnd.ms-powerpoint'
      	const isDOC = file.type === 'application/msword'
      	const isXLS = file.type === 'application/vnd.ms-excel'
      	const isPPTX = file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      	const isDOCX = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      	const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      	const isKEY = file.type === 'application/x-iwork-keynote-sffkey'
      	const isPAGES = file.type === 'application/x-iwork-pages-sffpages'
        const isZIP = file.type === 'application/zip'
        const isRAR = file.type === 'application/ocelet-stream'

        let limitSize = this.props.size
        let isLimitSize = file.size < this.props.size*1024
        if(isLimitSize)
        {
            if(isPDF)
            {
                return isPDF 
            }
            else if(isPPT)
            {
                return isPPT 
            }
            else if(isDOC)
            {
                return isDOC
            }
            else if(isXLS)
            {
                return isXLS
            } 
            else if(isPPTX)
            {
            	return isPPTX
            }  
            else if(isDOCX)
            {
            	return isDOCX
            }
            else if(isXLSX)
            {
            	return isXLSX
            }
            else if(isKEY)
            {
            	return isKEY
            }
            else if(isPAGES)
            {
            	return isPAGES
            }
            else if(isZIP)
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
            message.error('文件不能超过'+this.props.size+'Kb!')
            return isLimitSize
        }
    }
    render() {
        return (
            <Upload
                    action={SERVER+"/workflow/file/upload_file"}
                    multiple={true}
                    fileList={this.props.fileList}
                    accept= 'aplication/zip,application/ocelet-stream,application/x-iwork-pages-sffpages,application/x-iwork-keynote-sffkey,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-powerpoint,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.presentationml.presentation'
                    withCredentials={true}
                    name={"file"}
                    data={{'solution_id': this.props.fieldID,'namespace': 'file'}}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload} 
            >
                {this.props.fileList.length<this.props.maximum?
                     (<Button>
                      <Icon type="upload" /> Upload
                     </Button>)
                     :null
                }
            </Upload>
        )
    }
}
export default UploadFile