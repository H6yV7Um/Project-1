import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Spin} from 'antd'
import $ from 'jquery'
import './style.scss'

class Button extends Component {
    constructor (props) {
        super(props)

        // this.state = {...props};

        // 执行时间戳
        this.actionTime = null
        // 是否点击
        this.isClick = false
    }

    static propTypes = {
        // 类名
        className           :   PropTypes.string,
        // 样式
        style               :   PropTypes.object,
        // 按钮名
        name                :   PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]),
        // 按钮名样式
        nameStyle           :   PropTypes.object,
        // 点击事件
        action              :   PropTypes.func,
        // 图标
        icon                :   PropTypes.element,
        // 图标样式
        iconStyle           :   PropTypes.object,
        // 是否显示侧边框
        isSideBorder        :   PropTypes.bool,
        // 侧边框大小
        sideBorderSize      :   PropTypes.oneOf(['full', 'half']),
        // 图标与按钮名是否一行
        isLine              :   PropTypes.bool,
        // 类型
        type                :   PropTypes.oneOf(['normal', 'weaken', 'white', 'null', 'think']),
        // 是否loading    (支持reducer写入: {reducer, isLoading})
        isLoading           :   PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.object]),
        // reducer
        reducers            :   PropTypes.object
    }

    static defaultProps = {
        // 点击事件
        action              :   () => {},
        // 类型
        type                :   'normal',
        // 是否显示侧边框
        isSideBorder        :   false,
        // 侧边框大小
        sideBorderSize      :   'full',
        // 图标与按钮名是否一行
        isLine              :   true,
        // 是否loading
        isLoading           :   false
    }

    onDown = e => {
        e.preventDefault()
        this.isClick = true
    }

    onUp = e => {
        const thisTime = new Date().getTime()
        if (!this.actionTime || thisTime - this.actionTime > 50) {
            this.actionTime = thisTime

            if (this.isClick) {
                setTimeout(() => {
                    this.props.action()
                    // this.actionSet(this.props.action(this.actionSet));
                }, 10)
            }
        }
    }

    // actionSet = newState => {
    //     if(newState)
    //     {
    //         this.setState({...this.state, ...newState});
    //     }
    // }

    render () {
        let className = 'component-Button'
        let componentClassName = className
        if (this.props.className) {
            componentClassName += ` ${this.props.className}`
        }
        if (this.props.type) {
            componentClassName += ` ${className}-${this.props.type}`
        }
        if (this.props.isSideBorder) {
            componentClassName += ` ${className}-sideBorder ${className}-${this.props.sideBorderSize}`
        }

        let isLoading = this.props.isLoading
        if ($.type(isLoading) === 'object') {
            isLoading = this.props.reducers[isLoading.reducer][isLoading.isLoading] || false
        }

        return (
            <div className={componentClassName} style={this.props.style}>
                <Spin spinning={isLoading}>
                    <div className={`${className}-content ${this.props.isLine ? `${className}-line` : ''}`}
                        onTouchStart={this.onDown}
                        onTouchMove={e => {
                            this.isClick = false
                        }}
                        onTouchEnd={this.onUp}
                        onMouseDown={this.onDown}
                        onMouseMove={e => {
                            this.isClick = false
                        }}
                        onMouseUp={this.onUp}
                    >
                        {
                            this.props.icon
                                ? <div className={`${className}-icon`}>
                                    <div className={`${className}-icon-border`} style={this.props.iconStyle}>
                                        {this.props.icon}
                                    </div>
                                </div>
                                : null
                        }
                        {
                            this.props.name
                                ? <div className={`${className}-name`} style={this.props.nameStyle}>
                                    {this.props.name}
                                </div>
                                : null
                        }
                    </div>
                </Spin>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducers : {...state}
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Button)
