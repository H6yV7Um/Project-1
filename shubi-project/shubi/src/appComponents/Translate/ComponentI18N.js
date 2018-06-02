import { Component, PropTypes } from 'react'
import { translate } from 'react-i18next'
class ComponentI18N extends Component {
  static propTypes = {
    t: PropTypes.func,
  }
  constructor (props) {
    super(props)

    this.t = this.t.bind(this)
    this.tCommon = this.tCommon.bind(this)
  }
  tCommon (commonKey) {
    return this.props.t('common:' + commonKey)
  }
  t (key) {
    // debugger
    return this.props.t(key)
  }
}

export { ComponentI18N, translate }
