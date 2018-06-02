import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Icon} from 'antd'
import CONFIG from 'config/app'
import dd from 'utils/dingding'
import './style.scss'
import Avatar from '../../../components/Avatar'

class AvatarDelete extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: []
        }
    }

    static propTypes = {
        /* data结构
         [{
         "name": "张三", //姓名
         "avatar": "http://g.alicdn.com/avatar/zhangsan.png" //头像图片url，可能为空
         "emplId": '0573', //员工userid
         },
         ...
         ]
         */
        data: PropTypes.array,
        // 添加或者删除的回调
        onChange: PropTypes.func

    }

    componentWillMount () {
        this.setState({data: this.props.data})
    }

    componentWillReceiveProps (nextProps) {
        this.setState({data: nextProps.data})
    }

    // 生成参会人员的头像列表
    formatParticipants (participants = [], className) {
        let current = []
        for (let val of participants) {
            current.push(
                <div className={`${className}-avatar-container`} key={val.emplId}>
                    <Avatar
                        className={`${className}-avatar`}
                        url={val.avatar}
                        size={'md'}
                        userId={val.emplId}
                        dd={dd}
                        ddCorpId={CONFIG.DD_CORP_ID}
                    >
                        <a
                            className={`${className}-delete`}
                            onClick={() => {
                                let data = [...this.state.data]
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].emplId === val.emplId) {
                                        data.splice(i, 1)
                                    }
                                }
                                this.setState({data: data})
                                this.props.onChange(data)
                            }}
                        >
                            <Icon type='close' />
                        </a>
                    </Avatar>
                    <span>{val.name}</span>
                </div>
            )
        }
        return current
    }

    render () {
        const componentClassName = 'app-components-meeting-avatar-delete'
        return (
            <div className={componentClassName} ref={dom => {
                this.dom = dom
            }}>
                {this.formatParticipants(this.state.data, componentClassName)}
            </div>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarDelete)
