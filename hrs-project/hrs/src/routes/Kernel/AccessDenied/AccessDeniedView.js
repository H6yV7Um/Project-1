import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Layout, Alert } from 'antd'

class AccessDeniedView extends Component 
{
    render()
    {
        return (
            <div style={{'margin': '50px auto', 'width':600}}>
                <Alert
                    message="错误"
                    description="您没有登录或登录过期，请重新从钉钉登录。"
                    type="error"
                    showIcon
                  />
            </div>
        )
    }
}
export default AccessDeniedView