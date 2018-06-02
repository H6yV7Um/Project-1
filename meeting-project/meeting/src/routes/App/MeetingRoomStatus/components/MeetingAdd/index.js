import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Toast} from 'antd-mobile'
import AvatarDelete from 'appComponents/Meeting/AvatarDelete'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {Button, Form, Input} from 'antd'
import './style.scss'
import ToastContent from 'components/ToastContent'
import {changeNewMeeting, addMeeting} from '../../action'
import {browserHistory} from 'react-router'
const {TextArea} = Input
const FormItem = Form.Item
import CONFIG from 'config/app'
import dd from 'utils/dingding'

moment.locale('zh-cn')

class MeetingAdd extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // 当前选择人列表
            selectedRowKeys: [],
            // 会议发起人
            meetingSponsors: ((props) => {
                let userInfo = {...props.layoutReducer.userInfo}
                let meetingSponsor = [{
                    avatar: userInfo.avatar,
                    emplId: userInfo.user_id,
                    name: userInfo.name
                }]
                return meetingSponsor
            })(props),
            // 主持人
            host: ((props) => {
                let userInfo = {...props.layoutReducer.userInfo}
                let meetingSponsor = [{
                    avatar: userInfo.avatar,
                    emplId: userInfo.user_id,
                    name: userInfo.name
                }]
                return meetingSponsor
            })(props),
            // 参会人员
            participants: [],
            // 是否显示更多详情
            showMore: false
        }
        this.newMeeting = {
            startTime: props.newMeeting && props.newMeeting.startTime ? props.newMeeting.startTime : '',
            endTime: props.newMeeting && props.newMeeting.endTime ? props.newMeeting.endTime : '',
            meetingRoom: props.newMeeting && props.newMeeting.meetingRoom ? props.newMeeting.meetingRoom : '',
            participants: props.newMeeting && props.newMeeting.participants.length ? props.newMeeting.participants : this.state.participants,
            host: props.newMeeting && props.newMeeting.host.length ? props.newMeeting.host : this.state.host,
            meetingSponsors: props.newMeeting && props.newMeeting.meetingSponsors.length ? props.newMeeting.meetingSponsors : this.state.meetingSponsors,
            meetingTheme: props.newMeeting && props.newMeeting.meetingTheme ? props.newMeeting.meetingTheme : '',
            meetingContent: props.newMeeting && props.newMeeting.meetingContent ? props.newMeeting.meetingContent : '',
            remarks: props.newMeeting && props.newMeeting.remarks ? props.newMeeting.remarks : '',
            isNew: true,
            id: 10000
        }
    }

    static propTypes =
    {
        // 新增会议申请
        addMeeting: React.PropTypes.func.isRequired,
        // 新增loading
        loading: React.PropTypes.bool,
        layoutReducer: React.PropTypes.object,
        changeNewMeeting: React.PropTypes.func.isRequired,
        form: React.PropTypes.object,
        newMeeting: React.PropTypes.object,
        addMeetingStatus: React.PropTypes.bool
    }

    componentWillMount () {
        this.props.changeNewMeeting(this.newMeeting)
    }

    componentDidMount () {

    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                Toast.info(<ToastContent type='fail' content={'提交失败'} />, 2, null, false)
                return
            }
            /* 需要存储的数据
            meetingTheme
            meetingContent
            startTime
            endTime
            meetingRoom
            meetingSponsors
            host
            remarks
            participants */
            // 会议主持人必须要有
            if (!this.props.newMeeting.host.length) {
                Toast.info(<ToastContent type='fail' content={'请选择会议主持人'} />, 2, null, false)
                return
            };
            if (!this.props.newMeeting.meetingRoom) {
                Toast.info(<ToastContent type='fail' content={'请在左侧竖向拖选会议室及时间'} />, 2, null, false)
                return
            };
            if (!this.props.addMeetingStatus && !this.props.loading) {
                Toast.info(<ToastContent type='fail' content={'提交失败'} />, 2, null, false)
                return
            }
            // this.props.newMeeting.createTime = Date.parse(new Date())
            this.props.addMeeting(this.props.newMeeting, (data) => {
                if (data.length === 0 || data.length) {
                    Toast.info(<ToastContent type='fail' content={'会议室被抢占了请重新选择'} />, 2, null, false)
                    return
                } else {
                    Toast.info(<ToastContent type='success' content={'提交成功'} />, 2, null, false)
                    browserHistory.push({pathname: '/meeting/userecord', state: { isReload: true }})
                }
            })
        })
    }

    // 钉钉选人接口
    choosePeple (people, max) {
        dd.biz.contact.choose({
            // 是否多选： true多选 false单选； 默认true
            multiple: true,
            // 默认选中的用户列表，员工userid；成功回调中应包含该信息
            users: [],
            // 企业id
            corpId: CONFIG.DD_CORP_ID,
            // 人数限制，当multiple为true才生效，可选范围1-1500
            max: max,
            onSuccess: (data) => {
                /* data结构
                 [{
                 "name": "张三", //姓名
                 "avatar": "http://g.alicdn.com/avatar/zhangsan.png" //头像图片url，可能为空
                 "emplId": '0573', //员工userid，跟user_id相同
                 },
                 ...
                 ]
                 */
                if (people === 'host') {
                    this.newMeeting.host = data
                    this.props.changeNewMeeting(this.newMeeting)
                } else if (people === 'participants') {
                    this.newMeeting.participants = data
                    this.props.changeNewMeeting(this.newMeeting)
                }
            },
            onFail: () => {
            }
        })
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
        let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
        let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
        return Y + M + D + ' ' + h + m + s
    }

    componentWillReceiveProps (nextProps, nextState) {
        if (nextProps.newMeeting) {
            this.newMeeting = nextProps.newMeeting
        }
    }

    render () {
        let {showMore} = this.state
        let {participants, host} = this.props.newMeeting ? this.props.newMeeting : this.state
        let {loading} = this.props
        const componentClassName = 'app-components-meeting-add'
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        }
        return (
            <div className={componentClassName}>
                <div className={`${componentClassName}-container`} ref={(dom) => {
                    this.dom = dom
                }}>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={`${componentClassName}-form-title`}>新增会议申请</div>
                        <FormItem
                            {...formItemLayout}
                            label='会议主题'
                            hasFeedback
                        >
                            {getFieldDecorator('meetingTheme', {
                                rules: [{
                                    required: true, message: '请输入会议主题'
                                }],
                                initialValue: this.props.newMeeting ? this.props.newMeeting.meetingTheme : ''
                            })(
                                <Input
                                    placeholder='请输入会议主题'
                                    onBlur={(e) => {
                                        this.newMeeting.meetingTheme = e.target.value
                                        this.props.changeNewMeeting(this.newMeeting)
                                    }}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='会议内容'
                            hasFeedback
                        >
                            {getFieldDecorator('meetingContent', {
                                rules: [{
                                    required: true, message: '请输入会议内容'
                                }],
                                initialValue: this.props.newMeeting ? this.props.newMeeting.meetingContent : ''
                            })(
                                <TextArea
                                    placeholder='请输入会议内容'
                                    autosize={{minRows: 3, maxRows: 6}}
                                    onBlur={(e) => {
                                        this.newMeeting.meetingContent = e.target.value
                                        this.props.changeNewMeeting(this.newMeeting)
                                    }}
                                />
                            )}
                        </FormItem>
                        {(
                            this.props.newMeeting && this.props.newMeeting.startTime
                                ? <div>
                                    <div className={`${componentClassName}-custom-container`}>
                                        <span>开始时间：</span>
                                        <span>
                                            {this.props.newMeeting && this.props.newMeeting.startTime ? this.formatTimestamp(this.props.newMeeting.startTime) : ''}
                                        </span>
                                    </div>
                                    <div className={`${componentClassName}-custom-container`}>
                                        <span>结束时间：</span>
                                        <span>
                                            {this.props.newMeeting && this.props.newMeeting.endTime ? this.formatTimestamp(this.props.newMeeting.endTime) : ''}
                                        </span>
                                    </div>
                                    <div className={`${componentClassName}-custom-container`}>
                                        <span>会议室：</span>
                                        <span>
                                            {this.props.newMeeting ? this.props.newMeeting.meetingRoom : ''}
                                        </span>
                                    </div>
                                </div>
                                : <div className={`${componentClassName}-go-left`}>* 请在左侧选择会议室及时间（支持竖向拖选）</div>
                        )}
                        {(!showMore
                                ? null
                                : <div>

                                    <FormItem
                                        {...formItemLayout}
                                        label='备注'
                                    >
                                        {getFieldDecorator('remarks', {initialValue: this.props.newMeeting ? this.props.newMeeting.remarks : ''})(
                                            <TextArea
                                                placeholder='输入会议室使用备注'
                                                autosize={{minRows: 3, maxRows: 6}}
                                                onBlur={(e) => {
                                                    this.newMeeting.remarks = e.target.value
                                                    this.props.changeNewMeeting(this.newMeeting)
                                                }}
                                            />
                                        )}
                                    </FormItem>
                                    <div className={`${componentClassName}-custom-container`}>
                                        <span>会议主持人：</span>
                                        <span>
                                            {(
                                                host.length > 0
                                                    ? null
                                                    : <a onClick={() => {
                                                        this.choosePeple('host', 1)
                                                    }}> 添加主持人 </a>
                                            )}

                                            {(
                                                host.length > 0
                                                    ? <AvatarDelete
                                                        data={host}
                                                        onChange={(host) => {
                                                            this.newMeeting.host = host
                                                            this.props.changeNewMeeting(this.newMeeting)
                                                        }}
                                                    />
                                                    : null
                                            )}

                                        </span>
                                    </div>
                                    <div className={`${componentClassName}-custom-add-participants-container`}>
                                        <span>参会人员：</span>
                                        <span>
                                            {(
                                                participants.length > 50
                                                    ? null
                                                    : <a
                                                        onClick={() => {
                                                            this.choosePeple('participants', 50)
                                                        }}
                                                    >
                                                        添加参会人员
                                                    </a>
                                            )}
                                        </span>

                                        {(
                                            participants.length > 0
                                                ? <div className={`${componentClassName}-participants-container`}>
                                                    <AvatarDelete
                                                        data={participants}
                                                        onChange={(participants) => {
                                                            this.newMeeting.participants = participants
                                                            this.props.changeNewMeeting(this.newMeeting)
                                                        }}
                                                    />
                                                </div>
                                                : null
                                        )}
                                    </div

                                    >
                                </div>
                        )}
                        <a className={`${componentClassName}-show-more`} onClick={() => {
                            if (showMore) {
                                this.setState({showMore: false})
                            } else {
                                this.setState({showMore: true})
                            }
                        }}>
                            {(showMore ? '<<收起' : '更多详情>>')}

                        </a>
                        <FormItem
                            wrapperCol={{
                                xs: {span: 24, offset: 0},
                                sm: {span: 16, offset: 8}
                            }}
                        >
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={loading}
                            >
                                提交
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    layoutReducer: state.layoutDd,
    newMeeting: state.meetingRoomStatus.newMeeting,
    loading: state.meetingRoomStatus.addMeetingLoading,
    addMeetingStatus: state.meetingRoomStatus.addMeetingStatus
})

const mapDispatchToProps = (dispatch) => {
    return {
        changeNewMeeting: (newMeeting) => {
            dispatch(changeNewMeeting(newMeeting))
        },
        addMeeting: (newMeeting, success) => {
            addMeeting(newMeeting, success)(dispatch)
        }
    }
}
const FormMeetingAdd = Form.create()(MeetingAdd)
export default connect(mapStateToProps, mapDispatchToProps)(FormMeetingAdd)
