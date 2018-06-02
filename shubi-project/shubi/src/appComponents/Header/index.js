import React, { Component, PropTypes } from 'react'
import './style.scss'
import getSrc from 'utils/imgSrc'
import Search from '../Search'
class Header extends Component {
    constructor (props) {
      super(props)
    }
    componentWillMount(){
      console.log(document.documentElement.clientWidth)
    }
    render () {
      const className = 'app-components-header'
      const logo = getSrc('login/logo.png')
      return (
        <div className={className}>
          <div className={`${className}-header-container`}>
            <img className={`${className}-header-left`} src={logo} width="56px"/>
            <div className={`${className}-header-right`}>
              <span className={`${className}-header-search`}>
               <Search/>
              </span>
              <span className={`${className}-header-coin-container`}>
                <a className={`${className}-header-icon`}></a>
              </span>
            </div>
          </div>

        </div>
      )
    }
}

export default Header

