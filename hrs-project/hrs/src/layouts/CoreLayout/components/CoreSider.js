import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import { Layout, Menu, Icon, Spin } from 'antd'

const SubMenu = Menu.SubMenu

class CoreSider extends Component {
	static propTypes =
    {
        menu: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired
    }
    constructor(props)
    {
        super(props)
        this.state = 
        {
            menuState:
            {
                defaultSelectedKeys: [],
                defaultOpenKeys: []
            }
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(this.props.menu.menus.length != nextProps.menu.menus.length)
        {
            this.getCurrentPosition(nextProps.menu.menus)
        }
    }
    getMenus()
    {
        const menu = this.props.menu.menus
        let menulist = [(<Menu.Item key="0"><Link to="/"><Icon type="home" /><span>首页</span></Link></Menu.Item>)]
        
        menu.map((item, index) => {
            let sublist = []
            if(item.sub)
            {
                item.sub.map((child, childindex) => {
                    sublist.push(<Menu.Item key={child._id.$oid}><Link to={child.url}>{child.name}</Link></Menu.Item>)
                })
                menulist.push(
                    <SubMenu key={item._id.$oid}
                             title={<span><Icon type={item.icon} /><span className="nav-text">{item.name}</span></span>}
                             >{sublist}</SubMenu>)
            }
            else
            {
                menulist.push(<Menu.Item key={item._id.$oid}><Link to={item.url}><Icon type={item.icon} /><span className="nav-text">{item.name}</span></Link></Menu.Item>)
            }
        })
        return menulist
    }
	render()
    {
        if(this.props.menu.menus.length)
        {
            return(
              <Menu mode="inline"
                    defaultOpenKeys={this.state.menuState.defaultOpenKeys}
                    defaultSelectedKeys={this.state.menuState.defaultSelectedKeys}
                    >
                {this.getMenus()}
              </Menu>
            )
        }
        else
        {
            return (
            <Layout className="layout-loading">
                <Spin size="large"></Spin>
            </Layout>
            )
        }
	}
    getCurrentPosition(menus)
    {
        if(this.props.location.pathname=='/')
        {
            this.setState({...this.state,"menuState":{defaultSelectedKeys:["0"], defaultOpenKeys:[]}})
            return false
        }
        if(menus)
        {
            for(let i=0;i<menus.length;i++)
            {
                for(let u=0;u<menus[i].sub.length;u++)
                {
                    if(menus[i].sub[u].url==this.props.location.pathname)
                    {
                        let state = {
                            defaultSelectedKeys: [menus[i].sub[u]._id.$oid],
                            defaultOpenKeys: [menus[i]._id.$oid]
                        }
                        this.setState({...this.state, "menuState":state})
                        return true
                    }
                }
            }
        }
        else
        {
            this.setState({...this.state,"menuState":{defaultSelectedKeys:["0"], defaultOpenKeys:[]}})
            return false
        }
    }
}
export default CoreSider