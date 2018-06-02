import React, {Component} from 'react'
import {connect} from 'react-redux'
import {injectReducer} from 'store/reducers'
import component from '../components/Spin'
import $ from 'jquery'

import {} from '../action'

const mapStateToProps = state => ({
    loginMessage: state.userLogin.loginMessage,
    height: $(window).height()
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(component)