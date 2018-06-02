import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';
import {browserHistory} from 'react-router';
import {Spin} from 'antd';
import 'jquery-easing';

import {getJobsTypes} from './action';

import './style.scss';

class Recruitment extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount(){
        if(this.props.reducer.jobTypes.length == 0) {
            this.props.getJobsTypes(4);
        }
    }

    componentWillMount() {
        this.changeTitle('tap4fun招聘');
    }

    changeTitle = title => {
        document.title = `${title}`;
    }

    render() {
        let img = null,
            imgList = [],
            imgs = null,
            jobTypeId = null;
        if(this.props.reducer.isFetch) {
            jobTypeId = this.props.reducer.jobTypes[0].job_type_id;
            imgs = [{
                path : '/recruit/recruitment/campus',
                alt : '校园招聘',
                url : 'Recruitment/Index/campus_recruitment.png'
            },
            //     {
            //     path : '/recruit/recruitment/social',
            //     alt : '社会招聘',
            //     url : 'Recruitment/Index/social_recruitment.png'
            // },
                {
                path : `/recruit/recruitment/practice/实习生/${jobTypeId}`,
                alt : '实习大作战',
                url : 'Recruitment/Index/practice.png'
            }];
            imgs.map((v, k) => {
                img = (
                    <div className="wrapper" key={k}>
                        <img src={getSrc(v.url)} alt={v.alt} onClick={()=>{browserHistory.push(v.path)}}/>
                    </div>
                );
                if(v.alt == '社会招聘') {
                    img = (
                        <div className="wrapper" key={k}>
                            <img src={getSrc(v.url)} alt={v.alt} onClick={()=>{window.location.href="http://jobs.tap4fun.com/wechat/list-social?_t=1501498243";}}/>
                        </div>
                    );
                }
                imgList.push(img);
            })
        }

        return(
            <div className="Recruitment" style={{height : document.documentElement.clientHeight}}>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.recruitment,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    getJobsTypes
}

export default store => ({
    path: 'recruitment',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'recruitment', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Recruitment));
        })
    }
})
