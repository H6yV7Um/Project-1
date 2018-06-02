import React, {Component, PropTypes} from 'react';
import {injectReducer} from 'store/reducers';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import getSrc from 'utils/imgSrc';

import {} from './action';

import './style.scss';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return(
            <div className="Account">
                <div className="bg">
                    <img src={getSrc('Account/account.png')} width="100%"/>
                    <div className="personal">
                        <Link to="/something/account/personal">
                            <img src={getSrc('Account/personal.png')} width="100%"/>
                        </Link>
                    </div>
                    <div className="group">
                        <Link to="/something/account/group">
                            <img src={getSrc('Account/group.png')} width="100%"/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.account,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {

}

export default store => ({
    path : 'account',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'account', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Account))
        })
    }
})
