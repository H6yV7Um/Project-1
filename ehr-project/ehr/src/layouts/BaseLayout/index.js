import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import RecruitLayout from '../RecruitLayout';
import '../../styles/core.scss';
import './style.scss';

class BaseLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return(
            <div className="BaseLayout">
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.baseLayout
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);