import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from './action'
import { InputItem } from 'antd-mobile'
import './style.scss'

const mapStateToProps = state => ({
  reducer: state.LayoutCion
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class Cion extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  static propTypes =
    {}

  componentWillMount () {
  }

  render () {
    let className = 'LayoutCion'
    return (
      <div
        className={className}
      >
        {/*header*/}
        {/*body*/}
        <div
          className={`${className}-body`}
        >
          {this.props.children}
        </div>
        {/*footer*/}
      </div>
    )
  }
}

