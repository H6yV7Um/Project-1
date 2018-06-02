import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import meetingRooms from 'config/meetingRooms'
import {changeDate, getMeetings, changeNewMeeting} from '../../action'

import './style.scss'
import './ReactBigCalendar.css'
import 'flatpickr/dist/themes/airbnb.css'
import formatConditions from 'utils/formatConditions'
import MeetingAdd from '../MeetingAdd'
import {Toast} from 'antd-mobile'
import {DatePicker} from 'antd'
import ToastContent from 'components/ToastContent'
import $ from 'jquery'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
)

const getHourDate = (hour) => {
    let limit = new Date()
    limit.setHours(hour, 0, 0, 0)
    return limit
}

const beginHour = 8
const endHour = 20

class MeetCalender extends Component {
    constructor (props) {
        super(props)
        this.isClick = false
    }
    static propTypes = {
        getMeetings: PropTypes.func.isRequired,
        date: PropTypes.object.isRequired,
        newMeeting: PropTypes.object,
        meetings: PropTypes.array,
        layoutReducer: PropTypes.object,
        changeNewMeeting: PropTypes.func.isRequired,
        changeDate: PropTypes.func.isRequired
    }

    componentWillMount () {
        const year = this.props.date.getFullYear()
        const month = this.props.date.getMonth() + 1
        const day = this.props.date.getDate()
        this.props.getMeetings(formatConditions({date: `${year}-${month}-${day}`, status:[1, 3]}))
    }

    componentDidMount () {
        document.addEventListener('mousemove', function (e) {
            // 此条件下鼠标在浏览器外依旧可以获取client
            if (this.isClick) {
                const windowHeight = $(window).height()
                const calendar = $('.meeting-room-status-calendar')
                const presentScrollTop = calendar.scrollTop()
                if (e.clientY >= windowHeight - 50) {
                    calendar.scrollTop(presentScrollTop + 20)
                } else if (e.clientY <= 220) {
                    calendar.scrollTop(presentScrollTop - 20)
                }
            }
        }.bind(this))
    }
    // 格式化接收到的数据
    setFormat (meetings) {
        let tempEvents = []
        let meetingRoomsIndex = {}
        for (let i = 0; i < meetingRooms.length; i++) {
            tempEvents.push(
                {
                    meetRoomName: meetingRooms[i].name,
                    events: []
                }
            )
            meetingRoomsIndex[meetingRooms[i].name] = i
        }

        const reFormatMeeting = (meeting) => {
            tempEvents[meetingRoomsIndex[meeting.meetingRoom]].events.push({
                'title': meeting.isNew ? '' : meeting.meetingTheme,
                'start': new Date(parseInt(meeting.startTime)),
                'end': new Date(parseInt(meeting.endTime)),
                'people': meeting.meetingSponsors,
                'key': meeting._id,
                'name': meeting.isNew ? 'new' : undefined
            })
        }
        if (meetings !== null) {
            for (let i = 0; i < meetings.length; i++) {
                reFormatMeeting(meetings[i])
            }
        }
        if (this.props.newMeeting && this.props.newMeeting.startTime) {
            reFormatMeeting(this.props.newMeeting)
        }
        return {tempEvents: tempEvents, meetingRoomsIndex: meetingRoomsIndex}
    }

    // 添加新的申请数据
    getNewEvent = async (slotInfo, value, meetingRoomsIndex) => {
        if (this.isClick) {
            this.isClick = false
        }
        let conflict = false
        let thisMeetingRoom = null
        for (let i = 0; i < this.props.meetings.length; i++) {
            const meeting = this.props.meetings[i]
            if (meetingRoomsIndex[meeting.meetingRoom] !== value) {
                continue
            }
            if (!((meeting.endTime <= slotInfo.start && meeting.startTime <= slotInfo.start) ||
                    (meeting.endTime >= slotInfo.end && meeting.startTime >= slotInfo.end))) {
                conflict = true
                break
            }
        }
        if (conflict) {
            Toast.info(<ToastContent type='fail' content={'与已有会议冲突'} />, 2, null, false)
            return
        }
        const presentTime = Date.parse(new Date())
        const slotTime = Date.parse(new Date(slotInfo.start))
        if (slotTime < presentTime){
            Toast.info(<ToastContent type='fail' content={'当前时间已过'} />, 2, null, false)
            return
        }
        for (let meetingRoomName in meetingRoomsIndex) {
            if (meetingRoomsIndex[meetingRoomName] === value) {
                thisMeetingRoom = meetingRoomName
            }
        }
        const userInfo = this.props.layoutReducer.userInfo
        let person = [{
            avatar: userInfo.avatar,
            emplId: userInfo.user_id,
            name: userInfo.name
        }]
        let newMeeting = {
            startTime: slotInfo.start.getTime(),
            endTime: slotInfo.end.getTime(),
            meetingRoom: thisMeetingRoom,
            participants: this.props.newMeeting ? this.props.newMeeting.participants : [],
            host: this.props.newMeeting ? this.props.newMeeting.host : [person],
            meetingSponsors: this.props.newMeeting ? this.props.newMeeting.meetingSponsors : [person],
            meetingTheme: this.props.newMeeting ? this.props.newMeeting.meetingTheme : '',
            meetingContent: this.props.newMeeting ? this.props.newMeeting.meetingContent : '',
            remarks: this.props.newMeeting ? this.props.newMeeting.remarks : '',
            isNew: true,
            id: 10000
        }
        this.props.changeNewMeeting(newMeeting)
    }
    changeClickStatus = () => {
        this.isClick = true
    }
    render () {

        let className = 'meeting-room-status-calendar'
        const {tempEvents, meetingRoomsIndex} = this.setFormat(this.props.meetings)
        const {date} = this.props
        // console.log(moment(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'))
        const customEventPropGetter = (event) => {
            let sameUser = false
            if (event.name === 'new') {
                return {
                    className: 'new-event'
                }
            }
            if (event.people !== undefined) {
                for (let i = 0; i < event.people.length; i++) {
                    if (event.people[i].emplId === this.props.layoutReducer.userInfo.user_id) {
                        sameUser = true
                    }
                }
                if (sameUser) {
                    return {
                        className: 'special-event'
                    }
                }
            }
            return {}
        }
        const calenderTable = []
        for (let i = 0; i < meetingRooms.length; i++) {
            calenderTable.push(<div className={`${className}-calender`} key={i}>
                <BigCalendar
                    selectable
                    toolbar={false}
                    popup
                    date={this.props.date}
                    min={getHourDate(beginHour)}
                    max={getHourDate(endHour)}
                    events={tempEvents[i].events}
                    defaultView='day'
                    step={15}
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    onNavigate={event => console.log(event)}
                    eventPropGetter={customEventPropGetter}
                    onSelectSlot={(slotInfo) => this.getNewEvent(slotInfo, i, meetingRoomsIndex)}
                    onSelecting={this.changeClickStatus}
                />
            </div>)
        }

        const timesLabels = []
        for (let i = 8; i <= 20; i++) {
            timesLabels.push(
                <tr key={i}>
                    <td>{i < 10 ? '0' + i : i}:00</td>
                </tr>
            )
        }
        const meetingRoomLabels = []
        for (let i = 0; i < meetingRooms.length; i++) {
            meetingRoomLabels.push(
                <div key={i} className={meetingRooms[i].specialClass ? `${className}-title-label-long ${className}-title-label` : `${className}-title-label`}>
                    {meetingRooms[i].alias ? meetingRooms[i].alias : meetingRooms[i].name}
                </div>
            )
        }
        return (
            <div className={className}>
                <div className={`${className}-callout`}>
                    <h3>
                        <DatePicker
                            onChange={date => {
                                this.props.changeDate(date)
                            }}
                            allowClear={false}
                            style={{width: '278px'}}
                            defaultValue={moment(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, 'YYYY-MM-DD HH:mm')}
                        />
                    </h3>
                </div>
                <div className={`${className}-calender-box`} id='list' >
                    <div className={`${className}-title`} id='nav'>
                        {meetingRoomLabels}
                    </div>

                    <table className={`${className}-calender-table`} id='table'>
                        <tbody>{timesLabels}</tbody>
                    </table>

                    {calenderTable}
                </div>
                <MeetingAdd />
            </div>
        )
    }
}

const
    mapStateToProps = (state) => {
        return ({
            layoutReducer: state.layoutDd,
            meetings: state.meetingRoomStatus.meetings,
            loading: state.meetingRoomStatus.getMeetingsLoading,
            date: state.meetingRoomStatus.date,
            newMeeting: state.meetingRoomStatus.newMeeting,
            isChangeDate: state.meetingRoomStatus.isChangeDate
        })
    }

const
    mapDispatchToProps = (dispatch) => {
        return {
            getMeetings: (conditions) => {
                dispatch(getMeetings(conditions))
            },
            changeDate: (date) => {
                // console.log(date)
                dispatch(changeDate(date._d))
                // const year = date.getFullYear()
                // const month = date.getMonth() + 1
                // const day = date.getDate()
                // const hours = date.getHours()
                // const mimute = date.getMinutes()
                // console.log(date.format('YYYY-MM-DD HH:mm:ss'))
                dispatch(getMeetings(formatConditions({date: date.format('YYYY-MM-DD'), status: [1, 3]})))
            },
            changeNewMeeting: (newMeeting) => {
                dispatch(changeNewMeeting(newMeeting))
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(
    MeetCalender
)

