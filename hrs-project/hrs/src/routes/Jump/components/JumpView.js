import { Button, Spin, Alert } from 'antd'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/JumpAction'
import './JumpStyle.scss'
class JumpView extends Component {
    static propTypes =
    {
        loginloading      : React.PropTypes.bool,
        loginfail      : React.PropTypes.bool,
        loginerror      : React.PropTypes.bool,
    }
    componentDidMount() {
         this.props.login(this.props.location.query.url)
    }
    render()
    {
        if(this.props.jump.loginfail)
        {
            return  <Alert
                        message="Error"
                        description="跳转失败"
                        type="error"
                        showIcon
                    />
        }
        if(this.props.jump.loginloading)
        {
            return (
                <div id="jump-border" style={{textAlign:'center',marginTop:"60px"}}>
                   <Spin size="large" />
                   <p style={{marginTop:"30px"}}>跳转中...</p>
                </div>
            ) 
        }
        return <div></div>
    }
}
const mapStateToProps = (state) => ({
    jump    : state.jump
})
const mapDispatchToProps = {
    login
}
export default connect(mapStateToProps, mapDispatchToProps)(JumpView)
