import React, {Component} from 'react'
import {connect} from 'react-redux'
import {injectReducer} from 'store/reducers'
import getSrc from '../../../utils/imgSrc'
import {browserHistory} from 'react-router'
import Avatar from '../../../components/Avatar'
import ShowMore from 'appComponents/Meeting/ShowMore'
import Icon from 'components/Icon'
import CONFIG from 'config/app'
import dd from 'utils/dingding'
import {Button} from 'antd'
import './style.scss'
import {updateMeetingStatus} from './action'

class MeetingDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            meeting: undefined
        }
    }

    static propTypes = {
        MeetingcancelLoading: React.PropTypes.bool,
        updateMeetingStatus: React.PropTypes.func,
        userecordReducer: React.PropTypes.object,
        params: React.PropTypes.object,
        location: React.PropTypes.object,
        reducer: React.PropTypes.object,
        layoutReducer: React.PropTypes.object
    }

    componentWillMount () {
        if (!this.props.userecordReducer) {
            browserHistory.push({pathname: this.props.location.state.path, state: {isReload: true}})
        } else {
            console.log(this.props.userecordReducer.meetings)
            for (let m of this.props.userecordReducer.meetings) {
                if (m._id === this.props.params.id) {
                    this.setState({meeting: m})
                }
            }
        }
    }

    /**
     * 时间戳转换
     * @param {string} timeStamp 时间戳字符串
     * @return {Object} 返回日期字符串
     */
    formatTimestamp (timeStamp) {
        let date = new Date(Number(timeStamp))
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' '
        let h = date.getHours() + ':'
        let m = date.getMinutes()
        return {date: Y + M + D, time: h + m}
    }

    /**
     * 判断当前会议室状态
     * @param {Number} status 状态数字
     * @return {Object} 返回响应的状态,返回当前状态对象的className
     */
    getStatus (status, className) {
        // [通过, 未通过, 审批中, 已取消]
        // enum : [1,2,3,4],
        if (status === 1) {
            status = '通过'
            className = `${className}-theme-approvalStatus-passed`
        }
        if (status === 2) {
            status = '未通过'
            className = `${className}-theme-approvalStatus-refused`
        }
        if (status === 3) {
            status = '审批中'
            className = `${className}-theme-approvalStatus-pending`
        }
        if (status === 4) {
            status = '已取消'
            className = `${className}-theme-approvalStatus-cancelled`
        }
        return {status: status, className: className}
    }

    render () {
        const className = 'app-meeting-details'
        let {meeting} = this.state
        let {MeetingcancelLoading} = this.props.reducer
        if (!meeting) {
            return null
        } else {
            return (
                <div className={className}>

                    <div className={`${className}-container`}>
                        {/* 会议详情 */}
                        <p>
                            <Icon
                                type='arrow-circle-left'
                                onClick={() => {
                                    browserHistory.push({
                                        pathname: this.props.location.state.path,
                                        state: {isReload: false}
                                    })
                                }}
                            />
                            会议详情
                        </p>
                        <div className={`${className}-content-container`}>
                            <div className={`${className}-meeting-room-image`}>
                                <img src={`${getSrc('3-1.png')}`} />
                            </div>
                            <div className={`${className}-meeting-content`}>
                                <p>
                                    时间
                                    <span>
                                        {this.formatTimestamp(meeting.startTime).date}
                                    </span>
                                    <span>
                                        {this.formatTimestamp(meeting.startTime).time}
                                        -
                                        {this.formatTimestamp(meeting.endTime).time}
                                    </span>
                                    <span>【会议室 <span>{meeting.meetingRoom}</span>】</span>
                                    <span className={this.getStatus(meeting.status, className).className}>
                                        {this.getStatus(meeting.status, className).status}</span>
                                </p>
                                <p>
                                    <span>主题</span>
                                    <div>
                                        {meeting.meetingContent}
                                    </div>
                                </p>
                                <p>
                                    <span>内容</span>
                                    <ShowMore
                                        content={meeting.meetingContent}
                                        hiddenLength={58}
                                        width={'100%-228px'}
                                    />
                                </p>
                            </div>
                        </div>
                        {/* 会议主持人，会议发起人 */}
                        {(
                            meeting.host.length
                                ? <div className={`${className}-meeting-host-sponsor`}>
                                    <div className={`${className}-meeting-host`}>
                                        <p>会议主持人</p>
                                        <div className={`${className}-meeting-message`}>
                                            <span className={`${className}-meeting-message-info`}>
                                                <Avatar
                                                    key={meeting.host[0].emplId}
                                                    userId={meeting.host[0].emplId}
                                                    url={meeting.host[0].avatar}
                                                    size={'md'}
                                                    dd={dd}
                                                    ddCorpId={CONFIG.DD_CORP_ID}
                                                />
                                                {meeting.meetingSponsors[0].name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`${className}-meeting-sponsor`}>
                                        <p>会议发起人</p>
                                        <div className={`${className}-meeting-message`}>
                                            <span className={`${className}-meeting-message-info`}>
                                                <Avatar
                                                    key={meeting.meetingSponsors[0].emplId}
                                                    userId={meeting.meetingSponsors[0].emplId}
                                                    url={meeting.meetingSponsors[0].avatar}
                                                    size={'md'}
                                                    dd={dd}
                                                    ddCorpId={CONFIG.DD_CORP_ID}
                                                />
                                                {meeting.meetingSponsors[0].name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                : null
                        )}
                        {/* 参会人员 */}
                        {(
                            meeting.participants.length
                                ? <div className={`${className}-meeting-participants`}>
                                    <p>参会人员</p>
                                    {meeting.participants.map((val) => {
                                        return <span key={val.emplId}>
                                            <Avatar
                                                userId={val.emplId}
                                                url={val.avatar}
                                                size={'md'}
                                                dd={dd}
                                                ddCorpId={CONFIG.DD_CORP_ID}
                                            />
                                            {val.name}
                                        </span>
                                    })}
                                </div>
                                : null
                        )}
                        {(
                            this.props.location.state.status === 3 && meeting.meetingSponsors[0].name === this.props.layoutReducer.userInfo.name
                                ? <div className={`${className}-meeting-operation-btn-box`}>
                                    <Button
                                        loading={MeetingcancelLoading}
                                        type='danger'
                                        className={`${className}-meeting-operation-btn`}
                                        onClick={() => {
                                            let data = {nextStatus: 4, ids: [this.props.params.id]}
                                            this.props.updateMeetingStatus(data, () => {
                                                browserHistory.push({
                                                    pathname: this.props.location.state.path,
                                                    state: {isReload: true}
                                                })
                                            })
                                        }}
                                    >
                                        取消申请
                                    </Button>
                                </div>
                                : null
                        )}
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    reducer: state.meetingDetails,
    userecordReducer: state.userecord,
    layoutReducer: state.layoutDd
})

const mapDispatchToProps = {
    updateMeetingStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetails)

