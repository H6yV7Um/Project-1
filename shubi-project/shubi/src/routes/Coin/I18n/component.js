import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { injectReducer } from 'store/reducers'
import { Button } from 'antd-mobile'
import './style.scss'
import { ComponentI18N, translate } from 'appComponents/i18n/ComponentI18N'
import { getLatestLocale, getLngByLocale, LANG } from 'appComponents/i18n/i18n.constance'
import i18n from 'appComponents/i18n/i18n' // initialized i18next instance
// @translate()
class I18n extends ComponentI18N {
  constructor (props) {
    super(props)
    this.toggleLanguage = this.toggleLanguage.bind(this)
  }
  toggleLanguage (locale) {
    this.currentLng = getLngByLocale(locale)
    console.log('currentLng', this.currentLng)
    i18n.changeLanguage(locale)
  }
  componentWillMount () {
  }
  componentWillUnmount () {
  }
  render () {
    const className = 'routeAppIndex'
    return (
      <div className={className}>
        <div className='container'>
          {this.t('test')}
          <Button
            className={'btn btn-primary'}
            onClick={() => this.toggleLanguage(LANG.EN.locale)}
          >EN</Button>
          <Button
            className={'btn btn-warn'}
            onClick={() => this.toggleLanguage(LANG.ZH.locale)}
          >中文</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(translate()(I18n))

