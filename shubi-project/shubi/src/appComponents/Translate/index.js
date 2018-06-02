import React, { Component, PropTypes } from 'react'
import { ComponentI18N, translate } from './ComponentI18N'
export default (WrappedComponent, name) => {
  class I18n extends ComponentI18N {
    constructor (props) {
      super(props)
      this.t =  this.t.bind(this)
    }
    render () {
      return (
        <WrappedComponent
          {...this.props}
          t={this.t}
        />
      )
    }
  }
  return translate(name)(I18n)
}
