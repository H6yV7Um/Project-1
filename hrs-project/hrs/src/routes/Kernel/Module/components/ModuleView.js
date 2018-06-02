import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {getList, save, setError} from '../actions/ListAction'
import { Table, Input, Popconfirm, Layout, Alert, Spin, message, Select } from 'antd'
import MenuView from './MenuView'
const Option = Select.Option;
class ModuleView extends Component {
    static propTypes =
    {
        data: React.PropTypes.object.isRequired,
        getList: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
    }
    constructor(props)
    {
        super(props)
        this.state = 
        {
            current:
            {
                key : '',
                name : '',
                namespace : '',
                version : '',
                permission : '0'
            },
            newmodule:
            {
                name : '',
                namespace : '',
                version : '',
                permission : '0'
            }
        }
    }
    componentWillMount() {
        this.props.getList()
    }
    componentWillReceiveProps(nextProps)
    {
        if(this.props.data.save_error != nextProps.data.save_error)
        {
            if(nextProps.data.save_error)
            {
                this.errorNotice(nextProps.data.save_error)
            }
        }

        if(!nextProps.data.save_error & !nextProps.data.save_loading)
        {
            this.setState(
            {
                current:
                {
                    key : '',
                    name : '',
                    namespace : '',
                    version : '',
                    permission : '0'
                }
            })
        }
        if(this.props.data.save_new_loading & !nextProps.data.save_new_loading)
        {
            this.setState(
            {
                newmodule:
                {
                    name : '',
                    namespace : '',
                    version : '',
                    permission : '0'
                }
            })
        }
    }
    
    errorNotice(message)
    {
        message.error(message, 3, () => {
            this.props.setError()
        })
    }

    edit(key, name, namespace, version, permission)
    {
        if(this.props.data.list_loading || this.props.data.save_loading || this.props.data.save_new_loading)
        {
            return false
        }
        if(this.state.current.key == key)
        {
            this.setState(
            {
                current:
                {
                    key : '',
                    name : '',
                    namespace : '',
                    version : '',
                    permission : '0'
                }
            })
        }
        else
        {
            this.setState(
            {
                current:
                {
                    key : key,
                    name : name,
                    namespace : namespace,
                    version : version,
                    permission : permission
                }
            })
        }
    }

    save()
    {
        if(this.props.data.list_loading || this.props.data.save_loading || this.props.data.save_new_loading)
        {
            return false
        }
        this.props.save(this.state.current.key,
                        this.state.current.name,
                        this.state.current.namespace,
                        this.state.current.version,
                        this.state.current.permission
                        )
    }
    add()
    {
        if(this.props.data.list_loading || this.props.data.save_loading || this.props.data.save_new_loading)
        {
            return false
        }
        this.props.save('',
                        this.state.newmodule.name,
                        this.state.newmodule.namespace,
                        this.state.newmodule.version,
                        this.state.newmodule.permission)
    }
    loadList()
    {
        if(this.props.data.list_error)
        {
            return (
                <Alert
                    message="错误"
                    description={this.props.data.list_error}
                    type="error"
                    showIcon
                  />
            )
        }
        return (<Table 
                      dataSource={this.props.data.data} 
                      columns={this.setColumn()}
                      pagination={false}
                      expandedRowRender={record => {
                        if(record.key)
                        {
                            return (<MenuView data = {record.menus} moduleid = {record.key}></MenuView>)
                        }
                    }}
                      loading={this.props.data.list_loading}
                      className="firstlevel"
                    />
                )
    }
    setColumn()
    {
        return [{
              title: '模块名字',
              dataIndex: 'name',
              key: 'name',
              width: '25%',
              render: (text, record, index) => {
                return this.setInputCell(record, 'name')
              }
            }, {
              title: '命名空间',
              dataIndex: 'namespace',
              key: 'namespace',
              width: '25%',
              render: (text, record, index) => {
                return this.setInputCell(record, 'namespace')
              }
            }, {
              title: '版本',
              dataIndex: 'version',
              key: 'version',
              width: '25%',
              render: (text, record, index) => {
                return this.setInputCell(record, 'version')
              }
            },
            {
              title: '权限',
              dataIndex: 'permission',
              key: 'permission',
              width: '15%',
              render: (text, record, index) => {
                const options = [
                    {
                        name : "默认对所有人开放",
                        value : "0"
                    },
                    {
                        name : "默认对管理员开放",
                        value : "1"
                    },
                    {
                        name : "默认对超级管理员开放",
                        value : "2"
                    }
                ]
                return this.setSelectCell(record, 'permission', options)
              }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '10%',
                render: (text, record, index) => 
                {
                    return this.setOperationCell(record)
                }
            }]
    }
    setSelectCell(record, field, dataSource)
    {
        let options = []
        dataSource.map((item, index) => 
        {
            options.push(<Option key={index} value={item.value}>{item.name}</Option>)
        })
        if(record.key)
        {
            let editable = false
            if (record.key == this.state.current.key)
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
                <div>
                  <Select style={{ width: 150 }}
                          defaultValue={value} 
                          onChange={v => {
                            const current = {...this.state.current}
                            current[field] = v
                            this.setState({...this.state, current : current})
                        }
                    }>
                      {options}
                  </Select>
                </div>
                :
                <div className="editable-row-text">
                    {text || ' '}
                </div>
            )
        }
        return (
            <div>
              <Select style={{ width: 150 }} defaultValue="0" onChange={v => {
                            const newmodule = {...this.state.newmodule}
                            newmodule[field] = v
                            this.setState({...this.state, newmodule : newmodule})
                        }}>
                      {options}
              </Select>
            </div>
        )
    }

    setInputCell(record, field)
    {
        if(record.key)
        {
            let editable = false
            if (record.key == this.state.current.key)
            {
                editable = true
            }
            const value = record[field]
            return (
                editable ?
                <div>
                  <Input
                    value={this.state.current[field]}
                    size="small"
                    style={{ width: 150 }}
                    onChange={e => {
                            const current = {...this.state.current}
                            current[field] = e.target.value
                            this.setState({...this.state, current : current})
                        }
                    }
                    onKeyUp={e =>{
                        if(e.keyCode === 13)
                        {
                            this.save()
                        }
                    }}
                  />
                </div>
                :
                <div className="editable-row-text">
                  {value.toString() || ' '}
                </div>
            )
        }
        return (
            <div>
              <Input
                value={this.state.newmodule[field]}
                size="small"
                style={{ width: 150 }}
                onChange={e => {
                        const newmodule = {...this.state.newmodule}
                        newmodule[field] = e.target.value
                        this.setState({...this.state, newmodule : newmodule})
                    }
                }
                onKeyUp={e =>{
                    if(e.keyCode === 13)
                    {
                        this.add()
                    }
                }}
              />
            </div>
        )
    }
    setOperationCell(record)
    {
        const key = record.key
        const name = record.name
        const namespace = record.namespace
        const version = record.version
        const permission = record.permission
        const loading = this.props.data.save_loading
        const new_loading = this.props.data.save_new_loading
        let editable = false
        if (record.key == this.state.current.key)
        {
            editable = true
        }
        if(key)
        {
            if(loading & editable)
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
                      <a onClick={() => this.save()}>保存</a>
                      <Popconfirm title="确定要取消编辑吗?" onConfirm={() => this.edit(key)}>
                        <a>取消</a>
                      </Popconfirm>
                    </span>
                    :
                    <span>
                      <a onClick={() => this.edit(key, name, namespace, version, permission)}>编辑</a>
                    </span>
                }
                </div>
            )
            
        }
        else
        {
            if(new_loading)
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
                      <a onClick={() => this.add()}>新增</a>
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

const mapStateToProps = (state) => ({
    data : state.module
})

const mapDispatchToProps = {
    getList : getList,
    save : save,
    setError : setError
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleView)
