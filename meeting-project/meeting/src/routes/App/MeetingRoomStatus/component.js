import React, {Component} from 'react'
import {connect} from 'react-redux'
import {injectReducer} from 'store/reducers'
import MeetCalender from './components/MeetCalender'
// import $ from 'jquery'
// import MeetingAdd from './components/MeetingAdd'
// import {addMeeting} from './action'
import { LocaleProvider } from 'antd'
import './style.scss'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import moment from 'moment'
moment.locale('zh-cn')

class MeetingRoomStatus extends Component {
    constructor (props) {
        super(props)
        this.state = {}
        this.limit = 50
    }

    static propTypes = {}

    render () {
        let className = 'meeting-room-status'
        return (
            <div className={`${className}`}>
                <div className={`${className}-meet-calender-container`}>
                    <LocaleProvider locale={zhCN}>
                        <MeetCalender />
                    </LocaleProvider>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingRoomStatus)
