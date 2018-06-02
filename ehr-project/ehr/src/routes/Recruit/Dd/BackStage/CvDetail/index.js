import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
import { Table, Button, Modal, Input, Form, Row, Col, message } from 'antd';
import {injectReducer} from 'store/reducers';
import {hostName} from 'config/wechat';
import dd from 'utils/dingding';
import $ from 'jquery';

import {getCvById} from './action';

import './style.scss';

const FormItem = Form.Item;
const confirm = Modal.confirm;


//简历详情
class CvDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date :null

        };
    }
    componentDidMount() {
        // this.props.setLayout({
        //     header : false
        // })
    }

    componentWillMount() {
        // 获取简历详细信息
        this.props.getCvById(this.props.params.id);
    }

    componentWillUnmount() {
        // this.props.setDefaultLayout();
    }

    //创建个人信息
    creatInfoDL = (mapdata) =>{
        let dlInfo = [];
        mapdata.map((v)=>{
            if(v.value){
                dlInfo.push(
                    <dd key={new Date().getTime() + Math.random()}>
                        <label style={{fontSize : 13}} >{v.key} </label><span className={'Recruit-Dd-BackStage-CvDetail-dd-content'}>: {v.value}</span>
                    </dd>
                )
            }
        })
        return dlInfo
    }

    handleClick = () =>{
        console.log('click');
        browserHistory.push('/recruit/dd/backstage/cv');
    }

    gotoWeb =(url) =>{
        dd.biz.util.openLink({url});
    }
    render() {
        let response = {};
        let className = `Recruit-Dd-BackStage-CvDetail`;
        let date = null;
        let perInfoDT = [],
            perInfo = [],
            expectDT = [],
            expect = [],
            work_experienceDT = [],
            work = [],
            pro_experienceDT = [],
            pro = [],
            otherDT = [],
            other = [];
        let workResult = [],
            proResult = [],
            eduResult = [],
            otherResult = [];

        let cvId = null,
            url = null;
        //初始化数据
        if(this.props.reducer.cvInfo){
            response = this.props.reducer.cvInfo[0];
            cvId = response.id.replace(/^liepin|^51job|^zhaopin/,'');
            url = response.url;
            date = response.date;
            perInfoDT = [
                {
                    key:'姓名',
                    value:response.personal_info.name
                },
                {
                    key:'性别',
                    value:response.personal_info.sex
                },
                {
                    key:'手机号码',
                    value:response.personal_info.cellphone ? response.personal_info.cellphone : '******'
                },
                {
                    key:'年龄',
                    value:response.personal_info.age
                },
                {
                    key:'电子邮件',
                    value:response.personal_info.mail ? response.personal_info.mail : '******'
                },
                {
                    key:'现居地',
                    value:response.personal_info.location ? response.personal_info.location : '未填写'
                },
                {
                    key:'工作经验',
                    value:response.personal_info.working ? response.personal_info.working : '未填写'
                },
                {
                    key:'教育程度',
                    value:response.personal_info.education ? response.personal_info.education : '未填写'
                }
            ]
            expectDT =[
                {
                    key: '期望职位',
                    value:response.personal_info.expected_position ? response.personal_info.expected_position : '未填写'
                },
                {
                    key:'期望地点',
                    value:response.personal_info.expected_location ? response.personal_info.expected_location : '未填写'
                },
                {
                    key:'期望薪酬',
                    value:response.personal_info.expected_salary ? response.personal_info.expected_salary : '未填写'
                }
            ]
            //个人基础信息
            perInfo = this.creatInfoDL(perInfoDT);
            //发展方向
            expect = this.creatInfoDL(expectDT);



            //工作经验
            response.work_experience.map((v,k)=>{
                work_experienceDT = [
                    {
                        key: '公司所在地',
                        value: v.work_location
                    },
                    {
                        key:'下属人数',
                        value: v.work_subordinates
                    },
                    {
                        key:'业绩',
                        value: v.work_responsibilities
                    }
                ]
                work = this.creatInfoDL(work_experienceDT);
                if(v) {
                    workResult.push(
                        <div key={'work' + k} style={{overflow : 'hidden', marginTop : 10}}>
                            <div className={`${className}-work-time`}>{v.work_times}</div>
                            <div className={`${className}-work-content`}>
                                <div className={`${className}-work-content-title`}>{v.work_company} | {v.work_post}</div>
                                <div>
                                    <dl>
                                        {work}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    )
                }else{
                    workResult = undefined
                }
            })

            //项目经验
            response.pro_experience.map((v,k)=>{
                console.log(v);
                pro_experienceDT = [
                    {
                        key: '所在组织',
                        value: v.pro_organization
                    },
                    {
                        key:'项目简介',
                        value: v.project_brief
                    },
                    {
                        key:'项目业绩',
                        value: v.pro_responsibility
                    }
                ]
                pro = this.creatInfoDL(pro_experienceDT);
                if(v){
                    proResult.push(
                        <div key = {'pro'+k} style={{overflow:'hidden',marginTop:10}}>
                            <div  className={`${className}-pro-time`}>{v.pro_times}</div>
                            <div className={`${className}-pro-content`}>
                                <div className={`${className}-pro-content-title`} >{v.proName} | {v.pro_position}</div>
                                <div>
                                    <dl>
                                        {pro}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    )
                }else{
                    proResult = undefined;
                }
            })

            //教育经历
            response.education.map((v,k)=>{
                if(v){
                    eduResult.push(
                        <tr key = {'edu'+k}>
                            <td>{v.date} {v.university}</td>
                            <td>{v.major}</td>
                            <td>{v.education_background}</td>
                        </tr>
                    )
                }else {
                    eduResult = undefined;
                }
            })

            //其他信息
            otherDT = [
                {
                    key:'语言能力',
                    value:response.personal_info.language
                },
                {
                    key:'自我评价',
                    value: response.personal_info.self_evaluation
                },
                {
                    key:'其他信息',
                    value:response.personal_info.addition
                }
            ]
            other = this.creatInfoDL(otherDT);
        }
        return(
            <div className={className}>
                <div className={`${className}-sys`}>
                    <Button onClick={() =>{this.handleClick()}}>返回列表</Button>&nbsp;
                    <span id="cvId" style={{marginLeft:100}}>简历编号:{cvId}</span>&nbsp;
                    <a onClick={()=>{this.gotoWeb(url)}} target="_blank">跳转到原网站</a><span style={{float:'right'}}>更新于：{date}</span>
                </div>
                <div className={`${className}-personal_info`}>
                    <div className={`${className}-title`}>个人信息</div>
                    <div className={`${className}-content`}>
                        <dl>
                            {perInfo}
                        </dl>
                        <hr style={{border:' 1px solid #e6e6e6 ',margin:'5px'}}/>
                        <dl>
                            {expect}
                        </dl>
                    </div>
                </div>
                <div className={`${className}-work_experience`}>
                    <div className={`${className}-title`}>工作经验</div>
                    <div className={`${className}-content`}>
                        {workResult.length ? workResult :
                            <div style={{textAlign:'center',margin:10}}>未填写</div>
                        }
                    </div>
                </div>
                <div className={`${className}-pro_experience`}>
                    <div className={`${className}-title`}>项目经验</div>
                    <div className={`${className}-content`}>
                        {proResult.length ? proResult :
                            <div style={{textAlign:'center',margin:10}}>未填写</div>
                        }
                    </div>
                </div>
                <div className={`${className}-education`}>
                    <div className={`${className}-title`}>教育经历</div>
                    <div className={`${className}-content`}>
                        <table>
                            <tbody>
                            {eduResult.length ? eduResult :
                                <div style={{textAlign:'center',margin:10}}>未填写</div>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`${className}-other`}>
                    <div className={`${className}-title`}>其他信息</div>
                    <div className={`${className}-content`}>
                        <dl>
                            {other}
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.recruitCvInfo,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    getCvById
}

const cvDetail = Form.create()(CvDetail);

export default store => ({
    path: 'backstage/cv/cvdetail/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'recruitCvInfo', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(cvDetail));
        })
    }
})