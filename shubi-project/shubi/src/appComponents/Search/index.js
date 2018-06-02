import React, { Component, PropTypes } from 'react'
import './style.scss'
import { Input, Icon } from 'antd'
class Search extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const className = 'app-components-search'
    return (
      <div className={className}>
        <Input
          placeholder="Search"
          onSearch={value => console.log(value)}
          style={{ width : 149 }}
          prefix={<Icon type="search" style={{ color: 'white',fontSize: "14px" }} />}
        />
      </div>
    )
  }
}

export default Search

