import React, {Component, PropTypes} from 'react'
import { Layout } from 'antd'
export class CoreFooter extends Component {
	static propTypes =
    {
    }
	render(){
		return(
			<Layout className="layout-footer">
            	Tap4Fun &copy;
            </Layout>
            )
	}
}
