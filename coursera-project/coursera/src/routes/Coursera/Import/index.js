import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import Grid from 'components/Grid';
import Item from './Item';
import Icon from 'components/Icon';
import API from '../../../middlewares/api';
import 'jquery-easing';

import {} from './action';

import './style.scss';

// 数据录入
class Import extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {


        return(
            <div className="routeCourseraImport">
                <Grid
                    width={280}
                    isSetMarginBottom={true}
                    itemList={[
                        <Item
                            title={'coursera'}
                            url={API.IMPORT}
                            icon={<Icon className={'icon train'} type={'book'}/>}
                        />
                    ]}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.import,
    publicReducer : state.layoutDd
})

const mapDispatchToProps = {

}

export default store => ({
    path: '/import',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'import', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Import));
        })
    }
})
