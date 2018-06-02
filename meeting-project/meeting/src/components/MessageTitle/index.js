import React, {Component, PropTypes} from 'react'
import './style.scss'

class MessageTitle extends Component {
    static propTypes = {
        // 类名
        className           :   PropTypes.string,
        // 图标
        icon                :   PropTypes.element,
        // 标题
        title               :   PropTypes.string,
        // 类型
        type                :   PropTypes.oneOf(['primary', 'warning', 'danger'])
    }

    static defaultProps = {
        children            :   []
    }

    render () {
        const type = this.props.type || ''
        let className = 'component-MessageTitle'
        if (this.props.className) {
            className += ` ${this.props.className}`
        }

        return (
            <div {...{...this.props, className : className}}>
                <span className='line'><span /></span>
                <span className='title'>
                    <span className={`icon ${type}`}>
                        {this.props.icon}
                    </span>
                    {this.props.title || this.props.children}
                </span>
                <span className='line'><span /></span>
            </div>
        )
    }
}

export default MessageTitle
