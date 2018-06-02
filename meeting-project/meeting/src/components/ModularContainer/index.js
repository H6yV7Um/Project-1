import React, {Component, PropTypes} from 'react'
import './style.scss'

class ModularContainer extends Component {
    static propTypes = {
        // 类名
        className           :   PropTypes.string,
        // 样式
        style               :   PropTypes.object,
        // 模块名
        name                :   PropTypes.string,
        // 说明
        explain             :   PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        // 补充
        extra               :   PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        // 是否上边框
        borderTop           :   PropTypes.bool,
        // 是否下边框
        borderBottom        :   PropTypes.bool,
        // 下边距
        marginBottom        :   PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        // 下内距
        paddingBottom       :   PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        // 事件:点击模块
        onClick             :   PropTypes.func
    }

    static defaultProps = {
        // 是否上边框
        borderTop           :   true,
        // 是否下边框
        borderBottom        :   true,
        // 下边距
        marginBottom        :   true,
        // 下内距
        paddingBottom       :   true,
        // 事件:点击模块
        onClick             :   () => {}
    }

    render () {
        let className = `component-ModularContainer`
        let componentClassName = className
        if (this.props.className) {
            componentClassName += ` ${this.props.className}`
        }

        // 模块名
        let name = null

        if (this.props.name) {
            name =
                <div className={`${className}-title-border`}>
                    <div className={`${className}-title-sign`} />
                    <div className={`${className}-title-name`}>{this.props.name}</div>
                    <div className={`${className}-title-explain`}>{this.props.explain}</div>
                    <div className={`${className}-title-extra`}>{this.props.extra}</div>
                </div>
        }

        let style = {...this.props.style}
        if (!this.props.borderTop) {
            style.borderTop = 'none'
        }
        if (!this.props.borderBottom) {
            style.borderBottom = 'none'
        }
        if (!(this.props.marginBottom === true)) {
            style.marginBottom = this.props.marginBottom === false ? 0 : this.props.marginBottom
        }
        if (!(this.props.paddingBottom === true)) {
            style.paddingBottom = this.props.paddingBottom === false ? 0 : this.props.paddingBottom
        }

        return (
            <div className={componentClassName} style={style} onClick={this.props.onClick}>
                {name}
                {this.props.children}
            </div>
        )
    }
}

export default ModularContainer
