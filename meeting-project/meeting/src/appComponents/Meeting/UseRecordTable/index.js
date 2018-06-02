import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Table, Icon, Calendar, Popconfirm, Spin} from 'antd'
import './style.scss'
import meetingRooms from 'config/meetingRooms'
import {browserHistory} from 'react-router'
import ShowModal from '../ShowModal'
import '../../../../node_modules/antd/lib/radio/style/index.less'
// 管理员名单

class UseRecordTable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // 当前选择人列表
            filterDropdownVisible: false,
            // 筛选条件,包括会议室meetingRoom,审批状态approvalStatus
            filters: {
                meetingRoom: [],
                approvalStatus: []
            },
            // 日期筛选条件
            dateString: '',
            // 某一条会议记录
            meetingDetails: [],
            // 当前取消申请的会议的id
            cancelItemKey: ''

        }
    }

    static propTypes = {
        // 请求loading
        loading: PropTypes.bool,
        // 会议使用记录
        meetings: PropTypes.array,
        // 使用记录总条数，用于分页
        total: PropTypes.number,
        // 一页有多少条
        pageSize: PropTypes.number,
        // 当前页码
        page: PropTypes.number,
        // 筛选查询函数
        onFilter: PropTypes.func,
        // rowSelectiong改变时的回调函数
        rowSelectionOnchange: PropTypes.func,
        // 判断是否是管理员
        isAdministrator: PropTypes.bool,
        // 取消申请
        onCancel: PropTypes.func,
        // 取消loading
        cancelLoading: PropTypes.bool,
        // 当前选择的行
        selectedRowKeys: PropTypes.array,
        layoutReducer: PropTypes.object
    }
    static defaultProps =
        {}

    componentWillMount () {
        this.setState({tableSource: this.formatTableDataSource(this.props.meetings)})
    }

    componentWillReceiveProps (nextProps) {

    }

    componentDidMount () {

    }

    /**
     * 格式table的行数据
     * @param {Array} meetings 会议室使用记录
     * @return {Array} 返回格式化后的table行数据
     */
    formatTableDataSource (meetings = []) {
        let current = []
        for (let val of meetings) {
            current.push({
                key: val._id,
                meetingRoom: val.meetingRoom,
                theme: val.meetingTheme,
                date: this.formatTimestamp(val.startTime).date,
                borrowDate: this.formatTimestamp(val.startTime).time + '-' + this.formatTimestamp(val.endTime).time,
                sponsor: (val.meetingSponsors.map((sponsor) => {
                    return sponsor.name
                })).join('、'),
                startingDate: this.formatTimestamp(val.createTime).date,
                approvalStatus: val.status,
                remarks: val.remarks
            })
        }
        return current
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
        let D = date.getDate() + ' '
        let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
        let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
        return {date: Y + M + D, time: h + m}
    }

    // 以会议室和审批状态进行筛选，进行分页
    handleTableChange (pagination, filters, sorter) {
        let res = this.isFilterChange(this.state.filters, filters)
        if (res.change) {
            this.props.onFilter({filters: res.newFilters, dateString: this.state.dateString, page: 1})
        } else {
            this.props.onFilter({filters: res.newFilters, dateString: this.state.dateString, page: pagination.current})
        }
        this.setState({filters: res.newFilters})
    }

    // 以会议借用日期进行筛选
    handleDatePickerChange (date) {
        if (date._d) {
            const time = new Date(date._d)
            const Y = time.getFullYear() + '-'
            const M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-'
            const D = time.getDate() + ' '
            const dateString = Y + M + D
            this.props.onFilter({filters: this.state.filters, dateString: dateString, page: 1})
            this.setState({dateString: dateString})
        } else {
            this.props.onFilter({filters: this.state.filters, dateString: '', page: 1})
            this.setState({dateString: ''})
        }

    }

    /**
     * 判断筛选条件filters是否有变化,
     * 如果有变化需要重置分页的页码，
     * 否则需要保留当前页码
     * @param {Array} filters 之前的筛选条件
     * @param {Array} nextFilters 当前筛选条件
     * @return {Object} 返回change布尔值代码是否改变，newFilters: 新的筛选条件
     */
    isFilterChange (filters, nextFilters) {
        let {meetingRoom, approvalStatus} = filters
        let nextMeeingRoom = nextFilters.meetingRoom
        let nextApprovalStatus = nextFilters.approvalStatus
        let meetingRoomChange = false
        let approvalStatusChange = false
        let newFilters = []
        // 没有变化
        if (nextMeeingRoom && nextMeeingRoom.sort().toString() === meetingRoom.sort().toString()) {
            meetingRoomChange = false
            newFilters.meetingRoom = nextMeeingRoom
        }
        // 有变化
        if (nextMeeingRoom && nextMeeingRoom.sort().toString() !== meetingRoom.sort().toString()) {
            meetingRoomChange = true
            newFilters.meetingRoom = nextMeeingRoom
        }
        // 有变化
        if (!nextMeeingRoom && meetingRoom.length) {
            meetingRoomChange = true
            newFilters.meetingRoom = []
        }
        // 没有变化
        if (!nextMeeingRoom && !meetingRoom.length) {
            meetingRoomChange = false
            newFilters.meetingRoom = []
        }

        // 没有变化
        if (nextApprovalStatus && nextApprovalStatus.sort().toString() === approvalStatus.sort().toString()) {
            approvalStatusChange = false
            newFilters.approvalStatus = nextApprovalStatus
        }
        // 有变化
        if (nextApprovalStatus && nextApprovalStatus.sort().toString() !== approvalStatus.sort().toString()) {
            approvalStatusChange = true
            newFilters.approvalStatus = nextApprovalStatus
        }
        // 有变化
        if (!nextApprovalStatus && approvalStatus.length) {
            approvalStatusChange = true
            newFilters.approvalStatus = []
        }
        // 没有变化
        if (!nextApprovalStatus && !approvalStatus.length) {
            approvalStatusChange = false
            newFilters.approvalStatus = []
        }
        return {change: meetingRoomChange || approvalStatusChange, newFilters: newFilters}
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
        const componentClassName = 'app-components-meeting-user-record-table'
        let {cancelItemKey} = this.state
        let {loading, total, meetings, pageSize, page, isAdministrator, cancelLoading, selectedRowKeys} = this.props
        let tableDataSource = this.formatTableDataSource(meetings)
        let columnsItem = ''
        let lastColumnsItem = ''
        let isClick
        let operationBtn
        if (isAdministrator) {
            columnsItem = {
                title: '备注',
                width: 150,
                dataIndex: 'remarks',
                render: (text, record) => {
                    return <a onClick={() => {
                    }}>
                        <ShowModal
                            content={record.remarks}
                            hiddenLength={8}
                        />
                    </a>
                }
            }
        }
        lastColumnsItem = {
            title: '操作',
            width: 100,
            dataIndex: 'operation',
            render: (text, record) => {
                operationBtn =
                    record.approvalStatus === 3 && record.sponsor === this.props.layoutReducer.userInfo.name
                        ? cancelLoading && cancelItemKey === record.key
                        ? <Spin size='small'/>
                        : <Popconfirm
                            title='确定要取消申请吗？'
                            okText='是'
                            cancelText='否'
                            onConfirm={() => {
                                // 取消会议申请
                                this.props.onCancel([record.key])
                                this.setState({cancelItemKey: record.key})
                            }}><a href='#'>取消</a> </Popconfirm>
                        : null

                return operationBtn
            }
        }

        // 定义表格列数据
        const columns = [{
            title: '会议室',
            width: 150,
            dataIndex: 'meetingRoom',
            // '2-1','2-2','3-1','3-2','3-3','ThinkDifferent','员工会议室'
            filters: meetingRooms.map((val) => {
                return {
                    text: val.name,
                    value: val.name
                }
            })
        }, {
            title: '主题',
            dataIndex: 'theme',
            width: 150,
            render: (text, record) => <a
                className={`${componentClassName}-theme-details`}
                onClick={() => {
                    browserHistory.push({
                        pathname: `/meeting/details/${record.key}`,
                        state: {status: record.approvalStatus, path: '/meeting/userecord'}
                    })
                }}>
                {record.theme}
            </a>
        }, {
            title: '日期',
            dataIndex: 'date',
            width: 150,
            filterDropdown: (
                <div
                    className='custom-filter-dropdown'
                    style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4, backgroundColor: 'white' }}
                >
                    <Calendar
                        size={'default'}
                        fullscreen={false}
                        onSelect={(date) => this.handleDatePickerChange(date)}
                    />
                    <div className={`ant-table-filter-dropdown-btns`}>
                        <a className={`ant-table-filter-dropdown-link clear`} onClick={(date) => this.handleDatePickerChange(date)}
                        >重置</a>
                    </div>
                </div>
            ),
            filterIcon: <Icon
                type='calendar'
                style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}
            />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible
                })
            }
        }, {
            title: '借用时间',
            width: 150,
            dataIndex: 'borrowDate'

        }, {
            title: '发起人',
            width: 100,
            dataIndex: 'sponsor'
        }, {
            title: '发起时间',
            width: 150,
            dataIndex: 'startingDate'
        }, {
            title: '审批状态',
            width: 150,
            dataIndex: 'approvalStatus',
            filters: [{
                text: '通过',
                value: '1'
            }, {
                text: '未通过',
                value: '2'
            }, {
                text: '审批中',
                value: '3'
            }, {
                text: '已取消',
                value: '4'
            }],
            render: (text, record) => {
                let cs = this.getStatus(record.approvalStatus, componentClassName)
                return <span className={cs.className}>{cs.status}</span>
            }
        }]
        if (isAdministrator) {
            columns.push(columnsItem)
        }
        columns.push(lastColumnsItem)
        // rowSelection多行选择
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.rowSelectionOnchange(selectedRowKeys, selectedRows)
            },
            getCheckboxProps: (meeting) => {
                isClick =
                    !((isAdministrator &&
                        meeting.approvalStatus === 3) ||
                        (isAdministrator &&
                            (meeting.approvalStatus === 3 && meeting.sponsor === this.props.layoutReducer.userInfo.name)))
                return {
                    disabled: isClick
                }
            }
        }
        let tableProps = {
            pagination: {
                total: total,
                pageSize: pageSize,
                current: page,
                size: 'small',
                showTotal: () => {
                    return `共${total}条`
                }
            },
            onChange: (pagination, filters, sorter) => this.handleTableChange(pagination, filters, sorter),
            loading: loading,
            columns: columns,
            dataSource: tableDataSource,
            locale: {filterConfirm: '确定', filterReset: '重置', emptyText: '暂无数据'},
        }
        if (isAdministrator) {
            tableProps.rowSelection = rowSelection
        }
        return (
            <div className={componentClassName} ref={(dom) => {
                this.dom = dom
            }}>
                <Table
                    {...tableProps}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    layoutReducer: state.layoutDd
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UseRecordTable)
