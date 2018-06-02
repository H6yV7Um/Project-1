import React, {Component} from 'react';
import {connect} from 'react-redux';

import './style.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return(
            null
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);