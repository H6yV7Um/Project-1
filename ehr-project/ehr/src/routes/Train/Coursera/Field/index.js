import React, {Component} from 'react';
import {connect} from 'react-redux';
import { List, InputItem, Toast, DatePicker, Picker, Button } from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import { createForm } from 'rc-form';
import {injectReducer} from 'store/reducers';
import $ from 'jquery';
import {add, searchName, getPersonalDepartment, zeURL, getCourseraJson} from './action';
import './style.scss';
import browserAttr from 'utils/browserAttr'
import {browserHistory} from 'react-router'
// pc
import { Form, Input, Button as AntButton, Select as AntSelect, DatePicker as AntDatePicker, Spin as AntSpin, Modal as AntModal } from 'antd';
const FormItem = Form.Item;
// 判断是否是移动端
let ismobile = browserAttr.versions.mobile
let clientHeight = document.documentElement.clientHeight
let className = `Coursera-Field`;
class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certificate:'',
            // 判断是否是coursera证书链接
            isCourseraUrl: true,
            // pc
            certificatevalidateStatus: '',
            certificatehelp: ''
        }
        this.departments = null
        this.timer = '';
    }
    static propTypes =
    {
        // 添加cousera信息
        add                 : React.PropTypes.func,
        // 搜索用户名
        searchName          : React.PropTypes.func,
        // 获取所有部门
        getPersonalDepartment       : React.PropTypes.func,
        // 部门数据
        departments         : React.PropTypes.array,
        // 验证URL是否已经存在
        zeURL               : React.PropTypes.func,
        // 获取coursera证书json字符串
        getCourseraJson     : React.PropTypes.func,
    }

    //验证url格式是否正确
    /**
     * 获取coursera证书数据
     * @param {string} key 证书链接的key
     * @param {string} verity 默认地址
     */
    async getCourseraData(key,verity)
    {
        let url = 'https://www.coursera.org/api/memberships.v1?' +
            'fields=courseId,enrolledTimestamp,grade,lastAccessedTimestamp,role,signatureTrackProfile,v1SessionId,vcMembershipId,' +
            'vcMemberships.v1(certificateCode,certificateCodeWithGrade,grade,grantedAt),' +
            'courses.v1(categories,certificatePartnerLogo,certificates,description,durationString,instructorIds,name,partnerIds,' +
            'partnerLogo,photoUrl,startDate,v1Details,workload),' +
            'partners.v1(classLogo,homeLink,logo,name,shortName),' +
            'instructors.v1(firstName,fullName,lastName,middleName,prefixName,profileId,shortName,suffixName),' +
            'v1Details.v1(aboutTheCourse,courseSyllabus,name,sessionIds,shortName),' +
            'v1Sessions.v1(active,certificatesReleased,courseId,dbEndDate,durationString,eligibleForCertificate,' +
            'gradingPolicyDistinction,gradingPolicyNormal,hasSigTrack,homeLink,instructorIds,startDay,startMonth,startYear,status,v1VcDetailId),' +
            'signatureTrackProfiles.v1(firstName,lastName,middleName)' +
            '&includes=courseId,signatureTrackProfile,vcMembershipId,' +
            'courses.v1(categories,instructorIds,partnerIds,v1Details),' +
            `v1Details.v1(sessionIds)&q=byCode&code=${key}&showHidden=true`
        Toast.info(<ToastContent type="loading" content={'正在匹配请稍后'} />, 3, null, false);
        await this.props.getCourseraJson({url: url,userInfo: this.props.ddreducer.userInfo},async (data)=>{
            // 请求成功后删除提示
            Toast.hide()
            if(data.isEixst)
            {
                if(ismobile)
                {
                    Toast.info(<ToastContent type="fail" content={'证书链接已经存在'} />, 3, null, false);
                }
                this.setState({
                    ...this.state,
                    isCourseraUrl: false,
                    certificatevalidateStatus : 'error',
                    certificatehelp : '证书链接已经存在'
                })
                return
            }
            if(data.notCoursreaUrl)
            {
                if(ismobile)
                {
                    Toast.info(<ToastContent type="fail" content={'你的证书链接可能已失效请找回你的账号'} />, 3, null, false);
                }
                this.setState({
                    ...this.state,
                    isCourseraUrl: false,
                    certificatevalidateStatus : 'error',
                    certificatehelp : '你的证书链接可能已失效请找回你的账号'
                })
                return
            }
            if(!data.isCoursrea)
            {
                if(ismobile)
                {
                    Toast.info(<ToastContent type="fail" content={'请输入正确的证书链接'} />, 3, null, false);
                }
                this.setState({
                    ...this.state,
                    isCourseraUrl: false,
                    certificatevalidateStatus : 'error',
                    certificatehelp : '请填入正确的证书链接'
                })
                return
            }
            browserHistory.push('/train')
            Toast.info(<ToastContent type="success" content={'提交成功'} />, 2, null, false);
        },()=>{})
    }
    // 获取coursera证书链接，证书名称，获取证书时间，学校名称
    getCourseraUrl(value)
    {
        let records = `https://www.coursera.org/account/accomplishments/records/`
        let certificate = `https://www.coursera.org/account/accomplishments/certificate/`
        let verity = `https://www.coursera.org/account/accomplishments/verify/`
        let recordsKeys = value.split(records)
        let certificateKeys = value.split(certificate)
        let verityKeys = value.split(verity)
        // 判断当前页面是否是coursera record页面这个是要显示的页面
        if(recordsKeys.length == 2)
        {
            return {key: recordsKeys[1],verity: verity}
        }
        // 判断当前页面是否是coursera证书pdf页面
        else if(certificateKeys.length == 2)
        {
            return {key: certificateKeys[1],verity: verity}
        }
        // 判断当前页面是否是verify页面
        else if(verityKeys.length == 2)
        {
            return {key: verityKeys[1],verity: verity}
        }
        // 都没有匹配对说明不是正确的cousera证书链接
        else
        {
            return {key:'',vertity: ''}
        }
    }
    render() {
        let {
            certificate,
            certificatevalidateStatus,
            certificatehelp
        } = this.state
        if(ismobile)
        {
            return (
                <div ref={(dom)=>this.dom = dom} className={`${className}`}>
                    <List>
                        <InputItem
                            type="text"
                            placeholder="粘贴链接可自动匹配"
                            onChange={async (certificate) => {
                                clearTimeout(this.timer)
                                let val = $.trim(certificate)
                                await this.setState({ certificate: val})
                                this.timer  = setTimeout(async ()=>{
                                    let data = this.getCourseraUrl(val)
                                    if(data.key)
                                    {
                                        this.getCourseraData(data.key,data.verity)
                                    }
                                    else
                                    {
                                        this.setState({isCourseraUrl: false})
                                    }

                                },500)
                            }}
                            value={certificate}
                            maxLength={200}
                        >
                            证书链接
                        </InputItem>
                    </List>
                </div>
            );
        }
        else {
            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                },
            };
            return (
                <div className={`${className}-pc`}>
                    <div className = {`${className}-back`}>
                        <a
                            onClick={()=>{
                                browserHistory.push('/train')
                            }}
                        >
                            返回
                        </a>
                    </div>
                    <div className={`${className}-form`}>
                        <Form >
                            <FormItem
                                {...formItemLayout}
                                label="证书链接"
                                validateStatus= {certificatevalidateStatus}
                                help={certificatehelp}
                                required
                            >
                                <Input
                                    placeholder="粘贴链接可自动匹配"
                                    value={certificate}
                                    onChange={async (e) => {
                                        clearTimeout(this.timer)
                                        let val = $.trim(e.target.value)
                                        await this.setState({ certificate: val})
                                        this.timer  = setTimeout(async ()=>{
                                            // 判断证书链接是否是coursera证书链接 是cousera证书链接再发送请求
                                            let data = this.getCourseraUrl(val)
                                            console.log(data)
                                            if(data.key)
                                            {
                                                this.getCourseraData(data.key,data.verity)
                                            }
                                            else
                                            {
                                                await this.setState({
                                                    ...this.state,
                                                    certificatevalidateStatus : 'error',
                                                    certificatehelp : '请填入正确的证书链接'
                                                })
                                            }
                                        },500)
                                    }}
                                />
                            </FormItem>
                        </Form>
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = state => ({
    reducer : state.courseraField,
    ddreducer : state.ddLayout

})
const mapDispatchToProps = {
    add,
    searchName,
    getPersonalDepartment,
    zeURL,
    getCourseraJson
}
if(ismobile)
{
    Field = createForm()(Field);
}
else
{
    Field = Form.create()(Field);
}
export default store => ({
    path : 'coursera/field',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'courseraField', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Field))
        })
    }
})