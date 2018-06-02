import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {} from '../actions/HomeAction'

import './HomeViewStyle.scss'

class HomeView extends Component {
    static propTypes =
    {
        coreLayout     : React.PropTypes.object.isRequired
    }

    render()
    {
        // console.log(this.props.coreLayout.user)

        return (
            <div>Hello</div>
        )
    }
}

const mapStateToProps = (state) => ({
    coreLayout  : state.coreLayout
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
