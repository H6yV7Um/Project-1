import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {TextareaItem as TextareaItemAntd} from 'antd-mobile'
import browserAttr from 'utils/browserAttr'

import {showKeyboard, hideKeyboard} from '../../layouts/CoreLayout/action'

import './style.scss'

class TextareaItem extends Component {
    constructor (props) {
        super(props)

        this.state = {
            rows: this.props.rows
        }
        // 键盘是否显示
        this.isShowKeyboard = false
    }

    static propTypes = {
        hideKeyboard: PropTypes.func,
        className: PropTypes.string,
        showKeyboard: PropTypes.func,
        rows: PropTypes.number
    }

    static defaultProps = {
        // 显示行数
        rows: 2
    }

    componentWillUnmount () {
        if (this.isShowKeyboard) {
            // 隐藏键盘
            this.props.hideKeyboard()
        }
    }

    render () {
        let props = {...this.props}
        delete props.showKeyboard
        delete props.hideKeyboard
        delete props.value

        let className = 'component-TextareaItem'
        if (props.disabled || props.editable === false) {
            className += ' component-TextareaItem-readonly'
        }
        if (this.props.className) {
            className += ` ${this.props.className}`
        }

        return (
            <TextareaItemAntd
                {...props}
                className={className}
                rows={this.state.rows}
                onFocus={
                    val => {
                        if (browserAttr.versions.mobile && props.editable !== false) {
                            // 显示键盘
                            this.isShowKeyboard = true
                            this.props.showKeyboard()
                        }

                        // 设置行数
                        this.setState({rows: 7})

                        if (props.onFocus) {
                            props.onFocus(val)
                        }
                    }
                }
                onBlur={
                    val => {
                        if (browserAttr.versions.mobile && props.editable !== false) {
                            // 隐藏键盘
                            this.isShowKeyboard = false
                            this.props.hideKeyboard()
                        }

                        // 设置行数
                        this.setState({rows: this.props.rows})

                        if (props.onBlur) {
                            props.onBlur(val)
                        }
                    }
                }
            />
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
    showKeyboard, hideKeyboard
}

export default connect(mapStateToProps, mapDispatchToProps)(TextareaItem)
