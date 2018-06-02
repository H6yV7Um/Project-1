import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import Grid from 'components/Grid';
import Item from './Item';
import Icon from 'components/Icon';
import getSrc from 'utils/imgSrc';
import API from '../../middlewares/api';
import 'jquery-easing';

import {} from './action';

import './style.scss';

// 数据录入
class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {


        return(
            <div className="routeImport">
                <Grid
                    width={280}
                    isSetMarginBottom={true}
                    itemList={[
                        <Item
                            title={'OKR'}
                            url={API.OKR_IMPORT}
                            icon={<Icon className={'icon okr'} type={'calendar-check-o'}/>}
                        />,
                        <Item
                            title={'PEOPLE LOVE'}
                            url={API.LOVE_IMPORT}
                            icon={<Icon className={'icon love'} type={'heart-o'}/>}
                        />,
                        <Item
                            title={'阿米巴'}
                            url={API.AMOEBA_IMPORT}
                            icon={<Icon className={'icon amoeba'} type={'heart-o'}/>}
                        />,
                        <Item
                            title={'招聘'}
                            style={{display : 'none'}}
                            icon={<Icon className={'icon recruit'} type={'heartbeat'}/>}
                        />,
                        <Item
                            title={'转正'}
                            style={{display : 'none'}}
                            icon={<Icon className={'icon become'} type={'handshake-o'}/>}
                        />,
                        <Item
                            title={'离职'}
                            style={{display : 'none'}}
                            icon={<Icon className={'icon leave'} type={'envelope-open-o'}/>}
                        />,
                        <Item
                            title={'晋升'}
                            style={{display : 'none'}}
                            icon={<Icon className={'icon promotion'} type={'graduation-cap'}/>}
                        />,
                        <Item
                            title={'培训'}
                            url={API.TRAIN_COURSERA_IMPORT}
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
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {

}

export default store => ({
    path: '/import',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'input', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Input));
        })
    }
})
