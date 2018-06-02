import React, {Component, PropTypes} from 'react'
import $ from 'jquery'
import './style.scss'

class Reply extends Component {
    constructor (props) {
        super(props)

        this.state = {
            contentMarginBottom     : 0
        }
    }

    static propTypes = {
        // 类名
        className           :   PropTypes.string,
        // children
        children            :   PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        // 内容
        content             :   PropTypes.string,
        // 回复人  (User)
        user                :   PropTypes.element.isRequired,
        // 被回复人 (User)
        replyUser           :   PropTypes.element,
        // 时间
        // time                :   PropTypes.string.isRequired,
        // 是否可回复
        isReply             :   PropTypes.bool,
        // 回复
        reply               :   PropTypes.func,
        // 是否可删除
        isDelete            :   PropTypes.bool,
        // 删除
        delete              :   PropTypes.func
    }

    static defaultProps = {
        // 被回复人 (User)
        replyUser           :   null,
        // 是否可回复
        isReply             :   true,
        // 回复
        reply               :   () => {},
        // 是否可删除
        isDelete            :   false,
        // 删除
        delete              :   () => {}
    }

    componentDidMount () {
        if ($(this.content).height() > 30) {
            this.setState({contentMarginBottom : -4})
        }
    }

    render () {
        let className = 'component-Reply'
        let componentClassName = className
        if (this.props.className) {
            componentClassName += ` ${this.props.className}`
        }

        // 被回复人
        let replyUser = null
        if (this.props.replyUser) {
            replyUser =
                <span className={`${className}-reply-user`}>
                    <span className={`${className}-reply-words`}>回复</span>
                    {this.props.replyUser}
                </span>
        }

        return (
            <div className={componentClassName}>
                <div
                    className={`${className}-content`}
                    ref={dom => {
                        this.content = dom
                    }}
                    style={{marginBottom : this.state.contentMarginBottom}}
                    onClick={e => {
                        // 删除
                        if (this.props.isDelete) {
                            this.props.delete()
                        } else if (this.props.isReply) {
                            // 回复
                            this.props.reply()
                        }
                    }}
                >
                    {this.props.user}{replyUser}{this.props.children || this.props.content}
                </div>
            </div>
        )
    }
}

export default Reply
