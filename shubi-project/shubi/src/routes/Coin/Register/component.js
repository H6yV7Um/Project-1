import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { injectReducer } from 'store/reducers'
import { List, InputItem, Button, Toast } from 'antd-mobile'
import { browserHistory } from 'react-router'
import { clearErifyMailboxMessage, verifyMailbox } from './action'
import Container from 'components/Container'
import ToastContent from 'components/ToastContent'
import getSrc from 'utils/imgSrc'
import { ComponentI18N, translate } from 'appComponents/i18n/ComponentI18N'
import './style.scss'
import { indexSelector } from './selectors'
const mapDispatchToProps = {
  clearErifyMailboxMessage,
  verifyMailbox
}
@connect(indexSelector, mapDispatchToProps)
@translate('register/email')
export default class Register extends ComponentI18N {
  static propTypes = {
    // 注册发送邮箱进行邮箱验证
    verifyMailbox              : PropTypes.func,
    // 清除redux的验证信息
    clearErifyMailboxMessage  : PropTypes.func,
    // 邮箱验证loading
    verifyMailboxLoading      : PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      // 电话号码
      email : '',
      // 是否禁用注册按钮,false表示可用
      isRegisterDisabled : true,
      // 自定义注册按钮样式
      registerStyle : {},
      emailFocus : '',
    }
  }
  componentWillMount () {
    if (localStorage.getItem('isSuccessfully') === "successfully" || localStorage.getItem('isSuccessfully') === "unsuccessfully") {
      browserHistory.push('/result')
    }
  }
  componentDidMount () {
  }

  componentWillUnmount () {

  }

  _handleEmailChange = (value) => {
    // 验证邮箱是否正确
    if (this._verificationEmailNumber(value)) {
      this.setState({
        email : value,
        isRegisterDisabled : false,
        registerStyle : { backgroundColor : '#e68f35' }
      })
    }
    else {
      this.setState({ email : value, isRegisterDisabled : true, registerStyle : {} })
    }
  }

  /**
   * 验证邮箱格式是否正确
   * @param  {number} val 邮箱
   * @return {boolean} 返回判断结果的布尔值
   * @private
   */
  _verificationEmailNumber = (val) => {
    const pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    if (pattern.test(val)) {
      return true
    } else {
      return false
    }
  }

  render () {
    const className = 'register'
    let {
      email,
      isRegisterDisabled,
      registerStyle,
      emailFocus,
    } = this.state
    let {
      verifyMailboxMessage,
      verifyMailboxLoading
    } = this.props.routeIndex
    let bg = getSrc('login/bg.png'),
      logo = getSrc('login/logo.png')
    return (
      <Container
        style={{ paddingLeft : '15px', paddingRight : '15px', background : `url(${bg})` }}
        className={`${className}-index-container`}
      >
        <div className={className}>
          <div className='container'>
            <div className='logo'>
              <img
                src={`${logo}`}
                width='80px'
                height='80px'
              />
              <div className={`${className}-logo-title`}>{this.t('group buy ICO')}</div>
            </div>
            <div className='form-container'>
              <List>
                <div className={`${className}-email-container`}>
                  <InputItem
                    maxLength={100}
                    className={(()=> {
                      if (emailFocus) {
                        return 'emailFocus'
                      }
                      if (verifyMailboxMessage && verifyMailboxMessage.code !== 0) {
                        return 'warningFocus'
                      }
                      if (email) {
                        return 'email'
                      }
                      return ''
                    })()}
                    type="text"
                    placeholder={this.t('Email')}
                    value={email}
                    onChange={(v) => {
                      this._handleEmailChange(v)
                      this.props.clearErifyMailboxMessage()
                    }}
                    onFocus={() => {
                      this.props.clearErifyMailboxMessage()
                      this.setState({ emailFocus : 'emailFocus' })
                    }}
                    onBlur={() => {
                      this.props.clearErifyMailboxMessage()
                      this.setState({ emailFocus : '' })
                    }}
                  >
                    <span className={`${className}-email-label`}></span>
                  </InputItem>
                  {(
                    verifyMailboxMessage && verifyMailboxMessage.code !== 0
                      ?
                      (
                        <span className={`${className}-warning`}>
                          {(
                            verifyMailboxMessage.code === 1022
                              ?
                              this.t('registered')
                              :
                              this.t('invalid')
                          )}
                          </span>
                      )
                      :
                      null
                  )}
                </div>
                <div
                  className='btn'
                >
                  <Button
                    loading={verifyMailboxLoading}
                    className={!isRegisterDisabled ? 'btnRegister' : ''}
                    disabled={isRegisterDisabled}
                    style={registerStyle}
                    onClick={() => {
                      this.setState({ isRegisterDisabled : true })
                      this.props.verifyMailbox(email,(err, res)=>{
                          Toast.info(<ToastContent style={{ fontSize : '14px' }} type='success' content={'Message has been sent'}/>, 2, null, false)
                      },()=>{
                      })
                    }}
                  >
                    {this.t('creat account')}
                  </Button>
                </div>
              </List>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}





