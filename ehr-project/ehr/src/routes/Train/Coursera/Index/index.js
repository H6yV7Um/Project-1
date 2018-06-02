import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast,List,Icon,Button as AntButton, Modal as AntMobileModal} from 'antd-mobile';
import { Table,Input,Select as antSelect} from 'antd';
import {injectReducer} from 'store/reducers';
import {browserHistory, Link} from 'react-router'
import $ from 'jquery';
import {getCourseraList,searchList,getDepartment,filter,clear,getSchool,resetDbCoursera,getCourseraJson} from './action';
import './style.scss';
import getSrc from 'utils/imgSrc';
import Avatar from 'components/Avatar';
import ScrollLoad from 'components/ScrollLoad';
import TagSelect from 'components/TagSelect';
import ModularContainer from 'components/ModularContainer';
import Modal from 'components/Modal';
import Search from 'appComponents/Train/Coursera/Search';
import Iframe from 'appComponents/Train/Coursera/Iframe';
import Preview from 'appComponents/Train/Coursera/Preview';
import Select from 'components/Select';
import browserAttr from 'utils/browserAttr';
import ToastContent from 'components/ToastContent';
const Item = List.Item;
const AntdSearch = Input.Search;
const Option = antSelect.Option;
const AntMobilePrompt = AntMobileModal.prompt;
let clientHeight = document.documentElement.clientHeight;
let className = `Coursera-Table`;
// 判断设备类型
let ismobile = browserAttr.versions.mobile;
const SERVER = process.env.NODE_ENV == 'development' ? 'http://172.20.70.69:3003' : 'http://ehr-api.tap4fun.com';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            itemList : [],
            isShowOperation     :   false,
            show: false,
            // 筛选条件
            condition : {
                departmentOrder:[],
                // 排序方式[desc=>降序, asc=>升序]
                dateOrder : 'desc',
                schoolOrder:[]
            },
            // 搜索条件
            searchCondition: '',
            certificate:'',
            // pc
            certificatevalidateStatus: '',
            certificatehelp: '',
            // 证书链接
            certificateurl: ''
        }
        this.courseraList = null
        this.clientHeight = ''
    }
    static propTypes =
    {
        // 获取courseraList证书列表
        getCourseraList          : React.PropTypes.func,
        // 搜索匹配的列表
        searchList               : React.PropTypes.func,
        // 获取部门数据
        getDepartment            : React.PropTypes.func,
        // 获取学校名称
        getSchool                : React.PropTypes.func,
        // 重置coursera集合
        resetDbCoursera          : React.PropTypes.func,
        getCourseraJson          : React.PropTypes.func,

    }
    componentWillMount() {
        this.props.getCourseraList({condition:this.state.condition,page:1},()=>true,()=>false)
        this.props.getDepartment()
        this.props.getSchool()
        this.clientHeight = document.documentElement.clientHeight
        document.documentElement.scrollTop = 0
    }
    componentWillUnmount() {
        this.props.clear()
    }
    // 数组排序算法
    insertSort(array){
        let start=1;
        for(let i=start; i<array.length; start++,i++){
            for(let j=0; j<start; j++){
                if(array[i].count<=array[j].count){
                    array.splice(j,0,array[i]);
                    array.splice(i+1,1);
                    break;
                }
            }
        }
        return array
    }
    // 统计数组中每个人获取了多少证书
    formatSchoolData(itemList)
    {
        let ergodic = [],dataArr = [],newData = []
        for (let i = 0; i < itemList.length;i++) {
            let count = 0;
            for (let j = i; j < itemList.length; j++) {
                if (itemList[i].school === itemList[j].school) {
                    let is = false
                    for(let val of ergodic)
                    {
                        if(val == itemList[i].school)
                        {
                            is = true
                        }
                    }
                    if(!is)
                    {
                        count++;
                    }
                }
            }
            if(count)
            {
                ergodic.push(itemList[i].school)
                dataArr.push({school:itemList[i].school,count: count})
                dataArr = this.insertSort(dataArr)
            }
        }
        for(let val of dataArr)
        {   
            newData.push(
                <Option key={val.school}>{val.school}</Option>
            )
        }
        return newData
    }
    // 格式mobile list的数据
    formatItemList(conrseraList = [])
    {
        let current = []
        let justyfy = getSrc('Coursera/justyfy.png')
        for(let val of conrseraList)
        {
        	let newDate = new Date(); //获取一个时间对象
		 	newDate.setTime(val.date * 1000);
            let user = val.user,department = ''
            for(let d of val.department)
            {
                department =  department + d.department_name + ' '
            }
            current.push(
                <div 
                    className="userProfileContainer"
                    key = {val._id}
                >
                    <Item
                        multipleLine
                    >
                        <div 
                            className="userProfile"
                        >
                            <div className="userProfileTop">
                                <div className="avatar">
                                    <Avatar url={user.avatar}/>
                                </div>
                                <div className='userInfo'>
                                    <div className="userInfoTop">
                                        <p>{`${user.name}`}</p>
                                        <p>{`${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`}</p>
                                    </div>
                                    <div className="userInfoBottom">
                                        <p>{`${department}`}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="userProfileBottom">
                                <div className='icon'>
                                    {(
                                        !val.certificate_path
                                            ?
                                            <div className='iconContainer'>
                                                <img
                                                    src={`${justyfy}`}
                                                />
                                                <p>证书</p>
                                            </div>
                                            :
                                            <div className='iconContainer'>
                                                <Preview
                                                    imageWidth='50px'
                                                    modalImageWidth='95%'
                                                    modalWidth = {450}
                                                    previewImageUrl = {`${SERVER}${val.certificate_path}`}
                                                />
                                            </div>
                                    )}
                                </div>
                                <div className="certificate">
                                    <div className="certificateContainer">
                                        <p>{`${val.school}`}</p>
                                        <a className="url" href={`${val.certificate}`}>
                                            {val.courseraname}
                                        </a>
                                    </div>
                                </div>
                                <div style={{clear:'both'}}></div>
                            </div>
                        </div>
                    </Item>
                </div>
            )
        }
        return current
    }
    // 格式PC table的数据
    formatData(conrseraList = [])
    {
        let data = []
        let i = 0 
        for(let val of conrseraList)
        {
			let newDate = new Date(); //获取一个时间对象
		 	newDate.setTime(val.date * 1000);

            let department = ''
            for(let d of val.department)
            {
                department =  department + ' ' + d.department_name
            }
            data.push({
                key: i,
                name: val.user.name,
                department: department,
                date: `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`,
                school: val.school,
                courseraname: val.courseraname,
                certificate: val.certificate,
                coursera_key: val.coursera_key,
                certificate_path: val.certificate_path
            })
            i++
        }
        return data
    }
    // 筛选
    onFilter(e)
    {
        let {show} = this.state
        if(show)
        {   
            this.setState({show:false,searchCondition: ''})//清空搜索条件
            this.props.filter({condition: this.state.condition,filterPage:1,firstTime: true},()=>true,()=>false)
            if(browserAttr.versions.ios)
            {
                this.onBlur()
            }
        }
        else
        {
            this.setState({show:true})
            if(browserAttr.versions.ios)
            {
                this.onFocus()
            }
        }
    }
    setCondition(condition){
        this.setState({condition : {...this.state.condition, ...condition}});
    }
    load()
    {
        if(this.props.reducer.isFilter)
        {
            //判断是在筛选阶段
            this.props.filter({condition: this.state.condition,filterPage: this.props.reducer.filterPage,firstTime: false},()=>true,()=>false)
            this.setState({searchCondition: ''})//清空搜索条件
        }
        else if(this.props.reducer.isSearch)
        {
            this.props.searchList({
                val:this.state.searchCondition,
                page: this.props.reducer.searchPage,
                firstTime:false
            },()=>{},()=>{})
            
            let condition={
                departmentOrder:[],
                dateOrder : 'desc'  
            }
            this.setState({condition: condition})//清空筛选条件
        }
        else
        {
            this.props.getCourseraList({condition: this.state.condition,page:this.props.reducer.page},()=>true,()=>false)
        }
    }
    getCurrentPage()
    {
        let page = 1
        if(this.props.reducer.isFilter)
        {
            page = this.props.reducer.filterPage-1
        }
        else if(this.props.reducer.isSearch)
        {
            page = this.props.reducer.searchPage-1
        }
        else
        {
            page = this.props.reducer.page-1
        }
        if(page == 0)
        {
            page = 1
        }
        return page
    }
    onFocus(){
        if(browserAttr.versions.ios)
        {
            $(this.dom1).css({"position": "static","zIndex":0})
            $(this.dom2).css({marginTop:'-6px'})
            $(window).scrollTop(0)
            this.setState({footerShow: "none"})
        }   
    }
    onBlur(){
        $(this.dom1).css({"position": 'fixed',"zIndex":1000})
        $(this.dom2).css({marginTop:'40px'})
        if(browserAttr.versions.ios)
        {
            this.setState({footerShow:"block"})
        }
    }
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
        Toast.info(<ToastContent type="loading" content={'正在匹配请稍后'} />, 0, null, false);
        await this.props.getCourseraJson({url: url,userInfo: this.props.ddreducer.userInfo},async (data)=>{
            // 请求成功后删除提示
            Toast.hide()
            if(data.isEixst)
            {
                Toast.info(<ToastContent type="fail" content={'证书链接已经存在'} />, 3, null, false);
                return
            }
            if(!data.isCoursrea)
            {
                Toast.info(<ToastContent type="fail" content={'你输入的是无效链接'} />, 3, null, false);
                return
            }
            Toast.info(<ToastContent type="success" content={'提交成功'} />, 2, null, false);
            // await this.props.getCourseraList({condition:this.state.condition,page:1},()=>true,()=>false)
            browserHistory.push('/train')

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
        // 跳到证书详情页面

        let table = getSrc(`Coursera/table.png`)
        let {itemList,page,count,school,fetchGetCourseraList,fetchSearchList,fetchFilterList} = this.props.reducer
        const columns = [
        {
		    title: '名字',
		    dataIndex: 'name',
		    key: 'name',
		    width: 50,
		}, {
		    title: '部门',
		    dataIndex: 'department',
		    key: 'department',
		    width: 50,
		}, {
		    title: '获得时间',
		    dataIndex: 'date',
		    key: 'date',
		    width: 50,
		}, {
		    title: '学校',
		    dataIndex: 'school',
		    key: 'school',
		    width: 150,
		    render: (text,record) => <span>{record.school}</span>,
		}, {
                title : `课程证书（总数${count}）`,
                dataIndex : 'courseraname',
                key : 'courseraname',
                width : 150,
                render : (text, record) => {
                    return <a onClick={()=>{
                        this.setState({certificateurl: record.certificate})
                    }}>
                        {record.courseraname}
                    </a>
                }
            },
            {
                title : `证书`,
                dataIndex : 'image',
                key : 'image',
                width : 50,
                render : (text, record) => {
                    {/*return <img width='100' height='100' src={`http://172.20.70.69:3003${record.certificate_path}`} />*/}
                    if(!record.certificate_path)
                    {
                        return <p style={{textAlign:"center"}}>玩命加载中...</p>
                    }
                    else
                    {
                        return <div className={`${className}-preview`}>
                            <div>
                                <Preview
                                    imageWidth='50px'
                                    modalImageWidth='100%'
                                    modalWidth = {450}
                                    previewImageUrl = {`${SERVER}${record.certificate_path}`}
                                />

                            </div>
                        </div>
                    }
                    // return <div className={`${className}-preview`}>
                    //             <div>
                    //                 <Preview
                    //                     imageWidth='50px'
                    //                     modalImageWidth='100%'
                    //                     modalWidth = {450}
                    //                     previewImageUrl = {`${SERVER}${record.certificate_path}`}
                    //                 />
                    //             </div>
                    //         </div>
                }
            }

		];
        let departmentTags = []
        for(let val of this.props.reducer.departments)
        {
            departmentTags.push({name: val.department_name,value: val.department_name})
        }
        const departmentOrder =    
            <ModularContainer name={'部门筛选'}>
                <TagSelect
                    tags={departmentTags}
                    selectedColor={'#5FB5D8'}
                    maxSelected={this.props.reducer.departments.length}
                    minSelected={0}
                    value={this.state.condition.departmentOrder}
                    onChange={value => {
                        this.setCondition({departmentOrder : value});
                    }}
                />
            </ModularContainer>
        const dateOrder =
            <ModularContainer name={'获取证书时间排序'}>
                <TagSelect
                    tags={[{name : '降序', value : 'desc'}, {name : '升序', value : 'asc'}]}
                    selectedColor={'#5FB5D8'}
                    maxSelected={1}
                    minSelected={1}
                    value={this.state.condition.dateOrder}
                    onChange={value => {
                        this.setCondition({dateOrder : value});
                    }}
                    dropdownStyle = {{
                                height:"100px",
                                overflow:"auto"
                    }}
                />
            </ModularContainer>
        const schoolOrder = 
            <ModularContainer name={'按学校筛选'}>
                    <Select
                        style={{width: '100%'}}
                        mode={'multiple'}
                        allowClear
                        optionFilterProp={'children'}
                        value={this.state.condition.schoolOrder}
                        maxHeight={100}
                        placeholder="请选择"
                        onChange={(value)=>{
                            this.setCondition({schoolOrder : value})
                        }}
                    >
                        {this.formatSchoolData(school)}
                    </Select>
            </ModularContainer>

        if(this.state.certificateurl)
        {
            return <Iframe
                        certificateurl={this.state.certificateurl}
                        gobackTrain={()=>{
                            this.setState({certificateurl: ''})
                        }}
                    />
        }

        if(ismobile)
        {
            let isLoad = ()=>{
                let load = ''
                if(this.props.reducer.isFilter)
                {
                    load = !this.props.reducer.filterIsEnd && itemList.length > 0
                }
                else if(this.props.reducer.isSearch)
                {
                    load = !this.props.reducer.searchIsEnd && itemList.length > 0
                }
                else 
                {
                    load = !this.props.reducer.isEnd && itemList.length > 0
                }
                return load
            }
            return(
                <div className={`${className}`}>
                    <div  className={`${className}-header`} ref={(dom1)=>this.dom1 = dom1}>
                        <div
                            onClick={(e)=>{
                                this.onFilter(e)
                            }}>
                            筛选
                        </div>
                        <div>
                            <Search
                                placeholder="按关键字搜索"
                                value={this.state.searchCondition}
                                onFocus = {()=>this.onFocus()}
                                onBlur = {()=>this.onBlur()}
                                search = {(value)=>{
                                    this.props.searchList({val:value,page:1,firstTime:true},()=>{},()=>{})
                                }}
                                onChange={(value)=>{
                                    let condition={
                                        departmentOrder:[],
                                        dateOrder : 'desc',
                                        schoolOrder:[]
                                    }
                                    // 清空筛选条件
                                    this.setState({searchCondition: value,condition: condition})
                                }}
                            />
                        </div>
                        <div onClick={()=>{browserHistory.push('/train/coursera/chart')}}>
                            <span>总数<br/>{count}</span>
                        </div>
                    </div>
                    <List>
                        <div className="userProfileContainerParent" ref={(dom2)=>{this.dom2 = dom2}}>
                            <ScrollLoad
                                key={'list'}
                                className="list"
                                isAutoFirst={true}
                                autoTimes={-1}
                                isLoad={isLoad()}
                                load={() =>this.load()}
                                isLoading={this.props.reducer.fetchGetCourseraList || this.props.reducer.fetchSearchList || this.props.reducer.fetchFilterList}
                                loadingClassName={'list-loading'}
                            >
                                {this.formatItemList(itemList)}
                            </ScrollLoad>
                        </div>
                    </List>
                    <div
                        className={`${className}-footer`}
                        style={{top:clientHeight-44,display:this.state.footerShow}}
                        onClick={() => AntMobilePrompt('输入证书链接',null,
                            [
                                { text: '取消' },
                                {
                                    text: '确定',
                                    onPress: async (certificate) =>{
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
                                                Toast.info(<ToastContent type="fail" content={'你输入的是无效链接'} />, 3, null, false);
                                            }
                                        },500)
                                    }
                                },
                            ], 'default', null)
                        }
                    >
                        提交新证书
                    </div>
                    <Modal
                        isShow={this.state.show}
                        style={{height : this.clientHeight-46, top : 46}}
                        hideWidth={$(window).width()}
                        positionY={'top'}
                        onClickBg={() => {
                            // 关闭筛选
                            this.setState({show:false,searchCondition: ''})//清空搜索条件
                            this.props.filter({condition: this.state.condition,filterPage:1,firstTime: true},()=>true,()=>false)
                            this.onBlur()
                        }}
                        contentStyle={{backgroundColor : '#f2f2f2'}}
                    >
                        <div style={{width : $(window).width()}}>
                            {/*按学校筛选*/}
                            {schoolOrder}
                            {/*按部门排序*/}
                            {departmentOrder}
                            {/*按获取证书时间排序*/}
                            {dateOrder}
                            <div className={`${className}-comfirm`} onClick={()=>{
                                this.setState({show:false,searchCondition: ''})//清空搜索条件
                                this.props.filter({condition: this.state.condition,filterPage:1,firstTime: true},()=>true,()=>false)
                                this.onBlur()
                            }}>
                                确定
                            </div>
                        </div>
                    </Modal>
                </div>
            )
        }
        else
        {
            let data = this.formatData(itemList)
            // 权限控制是否显示"查看最新提交"
            const showLatest = ()=>{
                const {name} = this.props.ddreducer.userInfo
                if(name  == '高萍' || name == '汪乐' || name == 'wangle')
                {
                    return <span className={`${className}-PC-count`}>
                                <a onClick={()=>{browserHistory.push('/train/coursera/latest')}}>查看最新提交</a>
                            </span>
                }
                else
                {
                    return null
                }
            }
            // 重置数据库结构
            const showReset = ()=>{
                const {name} = this.props.ddreducer.userInfo
                if(name == '汪乐' || name == 'wangle')
                {
                    return <span className={`${className}-PC-count`}>
                                <a onClick={()=>{this.props.resetDbCoursera()}}>重置coursera数据集合</a>
                            </span>
                }
                else
                {
                    return null
                }
            }
            // 重置部门列表
            const  showManageDepartment = () =>{
                const {name} = this.props.ddreducer.userInfo
                if(name  == '高萍' || name == '汪乐' || name == 'wangle')
                {
                    return <span className={`${className}-PC-count`}>
                                <a onClick={()=>{browserHistory.push('/train/coursera/management')}}>组织架构管理</a>
                            </span>
                }
                else
                {
                    return null
                }
            }
            return  <div className={`${className}-PC`}>
                        <div className='container'>
            				<div className="search">
                                <a onClick={(e)=>this.onFilter(e)}>
                                    筛选
                                </a>
		            			<AntdSearch
								    placeholder="按名字、部门、课程名称、学校搜索"
								    style={{ width: 250 }}
								    onSearch={(value) => {
                                        let condition={
                                            departmentOrder:[],
                                            dateOrder : 'desc',
                                            school:[]
                                        }
                                        this.setState({searchCondition: value,condition: condition})//清空筛选条件
                                        this.props.searchList({val:value,page:1,firstTime:true},()=>{
                                            if(!value)
                                            {
                                                browserHistory.push('/train')
                                            }
                                        },()=>{})
                                    }}
								/>
							</div>
							<span className={`${className}-PC-count`}>
								<a onClick={()=>{browserHistory.push('/train/coursera/chart')}}>查看统计</a>
							</span>
                            {showLatest()}
                            {showReset()}
                            {showManageDepartment()}
							<div className="add">
								<AntButton
                                    type="primary"
                                    size="small"
                                    onClick={() => AntMobilePrompt('输入证书链接', null,
                                        [
                                            { text: '取消' },
                                            {
                                                text: '确定',
                                                onPress: async (certificate) =>{
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
                                                            Toast.info(<ToastContent type="fail" content={'你输入的是无效链接'} />, 3, null, false);
                                                        }

                                                    },500)
                                                }
                                            },
                                        ], 'default', null)
                                    }
                                >
                                    添加新证书
                                </AntButton>
							</div>
                        </div>
                        <Table
	                        	scroll={{ y: 600 }}
	                            columns={columns}
	                            dataSource={data}
	                            pagination={{
	                            	total:this.props.reducer.tableTotalCount,
	                            	pageSize: 50,
                                    current: this.getCurrentPage()

                                }}
                                locale = {{emptyText: (fetchGetCourseraList || fetchSearchList || fetchFilterList ? '': '暂无数据')}}
	                            loading={fetchGetCourseraList || fetchSearchList || fetchFilterList }
	                            onChange={(pagination, filters, sorter)=>{
	                            	// desc降序 ,asc//生序
                                    if(this.props.reducer.isFilter)
                                    {
                                        // 判断是在筛选阶段
                                        this.props.filter({condition: this.state.condition,filterPage: pagination.current,firstTime: false},()=>true,()=>false)
                                        this.setState({condition:this.state.condition ,searchCondition: ''})//清空搜索条件
                                    }
                                    else if(this.props.reducer.isSearch)
                                    {
                                        this.props.searchList({
                                            val:this.state.searchCondition,
                                            page: pagination.current,
                                            firstTime:false
                                        },()=>{},()=>{})
                                        let condition={
                                            departmentOrder:[],
                                            dateOrder : 'desc',
                                            schoolOrder: []
                                        }
                                        this.setState({searchCondition:this.state.searchCondition,condition: condition})//清空筛选条件
                                    }
                                    else
                                    {
                                        this.props.getCourseraList({condition: this.state.condition,page:pagination.current},()=>true,()=>false)
                                    }
	                            }}
                        />
                        <Modal
                            isShow={this.state.show}
                            style={{height : this.clientHeight-60, top : 60}}
                            hideWidth={'100%'}
                            positionY={'top'}
                            contentStyle= {{width:'960px',backgroundColor : '#f2f2f2'}}
                            modalShowTime={200}
                            modalHideTime={200}
                            onClickBg={() => {
                                // 关闭筛选
                                this.setState({show:false})
                            }}
                        >
                            <div style={{width : $(window).width()}}>
                                {schoolOrder}
                                {/*按部门排序*/}
                                {departmentOrder}
                                {/*按获取证书时间排序*/}
                                {dateOrder}
                                <div className={`${className}-comfirm`} onClick={()=>{
                                    // 清空搜索条件
                                    this.setState({show:false,searchCondition: ''})
                                    this.props.filter({condition: this.state.condition,filterPage:1,firstTime: true},()=>true,()=>false)
                                }}>
                                    确定
                                </div>
                            </div>
                        </Modal>
                    </div>
        }
    }
}
const mapStateToProps = state => ({
    reducer: state.courseraIndex,
    ddreducer: state.ddLayout
})
const mapDispatchToProps = {
    getCourseraList,
    searchList,
    getDepartment,
    filter,
    clear,
    getSchool,
    resetDbCoursera,
    getCourseraJson,
}
export default store => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'courseraIndex', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index))
        })
    }
})