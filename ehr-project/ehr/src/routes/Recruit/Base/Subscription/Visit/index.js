import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation, getPosition} from 'utils/location';
import getSrc from 'utils/imgSrc';
import 'jquery-easing';

import {} from './action';

import './style.scss';

class Visit extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.imgs = ['Visit/1.png', 'Visit/3.png', 'Visit/5.png', 'Visit/6.png',
            'Visit/4.png', 'Visit/7.png', 'Visit/2.png'];
    }

    render() {
        // 处理图片
        let img = null,
            imgList = [];
        this.imgs.map((v, k) => {
            img =
                <div className="wrapper" key={k}>
                    <img src={getSrc(v)} className="img"/>
                </div>
            imgList.push(img);
        })

        return(
            <div className="Visit">
                {imgList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.visit,
    publicReducer : state.wechatLoginLayout
})

const mapDispatchToProps = {

}

export default store => ({
    path: 'visit',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'visit', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Visit));
        })
    }
})
