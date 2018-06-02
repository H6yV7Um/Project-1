import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from './action'
import './style.scss'
import Container from 'components/Container'
import getSrc from 'utils/imgSrc'
import { browserHistory } from 'react-router'
import { ComponentI18N, translate } from 'appComponents/i18n/ComponentI18N'
const mapDispatchToProps = {}
@connect(null, mapDispatchToProps)
@translate('register/success')
export default class Success extends ComponentI18N {
  constructor (props) {
    super(props)

    this.state = {
      isSuccessfully : true
    }
  }

  static propTypes =
  {}

  componentWillMount () {
    if (localStorage.getItem('isSuccessfully') === "successfully") {
      this.setState({ isSuccessfully : true })
    }
    if (localStorage.getItem('isSuccessfully') === "unsuccessfully") {
      this.setState({ isSuccessfully : false })
    }
    // 等于0表示注册成功
    if (this.props.location.query.code === '0') {
      this.setState({ isSuccessfully : true })
      localStorage.setItem("isSuccessfully", "successfully")
    }
    // 注册失败
    else if (this.props.location.query.code === '1'){
      this.setState({ isSuccessfully : false })
      localStorage.setItem("isSuccessfully", "unsuccessfully")
    }
  }

  render () {
    let className = 'index-component-success'
    let bg = getSrc('login/bg.png'),
      successLogo = getSrc('success/successLogo.png'),
      failLogo = getSrc('fail/fail.png')

    let { isSuccessfully } = this.state
    return (
      <Container
        style={{ paddingLeft : '15px', paddingRight : '15px', background : `url(${bg})` }}
        className={`${className}-index-container`}
      >
        <div className={className}>
          <div className={`${className}-container`}>
            <div className={`${className}-title`}>
              {(
                isSuccessfully
                  ?
                  this.t('Success')

                  :
                  this.t('Fail')
              )}
            </div>
            <div className={`${className}-logo-container`}>
              <div className={`${className}-logo`}>
                <img width="79px" height="79px" src={isSuccessfully ? successLogo : failLogo}/>
                <div>
                  {(
                    isSuccessfully
                      ?
                      this.t('coming soon ... ')

                      :
                      this.t('try again')
                  )}
                </div>
              </div>
            </div>
            {(
              isSuccessfully
                ?
                null
                :
                <div className={`${className}-back`}>
                  <a onClick={()=> {
                    browserHistory.push('/')
                  }}>
                    &lt;  {this.t('Back')}
                  </a>
                </div>
            )}
          </div>
        </div>
      </Container>
    )
  }
}

