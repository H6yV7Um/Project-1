import React, {Component, PropTypes} from 'react'
import {TreeSelect,Spin} from 'antd'
import {SERVER, HTTP_HEADER} from 'config'
const SHOW_ALL = TreeSelect.SHOW_ALL
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const SHOW_CHILD = TreeSelect.SHOW_CHILD
const ORGANIZATION_LIST= "organization/department/list_tree"
class DepartmentSelect extends Component {
	constructor(props)
    {
        super(props)
        this.state = {
            'value': [],
            "data":{}
        }    
    }
    static propTypes =
    {
        multiple: React.PropTypes.bool,
        treeCheckStrictly: React.PropTypes.bool,
        width: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        maxHeight:React.PropTypes.string,
        onChange:React.PropTypes.func,
        value: React.PropTypes.array
    }
    onChange(value){
        this.setState({ ...this.state,'value':value })
        this.props.onChange(value)
    }
    async componentWillMount() {
        let value = this.props.value
        if(this.props.value)
        {
            await this.setState({ ...this.state,'value':this.props.value })
        }
        if(!this.state.data.length)
        {
            const response = await fetch(SERVER + ORGANIZATION_LIST, {...HTTP_HEADER})
            let department = await response.json()
            await this.setState({...this.state,"data":department.data})
        }
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data != nextState.data || this.state.value != nextState.value
    }
    render()
    {
        const data = this.state.data
        if(!data.length)
        {
            return  <div style={{width:this.props.width,height:"28px",borderRadius: "4px",border: "1px solid #d9d9d9",textAlign: "center",lineHeight:"28px"}}>
                        <Spin size="small" />
                    </div>
        }
        return(
            <TreeSelect
                labelInValue  
                treeData={this.formatData([],data)}
                value={this.state.value}
                multiple={this.props.multiple}
                treeCheckStrictly={this.props.treeCheckStrictly}
                treeCheckable={this.props.multiple}
                allowClear={true}
                showCheckedStrategy={SHOW_CHILD}
                placeholder="请选择部门"
                dropdownMatchSelectWidth={true}
                dropdownStyle={{maxHeight: 300, overflow: 'auto' }}
                style={{ width: this.props.width,maxHeight:this.props.maxHeight,overflow:'auto'}}
                onChange={(value) =>{this.onChange(value)}}
                disabled={this.props.disabled}
            />
        )
    }
    formatData (currentTree,data)
    {
        for (let i = 0; i < data.length; i++) 
        {
            if(data[i].did==16918898 || data[i].did==12825448 || data[i].did==12667365)
            {
                continue
            }
            let children = []
            if(data[i].children.lentgh !=0)
            {
            	children = this.formatData([],data[i].children)
            }
            currentTree.push({
            	"label": data[i].name,
            	"value": data[i]._id.$oid,
            	"key": data[i]._id.$oid,
            	"children": children
            })
        }   
        return currentTree
    }
}
export default DepartmentSelect
