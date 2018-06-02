import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';

import CONFIG from 'config/app';
import dd from 'utils/dingding';
import browserAttr from 'utils/browserAttr';

import {} from './action';

import './style.scss';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount() {

    }

    render() {
        let className = 'routeAppIndex';
        return( <div
                    className={className}
                >
                    hello worldl 新币的
                </div>

        )
    }
}

const mapStateToProps = state => ({
    reducer : state.routeIndex,
})

const mapDispatchToProps = {

}

export default store => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'routeIndex', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index))
        })
    }
})
