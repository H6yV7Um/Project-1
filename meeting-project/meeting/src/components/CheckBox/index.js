import React, {Component, PropTypes} from 'react'
import $ from 'jquery'

import './style.scss'

class CheckBox extends Component {
    constructor (props) {
        super(props)

        this.state = {
            isChecked : false
        }

        this.id = new Date().getTime() + Math.random()
    }

    static propTypes = {
        // 类名
        className           :   PropTypes.string,
        // children
        children            :   PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        // 指定当前是否选中
        checked             :   PropTypes.bool,
        // 初始是否选中
        defaultChecked      :   PropTypes.bool,
        // 变化时回调函数
        onChange            :   PropTypes.func,
        // 点击事件
        action              :   PropTypes.func
    }

    static defaultProps = {
        // 指定当前是否选中
        checked             :   false,
        // 初始是否选中
        defaultChecked      :   false,
        // 变化时回调函数
        onChange            :   () => {}
    }

    componentDidMount () {
        if (this.props.defaultChecked || this.props.checked) {
            this.change(true)
        } else {
            this.change(false)
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.checked === true) {
            this.change(true)
        } else {
            this.change(false)
        }
    }

    change = type => {
        $(this.checkbox).attr('checked', !!type)
    }

    render () {
        let className = `component-CheckBox`
        let componentClassName = `${className}`
        if (this.props.className) {
            componentClassName += ` ${this.props.className}`
        }

        return (
            <div className={componentClassName} onClick={() => {
                this.props.action(this.props.children)
            }}>
                <div className={`${className}-content`}>
                    <input type='checkbox'
                        className={`${className}-checkbox`}
                        onChange={this.props.onChange}
                        ref={dom => {
                            this.checkbox = dom
                        }}
                        id={this.id} />
                    <label htmlFor={this.id} />
                </div>
                <div className={`${className}-item`}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default CheckBox
