import React, {Component, PropTypes} from 'react'
import { Link,Router,Route,hashHistory} from 'react-router'
import {Table } from 'antd'
import { Popconfirm,Spin} from 'antd'
class ListView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            'data':[],
            'loading':true
        }
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {  
    }
    static propTypes =
    {
        preferencesData: React.PropTypes.array.isRequired
        
    }
    render()
    {
        const data = this.props.preferencesData
        const columns = [{  
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            
        }, {
            title: '周期',
            dataIndex: 'cycle',
            key: 'cycle',
        }, {
            title: '开始日期',
            dataIndex: 'startDate',
            key: 'startDate',
        }, {
            title: '结束日期',
            dataIndex: 'endDate',
            key: 'endDate',
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => 
            {
                return(
                    setOperationCell(record,this.props.removeLoadings)
                )
            }
        }]
        const setOperationCell = (record,loading)=>
        {
            const key = record.key

            if(loading == true)
            {
        
                if(key == this.props.preferences.remove_id)
                {
                    return(
                        <span>
                            <a href="#" onClick={(e)=>{this.props.edit(record)}}>编辑</a><span className="ant-divider" />
                            <Spin />
                        </span>
                    )  
                }
                else
                {
                    return(
                        <span>
                            <a href="#" onClick={(e)=>this.props.edit(record)}>编辑</a><span className="ant-divider" />
                            <Popconfirm title="确定删除吗?" onConfirm={(e)=>this.props.remove(record.key)}>
                                <a>删除</a><span className="ant-divider"/>
                            </Popconfirm>
                        </span>
                    )
                }
                
            }
            else
            {
                return(
                    <span>
                        <a href="#" onClick={(e)=>this.props.edit(record)}>编辑</a><span className="ant-divider" />
                        <Popconfirm title="确定删除吗?" onConfirm={(e)=>this.props.remove(record.key)}>
                            <a>删除</a><span className="ant-divider"/>
                        </Popconfirm>
                    </span>
                )
            }
        }
        return (
            <div>
                <Table loading={this.props.loading} pagination = {false} columns={columns} dataSource={data} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ 
})
const mapDispatchToProps = {  
}
export default ListView
