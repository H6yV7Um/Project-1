import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from './action'
import './style.scss'

const mapStateToProps = state => ({
  reducer : state.index
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {
  static propTypes = {}

  constructor (props) {
    super(props)
    this.state = {}
  }


  componentWillMount () {
  }

  render () {
    const className = 'Index'
    return (
      <div
        className={className}
      >
        hello coin
      </div>
    )
  }
}

