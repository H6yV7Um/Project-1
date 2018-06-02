import moment from 'moment'
import 'moment/locale/zh-cn'
import zhCN from 'antd/lib/calendar/locale/zh_CN';
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Popconfirm, Calendar} from 'antd'
import { Link } from 'react-router'
import {getList, setCurrentRecord, setCurrentMonth} from '../actions/CalendarAction'
moment.locale('zh-cn')

class CalendarView extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            mode : "month"
        }
    }
    static propTypes =
    {
        CalendarStore: React.PropTypes.object.isRequired,
        setCurrentRecord: React.PropTypes.func.isRequired,
        setCurrentMonth: React.PropTypes.func.isRequired,
        getList: React.PropTypes.func.isRequired,
    }
    componentWillMount()
    {
        let now = moment(this.props.CalendarStore.currentMonth)
        let week = moment(now.format("YYYY-MM-01"), "YYYY-MM-DD").format("E")
        let firstDay = moment(now.format("YYYY-MM-01"), "YYYY-MM-DD").subtract(week, "days")
        let endDay = moment(firstDay).add(42, "days")
        this.props.getList(firstDay.format("YYYY-MM-DD"), endDay.format("YYYY-MM-DD"))
    }
    componentWillReceiveProps(nextProps)
    {
    }
    onSelect(e)
    {
        if(this.refs.calendar.state.mode=='year')
        {
            return false
        }
        if(e.format('YYYY-MM') != this.props.CalendarStore.currentMonth.format('YYYY-MM'))
        {
            this.props.setCurrentMonth(e)
            let now = moment(e)
            let week = moment(now.format("YYYY-MM-01"), "YYYY-MM-DD").format("E")
            let firstDay = moment(now.format("YYYY-MM-01"), "YYYY-MM-DD").subtract(week, "days")
            let endDay = moment(firstDay).add(42, "days")

            this.props.getList(firstDay.format("YYYY-MM-DD"), endDay.format("YYYY-MM-DD"))
            return false
        }
        let currentRecord = {
            "_id": "",
            "date": e.format('YYYY-MM-DD'),
            "vacation": true,
            "title": "",
            "remark": "",
            "attendance_time": "",
            "closing_time": ""
        }
        for(let i=0;i<this.props.CalendarStore.data.length;i++)
        {
            let date = this.props.CalendarStore.data[i]
            let currentDate = moment(date.date.$date)
            if(e.format('YYYY-MM-DD') == currentDate.format('YYYY-MM-DD'))
            {
                currentRecord = date
                currentRecord.date = currentDate.format('YYYY-MM-DD')
                break
            }
        }
        this.props.setCurrentRecord(currentRecord)
        this.props.router.push("/attendance/calendar/add")
    }
    onPanelChange(e)
    {
        this.props.setCurrentMonth(e)
        let now = moment(e)
        let week = moment(now.format("YYYY-MM-01"), "YYYY-MM-DD").format("E")
        let firstDay = moment(now.format("YYYY-MM-01"), "YYYY-MM-DD").subtract(week, "days")
        let endDay = moment(firstDay).add(42, "days")
        this.props.getList(firstDay.format("YYYY-MM-DD"), endDay.format("YYYY-MM-DD"))
    }
    dateCellRender(value)
    {
        for(let i=0;i<this.props.CalendarStore.data.length;i++)
        {
            let date = this.props.CalendarStore.data[i]
            let currentDate = moment(date.date.$date)
            if(value.format('YYYY-MM-DD') == currentDate.format('YYYY-MM-DD'))
            {
                return (
                    <ul className="events">
                    
                        <li>
                            <span style={{color: !date.vacation?"#108ee9":"#f50"}}>●</span>
                            <span style={{color: "#999"}}>{date.title}</span>
                        </li>
                    </ul>
                )
            }
        }
        
        
    }
    render()
    {
        return (
            <div >
                <Layout className="layout-main">
                    <Row className="titleBox" >
                        <Col span={20}><div className="h1">工作日历管理</div></Col>
                        <Col span={4} className="extra">
                        </Col>
                    </Row>
                    <div className="table-container">
                        <Calendar
                                 ref="calendar"
                                 mode={this.state.mode}
                                 onSelect={(e)=>{this.onSelect(e)}}
                                 onPanelChange={(e)=>{this.onPanelChange(e)}} 
                                 defaultValue={this.props.CalendarStore.currentMonth}
                                 dateCellRender={(e)=>this.dateCellRender(e)}
                                 locale={zhCN}
                                  />
                    </div>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    CalendarStore: state.calendar
})

const mapDispatchToProps = {
    setCurrentRecord, setCurrentMonth, getList
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView)
