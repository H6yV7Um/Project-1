import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import fastClick from 'fastclick'
import { I18nextProvider } from 'react-i18next' // as we build ourself via webpack
import i18n from 'appComponents/i18n/i18n' // initialized i18next instance

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    store: PropTypes.object.isRequired
  }

  componentDidMount () {
    fastClick.attach(document.body)
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={routes}/>
          </div>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default AppContainer
