import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';
import { List } from 'antd-mobile';
import { browserHistory } from 'react-router';
import {Spin} from 'antd';
import 'jquery-easing';

import {getJobsList} from './action';

import './style.scss';

const Item = List.Item;

class RecruitmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetch : false
        };
    }

    componentWillMount() {
        if(!this.isExist(this.props.params.id)) {
            this.props.getJobsList(this.props.params.id, () => {setTimeout(() => this.setState({isFetch : true}), 10)}, () => {setTimeout(() => this.setState({isFetch : true}), 10)});
        }else{
            this.setState({isFetch : true})
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.changeTitle("");
    }

    changeTitle = title => {
        document.title = `${title}`;
    }

    isExist = id => {
        let status = false;
        this.props.reducer.jobs.map(v => {
            if(v.id == id){
                status = true;
            }
        });
        return status;
    }

    render() {
        let url = null,
            alt = null,
            type = null,
            list = null,
            lists = [],
            imgs = [{
                alt : '技术',
                type: 'program',
                url : 'Recruitment/Campus/Program/program-header.png'
            },{
                alt : '美术',
                type: 'arts',
                url : 'Recruitment/Campus/Arts/arts-header.png'
            },{
                alt : '策划',
                type: 'project',
                url : 'Recruitment/Campus/Project/project-header.png'
            },{
                alt : '市场',
                type: 'marketing',
                url : 'Recruitment/Campus/Marketing/marketing-header.png'
            },{
                alt : '运营',
                type: 'operations',
                url : 'Recruitment/Campus/Operations/operations-header.png'
            },{
                alt : '职能',
                type: 'support',
                url : 'Recruitment/Campus/Support/support-header.png'
            },{
                alt : '实习生',
                type: 'program',
                url : 'Recruitment/Campus/Program/program-header.png'
            }],
            data = null;
        const noPosition = (
            <div className="no-position-container">
                <div className="no-position">
                    <img src={getSrc('Recruitment/Campus/no-position.png')}/>
                </div>
            </div>
        );
        imgs.map( v => {
            if(this.props.params.type == v.alt) {
                url = v.url;
                alt = v.alt;
                type = v.type;
            }
        });

        if(this.state.isFetch) {
            this.props.reducer.jobs.map(v => {
                if(v.id == this.props.params.id && v.detail != null) {
                    data = v.detail;
                    data.map((v, k) => {
                        list = (
                            <Item
                                arrow="horizontal"
                                onClick={() => {
                                    let path = `/recruit/recruitment/campus/detail/${v.job_id}/${type}`;
                                    browserHistory.push(path);
                                }}
                                key={k}
                            >
                                {v.name}
                            </Item>
                        );
                        lists.push(list);
                    });
                }
            })

        }

        this.changeTitle(`${alt}类`);

        return(
            <Spin spinning={!this.state.isFetch} style={{height : document.body.clientHeight}}>
                <div className="RecruitmentList">
                    <div className="header">
                        <img src={getSrc(url)} alt={alt} width="100%"/>
                    </div>
                    <div className="title-container">
                        <div className={`title ${type}-color-bg`}>选择你的岗位</div>
                    </div>
                    <div className="wrapper">
                        {
                            data == null && this.state.isFetch ?
                                noPosition
                                :
                                <List>
                                    {lists}
                                </List>
                        }
                    </div>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.recruitmentList,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    getJobsList
}

export default store => ({
    path: 'recruitment/:class/:type/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'recruitmentList', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(RecruitmentList));
        })
    }
})