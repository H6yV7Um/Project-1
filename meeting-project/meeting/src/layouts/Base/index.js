import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import '../../styles/core.scss'
import './style.scss'

class Base extends Component {
    constructor (props) {
        super(props)

        this.state = {}
    }

    static propTypes = {
        children: PropTypes.element
    }

    componentDidMount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        return (
            <div className='layoutBase'>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer: state.layoutBase
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Base)
