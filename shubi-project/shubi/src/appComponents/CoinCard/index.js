import React, { Component, PropTypes } from 'react'
import './style.scss'
class CoinCard extends Component {
  static propTypes = {
    // card logo路径
    logoPath : PropTypes.string,
    // 追加类名
    className : PropTypes.string
  }

  static defaultProps = {
    className : '',
    style : {}
  }

  constructor (props) {
    super(props)
  }

  render () {
    const componentClassName = 'app-components-coin-card'
    let { logoPath, className, style } = this.props
    return (
      <div className={`${className} ${componentClassName}`} style={style}>
        <div className={`${componentClassName}-coin-logo`}>
          <img
            width="113px"
            src={logoPath}
          />
        </div>
        <div className={`${componentClassName}-coin-card-content`}>
          <p>Coinvest</p>
          <p>Energy</p>
          <p>START DATE: 1 Feb</p>
        </div>
        <div className={`${componentClassName}-coin-card-footer`}>
          GOAL: $35,000,000
        </div>
      </div>
    )
  }
}

export default CoinCard

