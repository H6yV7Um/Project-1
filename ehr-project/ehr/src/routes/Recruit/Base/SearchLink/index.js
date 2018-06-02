import React, {Component, PropTypes} from 'react';
import { List, WhiteSpace, Button, Toast } from 'antd-mobile';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';
import ResumeIndex from 'appComponents/Wechat/Resume';
import ToastContent from 'components/ToastContent';
import SearchLinkComponent from 'components/SearchLink';
import {checkIn} from './action';

import './style.scss';

class SearchLink extends Component {
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

    onSearchClick = () => {
        console.log('click');
    }

    render() {
        let className = 'routesRecruitBaseSearchLink';
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <div className={className} style={{height : this.state.height}}>
                <SearchLinkComponent
                    placeHolder={'美图超级品牌日，赢1127元E卡'}
                    action={()=>{this.onClick()}}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.searchLink,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    checkIn
}

export default store => ({
    path: 'searchLink',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'searchLink', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(SearchLink))
        })
    }
})