import React, {Component} from 'react'
import {connect} from 'react-redux'
import Index from '../components/Index'

import {login} from '../action'

const mapStateToProps = state => ({
    loginMessage: state.userLogin.loginMessage
})

const mapDispatchToProps = dispatch => ({
    // 登录
    login : code => {
        dispatch(login(code, data => {
            // 延迟一会儿跳转,看下字
            setTimeout(() => {
                // 跳转
                window.location.href = '/'
            }, 1000)
        }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
