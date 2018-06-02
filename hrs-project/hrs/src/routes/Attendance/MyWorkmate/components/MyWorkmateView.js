import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Layout, Input, Tree, Spin, Select, Icon, Button, Modal, Card, Row, Col } from 'antd'
import {getList, setError} from '../actions/MyWorkmateAction'
const Search = Input.Search
const Option = Select.Option
const TreeNode = Tree.TreeNode
const Content = Layout.Content
class MyWorkmateView extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            permissionModalVisible:false,
        }
    }
    static propTypes =
    {
        data: React.PropTypes.object.isRequired,
        getList: React.PropTypes.func.isRequired,
    }
    componentWillMount() {
        this.props.getList()
    }
    render()
    {
        return (
                <Layout className="layout-main">
                    <div className="h1">我的同事</div>
                    <div className="table-container">
                        <Search style={{ width: 300 }} placeholder="Search" onChange={(e) => this.onChange(e, this)} />
                        {this.tree()}
                    </div>
                </Layout>
            )
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
                >
                    {this.loop(this.props.data.data.organization)}
                </Tree>
            </div>
            )
        }
        else if(this.props.data.list_loading)
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
            const title = index > -1 ? 
            (
                <div style={{fontSize:14}}>
                  {beforeStr}
                    <span style={{ color: '#f50' }}>
                        {this.state.searchValue}
                    </span>
                  {afterStr}
                </div>
            )
            :
            <div style={{fontSize:14}}>{item.name}</div>
            let container = (
                <Row className="row">
                    <Col span={8}>
                        {title}
                    </Col>
                    <Col span={6}>
                    </Col>
                    <Col span={10}>
                    </Col>
                </Row>
            )
            if (item.children) 
            {
                let sub = []
                sub = sub.concat(this.loop(item.children))
                sub = sub.concat(this.loopMember(item.members))
                childNode.push (
                  <TreeNode name={item.name} title={container} key={item._id.$oid}>
                    {sub}
                  </TreeNode>
                )
            }
            else
            {
                if(item.members)
                {
                    childNode.push( 
                        <TreeNode name={item.name} title={container} key={item._id.$oid}>
                            {this.loopMember(item.members)}
                        </TreeNode>
                    )
                }
                else
                {
                    childNode.push( 
                        <TreeNode name={item.name} title={container} key={item._id.$oid} /> 
                    )
                }
            }
        })
        return childNode
    }
    loopMember(data)
    {
        let childNode = []
        data.map((item, i) => 
        {
            const index = item.name.search(this.state.searchValue)
            const beforeStr = item.name.substr(0, index)
            const afterStr = item.name.substr(index + this.state.searchValue.length)
            const title = index > -1 ? (
                <span>
                  {beforeStr}
                    <span style={{ color: '#f50' }}>
                        {this.state.searchValue}
                    </span>
                  {afterStr}
                </span>
                )
            :
            (
                <span>
                {item.name}
                </span>
            )
            let container = (
                <Row className="row">
                    <Col span={4}>
                        {title}
                    </Col>
                    
                </Row>
            )
            childNode.push( <TreeNode name={item.name}  title= {container} isLeaf={true} key={item._id.$oid} />)
        })
        return childNode
    }
   
    onChange(e, obj)
    {
        const value = e.target.value
        let expandedKeys =[]
        this.props.data.data.organization.map((item) => 
        {
            if (item.name.indexOf(value) > -1)
            {
                expandedKeys.push(item._id.$oid)
            }
            item.members.map((member) =>
            {
                if (member.name.indexOf(value) > -1)
                {
                    expandedKeys.push(member._id.$oid)
                }
            })
            expandedKeys = expandedKeys.concat(obj.getParentKey(value, item._id.$oid, item.children))
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
                expandedKeys.push(item._id.$oid.toString())
            }
            item.members.map((member) =>
            {
                if (member.name.indexOf(value) > -1)
                {
                    expandedKeys.push(member._id.$oid)
                }
            })
            expandedKeys = expandedKeys.concat(this.getParentKey(value, item._id.$oid, item.children))
        })
        return expandedKeys
    }
}
const mapStateToProps = (state) => ({
    data: state.myworkmate
})
const mapDispatchToProps = {
    getList: getList,
    setError: setError,
}
export default connect(mapStateToProps, mapDispatchToProps)(MyWorkmateView)
