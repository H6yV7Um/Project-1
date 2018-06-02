import React, {Component, PropTypes} from 'react';
import { List, WhiteSpace, Button, Toast } from 'antd-mobile';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';
import ResumeIndex from 'appComponents/Wechat/Resume';
import ToastContent from 'components/ToastContent';
import SearchComponent from 'components/Search';
import {checkIn} from './action';

import './style.scss';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height : null
        };
    }

    componentWillMount() {
        this.setState({height : document.documentElement.clientHeight});
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render() {
        let className = 'routesRecruitBaseSearch';
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <div className={className} style={{height : this.state.height}}>
                <SearchComponent></SearchComponent>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.search,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    checkIn
}

export default store => ({
    path: 'search',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'search', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Search))
        })
    }
})