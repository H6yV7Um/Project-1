import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import { List } from 'antd-mobile';
import Button from 'components/Button';
import {Spin} from 'antd';
import 'jquery-easing';

import {getDetail} from './action';
import './style.scss';

class RecruitmentDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetch : false
        };
    }

    componentWillMount() {
        if(!this.isExist(this.props.params.id)) {
            this.props.getDetail(this.props.params.id, () => {setTimeout(() => this.setState({isFetch : true}), 10)});
        }else{
            this.setState({isFetch : true})
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.changeTitle('');
    }

    changeTitle = title => {
        document.title = `${title}`;
    }

    isExist = id => {
        let status = false;
        this.props.reducer.job.map((v, k) => {
            if(v.id == id){
                status = true;
            }
        });
        return status;
    }

    createList = data => {
        let res = null,
            resList = [];
        data.map((v, k) => {
            res = (
                <li key={k}>
                    <div className="num">-</div>
                    <div>{v}</div>
                </li>
            )
            resList.push(res);
        });
        return resList;
    }

    render() {
        let responsibilitiesItemList = [],
            requirementsItemList = [],
            priorityItemList = [],
            responsibilities = null,
            requirements = null,
            priority = null,
            description = '',
            type = this.props.params.type,
            data = null;
        if(this.state.isFetch) {
            this.props.reducer.job.map(v => {
                if(v.id == this.props.params.id) {
                    data = v.detail;
                }
            })
            responsibilities = data.responsibilities_data.split(";;;");
            requirements = data.requirements_data.split(";;;");
            priority = data.priority_data.split(";;;");
            description = data.job_description;
            // 你将会
            responsibilitiesItemList = this.createList(responsibilities);
            // 我们希望你
            requirementsItemList = this.createList(requirements);
            // 具备一下技能会加分
            priorityItemList = this.createList(priority);
            this.changeTitle(`${data.name}`);
        }


        return(
            <Spin spinning={!this.state.isFetch} style={{height : document.documentElement.clientHeight}}>
                <div className="RecruitmentDetail" style={{height : document.documentElement.clientHeight}}>
                    <div className={`header ${type}-color-bg`}>
                        <div className="title">{this.state.isFetch ? data.name : ''}</div>
                        <div className="sub-title">简历投递 campus2018@tap4fun.com</div>
                    </div>
                    {
                        responsibilities == "" ?
                            null
                            :
                            <div className="item" style={{display : this.props.reducer.duty}}>
                                <div className="header">
                                    <div className={`wrapper ${type}-color-bg`}>
                                        <h1 className="wrapper-title"><div>你将会</div></h1>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="duty-content">
                                        <ul>
                                            {this.state.isFetch ? responsibilitiesItemList : ''}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        requirements == "" ?
                            null
                            :
                            <div className="item">
                                <div className="header">
                                    <div className={`wrapper ${type}-color-bg`}>
                                        <h1 className="wrapper-title"><div>我们希望你</div></h1>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="duty-content">
                                        <ul>
                                            {this.state.isFetch ? requirementsItemList : ''}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        priority == "" ?
                            null
                            :
                            <div className="item">
                                <div className="header">
                                    <div className={`wrapper wrapper-normal ${type}-color-normal`}>
                                        <h1 className="wrapper-title"><div className={`${type}-color-normal-bg`}>具备以下技能会加分哦</div></h1>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="duty-content">
                                        <ul>
                                            {priorityItemList}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        description == "" ?
                            null
                            :
                            <div className="item">
                                <div className="header">
                                    <div className={`wrapper wrapper-normal ${type}-color-normal`}>
                                        <h1 className="wrapper-title"><div className={`${type}-color-normal-bg`}>发展方向</div></h1>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="duty-content">
                                        <div className="words">
                                            {data.job_description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                    <div className="footer">
                        <Button
                            className={`${type}-color-bg`}
                            nameStyle={{color : '#fff'}}
                            action={() => {
                                window.location.href = 'https://www.wenjuan.net/s/jM3aya/';
                            }}
                            style={{border : 'none'}}
                            name={'网测入口'}
                        />
                    </div>
                </div>

            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.recruitmentDetail,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    getDetail
}

export default store => ({
    path: 'recruitment/campus/detail/:id/:type',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'recruitmentDetail', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(RecruitmentDetail));
        })
    }
})
