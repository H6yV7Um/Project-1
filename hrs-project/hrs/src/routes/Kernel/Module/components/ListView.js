import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {getList, save, setError} from '../actions/ListAction'
import {Table, Input, Popconfirm, Layout, Alert, Spin, message, Card} from 'antd'
import ModuleView from './ModuleView'
class ListView extends Component {
    constructor (props) {
        super(props)

    }
    render () {
        return (
            <Layout className="layout-main">
                <div className="h1">模块设置</div>
                <div className="table-container">
                    <ModuleView></ModuleView>
                </div>
            </Layout>
        )
    }
}

// Const mapStateToProps = (state) => ({})

// Const mapDispatchToProps = {}
// Connect(mapStateToProps, mapDispatchToProps)(ListView)
export default ListView
