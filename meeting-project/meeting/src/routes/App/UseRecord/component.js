import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {injectReducer} from 'store/reducers'
import UseRecordTable from 'appComponents/Meeting/UseRecordTable'
import {getMeetings, updateMeetingStatus, updateMeetings} from './action'
import './style.scss'
import {Button, Select} from 'antd'

class UseRecord extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            operationType: ''
        }
        this.limit = 10
    }

    static propTypes = {
        // 获取使用记录列表
        getMeetings: PropTypes.func,
        // 请求loading
        getMeetingsLoading: PropTypes.bool,
        // 会议使用记录
        meetings: PropTypes.array,
        // 使用记录总条数，用于分页
        total: PropTypes.number,
        // 当前页码
        page: PropTypes.number,
        // 更新会议室使用记录状态
        updateMeetingsLoading: PropTypes.bool,
        // 取消申请后更新本地redux里面的meetings的内容
        updateMeetings: PropTypes.func,
        reducer: PropTypes.object,
        location: PropTypes.object,
        layoutReducer: PropTypes.object,
        updateMeetingStatus: PropTypes.func
    }

    componentWillMount () {
        if (!this.props.reducer.meetings.length || this.props.location.state.isReload) {
            this.props.getMeetings(this.formatContions({page: 1, limit: this.limit}))
        }
    }

    /**
     * 格式化获取会议记录的条件
     * @param {string} meetingRoom 会议室名称
     * @param {number} date 会议室申请的日期
     * @param {number} status  审批状态
     * @param {number} page  第几页
     * @param {number} limit 每页的条数
     * @param {id} 根据数据库id查询某一条数据
     * @return {string} 返回查询条件
     */
    formatContions (conditions) {
        let condition = []
        let {meetingRoom, date, status, page, limit} = conditions
        if (meetingRoom) {
            for (let r of meetingRoom) {
                condition.push(`meetingRoom=${r}`)
            }
        }
        if (date) {
            condition.push(`date=${date}`)
        }
        if (status) {
            for (let s of status) {
                condition.push(`status=${s}`)
            }
        }
        if (page) {
            condition.push(`page=${page}`)
        } else {
            // 默认查询第一页
            condition.push(`page=1`)
        }
        if (limit) {
            condition.push(`limit=${limit}`)
        } else {
            // 默认查询50条
            condition.push(`limit=50`)
        }
        return `?${condition.join('&')}`
    }

    updateMeetings (meetings, ids, nextStatus) {
        // 更新reducer中meetings列表数据
        let newMeetings = [...meetings]
        for (let i = 0; i < newMeetings.length; i++) {
            for (let id of ids) {
                if (newMeetings[i]._id === id) {
                    newMeetings[i].status = nextStatus
                }
            }
        }
        this.props.updateMeetings(newMeetings)
    }

    render () {
        const className = 'app-use-record'
        let {meetings, total, getMeetingsLoading, page, updateMeetingsLoading} = this.props.reducer
        let {selectedRowKeys, operationType} = this.state
        const SelectLimit = () => {
            return <Select
                style={{ width: 60 }}
                placeholder='请选择分页条数'
                defaultValue={'10'}
                onChange={(value) => {
                    this.limit = Number(value)
                    this.props.getMeetings(this.formatContions({page: 1, limit: this.limit}))
                }}
            >
                <Select.Option value='5'>5</Select.Option>
                <Select.Option value='10'>10</Select.Option>
                <Select.Option value='20'>20</Select.Option>
            </Select>
        }
        const cancelBtn = this.props.layoutReducer.userInfo.status >= 200
            ? <div className={`${className}-operation-btns`}>
                {SelectLimit()}
                <Button
                    loading={(() => updateMeetingsLoading && operationType === 'pass')()}
                    onClick={() => {
                        if (selectedRowKeys.length) {
                            let data = {nextStatus: 1, ids: selectedRowKeys}
                            this.setState({operationType: 'pass'})
                            this.props.updateMeetingStatus(data, () => {
                                this.updateMeetings(meetings, selectedRowKeys, 1)
                                this.setState({selectedRowKeys: []})
                            })
                        }
                    }}>通过</Button>
                <Button type='danger' ghost loading={(() => updateMeetingsLoading && operationType === 'reject')()}
                    onClick={() => {
                        if (selectedRowKeys.length) {
                            let data = {nextStatus: 2, ids: selectedRowKeys}
                            this.setState({operationType: 'reject'})
                            this.props.updateMeetingStatus(data, () => {
                                this.updateMeetings(meetings, selectedRowKeys, 2)
                                this.setState({selectedRowKeys: []})
                            })
                        }
                    }}>拒绝</Button>
            </div>
            : <div className={`${className}-operation-btns`}>
                {SelectLimit()}
            </div>

        return (
            <div className={`${className}`}>
                <div className={`${className}-use-record-container`}>
                    <UseRecordTable
                        selectedRowKeys={[...selectedRowKeys]}
                        meetings={[...meetings]}
                        total={total}
                        loading={getMeetingsLoading}
                        pageSize={this.limit}
                        page={page}
                        isAdministrator={this.props.layoutReducer.userInfo.status >= 200}
                        onFilter={(condition) => {
                            // { /* 筛选条件meetingRoom, date, status, page, limit */ }
                            let {filters, dateString, page} = condition
                            let newCondition = {}
                            if (filters && filters.meetingRoom.length) {
                                newCondition.meetingRoom = filters.meetingRoom
                            }
                            if (filters && filters.approvalStatus.length) {
                                newCondition.status = filters.approvalStatus
                            }
                            if (dateString) {
                                newCondition.date = dateString
                            }
                            newCondition.page = page
                            newCondition.limit = this.limit
                            this.props.getMeetings(this.formatContions(newCondition))
                        }}
                        rowSelectionOnchange={(selectedRowKeys, selectedRows) => {
                            this.setState({selectedRowKeys: selectedRowKeys})
                        }}
                        onCancel={(ids) => {
                            let data = {nextStatus: 4, ids: ids}
                            this.setState({operationType: 'cancel'})
                            this.props.updateMeetingStatus(data, () => {
                                this.updateMeetings(meetings, ids, 4)
                                this.setState({selectedRowKeys: []})
                            })
                        }}
                        cancelLoading={(() => updateMeetingsLoading && operationType === 'cancel')()}
                    />
                    {cancelBtn}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer: state.userecord,
    layoutReducer: state.layoutDd
})

const mapDispatchToProps = {
    getMeetings,
    updateMeetingStatus,
    updateMeetings
}

export default connect(mapStateToProps, mapDispatchToProps)(UseRecord)
