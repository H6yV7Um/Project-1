import React, {Component, PropTypes} from 'react'
import { Layout, Spin } from 'antd'
import {SERVER} from 'config'
import noimage from 'assets/no-user-image.jpg'

const { Header } = Layout

export class CoreHeader extends Component {
	static propTypes =
    {
        user: React.PropTypes.object.isRequired
    }
	render()
    {
        if(!this.props.user.selfie)
        {
            return(<div />)
        }
		return(
			<Header className="layout-header">
                    <div className="layout-logo" />
                    <div className="avatar">
                        <img src={this.props.user.selfie.length ? SERVER+'organization/file/download/'+this.props.user.selfie[0]._id.$oid :noimage} />
                        <div className="info">
                            {this.props.user.name}
                        </div>
                    </div>
            </Header>
            )
	}
}