import React, {Component, PropTypes} from 'react'
import { Upload, Button, Icon ,message} from 'antd'
import {SERVER, UPLOAD_HTTP_HEADER} from 'config'
class UploadDoc extends React.Component {
    
    static propTypes =
    {
        maximum:React.PropTypes.number,
        size: React.PropTypes.string,
        fieldID: React.PropTypes.string,
        changeFileOfMemberData: React.PropTypes.func,
        fileList: React.PropTypes.array,
        disabled: React.PropTypes.bool,
    }
    handleChange =({ fileList })=>{  
        if(this.props.disabled)
        {
            return 
        }      
        this.props.onChange(fileList)
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
                    action={SERVER+"organization/file/upload"} 
                    multiple={true}
                    fileList={this.props.fileList}
                    accept= 'application/x-iwork-pages-sffpages,application/x-iwork-keynote-sffkey,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-powerpoint,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.presentationml.presentation'
                    withCredentials={true}
                    name={this.props.namespace}
                    data={{'_id': this.props.fieldID}}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                    disabled={this.props.disabled}
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
export default UploadDoc