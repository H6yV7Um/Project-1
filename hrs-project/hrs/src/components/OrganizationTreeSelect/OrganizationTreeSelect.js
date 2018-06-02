import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { TreeSelect } from 'antd'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const SHOW_CHILD = TreeSelect.SHOW_CHILD

class OrganizationTreeSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            values: [],
            treeData: []
        }
    }
    static propTypes = {
        treeData: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired
    }
    componentWillMount()
    {   
        this.setState({... this.state, "treeData":this.formatData([], this.props.treeData),'values':this.props.data})
    }
    render() {
        const t = {...this.state}
        const tProps = {
            treeData: this.state.treeData,
            multiple: true,
            value: this.state.values,
            treeCheckable: true,
            // treeCheckStrictly:true,
            allowClear: true,
            showCheckedStrategy: SHOW_CHILD,
            searchPlaceholder: '请选择',
            dropdownMatchSelectWidth:true,
            dropdownStyle:{ maxHeight: 300, overflow: 'auto' },
            style: {
                maxHeight: 200,
                overflow: 'auto'
            },
            onChange:(values, node, extra) =>{
                console.log(values)
                this.setState({...this.state,'values':values})
                this.props.onChange(values)
            }
        }
        return (<TreeSelect {...tProps}/>)
    }
    formatData (currentTree,data)
    {
        for (let i = 0; i < data.length; i++) 
        {
            if(data[i].did==16918898 || data[i].did==12825448 || data[i].did==12667365)
            {
                continue;
            }
            let members = []
            let children = []
            for (let j = 0; j < data[i].members.length; j++) 
            {
                members.push({
                    "label":data[i].members[j].name,
                    "key":data[i].members[j].userid,
                    "value":data[i].members[j].userid,
                    "type":"member"
                })
            }
            if(data[i].children.length != 0)
            {
                children = this.formatData([],data[i].children)
            }
            currentTree.push({
                'label':data[i].name,
                'value':data[i].did.toString(),
                'key':data[i].did.toString(),
                'children':children.concat(members),
                "type":"department"
            })
        }
        return currentTree
    }
}
export default OrganizationTreeSelect