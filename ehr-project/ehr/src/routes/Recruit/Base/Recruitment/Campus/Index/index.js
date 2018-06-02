import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import { Row, Col } from 'antd';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';
import {getJobsTypes, changeFetch} from './action';
import { browserHistory } from 'react-router';
import {Spin} from 'antd';
import 'jquery-easing';

import {} from './action';

import './style.scss';

class Campus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetch : false
        };
    }

    componentWillMount(){
        if(this.props.reducer.jobTypes.length == 0) {
            this.props.getJobsTypes('3', () => {setTimeout(() => this.setState({isFetch : true}), 10)});
        }else{
            this.setState({isFetch : true});
        }
    }

    componentWillUnmount() {
        this.changeTitle('');
    }

    isArray = o => (
        Object.prototype.toString.call(o)=='[object Array]'
    )

    /**
     * 对首页的图标顺序进行排序
     * @param rules : ['技术', '美术', '策划', '市场', '运营', '职能']
     * 默认顺序(从上至下、从左至右) 技术、美术、策划、市场、运营、职能
     */
    sort = (rules = ['技术', '美术', '策划', '市场', '运营', '职能']) => {
        let sortedArr = [];
        if(this.props.reducer.jobTypes) {
            if(this.isArray(rules)) {
                rules.map(v => {
                    this.props.reducer.jobTypes.map(v1 => {
                        if(v == v1.name) {
                            sortedArr.push(v1);
                        }
                    })
                })
            }else{
                console.error("请输入正确的参数!");
                return this.props.reducer.jobTypes;
            }
        }
        return sortedArr;
    }

    changeTitle = title => {
        document.title = `${title}`;
    }

    render() {
        let img = null,
            imgList = [],
            imgs = [{
                path : '/recruit/recruitment/campus/',
                alt : '技术',
                url : 'Recruitment/Campus/Program/program.png'
            },{
                path : '/recruit/recruitment/campus/',
                alt : '美术',
                url : 'Recruitment/Campus/Arts/arts.png'
            },{
                path : '/recruit/recruitment/campus/',
                alt : '策划',
                url : 'Recruitment/Campus/Project/project.png'
            },{
                path : '/recruit/recruitment/campus/',
                alt : '市场',
                url : 'Recruitment/Campus/Marketing/marketing.png'
            },{
                path : '/recruit/recruitment/campus/',
                alt : '运营',
                url : 'Recruitment/Campus/Operations/operations.png'
            },{
                path : '/recruit/recruitment/campus/',
                alt : '职能',
                url : 'Recruitment/Campus/Support/support.png'
            }],
            rowsNo = null,
            row = null,
            rowsList = [],
            data = null;
        if(this.props.reducer.jobTypes) {
            data =  this.sort();
            rowsNo = (this.props.reducer.jobTypes.length / 2).toFixed(0);
            row = null;
            rowsList = [];
            data.map((v, k) => {
                let url = null,
                    path = null,
                    alt = null;
                imgs.map((v1, k1) => {
                    if(v.name == v1.alt) {
                        url = v1.url;
                        path = `${v1.path}${v.name}/${v.job_type_id}`;
                        alt = v1.alt;
                        img = (
                            <div className="wrapper" key={k}>
                                <img src={getSrc(url)} alt={alt} onClick={()=>{
                                    browserHistory.push(path);
                                }}/>
                            </div>
                        );
                        imgList.push(img);
                    }
                });
            })
            for(let i = 0;i < rowsNo;i++) {
                if(i == 0) {
                    row = <Row key={i} gutter={24} className="antd-row">
                        <Col className="gutter-row" span={12}>
                            <div className="gutter-box">{imgList[i]}</div>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <div className="gutter-box">{imgList[i + 1]}</div>
                        </Col>
                    </Row>
                }else{
                    row = <Row key={i} gutter={24} className="antd-row">
                        <Col className="gutter-row" span={12}>
                            <div className="gutter-box">{imgList[i*2]}</div>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <div className="gutter-box">{imgList[(i*2)+1]}</div>
                        </Col>
                    </Row>
                }
                rowsList.push(row);
            }
        }

        this.changeTitle('校园招聘');

        return(
            <Spin spinning={!this.state.isFetch} style={{height : document.body.clientHeight}}>
                <div className="Campus" style={{height : document.documentElement.clientHeight}}>
                    <div className="container">
                        <div className="list">
                            {rowsList}
                        </div>
                    </div>
                    <div className="ni-container">
                        <img src={getSrc("Recruitment/Campus/ni.png")} alt="小尼" className="ni"/>
                    </div>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.campus,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    getJobsTypes, changeFetch
}

export default store => ({
    path: 'recruitment/campus',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'campus', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Campus));
        })
    }
})
