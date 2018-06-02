import React, {Component, PropTypes} from 'react'
import './style.scss'

class Container extends Component {
  static propTypes = {
    // 类名
    className           :   PropTypes.string,
    // 样式
    style               :   PropTypes.object,
    // children
    children            :   PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    // 宽度
    width               :   PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  static defaultProps = {
    width               :   600
  }

  render () {
    let className = `component-Container`
    let componentClassName = className
    if (this.props.className) {
      componentClassName += ` ${this.props.className}`
    }
    {/*<div className={componentClassName} style={{...this.props.style, maxWidth : this.props.width}}>*/}
    return (
      <div className={componentClassName} style={{...this.props.style}}>
        {this.props.children}
      </div>
    )
  }
}

export default Container
