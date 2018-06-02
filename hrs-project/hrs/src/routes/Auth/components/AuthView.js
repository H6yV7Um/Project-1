import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {auth} from '../actions/AuthAction'
import {Spin} from 'antd'

class AuthView extends Component {
    static propTypes =
    {
      authStore: React.PropTypes.object.isRequired,
      auth: React.PropTypes.func.isRequired
    }

    componentDidMount() {
      this.props.auth(this.props.location.query.ticket)
    }

    render()
    {
        return (
            <div id="dingding-border">
                {this.props.authStore.authLoading?(<Spin />):null}
                {this.props.authStore.authError?(<h1>{this.props.authStore.authError}</h1>):null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  authStore:state.auth
})

const mapDispatchToProps = {
  auth
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthView)
