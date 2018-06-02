import { Button } from 'antd'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {login, localLogin} from '../actions/DingdingAction'
import './DingdingStyle.scss'
class DingdingView extends Component {
    static propTypes =
    {
        dingding       : React.PropTypes.object.isRequired,
        login          : React.PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.login(false)
    }
    render()
    {
        return (
            <div id="jump-border">
                <Button
                    onClick={this.props.login}
                    style={{marginTop:300}}
                >Login</Button>

                <Button
                    onClick={this.props.localLogin}
                    style={{marginTop:300,marginLeft:8}}
                >Local Login</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    dingding    : state.dingding
})
const mapDispatchToProps = {
    login, localLogin
}
export default connect(mapStateToProps, mapDispatchToProps)(DingdingView)
