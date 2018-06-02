import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation, getPosition} from 'utils/location';
import getSrc from 'utils/imgSrc';
import 'jquery-easing';

import {} from './action';

import './style.scss';

class Learn extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.imgs = ['Learn/34.png', 'Learn/35.png', 'Learn/1234.png', 'Learn/36.png',
            'Learn/88.png', 'Learn/123.png', 'Learn/12.png', 'Learn/23.png'];
        this.words = ['子曾经曰过，“活到老，学到老"', 'tap4fun希望每一个成员都有机会不断成长',
            '丰富的培训课程为你专属定制', '有什么想学习的也请告诉我们哦', '我们希望你最大的收获，就是你的成长'];
    }

    componentDidMount() {

    }

    render() {
        // 处理图片
        let img = null,
            imgList = [];
        let _width = document.body.clientWidth;
        this.imgs.map((v, k) => {
            img =
                <div className="wrapper" key={k}>
                    <img
                        src={getSrc(v)} className="img"/>
                </div>
            imgList.push(img);
        })
        // 处理文字
        let word = null,
            words = [];
        this.words.map((v, k) => {
            word =
                <div className="article" key={k}>
                    {v}
                </div>
            words.push(word);
        })

        return(
            <div className="Learn">
                <div className="container-words">
                    {words}
                </div>
                <div className="container-imgs">
                    {imgList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.learn,
    publicReducer : state.wechatLoginLayout
})

const mapDispatchToProps = {

}

export default store => ({
    path: 'learn',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'learn', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Learn));
        })
    }
})
