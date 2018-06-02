import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {save, saveChild} from '../actions/MenuAction'
import { Table, Input, Popconfirm, Layout, Alert, Spin, message, Icon, Select } from 'antd'
const Option = Select.Option
class MenuView extends Component 
{
    static propTypes =
    {
        parentdata: React.PropTypes.object.isRequired,
        data: React.PropTypes.array.isRequired,
        save: React.PropTypes.func.isRequired,
        moduleid: React.PropTypes.string.isRequired
    }
    constructor(props)
    {
        super(props)
        this.state = 
        {
            current:
            {
                id : '',
                key : '',
                name : '',
                icon : '',
                loading : false
            },
            newmenu:
            {
                id : '',
                key : '',
                name : '',
                icon : '',
                loading : false
            },
            currentchild:
            {
                id : '',
                key : '',
                parentid : '',
                name : '',
                icon : '',
                url : '',
                permission : "0",
                loading : false
            },
            newchildmenu:
            {
                id : '',
                key : '',
                parentid : '',
                name : '',
                icon : '',
                url : '',
                permission : "0",
                loading : false
            }
        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.parentdata.save_error != this.props.parentdata.save_error && nextProps.parentdata.save_error)
        {
            let state = {...this.state}
            state.current.loading = false
            state.newmenu.loading = false
            state.currentchild.loading = false
            state.newchildmenu.loading = false
            this.setState(state)
        }
        if(nextProps.parentdata.save_new_menu_loading != this.props.parentdata.save_new_menu_loading)
        {
            let newmenu = {...this.state.newmenu}
            if(nextProps.parentdata.save_new_menu_loading != newmenu.loading && newmenu.loading)
            {
                newmenu.loading = nextProps.parentdata.save_menu_loading
                if(!newmenu.loading)
                {
                    newmenu.key = ''
                    newmenu.id = ''
                    newmenu.name = ''
                    newmenu.icon = ''
                }
                this.setState({...this.state, newmenu : newmenu})
            }
        }
        if(nextProps.parentdata.save_menu_loading != this.props.parentdata.save_menu_loading)
        {
            let current = {...this.state.current}
            if(nextProps.parentdata.save_menu_loading != current.loading && current.loading)
            {
                current.loading = nextProps.parentdata.save_new_menu_loading
                if(!current.loading)
                {
                    current.key = ''
                    current.id = ''
                    current.name = ''
                    current.icon = ''
                }
                this.setState({...this.state, current : current})
            }
        }
        if(nextProps.parentdata.save_new_child_loading != this.props.parentdata.save_new_child_loading)
        {
            let newchildmenu = {...this.state.newchildmenu}
            if(nextProps.parentdata.save_new_child_loading != newchildmenu.loading && newchildmenu.loading)
            {
                newchildmenu.loading = nextProps.parentdata.save_new_child_loading
                if(!newchildmenu.loading)
                {
                    newchildmenu.id = ''
                    newchildmenu.key = ''
                    newchildmenu.parentid = ''
                    newchildmenu.name = ''
                    newchildmenu.icon = ''
                    newchildmenu.url = ''
                    newchildmenu.permission = '0'
                    newchildmenu.loading = false
                }
                this.setState({...this.state, newchildmenu : newchildmenu})
            }
        }

        if(nextProps.parentdata.save_child_loading != this.props.parentdata.save_child_loading)
        {
            let currentchild = {...this.state.currentchild}
            if(nextProps.parentdata.save_child_loading != currentchild.loading && currentchild.loading)
            {
                currentchild.loading = nextProps.parentdata.save_child_loading
                if(!currentchild.loading)
                {
                    currentchild.id = ''
                    currentchild.key = ''
                    currentchild.parentid = ''
                    currentchild.name = ''
                    currentchild.icon = ''
                    currentchild.url = ''
                    currentchild.permission = '0'
                    currentchild.loading = false
                }
                this.setState({...this.state, currentchild : currentchild})
            }
        }
    }
    edit(id, key, name, icon)
    {
        if(id)
        {
            let current = {...this.state.current}
            current.id = id
            current.key = key
            current.name = name
            current.icon = icon
            this.setState({...this.state, current : current})
        }
        else
        {
            let newmenu = {...this.state.newmenu}
            newmenu.id = id
            newmenu.key = key
            newmenu.name = name
            newmenu.icon = icon
            this.setState({...this.state, newmenu : newmenu})
        }
    }
    editChild(id, key, name, icon, url, permission)
    {
        if(id)
        {
            let currentchild = {...this.state.currentchild}
            currentchild.id = id
            currentchild.key = key
            currentchild.name = name
            currentchild.icon = icon
            currentchild.url = url
            currentchild.permission = permission
            this.setState({...this.state, currentchild : currentchild})
        }
        else
        {
            let newchildmenu = {...this.state.newchildmenu}
            newchildmenu.id = id
            newchildmenu.key = key
            newchildmenu.name = name
            newchildmenu.icon = icon
            newchildmenu.url = url
            newchildmenu.permission = permission
            this.setState({...this.state, newchildmenu : newchildmenu})
        }
    }
    cancel()
    {
        let current = {...this.state.current}
        current.id = ''
        current.key = ''
        current.name = ''
        current.icon = ''
        this.setState({...this.state, current : current})
    }
    cancelChild()
    {
        let currentchild = {...this.state.currentchild}
        currentchild.id = ''
        currentchild.key = ''
        currentchild.name = ''
        currentchild.icon = ''
        currentchild.permission = ''
        this.setState({...this.state, currentchild : currentchild})
    }

    saveChild(isnew, parentid)
    {
        if(this.props.data.save_child_loading || this.props.data.save_new_child_loading || this.props.parentdata.save_error)
        {
            return false
        }
        if(!isnew)
        {
            let currentchild = {...this.state.currentchild}
            currentchild.loading = true
            this.setState({...this.state, currentchild : currentchild})
            this.props.saveChild(this.state.currentchild.id, parentid,
                                 this.state.currentchild.name,
                                 this.state.currentchild.url,
                                 this.state.currentchild.icon,
                                 this.props.moduleid,
                                 this.state.currentchild.permission
                                )            
        }
        else
        {
            let newchildmenu = {...this.state.newchildmenu}
            newchildmenu.loading = true
            this.setState({...this.state, newchildmenu : newchildmenu})
            this.props.saveChild('',parentid,
                                 this.state.newchildmenu.name,
                                 this.state.newchildmenu.url,
                                 this.state.newchildmenu.icon,
                                 this.props.moduleid,
                                 this.state.newchildmenu.permission
                                )
        }
        
    }
    save(isadd)
    {
        if(this.props.data.save_menu_loading || this.props.data.save_new_menu_loading || this.props.parentdata.save_error)
        {
            return false
        }
        if(!isadd)
        {
            let current = {...this.state.current}
            current.loading = true
            this.setState({...this.state, current : current})
            this.props.save(this.state.current.id,
                            this.state.current.name,
                            this.state.current.icon,
                            this.props.moduleid
                            )
        }
        else
        {
            let newmenu = {...this.state.newmenu}
            newmenu.loading = true
            this.setState({...this.state, newmenu : newmenu})
            this.props.save(this.state.newmenu.id,
                            this.state.newmenu.name,
                            this.state.newmenu.icon,
                            this.props.moduleid
                            )
        }
        
    }
    loadList()
    {
        return (<Table 
                      dataSource={this.props.data}
                      columns={this.setColumn()}
                      showHeader={true}
                      pagination={false}
                      className="secondlevel"
                        />
                )
    }
    setColumn()
    {
        return [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            render: (text, record, index) => 
            {
                let thirdlevel = false
                Object.keys(record).forEach((key) => 
                {
                    if(key=='url')
                    {
                        thirdlevel = true
                    }
                })
                if(thirdlevel)
                {
                    return this.setThirdLevelInputCell(record, 'name', '名称')
                }
                else
                {
                    return this.setInputCell(record, 'name', '名称')
                }
            }
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            width: '25%',
            render: (text, record, index) => 
            {
                let thirdlevel = false
                Object.keys(record).forEach((key) => 
                {
                    if(key=='url')
                    {
                        thirdlevel = true
                    }
                })
                if(thirdlevel)
                {
                    return this.setThirdLevelInputCell(record, 'icon', 'Icon')
                }
                else
                {
                    return this.setInputCell(record, 'icon', 'Icon')
                }
            }
        }
        ,
        {
          title: 'URL',
          dataIndex: 'url',
          key: 'url',
          width: '25%',
          render: (text, record, index) => 
          {
            let thirdlevel = false
            Object.keys(record).forEach((key) => 
            {
                if(key=='url')
                {
                    thirdlevel = true
                }
            })
            if(thirdlevel)
            {
                return this.setThirdLevelInputCell(record, 'url', 'URL')
            }
            else
            {
                return (<div></div>)
            }
          }
        },
        {
          title: '权限',
          dataIndex: 'permission',
          key: 'permission',
          width: '15%',
          render: (text, record, index) => 
          {
            let thirdlevel = false
            Object.keys(record).forEach((key) => 
            {
                if(key=='url')
                {
                    thirdlevel = true
                }
            })
            if(thirdlevel)
            {
                const options = [
                    {
                        name : "普通权限",
                        value : "0"
                    },
                    {
                        name : "管理权限",
                        value : "1"
                    },
                    {
                        name : "超级管理权限",
                        value : "2"
                    }
                ]
                return this.setThirdLevelSelectCell(record, 'permission', '权限', options)
            }
            else
            {
                return (<div></div>)
            }
          }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record, index) => 
            {
                let thirdlevel = false
                Object.keys(record).forEach((key) => 
                {
                    if(key=='url')
                    {
                        thirdlevel = true
                    }
                })
                if(thirdlevel)
                {
                    return this.setChildOperationCell(record)
                }
                else
                {
                    return this.setOperationCell(record)
                }
                
            }
        }]
    }
    setInputCell(record, field, displayName)
    {
        if(record.id)
        {
            let editable = false
            if (record.id == this.state.current.id)
            {
                editable = true
            }
            const value = record[field]
            if(field=='icon' & !editable)
            {
                return (
                    <span className="editable-row-text">
                      <Icon type={value} />
                    </span>
                )
            }
            return (
                editable ?
                <span>
                  <Input
                    value={this.state.current[field]}
                    size="small"
                    style={{ width: 150 }}
                    placeholder={displayName}
                    onChange={e => 
                        {
                            const current = {...this.state.current}
                            current[field] = e.target.value
                            this.setState({...this.state, current : current})
                        }
                    }
                    onKeyUp={e =>{
                        if(e.keyCode === 13)
                        {
                            this.save(false)
                        }
                    }}
                  />
                </span>
                :
                <span className="editable-row-text">
                  {value || ' '}
                </span>
            )
        }

        return (
            <span>
              <Input
                value={this.state.newmenu[field]}
                size="small"
                style={{ width: 150 }}
                placeholder={displayName}
                onChange={e => {
                        const newmenu = {...this.state.newmenu}
                        newmenu[field] = e.target.value
                        this.setState({...this.state, newmenu : newmenu})
                    }
                }
                onKeyUp={e =>{
                    if(e.keyCode === 13)
                    {
                        this.save(true)
                    }
                }}
              />
            </span>
        )
    }


    setThirdLevelInputCell(record, field, displayName)
    {
        if(field=='icon')
        {
            return (<div></div>)
        }
        if(record.id)
        {
            let editable = false
            if (record.id == this.state.currentchild.id)
            {
                editable = true
            }
            const value = record[field]
            return (
                editable ?
                <span>
                  <Input
                    value={this.state.currentchild[field]}
                    size="small"
                    style={{ width: 150 }}
                    placeholder={displayName}
                    onChange={e => 
                        {
                            const currentchild = {...this.state.currentchild}
                            currentchild[field] = e.target.value
                            this.setState({...this.state, currentchild : currentchild})
                        }
                    }
                    onKeyUp={e =>
                    {
                        if(e.keyCode === 13)
                        {
                            this.saveChild(false, record.parentid)
                        }
                    }}
                  />
                </span>
                :
                <span className="editable-row-text">
                  {value || ' '}
                </span>
            )
        }

        return (
            <span>
              <Input
                value={this.state.newchildmenu[field]}
                size="small"
                style={{ width: 150 }}
                placeholder={displayName}
                onChange={e => {
                        const newchildmenu = {...this.state.newchildmenu}
                        newchildmenu[field] = e.target.value
                        this.setState({...this.state, newchildmenu : newchildmenu})
                    }
                }
                onKeyUp={e =>{
                    if(e.keyCode === 13)
                    {
                        this.saveChild(true, record.parentid)
                    }
                }}
              />
            </span>
        )
    }

    setThirdLevelSelectCell(record, field, displayName, dataSource)
    {
        let options = []
        dataSource.map((item, index) => 
        {
            options.push(<Option key={index} value={item.value}>{item.name}</Option>)
        })
        if(field=='icon')
        {
            return (<div></div>)
        }
        if(record.id)
        {
            let editable = false
            if (record.id == this.state.currentchild.id)
            {
                editable = true
            }
            const value = record[field]
            let text = ""
            dataSource.map((item, index) => 
            {
                if(item.value == value)
                {
                    text = item.name
                }
            })
            return (
                editable ?
                <span>
                  <Select style={{ width: 120 }} defaultValue={value} 
                          onChange={v => {
                            const currentchild = {...this.state.currentchild}
                            currentchild[field] = v
                            this.setState({...this.state, currentchild : currentchild})
                        }
                    }>
                      {options}
                  </Select>
                </span>
                :
                <span className="editable-row-text">
                  {text || ' '}
                </span>
            )
        }

        return (
            <span>
              <Select style={{ width: 120, margin:0 }} defaultValue={this.state.newchildmenu[field]}
                          onChange={v => {
                            const newchildmenu = {...this.state.newchildmenu}
                            newchildmenu[field] = v
                            this.setState({...this.state, newchildmenu : newchildmenu})
                        }
                    }>
                      {options}
              </Select>
            </span>
        )
    }

    setOperationCell(record)
    {
        const id = record.id
        const key = record.key
        const name = record.name
        const icon = record.icon
        let editable = false
        if (record.id == this.state.current.id)
        {
            editable = true
        }
        if(id)
        {
            if(this.state.current.loading & editable)
            {
                return (
                  <div className="editable-row-operations">
                    {
                        <span>
                          <Spin size="small" />
                        </span>
                    }
                  </div>)
            }
            return (
                <div className="editable-row-operations">
                {
                    editable ?
                    <span>
                      <a onClick={() => this.save(false)}>保存</a>
                      <Popconfirm title="确定要取消编辑吗?" onConfirm={() => this.cancel()}>
                        <a>取消</a>
                      </Popconfirm>
                    </span>
                    :
                    <span>
                      <a onClick={() => this.edit(id, key, name, icon)}>编辑</a>
                    </span>
                }
                </div>
            )
            
        }
        else
        {
            if(this.state.newmenu.loading)
            {
                return (
                    <div className="editable-row-operations">
                    {
                        <span>
                          <Spin size="small" />
                        </span>
                    }
                    </div>
                )
            }
            return (
                <div className="editable-row-operations">
                {
                    <span>
                      <a onClick={() => this.save(true)}>新增</a>
                    </span>
                }
                </div>
            )
            
            
        }
    }


    setChildOperationCell(record)
    {
        const id = record.id
        const key = record.key
        const name = record.name
        const icon = record.icon
        const url = record.url
        const permission = record.permission
        let editable = false
        if (record.id == this.state.currentchild.id)
        {
            editable = true
        }
        if(id)
        {
            if(this.state.currentchild.loading & editable)
            {
                return (
                  <div className="editable-row-operations">
                    {
                        <span>
                          <Spin size="small" />
                        </span>
                    }
                  </div>)
            }
            return (
                <div className="editable-row-operations">
                {
                    editable ?
                    <span>
                      <a onClick={() => this.saveChild(false, record.parentid)}>保存</a>
                      <Popconfirm title="确定要取消编辑吗?" onConfirm={() => this.cancelChild()}>
                        <a>取消</a>
                      </Popconfirm>
                    </span>
                    :
                    <span>
                      <a onClick={() => this.editChild(id, key, name, icon, url, permission)}>编辑</a>
                    </span>
                }
                </div>
            )
            
        }
        else
        {
            if(this.state.newchildmenu.loading)
            {
                return (
                    <div className="editable-row-operations">
                    {
                        <span>
                          <Spin size="small" />
                        </span>
                    }
                    </div>
                )
            }
            return (
                <div className="editable-row-operations">
                {
                    <span>
                      <a onClick={() => this.saveChild(true, record.parentid)}>新增</a>
                    </span>
                }
                </div>
            )
        }
    }
    render()
    {
        return this.loadList()
    }
}

const mapStateToProps = (state) => (
{
    parentdata : state.module
})

const mapDispatchToProps = 
{
    save : save,
    saveChild : saveChild
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuView)
