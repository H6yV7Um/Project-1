import moment from 'moment'
import 'moment/locale/zh-cn'
import zhCN from 'antd/lib/calendar/locale/zh_CN';
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon, message, Row ,Col, Table, Layout, Spin, TreeSelect, Popconfirm, Calendar} from 'antd'
import { Link } from 'react-router'
import {getList, setCurrentRecord, setCurrentMonth} from '../actions/MyCalendarAction'
moment.locale('zh-cn')

class MyCalendarView extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            mode : "month"
        }
    }
    static propTypes =
    {
        MyCalendarStore: React.PropTypes.object.isRequired,
        setCurrentRecord: React.PropTypes.func.isRequired,
        setCurrentMonth: React.PropTypes.func.isRequired,
        getList: React.PropTypes.func.isRequired,
    }
    componentWillMount()
    {
        let now = moment(this.props.MyCalendarStore.currentMonth)
        let week = moment(now.format("YYYY-MM-01"), "YYYY-MM-DD").format("E")
        let firstDay = moment(now.format("YYYY-MM-01"), "YYYY-MM-DD").subtract(week, "days")
        let endDay = moment(firstDay).add(42, "days")
        this.props.getList(firstDay.format("YYYY-MM-DD"), endDay.format("YYYY-MM-DD"))
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
        for(let i=0;i<this.props.MyCalendarStore.data.length;i++)
        {
            let date = this.props.MyCalendarStore.data[i]
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
                        <Col span={20}><div className="h1">我的工作日历</div></Col>
                    </Row>
                    <div className="table-container">
                        <Calendar
                                 mode={this.state.mode}
                                 defaultValue={this.props.MyCalendarStore.currentMonth}
                                 onPanelChange={(e)=>{this.onPanelChange(e)}} 
                                 locale={zhCN}
                                 dateCellRender={(e)=>this.dateCellRender(e)}

                        />
                    </div>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    MyCalendarStore: state.mycalendar
})

const mapDispatchToProps = {
    setCurrentRecord, setCurrentMonth, getList
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendarView)
