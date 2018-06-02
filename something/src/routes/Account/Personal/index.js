import React, {Component, PropTypes} from 'react';
import {injectReducer} from 'store/reducers';
import {connect} from 'react-redux';
import getSrc from 'utils/imgSrc';

import './style.scss';

class Personal extends Component {
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
            <div className="Personal">
                <div className="bg">
                    <img src={getSrc('Account/personal_content.jpg')} width="100%"/>
                    <div className="url">
                        <a href="http://sqwq.zw.cdfgj.gov.cn/template/fileservice.html"><em>点击进入</em></a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.personal,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {

}

export default store => ({
    path : 'account/personal',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'personal', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Personal))
        })
    }
})
