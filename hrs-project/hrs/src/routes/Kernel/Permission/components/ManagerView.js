import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Layout, Input, Icon, Button, Tree } from 'antd'
const TreeNode = Tree.TreeNode
class ManagerView extends Component 
{
	constructor(props)
    {
        super(props)
        this.state = 
	    {
	        checkedKeys: []
	    }
    }
	static propTypes =
    {
        modules: React.PropTypes.array.isRequired,
        user: React.PropTypes.object.isRequired
    }
    componentWillMount()
    {
    	this.getChecked()
    }
    render()
    {
    	return (
    			<div style={{maxHeight:400}}>
    				<Tree
    					 checkable={true}
    					 multiple={true}
    					 checkedKeys={this.state.checkedKeys}
    					 onCheck={this.onCheck}
    					 >
                    	{this.loop(this.props.modules)}
                	</Tree>
    			</div>
    		)
    }
    loop(data)
    {
    	let moduleView = []
    	data.map((item, index) =>
    	{
    		let disabled = true
    		switch(this.props.user.group)
    		{
    			case "0":
    				if(item.permission=="0")
    				{
    					disabled = false
    				}
    				break
    			case "1":
    				if(item.permission=="0" || item.permission=="1")
    				{
    					disabled = false
    				}
    				break
    			case "2":
    				disabled = false
    				break
    		}
    		if(item.menus)
    		{
    			moduleView.push(
    			<TreeNode name={item.name} title={item.name} disabled={disabled} key={item._id.$oid}>
    				{this.loopMenu(item.menus)}
      			</TreeNode>
    			)
    		}
    		else
    		{
    			moduleView.push(
    			<TreeNode name={item.name} title={item.name} disabled={disabled} key={item._id.$oid}>
      			</TreeNode>
    			)
    		}
    	})
    	return moduleView
    }
    loopMenu(data)
    {
    	let menuView = []
    	data.map((item, index) =>
    	{
    		let disabled = true
    		let thirdlevel = false
            Object.keys(item).forEach((key) => 
            {
                if(key=='url')
                {
                    thirdlevel = true
                }
            })
            if(thirdlevel)
    		{
	    		switch(this.props.user.group)
	    		{
	    			case "0":
	    				if(item.permission=="0")
	    				{
	    					disabled = false
	    				}
	    				break
	    			case "1":
	    				if(item.permission=="0" || item.permission=="1")
	    				{
	    					disabled = false
	    				}
	    				break
	    			case "2":
	    				disabled = false
	    				break
	    		}
    		}
    		else
    		{
    			disabled = false
    		}
    		
    		if(item.sub)
    		{
	    		menuView.push(
	    			<TreeNode name={item.name} disabled={disabled} title={item.name} key={item._id.$oid}>
	    				{this.loopMenu(item.sub)}
	      			</TreeNode>
	    		)
    		}
    		else
    		{
    			menuView.push(
	    			<TreeNode name={item.name} disabled={disabled} title={item.name} key={item._id.$oid}>
	      			</TreeNode>
	    		)
    		}
    	})
    	return menuView
    }
    getChecked()
    {
    	let checkedKeys = this.state.checkedKeys
		for(let i=0; i<this.props.user.permission.length;i++)
		{
			for(let u=0;u<this.props.user.permission[i].menus.length;u++)
			{
				checkedKeys.push(this.props.user.permission[i].menus[u].menuid.$oid)
			}
		}
		this.setState({checkedKeys:checkedKeys})
    }
    onCheck = (checkedKeys) => 
    {
	    this.setState({
	      checkedKeys
	    })
    }
    getPermission()
    {
    	let permission = []
    	this.props.modules.map((item, i)=>
    	{
    		let permissionModule = {}
    		item.menus.map((menu, m)=>
    		{
            	menu.sub.map((submenu, s)=>
            	{
            		this.state.checkedKeys.map((key, k)=>
					{
	            		if(submenu._id.$oid==key)
	            		{
	            			if(!Object.keys(permissionModule).length)
	            			{
	            				permissionModule=(
			    				{
			                        menus:[],
			                        moduleid:item._id
			                    })
	            			}
	            			switch(this.props.user.group)
	            			{
	            				case "0":
	            					permissionModule.menus.push(
		                            {
		                                menuid:submenu._id,
		                                permission:"0"
		                            })
		                            break
		                        case "1":
		                        	permissionModule.menus.push(
		                            {
		                                menuid:submenu._id,
		                                permission:"1"
		                            })
		                            break
		                        case "2":
		                        	permissionModule.menus.push(
		                            {
		                                menuid:submenu._id,
		                                permission:"1"
		                            })
		                            break

	            			}
	            		}
	            	})
            	})
            })
            if(Object.keys(permissionModule).length)
            {
    			permission.push(permissionModule)
    		}
    	})
    	return permission
    }
}
export default ManagerView