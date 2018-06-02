import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Table} from 'antd';
import {injectReducer} from 'store/reducers';
import $ from 'jquery';
import {getAllLatestCourseraList, courseraDelete} from './action';
import './style.scss';
import {browserHistory} from 'react-router'
let className = `Coursera-Latest`;

class CourseraLatest extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    static propTypes =
    {
    	// 获取所有的courseralist
        getAllLatestCourseraList          : React.PropTypes.func,
        courseraDelete                    : React.PropTypes.func,

    }
    componentWillMount() {
       this.props.getAllLatestCourseraList({page:1})
    }

    formatData(conrseraList = [])
    {
        let data = []
        let i = 0 
        for(let val of conrseraList)
        {
			let newDate = new Date(),newCreateDate = new Date();
		 	newDate.setTime(val.date * 1000);
		 	newCreateDate.setTime(val.create_date * 1000);
            let user = val.user,department = ''
            for(let d of val.department)
            {
                department =  department + d.department_name + ' '
            }
            data.push({
                key: i,
                _id: val._id,
                name: user.name,
                department: department,
                date: `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`,
                school: val.school,
                courseraname: val.courseraname,
                certificate: val.certificate,
                createDate: `${newCreateDate.getFullYear()}-${newCreateDate.getMonth()+1}-${newCreateDate.getDate()}`
            })
            i++
        }
        return data
    }
    render() {
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
		    render: (text,record) => <a href={record.certificate}>{record.courseraname}</a>,
		},
		{
		    title: '提交时间',
		    dataIndex: 'createDate',
		    key: 'createDate',
		    width: 50,
		},{
		    title: '获得时间',
		    dataIndex: 'date',
		    key: 'date',
		    width: 50,
		},{
		    title: '操作',
            width: 50,
            dataIndex: 'action',
            key: 'action',
            render: (text,record) => <a onClick={()=>{
                this.props.courseraDelete({_id: record._id},()=>{
                    browserHistory.push('/latest')
                })
            }}>删除</a>
		}];
		let {count,data,fetchGetLatestCourseraList} = this.props.reducer
        return  <div className={`${className}`}>
                    <Table 
                    	scroll={{ y: 600 }}
                        columns={columns} 
                        dataSource={this.formatData(data)}
                        pagination={{
                        	total:count,
                        	pageSize:50,
                        }}
                        locale = {{emptyText: (fetchGetLatestCourseraList ? '': '暂无数据')}}
                        loading={fetchGetLatestCourseraList}
                        onChange={(pagination, filters, sorter)=>{
                        	this.props.getAllLatestCourseraList({page:pagination.current})
                        }} 
                    />
                </div>
    }
}
const mapStateToProps = state => ({
    reducer : state.courseraLatest,
})
const mapDispatchToProps = {
	getAllLatestCourseraList,
    courseraDelete
}
export default store => ({
    path : 'latest',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'courseraLatest', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(CourseraLatest))
        })
    }
})