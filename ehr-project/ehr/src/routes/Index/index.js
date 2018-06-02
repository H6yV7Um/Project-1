import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import getSrc from 'utils/imgSrc';
import 'jquery-easing';

import {} from './action';

import './style.scss';

// EHR综合信息
class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {


        return(
            <div className="routeIndex">
                INDEX
                {/*最近一月管理部门okr信息(正在进行数、亮点总分、提前完成数、延误完成数、延误未完成数)*/}
                {/*最近一月管理部门面试信息(面试人数、入职人数、入职率)*/}
                {/*最近一月管理部门转正信息(转正人数)*/}
                {/*最近一月管理部门离职信息(离职人数)*/}
                {/*最近一月管理部门晋升信息(晋升人数)*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.index,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {

}

export default store => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'index', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index));
        })
    }
})
