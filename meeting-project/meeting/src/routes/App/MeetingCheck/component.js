import React, {Component} from 'react'
import {connect} from 'react-redux'
import {injectReducer} from 'store/reducers'
import Avatar from 'components/Avatar'
import CONFIG from 'config/app'
import dd from 'utils/dingding'
import {get, updateMeetingStatus} from './action'
import Button from 'components/Button'
import {Modal, Input} from 'antd'
import UserList from 'components/UserList'

import './style.scss'

class MeetingCheck extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visible : false
        }
        this.status = 0
        this.passMessage = ''
        this.refuseValue = ''
    }

    static propTypes = {
        // 获取使用记录
        get: React.PropTypes.func,
        // 获取layoutReducer
        layoutReducer: React.PropTypes.object,
        // 获取reducer
        reducer: React.PropTypes.object,
        // 更新会议室使用记录状态
        updateMeetingStatus: React.PropTypes.func,
        // 更新会议室状态加载情况
        updateMeetingsLoading: React.PropTypes.bool,
        // 获取params
        params: React.PropTypes.object
    }

    componentWillMount () {
        this.props.get(`?id=${this.props.params.id}`)
    }

    // 显示modal
    showModal = () => {
        this.setState({
            visible: true
        })
    }

    // modal点击确定
    handleOk = (e) => {
        this.passMessage = this.refuseValue
        this.props.updateMeetingStatus({nextStatus: 2, ids: [this.props.params.id], passMessage: this.passMessage}, () => {
            this.setState({
                visible: false
            })
            this.status = 2
        })
    }

    // modal点击取消
    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    // TextArea输入值改变
    change = (e) => {
        this.refuseValue = e.target.value
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
        let h = date.getHours() < 10 ? '0' + date.getHours() + ': ' : date.getHours() + ' ' + ': '
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ' '
        return {date: Y + M + D, time: h + m}
    }

    /**
     * 判断当前会议室状态
     * @param {Number} status 状态数字 会议发起人名字
     * @return {Object} 返回响应的状态,返回当前状态对象的className,返回状态图标，返回操作图标
     */
    getStatus (status, className, sponsorName) {
        // [审批通过, 审批拒绝, 审批中, 审批已取消]
        // enum : [1,2,3,4],
        this.status = this.status ? this.status : status
        let statusIcon = null
        let pendingBth = null
        let cancelBtn = null
        let line = null
        let refuseReason = null
        const {TextArea} = Input
        if (this.status === 1) {
            status = ''
            className = `${className}-header-passed`
            statusIcon = <img src='http://img.alicdn.com/tps/TB1OKUMLXXXXXbbXXXXXXXXXXXX-251-202.png' />
        }
        if (this.status === 2) {
            status = ''
            className = `${className}-header-refused`
            statusIcon = <img src='http://img.alicdn.com/tps/TB1ITQpLXXXXXbkXVXXXXXXXXXX-251-202.png' />
            this.passMessage = this.passMessage ? this.passMessage : <span>暂无</span>
            refuseReason = <div className={`${className}-details-refuse`}>
                <span>
                    拒绝理由:
                </span>
                {this.passMessage}
            </div>
        }
        if (this.status === 3) {
            status = '审批中'
            className = `${className}-header-pending`
            if (sponsorName) {
                cancelBtn = this.props.layoutReducer.userInfo.name === sponsorName
                    ? <Button
                        isLoading={this.props.reducer.updateMeetingsLoading}
                        name='取消'
                        action={() => {
                            this.props.updateMeetingStatus({nextStatus: 4, ids: [this.props.params.id]}, () => {
                                this.status = 4
                            })
                        }}
                    />
                    : null
                line = this.props.layoutReducer.userInfo.name === sponsorName ? <span>|</span> : null
            }
            pendingBth = <div className={`${className}-footer`}>
                <Button
                    isLoading={this.props.reducer.updateMeetingsLoading}
                    name='通过'
                    action={() => {
                        this.props.updateMeetingStatus({nextStatus: 1, ids: [this.props.params.id]}, () => {
                            this.status = 1
                        })
                    }}
                />
                <span>|</span>
                <Button
                    name='拒绝'
                    action={() => {
                        this.showModal()
                    }}
                />
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText='取消'
                    okText='确认'
                    confirmLoading={this.props.reducer.updateMeetingsLoading}
                    className={`${className}-footer-modal`}
                >
                    <TextArea onChange={this.change} placeholder='请输入拒绝理由' autosize={{ minRows: 5, maxRows: 8 }} />
                </Modal>
                {line}
                {cancelBtn}
            </div>
        }
        if (this.status === 4) {
            status = '审批已取消'
            className = `${className}-header-cancelled`
        }
        return {status: status, className: className, statusIcon: statusIcon, pendingBth: pendingBth, refuseReason: refuseReason}
    }

    render () {
        const className = 'app-meeting-check'

        let meetingList = null
        let pendingBths = null
        let meetingTime = null
        if (this.props.reducer.meetings) {
            let meeting = this.props.reducer.meetings
            let participant = []
            if (meeting.participants.length > 0) {
                meeting.participants.map((v, k) => {
                    participant.push(
                        <span key={k} className={`${className}-participants-avatar`}>
                            <Avatar
                                url={v.avatar}
                                size={'x-sm'}
                            />
                            <span>{v.name}</span>
                        </span>
                    )
                })
            }

            const participants = <UserList
                users={participant}
                className={`${className}-participants-avatar-list`}
                length={20}
            />

            meetingTime = <div className={`${className}-meeting-time`}>
                <span>申请时间 : </span>
                <span>
                    {this.formatTimestamp(meeting.createTime).date}
                </span>
                <span>
                    {this.formatTimestamp(meeting.createTime).time}
                </span>
            </div>

            meetingList = <div className={`${className}-container`}>
                <div className={`${className}-header`}>
                    <Avatar
                        userId={meeting.meetingSponsors[0].emplId}
                        url={meeting.meetingSponsors[0].avatar}
                        dd={dd}
                        ddCorpId={CONFIG.DD_CORP_ID}
                        className={`${className}-header-avatar`}
                    />
                    <div>
                        <p>{meeting.meetingSponsors[0].name}</p>
                        <p className={this.getStatus(meeting.status, className).className}>{this.getStatus(meeting.status, className).status}</p>
                    </div>
                    {this.getStatus(meeting.status, className).statusIcon}
                </div>
                <div className={`${className}-details`}>
                    <div>
                        <span>
                            会议室:
                        </span>
                        {meeting.meetingRoom}
                    </div>
                    <div className={`${className}-details-box`}>
                        <span>
                            主题:
                        </span>
                        <span>
                            {meeting.meetingTheme}
                        </span>
                    </div>
                    <div className={`${className}-details-box`}>
                        <span>
                            内容:
                        </span>
                        <span>
                            {meeting.meetingContent}
                        </span>
                    </div>
                    <div>
                        <span>
                            会议日期:
                        </span>
                        {this.formatTimestamp(meeting.startTime).date}
                    </div>
                    <div>
                        <span>
                            会议时间:
                        </span>
                        {`${this.formatTimestamp(meeting.startTime).time} ~ ${this.formatTimestamp(meeting.endTime).time}`}
                    </div>
                    <div className={`${className}-detail-participants`}>
                        <span>
                            会议人员
                        </span>
                    </div>
                    <div />
                    <div>
                        <span>
                            主持人:
                        </span>
                        {(meeting.host[0]
                                ? <div className={`${className}-details-avatar`}>
                                    <Avatar
                                        url={meeting.host[0].avatar}
                                        size={'x-sm'}
                                    />
                                    {meeting.host[0].name}
                                </div>
                                : <span>暂无</span>
                        )}
                    </div>
                    <div>
                        <span>
                            参会人员:
                        </span>
                        {(meeting.participants.length > 0
                                ? <span>{participants}</span>
                                : <span>暂无</span>
                        )}
                    </div>
                    <div className={`${className}-details-box`}>
                        <span>
                            备注:
                        </span>
                        {(meeting.remarks
                                ? <span>{meeting.remarks}</span>
                                : <span className={`${className}-details-gray`}>暂无</span>
                        )}
                    </div>
                    {this.getStatus(meeting.status, className).refuseReason}
                </div>
            </div>

            pendingBths = this.getStatus(meeting.status, className, this.props.reducer.meetings.meetingSponsors[0].name).pendingBth
        }

        return (
            <div className={className}>
                {meetingList}
                {pendingBths}
                {meetingTime}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer: state.meetingCheck,
    layoutReducer: state.layoutDd
})

const mapDispatchToProps = {
    get, updateMeetingStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCheck)
