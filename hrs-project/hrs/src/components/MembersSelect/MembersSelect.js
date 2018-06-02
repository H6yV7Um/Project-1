import React, {Component, PropTypes} from 'react'
import {Select,Spin} from 'antd'
import {SERVER, HTTP_HEADER} from 'config'
const Option = Select.Option
const ORGANIZATION_LIST_ALL= "organization/department/list_all"
class MembersSelect extends Component {
	constructor(props)
    {
        super(props)
        this.state = {
            'value': [],
            'data': []
        }   
    }
    static propTypes =
    {
        multiple:React.PropTypes.bool,
        width:React.PropTypes.string,
        value: React.PropTypes.array,
        onChange: React.PropTypes.func
    }
    onChange(value){
        this.setState({ ...this.state,'value':value })
        if(typeof value == "string"){
            value=[value]
        }
        let name  = []
        for(let val of this.state.data)
        {
            for(let key of value)
            {
                if(val._id.$oid == key)
                {
                    name.push({'key':key,"value":val.name})
                }
            }
        }
        this.props.onChange(value,name)
    }
    async componentWillMount() {
        if(this.props.value)
        {
            let value = this.props.value
            if(typeof value != "string" && !this.props.multiple)
            {
                if(value.length)
                {
                    value = value[0]
                }
                else
                {
                    value = ""
                }
            }
            await this.setState({ ...this.state,'value':value })
        }
        if(!this.state.data.length)
        {
            let employees
            const response = await fetch(SERVER + ORGANIZATION_LIST_ALL, {...HTTP_HEADER})
            employees = await response.json()
            await this.setState({...this.state,"data":employees.data.users})
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data != nextState.data || this.state.value != nextState.value
    }
    render()
    {
        const data = this.state.data
        const children = this.optionFormat(data)
        if(!data.length)
        {
             return <div style={{width:this.props.width,height:"28px",borderRadius: "4px",border: "1px solid #d9d9d9",textAlign: "center",lineHeight:"28px"}}>
                        <Spin size="small" />
                    </div>
        }
        return(
            <Select   
                   placeholder ="请选择" 
                   multiple = {this.props.multiple} 
                   showSearch = {true} 
                   style={{ width: this.props.width}} 
                   onChange={(value) =>{this.onChange(value)}}
                   value={this.state.value}
                   optionFilterProp="children"
                   allowClear={true}
            >
			    {children}
			</Select>
        )
    }
    optionFormat(data)
    {
        let children = []
        for(let val of data)
        {
            children.push(<Option key ={val._id.$oid} value={val._id.$oid}>{val.name}</Option>)
        }
        return children
    }
}
export default MembersSelect