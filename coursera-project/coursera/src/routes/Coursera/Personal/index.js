import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Table} from 'antd';
import {List} from 'antd-mobile';
import {injectReducer} from 'store/reducers';
import $ from 'jquery';
import {searchPersonalList,clear} from './action';
import './style.scss';
import {browserHistory} from 'react-router'
import getSrc from 'utils/imgSrc';
import Avatar from 'components/Avatar';
import ScrollLoad from 'components/ScrollLoad';
import Iframe from 'appComponents/Coursera/Iframe';
import browserAttr from 'utils/browserAttr';
import Preview from 'appComponents/Coursera/Preview';
const SERVER =  'http://new-tap4fun.oss-cn-hangzhou.aliyuncs.com/cousera/';
let ismobile = browserAttr.versions.mobile;//判断设备类型
let className = `Coursera-Personal`;
const Item = List.Item;
class Personal extends Component {
    constructor(props) {
        super(props);
        this.state={
            certificateurl:''
        }
    }
    static propTypes =
    {
    	// 获取所有的courseralist
        searchPersonalList          : React.PropTypes.func,
        clear                       : React.PropTypes.func,
    }
    componentWillMount() {
       	this.props.searchPersonalList({
                val: this.props.params.name,
                searchPage: this.props.reducer.searchPage,
            },()=>{},()=>{})
    }
    componentWillUnmount() {
    	this.props.clear()
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
                    className={`${className}-userProfileContainer`}
                    key = {val._id}
                >
                    <Item
                        multipleLine
                    >
                        <div 
                            className={`${className}-userProfile`}
                        >
                            <div className={`${className}-userProfileTop`}>
                                <div className={`${className}-avatar`}>
                                    <Avatar url={user.avatar}/>
                                </div>
                                <div className={`${className}-userInfo`}>
                                    <div className={`${className}-userInfoTop`}>
                                        <p>{`${user.name}`}</p>
                                        <p>{`${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`}</p>
                                    </div>
                                    <div className={`${className}-userInfoBottom`}>
                                        <p>{`${department}`}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`${className}-userProfileBottom`}>
                                <div className={`${className}-icon`}>
                                        {(
                                            !val.certificate_path
                                                ?
                                                <div className={`${className}-iconContainer`}>
                                                    <img
                                                        src={`${justyfy}`}
                                                    />
                                                    <p>证书</p>
                                                </div>
                                                :
                                                <div className={`${className}-iconContainer`}>
                                                    <Preview
                                                        imageWidth='50px'
                                                        modalImageWidth='95%'
                                                        modalWidth = {450}
                                                        previewImageUrl = {`${SERVER}${val.coursera_key}.jpeg`}
                                                    />
                                                </div>
                                        )}
                                </div>
                                <div className={`${className}-certificate`}>
                                    <div className={`${className}-certificateContainer`}>
                                        <p>{`${val.school}`}</p>
                                        <a className={`${className}-url`} href={`${val.certificate}`}>
                                            {val.courseraname}
                                        </a> 
                                    </div>
                                    {/*<div className={`${className}-certificatePreview`}>*/}
                                        {/*<Preview*/}
                                            {/*imageWidth='50px'*/}
                                            {/*modalImageWidth='95%'*/}
                                            {/*modalWidth = {450}*/}
                                            {/*previewImageUrl = {`${SERVER}${val.certificate_path}`}*/}
                                        {/*/>*/}
                                    {/*</div>*/}
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
            let user = val.user,department = ''
            for(let d of val.department)
            {
                department =  department + ' ' + d.department_name
            }
            // 获取一个时间对象
			let newDate = new Date();
		 	newDate.setTime(val.date * 1000);
            data.push({
                key: i,
                name: user.name,
                department: department,
                date: `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`,
                school: val.school,
                courseraname: val.courseraname,
                certificate: val.certificate,
                certificate_path: val.certificate_path,
                coursera_key: val.coursera_key,
            })
            i++
        }
        return data
    }
    load()
    {
        this.props.searchPersonalList({
            val: this.props.params.name,
            searchPage: this.props.reducer.searchPage,
        },()=>{},()=>{})
    }
    render() {
    	let {searchIsEnd, itemList,tableTotalCount,fetchSearchList} = this.props.reducer
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
    		return  <div className={`${className}`}>
    					<div className={`${className}-userProfileContainerParent`}>
		        			<List>
			                    <ScrollLoad
			                        key={'list'}
			                        className="list"
			                        isAutoFirst={true}
			                        autoTimes={-1}
			                        isLoad={!searchIsEnd && itemList.length > 0}
			                        load={() =>this.load()}
			                        isLoading={fetchSearchList}
			                        loadingClassName={'list-loading'}
			                    >
			                        {this.formatItemList(itemList)}
			                    </ScrollLoad>
		                    </List>
	                    </div>
	                </div>
    	}
    	 else
        {
            let data = this.formatData(itemList)
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
			    title: `课程证书`,
			    dataIndex: 'courseraname',
			    key: 'courseraname',
			    width: 150,
			    // render: (text,record) => <a href={record.certificate}>{record.courseraname}</a>,
                render : (text, record) => {
                    return <a onClick={()=>{
                        this.setState({certificateurl: record.certificate})
                    }}>
                        {record.courseraname}
                    </a>
                }
			}, {
                    title : `证书`,
                    dataIndex : 'image',
                    key : 'image',
                    width : 50,
                    render : (text, record) => {
                        {/*return <img width='100' height='100' src={`http://172.20.70.69:3005${record.certificate_path}`} />*/}
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
                                        previewImageUrl = {`${SERVER}${record.coursera_key}.jpeg`}
                                    />
                                </div>
                            </div>
                        }
                    }
                }];
            // 权限控制是否显示"查看最新提交"
            const showLatest = ()=>{
                const {name} = this.props.ddreducer.userInfo
                if(name  == '高萍' || name == '汪乐' || name == 'wangle')
                {
                    return <span className={`${className}-PC-count`}>
                                <a onClick={()=>{browserHistory.push('/latest')}}>查看最新提交</a>
                            </span>
                }
                else
                {
                    return null
                }
            }
            return  <div className={`${className}-pc`}>
                        <div className = {`${className}-back`}>
                            <a
                                onClick={()=>{
                                    if(this.props.location.state)
                                    {
                                        browserHistory.push({pathname: this.props.location.state.backurl,state:{value: this.props.location.state.value}})
                                    }
                                    else {
                                        browserHistory.push('/chart')
                                    }
                                }}
                            >
                                返回
                            </a>
                        </div>
                        <Table 
                        	scroll={{ y: 600 }}
                            columns={columns} 
                            dataSource={data}
                            pagination={{
                            	total: tableTotalCount,
                            	pageSize:50
                            }}
                            locale = {{emptyText: (fetchSearchList ? '': '暂无数据')}}
                            loading={fetchSearchList}
                            onChange={(pagination, filters, sorter)=>{
                                this.props.searchPersonalList({
                                    val: this.props.params.name,
                                    searchPage: pagination.current,
                                },()=>{},()=>{})
                            }} 
	                    />
                    </div>
        }
    }
}
const mapStateToProps = state => ({
    reducer : state.personal,
})
const mapDispatchToProps = {
    searchPersonalList,
	clear
}
export default store => ({
    path : 'personal/:name',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'personal', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Personal))
        })
    }
})