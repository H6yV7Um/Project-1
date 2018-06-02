import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {} from './Action'
import './Style.scss'

class NormalLayout extends Component {
    static propTypes =
    {
        children      : React.PropTypes.element.isRequired,
        normalLayout  : React.PropTypes.object.isRequired
    }

    componentDidMount()
    {

    }

    render()
    {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    normalLayout  : state.normalLayout
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLayout)
