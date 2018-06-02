import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
import { Button, Modal, Input, Form } from 'antd';
import {injectReducer} from 'store/reducers';
import {hostName} from 'config/wechat';

import {addJobType, deleteJobType,getCv,getCvByCondition} from './action';

import './style.scss';

const FormItem = Form.Item;
const confirm = Modal.confirm;


// 面试综合信息
class CrawlingCv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userList                :   [],
            response                :   [],
            condition               :   '',
        };
    }
    componentDidMount() {

    }

    componentWillMount() {
        // 获取职位分类
        this.props.getCv({},(data)=>{
            // console.log(data)
            this.setState({response: data})
        });
    }

    componentWillUnmount() {
    }

    handleClick = id =>{
        //跳转到详细页面
        // console.log(id);
        browserHistory.push('/recruit/dd/backstage/cv/cvdetail/'+id);
    }
    select = () => {
        //根据输入的内容进行模糊查询
        this.props.getCvByCondition(this.state.condition,(data)=>{
            this.setState({response: data});
        });
    }
    formatCrawlingcv(response = [],className){
            let current = response.map((v,k)=> {
                let cvInfo = [],
                    name = '',
                    details = null,
                    crawlingcv = [];

                if(v.personal_info.name){
                    name = v.personal_info.name.match(/[\*]+/) ? "未下载" : v.personal_info.name
                }
                //在简历列表中只现实工作经验的第一条，没有工作经验现实项目经验的第一条
                if(v.work_experience[0]){
                    details =
                        <p className={`${className}-list-block-info`}> {v.work_experience[0].work_times} | {v.work_experience[0].work_company} | {v.work_experience[0].work_post}</p>
                }else if(v.pro_experience[0]){
                    details =
                        <p className={`${className}-list-block-info`}> {v.pro_experience[0].pro_times} | {v.pro_experience[0].proName} | {v.pro_experience[0].pro_position}</p>
                }

                //单个简历信息
                cvInfo.push(
                    <div key={v.id}>
                        <p className={`${className}-list-block-info`}> {v.date} | {name} | {v.personal_info.age} | {v.personal_info.location} | {v.personal_info.education} | {v.personal_info.expected_position} </p>
                        {details}
                    </div>
                )

                //简历列表
               crawlingcv.push(
                    <div key={'list'+k+Math.random()} className={`${className}-list-block`} onClick={()=>{this.handleClick(v.id)}}>
                        {cvInfo}
                    </div>
                )

                return crawlingcv
            })

        return current
    }

    render() {
        let className = `Recruit-Dd-BackStage-CrawlingCv`;
        let {response} = this.state
        // console.log(response)
        return(
            <div className={className}>
                <div style={{marginTop: 16}}>
                    关键词：<Input style={{width:'60%'}}
                        placeholder={'请输入你想查找的简历关键词'}
                        onChange={ e =>{
                            this.setState({condition: e.target.value})
                          }
                        }
                    />
                    <Button style={{float:'right'}}
                            onClick={
                                () =>{
                                    this.select();
                                }
                            }>
                        搜索
                    </Button>
                </div>
                <div>
                    {this.formatCrawlingcv(response,className)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.recruitCrawlingCv,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    addJobType, deleteJobType,getCv,getCvByCondition
}

const Cv = Form.create()(CrawlingCv);

export default store => ({
    path: 'backstage/cv',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'recruitCrawlingCv', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(CrawlingCv));
        })
    }
})