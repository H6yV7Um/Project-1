import React, {Component} from 'react';
import {connect} from 'react-redux';
import { List, InputItem, Toast, DatePicker, Picker, Button } from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import { createForm } from 'rc-form';
import {injectReducer} from 'store/reducers';
import $ from 'jquery';
import {add, searchName, getPersonalDepartment, zeURL, getCourseraJson} from './action';
import './style.scss';
import moment from 'moment'
import browserAttr from 'utils/browserAttr'
import {browserHistory} from 'react-router'
// pc
import { Form, Input, Button as AntButton, Select as AntSelect, DatePicker as AntDatePicker, Spin as AntSpin, Modal as AntModal } from 'antd';
const FormItem = Form.Item;
const AntOption = AntSelect.Option;
// 判断是否是移动端
let ismobile = browserAttr.versions.mobile
let clientHeight = document.documentElement.clientHeight
let className = `Coursera-Field`;
class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.ddreducer.userInfo.name,
            date:'',
            department:'',
            school:'',
            courseraname:'',
            certificate:'',
            // pc
            // 判断是否是coursera证书链接
            isCourseraUrl: true,
            // pc
            namevalidateStatus: '',
            namehelp: '',
            departmentvalidateStatus: '',
            departmenthelp: '',
            schoolvalidateStatus: '',
            schoolhelp: '',
            courseranamevalidateStatus: '',
            courseranamehelp: '',
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
    componentWillMount() {
        this.props.getPersonalDepartment({departmentIds: this.props.ddreducer.userInfo.department_ids},async (data)=>{
            console.log(data[0].department_name)
            await this.setState({department:[`${data[0].department_name}`]})
        },()=>{}) //获取所有的部门
    }
    formatDepartments(departments = []) {
        let current = []
        for(let department of departments)
        {
            if(ismobile)
            {
                current.push({
                    key: department._id,
                    label: department.department_name,
                    value: department.department_name,
                })
            }
            else
            {
                current.push(
                    <AntOption
                        key = {department._id}
                        value={department.department_name}
                    >
                        {department.department_name}
                    </AntOption>
                )
            }
        }
        return current
    }
    async onClick()
    {
        let { name,userID,date,department,school,courseraname,certificate,isCourseraUrl} = this.state
        console.log(certificate)
        if(!certificate)
        {
            Toast.info(<ToastContent type="fail" content={'请填写证书链接'} />, 3, null, false);
            return
        }
        else
        {
            // 判断网址是否正确
            let data = this.getCourseraUrl(certificate)
            if(data.key && this.props.reducer.isCourseraUrl)
            {
                let res = await this.props.zeURL({url:certificate})
                if(res.data)
                {
                    Toast.info(<ToastContent type="fail" content={'证书已存在'} />, 3, null, false);
                    return
                }
            }
            else
            {
                Toast.info(<ToastContent type="fail" content={'请输入正确的证书链接'} />, 3, null, false);
                return
            }
        }
        if(!school)
        {
            Toast.info(<ToastContent type="fail" content={'请填写学校名称'} />, 3, null, false);
            return
        }
        if(!courseraname)
        {
            Toast.info(<ToastContent type="fail" content={'请填写课程名称'} />, 3, null, false);
            return
        }
        if(!department)
        {
            Toast.info(<ToastContent type="fail" content={'请选择部门'} />, 3, null, false);
            return
        }
        let data = {}
        data.name=name
        data.userID = userID
        data.creatorId = this.props.ddreducer.userInfo.user_id
        data.creatorName = this.props.ddreducer.userInfo.name
        data.date = date
        data.department = department
        data.school = school
        data.courseraname = courseraname
        data.certificate = certificate
        this.props.add(data,()=>{
            Toast.info(<ToastContent type="success" content={'提交成功'} />, 3, null, false);
            this.props.router.push('/');
        },()=>{
            Toast.info(<ToastContent type="fail" content={'提交失败'} />, 3, null, false);
        })
    }
    //验证url格式是否正确
    isURL(str) {
        return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
    }
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
        await this.props.getCourseraJson({url: url},async (data)=>{
            // 请求成功后删除提示
            Toast.hide()
            if(data.errorCode)
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

            // let courseraJson = data
            // let newData =  {
            //     // certificat vertify页面的key，两个页面的key相同
            //     certificateCode: courseraJson.linked['vcMemberships.v1'][0].certificateCode,
            //     // 获得证书的时间
            //     grantedAt: courseraJson.linked['vcMemberships.v1'][0].grantedAt,
            //     // 课程名称
            //     courseraname: courseraJson.linked['courses.v1'][0].name,
            //     // 学校名称
            //     school: courseraJson.linked['partners.v1'][0].name,
            //     // 用户名
            //     userName: courseraJson.linked['signatureTrackProfiles.v1'][0].lastName + courseraJson.linked['signatureTrackProfiles.v1'][0].firstName
            // }
            // let newDate =  new Date(newData.grantedAt)
            // let f = {
            //     date: `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`,
            //     school: newData.school,
            //     courseraname: newData.courseraname,
            //     certificate: verity + newData.certificateCode,
            //     isCourseraUrl: true
            // }
            // await this.setState({...this.state,...f})

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
    // pc验证函数
    // async pcDataZh(data){
    //     let keys = Object.keys(data)
    //     let newdata = {...data}
    //     if(keys.indexOf('certificate') !=-1)
    //     {
    //         if (!newdata.certificate) {
    //             await this.setState({
    //                 certificatevalidateStatus : 'error',
    //                 certificatehelp : '请填写证书链接',
    //             })
    //             return false
    //         }
    //         else {
    //             // 判断证书链接是否正确
    //             // let result = this.isURL(newdata.certificate)//判断网址是否拼写正确
    //             let data = this.getCourseraUrl(newdata.certificate)
    //             if (data.key && this.props.reducer.isCourseraUrl)//拼写正确
    //             {
    //                 //判断URL是否已经存在
    //                 let value = $.trim(newdata.certificate)
    //                 let res = await this.props.zeURL({url : value})
    //                 // 如果证书已经存在
    //                 if (res.data) {
    //                     await this.setState({
    //                         certificatevalidateStatus : 'error',
    //                         certificatehelp : '证书链接已存在',
    //                     })
    //                     return false
    //                 }
    //                 else {
    //                     await this.setState({
    //                         certificatevalidateStatus : '',
    //                         certificatehelp : '',
    //                     })
    //                 }
    //             }
    //             else {
    //                 await this.setState({
    //                     certificatevalidateStatus : 'error',
    //                     certificatehelp : '请填入正确的证书链接',
    //                 })
    //                 return false
    //             }
    //         }
    //     }
    // if(keys.indexOf('school') !=-1)
    // {
    //     if (!newdata.school) {
    //         await this.setState({
    //             schoolvalidateStatus : 'error',
    //             schoolhelp : '请填写学校名称',
    //         })
    //         return false
    //     }
    //     else {
    //         await this.setState({
    //             schoolvalidateStatus : '',
    //             schoolhelp : '',
    //         })
    //     }
    // }
    // if(keys.indexOf('courseraname') !=-1)
    // {
    //     if (!newdata.courseraname) {
    //         await this.setState({
    //             courseranamevalidateStatus : 'error',
    //             courseranamehelp : '请填写课程名称',
    //         })
    //         return false
    //     }
    //     else {
    //         await this.setState({
    //             courseranamevalidateStatus : '',
    //             courseranamehelp : '',
    //         })
    //     }
    // }
    // if(keys.indexOf('department') !=-1)
    // {
    //     if(!newdata.department)
    //     {
    //         await this.setState({
    //             departmentvalidateStatus: 'error',
    //             departmenthelp: '请选择部门',
    //         })
    //         return false
    //     }
    //     else
    //     {
    //         await this.setState({
    //             departmentvalidateStatus: '',
    //             departmenthelp: '',
    //         })
    //     }
    // }
    // return true
    // }
    // pc
    // handleSubmit = async (e) => {
    //     let {
    //         name,
    //         date,
    //         department,
    //         school,
    //         courseraname,
    //         certificate,
    //     } = this.state
    //     let ispass = await this.pcDataZh({department: department,school: school,courseraname: courseraname,certificate:certificate })
    //     if(ispass)
    //     {
    //         let data = {}
    //         data.name=name
    //         data.userID =this.props.ddreducer.userInfo.user_id
    //         data.creatorId = this.props.ddreducer.userInfo.user_id
    //         data.creatorName = this.props.ddreducer.userInfo.name
    //         data.date = date
    //         data.department = department
    //         data.school = school
    //         data.courseraname = courseraname
    //         data.certificate = certificate
    //         this.props.add(data,()=>{
    //             Toast.info(<ToastContent type="success" content={'提交成功'} />, 2, null, false);
    //             this.props.router.push('/');
    //         },()=>{
    //             Toast.info(<ToastContent type="fail" content={'提交失败'} />, 2, null, false);
    //         })
    //     }
    // }
    render() {
        let district = this.formatDepartments(this.props.reducer.departments)
        let {
            name,
            date,
            department,
            school,
            courseraname,
            certificate,
            namevalidateStatus,
            namehelp,
            departmentvalidateStatus,
            departmenthelp,
            schoolvalidateStatus,
            schoolhelp,
            courseranamevalidateStatus,
            courseranamehelp,
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
                                    await this.pcDataZh({ certificate: val})
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
                        <InputItem
                            type="text"
                            placeholder="输入学校名称"
                            onChange={school => this.setState({ school: school })}
                            value={school}
                            maxLength={50}
                        >
                            学校名称
                        </InputItem>
                        <DatePicker
                            mode="date"
                            title="选择时间"
                            extra="请选择"
                            value={( date ? moment(date, 'YYYY-MM-DD') :moment(`${(new Date).getFullYear()}-${(new Date).getMonth()+1}-${(new Date).getDate()}`, 'YYYY-MM-DD'))}
                            onChange={(date) => {
                                this.setState({ date: date})
                            }}
                        >
                            <List.Item arrow="horizontal">获取证书时间</List.Item>
                        </DatePicker>
                        <InputItem
                            type="text"
                            placeholder="请填写课程名称"
                            onChange={courseraname => this.setState({ courseraname: $.trim(courseraname)})}
                            value={courseraname}
                            maxLength={100}
                        >
                            课程名称
                        </InputItem>
                        <InputItem
                            type="text"
                            placeholder="输入你的姓名"
                            onChange={name=>this.setState({ name: $.trim(name) })}
                            value={(name)}
                            disabled={true}
                        >
                            姓名
                        </InputItem>
                        <Picker
                            data={district}
                            cols={1}
                            className="forss"
                            value={department}
                            onChange={department => {
                                console.log(department)
                                this.setState({ department: department})}}
                        >
                            <List.Item arrow="horizontal">部门</List.Item>
                        </Picker>
                    </List>
                    <div className="btn-submit">
                        <div className={`${className}-footer`} style={{top:clientHeight-45}} onClick={()=>{
                            this.onClick()
                        }}>
                            提交
                        </div>
                    </div>
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
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 14,
                        offset: 6,
                    },
                },
            };
            return (
                <div className={`${className}-pc`}>
                    <div className = {`${className}-back`}>
                        <a
                            onClick={()=>{
                                browserHistory.push('/')
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
                                            // 验证是否是cousera证书链接是cousera证书链接再发送请求
                                            await this.pcDataZh({ certificate: val})
                                            let data = this.getCourseraUrl(val)
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
                            {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="学校名称"*/}
                            {/*validateStatus= {schoolvalidateStatus}*/}
                            {/*help={schoolhelp}*/}
                            {/*required*/}
                            {/*>*/}
                            {/*<Input*/}
                            {/*placeholder="输入学校名称"*/}
                            {/*value={school}*/}
                            {/*onChange={school => {*/}
                            {/*this.setState({ school: $.trim(school.target.value) })*/}
                            {/*this.pcDataZh({ school: $.trim(school.target.value)})*/}
                            {/*}}*/}
                            {/*/>*/}
                            {/*</FormItem>*/}
                            {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="获取证书时间"*/}
                            {/*required*/}
                            {/*>*/}
                            {/*<AntDatePicker*/}
                            {/*onChange={(date) => {*/}
                            {/*this.setState({ date: date })*/}
                            {/*}}*/}
                            {/*value={( date ? moment(date, 'YYYY-MM-DD') :moment(`${(new Date).getFullYear()}-${(new Date).getMonth()+1}-${(new Date).getDate()}`, 'YYYY-MM-DD'))}*/}
                            {/*format='YYYY-MM-DD'*/}
                            {/*/>*/}
                            {/*</FormItem>*/}
                            {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="课程名称"*/}
                            {/*validateStatus= {courseranamevalidateStatus}*/}
                            {/*help={courseranamehelp}*/}
                            {/*required*/}
                            {/*>*/}
                            {/*<Input*/}
                            {/*value={courseraname}*/}
                            {/*placeholder="请填写课程名称"*/}
                            {/*onChange={*/}
                            {/*courseraname => {*/}
                            {/*this.setState({ courseraname: $.trim(courseraname.target.value)})*/}
                            {/*this.pcDataZh({ courseraname: $.trim(courseraname.target.value)})*/}
                            {/*}*/}
                            {/*}*/}
                            {/*/>*/}
                            {/*</FormItem>*/}
                            {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="名字"*/}
                            {/*validateStatus= {namevalidateStatus}*/}
                            {/*help={namehelp}*/}
                            {/*required*/}
                            {/*>*/}
                            {/*<Input*/}
                            {/*disabled={true}*/}
                            {/*placeholder="输入你的姓名"*/}
                            {/*value={(name)}*/}
                            {/*onChange={name=>{*/}
                            {/*name = name.target.value*/}
                            {/*this.setState({ name: $.trim(name) })*/}
                            {/*}}*/}
                            {/*/>*/}
                            {/*</FormItem>*/}
                            {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="部门"*/}
                            {/*validateStatus= {departmentvalidateStatus}*/}
                            {/*help={departmenthelp}*/}
                            {/*required*/}
                            {/*>*/}
                            {/*<AntSelect*/}
                            {/*defaultValue={(this.props.reducer.departments.length ? this.props.reducer.departments[0].department_name : '')}*/}
                            {/*showSearch*/}
                            {/*style={{ width: 200 }}*/}
                            {/*placeholder="请选择部门"*/}
                            {/*optionFilterProp="children"*/}
                            {/*value={department}*/}
                            {/*onChange={department => {*/}
                            {/*console.log(department)*/}
                            {/*this.setState({ department:department})*/}
                            {/*this.pcDataZh({ department: $.trim(department)})*/}
                            {/*}}*/}
                            {/*>*/}
                            {/*{district}*/}
                            {/*</AntSelect>*/}
                            {/*</FormItem>*/}
                            {/*<FormItem {...tailFormItemLayout}>*/}
                            {/*<AntButton*/}
                            {/*type="primary"*/}
                            {/*htmlType="submit"*/}
                            {/*onClick={this.handleSubmit}*/}
                            {/*>*/}
                            {/*提交*/}
                            {/*</AntButton>*/}
                            {/*</FormItem>*/}
                        </Form>
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = state => ({
    reducer : state.courseraField,
    ddreducer : state.layoutDd

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
    path : 'field',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'courseraField', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Field))
        })
    }
})