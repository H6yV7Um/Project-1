import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import Icon from 'components/Icon';
import {getMyBooks} from './action';

import './style.scss';

class PersonalCenter extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        if(this.props.reducer.myBooks.length === 0) {
            this.props.getMyBooks(4);
        }
    }

    render() {
        return(
            <div className="Book-PersonalCenter">
                <div className="Book-PersonalCenter-Title">
                    我的书屋
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.personalCenter,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getMyBooks
}

export default store => ({
    path : 'personal_center',
    getComponent (nextState, cb) {
        "use strict";
        require.ensure([], (require) => {
            injectReducer(store, {key: 'personalCenter', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(PersonalCenter));
        })
    }
})