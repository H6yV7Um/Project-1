import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Layout, Input, Tree, Spin, Select, Icon, Button, Modal, Card, Row, Col } from 'antd'
import {getList, updateGroup, setError, updatePermission} from '../actions/PermissionAction'
import ManagerView from './ManagerView'
const Search = Input.Search
const Option = Select.Option
const TreeNode = Tree.TreeNode
const Content = Layout.Content
class PermissionView extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            permissionModalVisible:false,
            current: {
                _id: '',
                loading: false
            },
            currentpermission:{
                _id: ''
            }
        }
    }
    static propTypes =
    {
        data: React.PropTypes.object.isRequired,
        getList: React.PropTypes.func.isRequired,
        setError: React.PropTypes.func.isRequired,
        updateGroup: React.PropTypes.func.isRequired,
        updatePermission: React.PropTypes.func.isRequired
    }
    componentWillMount() {
        this.props.getList()
    }
    componentWillReceiveProps(nextProps)
    {
        if(!this.props.data.update_permission_loading && nextProps.data.update_permission_loading)
        {
            this.setModalVisible(false, '')
        }
        if(this.state.current.loading && !nextProps.data.update_group_loading)
        {
            let current = {...this.state.current}
            current._id = ''
            current.loading = false
            this.setState({...this.state, current: current})
        }
        if(nextProps.data.update_group_error)
        {
            this.errorNotice(nextProps.data.update_group_error)
        }
    }
    errorNotice(message)
    {
        message.error(message, 3, () => {
            this.props.setError()
        })
    }
    render()
    {
        return (
                <Layout className="layout-main">
                    <div className="h1">权限设置</div>
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
            let modal = ""
            if(this.state.permissionModalVisible && this.state.currentpermission._id == item._id.$oid)
            {
                modal = (
                    <Modal
                          title="权限设置"
                          wrapClassName="permission-modal"
                          visible={this.state.permissionModalVisible}
                          onOk={() => this.submitPermission(item._id.$oid, item.group)}
                          onCancel={() => this.setModalVisible(false, '')}
                          confirmLoading={this.props.data.update_permission_loading}
                        >
                        <ManagerView user={item} modules={this.props.data.data.module} ref="manager"></ManagerView>
                    </Modal>
                )
            }
            const settingButton = item.group != 2 ?

                (
                    <span>
                        <Button style={{marginLeft:10}} onClick={(e) => this.setModalVisible(true, item._id.$oid)}>权限设置</Button>
                        {modal}
                    </span>
                )
            :""
            
            let container = []
            if(this.state.current._id === item._id.$oid && this.state.current.loading)
            {
                container = (
                    <Row className="row">
                        <Col span={4}>
                            {title}
                        </Col>
                        <Col span={6}>
                        </Col>
                        <Col span={10}>
                            <Spin />
                        </Col>
                    </Row>
                    )
            }
            else
            {
                container = (
                    <Row className="row">
                        <Col span={4}>
                            {title}
                        </Col>
                        <Col span={6}>
                            <span>
                                <Select defaultValue={item.group.toString()} style={{ width: 120,marginLeft:10 }} onChange={(e) => this.updateGroup(e, item._id.$oid)} >
                                    <Option value="0">普通用户</Option>
                                    <Option value="1">管理员</Option>
                                    <Option value="2">超级管理员</Option>
                                </Select>
                            </span>
                        </Col>
                        <Col span={10}>
                            {settingButton}
                        </Col>
                    </Row>
                    )
            }
            childNode.push( <TreeNode name={item.name} title={container} isLeaf={true} key={item._id.$oid} />)
        })
        return childNode
    }
    submitPermission(_id, group)
    {
        let permission = this.refs.manager.getPermission()
        this.props.updatePermission(_id, permission, group)
    }
    setModalVisible(visible, _id)
    {
        this.setState(
            {
              permissionModalVisible: visible,
              currentpermission:{
                _id:_id
              }
            })
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
    updateGroup(e, _id)
    {
        let current = {...this.state.current}
        current._id = _id
        current.loading = true
        this.setState({...this.state, current: current})
        this.props.updateGroup(_id, e)
    }
}
const mapStateToProps = (state) => ({
    data: state.permission
})

const mapDispatchToProps = {
    getList: getList,
    updateGroup: updateGroup,
    setError: setError,
    updatePermission: updatePermission
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionView)
