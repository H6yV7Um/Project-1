import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Layout, Input, Tree, Spin, Select, Icon, Button, Modal, Card, Row, Col } from 'antd'
import {getList, toggle, setParentID, setCurrentDepartment} from '../actions/OrganizationAction'
import AddView from './AddView'
import UpdateView from './UpdateView'
const Search = Input.Search
const Option = Select.Option
const TreeNode = Tree.TreeNode
const Content = Layout.Content
class OrganizationView extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            current: {
                userid: '',
                loading: false
            },
            currentpermission:{
                userid: ''
            }
        }
    }
    static propTypes =
    {
        data: React.PropTypes.object.isRequired,
        getList: React.PropTypes.func.isRequired,
        toggle: React.PropTypes.func.isRequired,
        setParentID: React.PropTypes.func.isRequired,
        setCurrentDepartment: React.PropTypes.func.isRequired
    }
    componentWillMount()
    {
        this.props.getList()
    }
    componentWillReceiveProps(nextProps)
    {
    }
    render()
    {
        if(this.props.data.status== 'tree')
        {
            return (
                    <Layout className="layout-main">
                        <div className="h1">组织架构设置</div>
                        <div className="table-container">
                            <Search style={{ width: 300 }} placeholder="Search" onChange={(e) => this.onChange(e, this)} />
                            {this.tree()}
                        </div>
                    </Layout>
                )
        }
        else if(this.props.data.status== 'add')
        {
            return (
                <AddView />
            )
        }
        else if(this.props.data.status== 'edit')
        {
            return (
                <UpdateView />
            )
        }
    }
    tree()
    {
        if(this.props.data.data.organization != undefined)
        {
            return(
            <div className="organizationtree">
                <Tree
                     onExpand={(expandedKeys) => this.onExpand(expandedKeys, this)}
                     expandedKeys={this.state.expandedKeys}
                     showLine={true}
                     draggable={true}
                >
                    {this.loop(this.props.data.data.organization)}
                </Tree>
            </div>
            )
        }
        else if(this.props.data.listLoading)
        {
            return(
                <div className="TableLoading">
                    <Spin size="large"></Spin>
                </div>
            )
        }
    }
    loop(data)
    {
        let childNode = []
        data.map((item, i) => 
        {
            const index = item.name.search(this.state.searchValue)
            const beforeStr = item.name.substr(0, index)
            const afterStr = item.name.substr(index + this.state.searchValue.length)
            const memberCount = item.members.length+this.countMembers(item.children)
            const title = index > -1 ? (
                <div style={{fontSize:14}}>
                    {beforeStr}
                        <span style={{ color: '#f50' }}>
                            {this.state.searchValue}
                        </span>
                    {afterStr}
                </div>
                )
            :
                (<div style={{fontSize:14}}>{item.name}</div>)

            let container = (
                <Row className="row" style={{width:"800px"}}>
                    <Col span={10}>
                        {title}
                    </Col>
                    <Col span={4}>
                        <span style={{color:"#ccc",fontSize:"12px"}}>已有{memberCount}人</span>
                    </Col>
                    <Col span={10}>
                        <span className="buttonBar">
                            <Button
                              onClick={()=>
                                {
                                    this.props.setParentID(item._id.$oid)
                                    this.props.toggle('add')
                                }}>
                            新增子部门</Button>
                            <Button
                              onClick={()=>
                                {
                                    this.props.setCurrentDepartment(item)
                                    this.props.toggle('edit')
                                }}
                            >编辑</Button>
                            {!memberCount?(
                                    <Button>删除</Button>
                            ):(null)}
                        </span>
                    </Col>
                </Row>
            )
            if (item.children.length)
            {
                let sub = []
                sub = sub.concat(this.loop(item.children))
                childNode.push (
                    <TreeNode name={item.name} title={container} key={item._id.$oid}>
                    {sub}
                    </TreeNode>
                )
            }
            else
            {
                childNode.push( 
                    <TreeNode name={item.name} isLeaf={true} title={container} key={item._id.$oid} /> 
                )
            }
                
        })
        return childNode
    }
    countMembers(items)
    {
        let result = 0
        for(let item of items)
        {
            result += item.members.length + this.countMembers(item.children)
        }
        return result

    }
    onChange(e, obj)
    {
        const value = e.target.value
        let expandedKeys =[]
        this.props.data.data.organization.map((item) => 
        {
            if (item.name.indexOf(value) > -1)
            {
                expandedKeys.push(item.did.toString())
            }
            item.members.map((member) =>
            {
                if (member.name.indexOf(value) > -1)
                {
                    expandedKeys.push(member.userid)
                }
            })
            expandedKeys = expandedKeys.concat(obj.getParentKey(value, item.did, item.children))
        })
        if(!value)
        {
            obj.setState(
            {
              expandedKeys : [],
              searchValue: value,
              autoExpandParent: true
            })
        }
        else
        {
            obj.setState(
            {
              expandedKeys : expandedKeys,
              searchValue: value,
              autoExpandParent: true
            })
        }
    }
    onExpand(expandedKeys, obj)
    {
        obj.setState({
          expandedKeys,
          autoExpandParent: false
        })
    }
    getParentKey(value, key, tree)
    {
        let expandedKeys = []
        tree.map((item) =>
        {
            if (item.name.indexOf(value) > -1)
            {
                expandedKeys.push(item.did.toString())
            }
            item.members.map((member) =>
            {
                if (member.name.indexOf(value) > -1)
                {
                    expandedKeys.push(member.userid)
                }
            })
            expandedKeys = expandedKeys.concat(this.getParentKey(value, item.did, item.children))
        })
        return expandedKeys
    }
}
const mapStateToProps = (state) => ({
    data: state.organization
})

const mapDispatchToProps = {
    getList, toggle, setParentID, setCurrentDepartment
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationView)
