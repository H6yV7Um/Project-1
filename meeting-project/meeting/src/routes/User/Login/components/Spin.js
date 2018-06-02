import React, {Component, PropTypes} from 'react'
import {Spin as SpinAntd} from 'antd'

class Spin extends Component {
    constructor (props) {
        super(props)

        this.state = {}
    }

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        loginMessage: PropTypes.string,
        height: PropTypes.number
    }

    render () {
        return (
            <SpinAntd spinning={!this.props.loginMessage} style={{height: this.props.height}}>
                {this.props.children}
            </SpinAntd>
        )
    }
}

export default Spin
