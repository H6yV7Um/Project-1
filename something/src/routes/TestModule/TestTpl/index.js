import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from '../../../store/reducers';
import {SearchBar, Button, Icon as IconAntd} from 'antd-mobile';
import Icon from 'components/Icon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import {test} from './action';

import './style.scss';

class TestTpl extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.test();
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return(
            <div className="TestModule-TestTpl">
                <p>TestModule-TestTpl</p>
                <SearchBar placeholder="搜索" />
                <Button type="primary" size={"small"} onClick={this.scan}>scan</Button>
                <IconAntd type={require('assets/svg/Chian_Everbright_Bank.svg')} size="lg"/>
                <Icon type="up" />
                <Icon type="plus" />
                <Glyphicon glyph="search" />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.test,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    test : test
}

export default store => ({
    path : 'test',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'test', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(TestTpl))
        })
    }
})
