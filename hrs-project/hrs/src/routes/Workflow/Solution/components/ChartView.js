import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Button,Steps,message,Layout, Row, Col,Modal,Radio } from 'antd'
import { Form} from 'antd';
import { Link } from 'react-router'
import AddView from './AddView'
const Step = Steps.Step
const RadioGroup = Radio.Group
const FormItem = Form.Item
class ChartView extends Component 
{
    constructor(props)
    {
		super(props)
		this.state = 
		{
			data: [],
			plotCfg: {
				margin:0,
				border: {
					fill: 'eee',
					fillOpacity: 0.05,
					lineWidth: 1,
					radius: 10
				}
			},
			visible: false,
			source:0,
			flow:[]
		}
    }
    static propTypes =
    {	
        fields: React.PropTypes.array,
        onChange: React.PropTypes.func,
        flow: React.PropTypes.array,
    }
    componentWillMount() {
    	this.setState({...this.state,flow:this.props.flow})
    }
    showModal = () => {
	    this.setState({
	      	visible: true,
	    })
	}
	handleOk = (value) => 
	{
		let flow = this.state.flow
		value.source = this.state.source
		let id = 0
		for(let i=0;i<flow.length;i++)
		{
			if(flow[i].source==value.source)
			{
				id++
			}
		}
		if(value.type==1)
		{
			value.id = value.source+"_"+id
			value.type = 'action'
			flow.push(value)
		}
		else
		{
			if(value.fieldType=='number')
			{
				value.source = this.state.source
				value.type = 'condition'
				let trueValue = {...value}
				trueValue.id = trueValue.source+"_"+id
				let falseValue = {...value}
				falseValue.id = falseValue.source+"_"+(id+1)
				switch(value.operator)
				{
					case '>':
						falseValue.operator = '<='
					break
					case '<':
						falseValue.operator = '>='
					break
					case '=':
						falseValue.operator = '!='
					break
				}
				flow.push(trueValue)
				flow.push(falseValue)
			}
			if(value.fieldType=='select')
			{
				let branch = []
				if(value.branchType==2)
				{
					branch.push({
						"id" : value.source+"_"+id,
						"fieldType": value.fieldType,
						"options":value.leftKeys,
						"namespace":value.namespace,
						"source": this.state.source,
						"type":'condition'
					})
					branch.push({
						"id" : value.source+"_"+(id+1),
						"fieldType": value.fieldType,
						"options":value.rightKeys,
						"namespace":value.namespace,
						"source": this.state.source,
						"type":'condition'
					})
				}
				else if(value.branchType==1)
				{
					branch.push({
						"id" : value.source+"_"+id,
						"fieldType": value.fieldType,
						"options":value.leftKeys,
						"namespace":value.namespace,
						"source": this.state.source,
						"type":'condition'
					})
					for(let i=0;i<value.rightKeys.length;i++)
					{
						branch.push({
							"id" : value.source+"_"+(id+(i+1)),
							"fieldType": value.fieldType,
							"options":[value.rightKeys[i]],
							"namespace":value.namespace,
							"source": this.state.source,
							"type":'condition'
						})
					}
				}
				flow = flow.concat(branch)
			}
			if(value.fieldType == "date")
			{
				let current = []
				for(let i=0;i<value.options.length;i++)
				{
					current.push({
						"id" : value.source+"_"+(id+(i+1)),
						"fieldType": value.fieldType,
						"options":[value.options[i].date],
						"namespace":value.namespace,
						"source": this.state.source,
						"type":'condition',
						"cycle_time": value.options[i].cycle_time.format("HH:mm"),
						"cycle_day": value.options[i].cycle_day,
					})
				}
				flow = flow.concat(current)
			}	
		}
		this.setState({
				...this.state,
				visible: false,
				flow
		})
		this.props.onChange(flow)
	}
	handleCancel = (e) => {
		this.setState({
			visible: false,
		})
	}
	getNodes()
	{
		let result = {nodes:[],edges:[],plusNodes:[],timesNodes:[],width:900,height:900}
		let deepest = 0 //deepest level
		const nodeWidth = 6//node width
		const nodeHeight = 3//node height
		const leftMargin = 2 //node left margin
		const rightMargin = 2 //node right margin
		const lineHeight = 10 //nodes line-height
		const centerPoint = 50 // center point
		// recursion initial node position
		const getSubNodes = (flow, source, level, parentx)=>
		{
			let resultNodes = []
			let sub = []
			let order = 0
			for(let i=0;i<flow.length;i++)
			{
				if(flow[i].source == source)
				{
					if(deepest<level)
					{
						deepest = level
					}
					order+=1
					resultNodes.push({
							id: flow[i].id,
							name: "",
							type: flow[i].type,
							x: 0,
							y: 10+lineHeight*level,
							level:level,
							order:order,
							source:source
					})
				}
			}
			if(resultNodes.length==1)
			{
				resultNodes[0].x = parentx
				sub = sub.concat(getSubNodes(flow, resultNodes[0].id, level+1, resultNodes[0].x))
			}
			else
			{
				for(let i=0;i<resultNodes.length;i++)
				{
					resultNodes[i].x = parentx-((nodeWidth+leftMargin+rightMargin)*resultNodes.length/2)+((nodeWidth+leftMargin+rightMargin)*i)+(nodeWidth/2)+leftMargin
					sub = sub.concat(getSubNodes(flow, resultNodes[i].id, level+1, resultNodes[i].x))
				}
			}
			resultNodes = resultNodes.concat(sub)
			return resultNodes
		}
		// initial edges
		const getEdges = (nodes)=>
		{
			let edges = []
			for(let i=0;i<nodes.length;i++)
			{
				if(nodes[i].id=='0' || nodes[i].id=='-1')
				{
					continue
				}
				edges.push({source: nodes[i].source, target: nodes[i].id})
			}
			for(let u=0;u<nodes.length;u++)
			{
				let exists = false
				for(let i=0;i<edges.length;i++)
				{
					if(edges[i].source==nodes[u].id)
					{
						exists = true
						break
					}
				}
				if(!exists && nodes[u].id!='-1')
				{
					edges.push({source: nodes[u].id, target: '-1'})
				}
			}
			return edges
		}
		// initial plus button position
		const getPlusNodes = (nodes ,edges) =>
		{
			let plusNodes = []
			let endNodes = {}
			for(let i=0;i<nodes.length;i++)
			{
				if(nodes[i].id=='-1')
				{
					endNodes = nodes[i]
					break
				}
			}
			for(let i=0;i<edges.length;i++)
			{
				if(edges[i].target=='-1')
				{
					for(let u=0;u<nodes.length;u++)
					{
						if(nodes[u].id==edges[i].source)
						{
							plusNodes.push({id: "plus_"+edges[i].source, name: '+', type: 'plus', x: nodes[u].x+(nodeWidth/50), y: (nodes[u].y+lineHeight/2), source:edges[i].source})
							break
						}
					}
				}
			}
			return plusNodes
		}
		const getTimesNodes = (nodes) =>
		{
			let timesNodes = []
			for(let i=0;i<nodes.length;i++)
			{
				if(nodes[i].id!='-1' && nodes[i].id!='0')
				{
					timesNodes.push({id: nodes[i].id, name: '×', type: 'times', x: nodes[i].x+nodeWidth/2, y: nodes[i].y-nodeHeight/2})
				}
			}
			return timesNodes
		}
		// reset node position
		const resetPosition = (nodes, currentLevel, current) =>
		{
			/*
				find out parent ids
			*/
			let parentIDs = []
			for(let i=0;i<nodes.length;i++)
			{
				if(nodes[i].level == currentLevel)
				{
					let exists = false
					for(let u=0;u<parentIDs.length;u++)
					{
						if(parentIDs[u].id==nodes[i].source)
						{
							parentIDs[u].count++
							exists = true
							break
						}
					}
					if(!exists)
					{
						parentIDs.push({id:nodes[i].source, max:0, min:0, count:1})
					}
				}
			}
			/*
				asjust position based on sub nodes
			*/
			for(let i=0;i<current.length;i++)
			{
				let range = (current[i].max - current[i].min)/2
				let currentNode = {}
				for(let u=0;u<nodes.length;u++)
				{
					if(nodes[u].id == current[i].id)
					{
						currentNode = nodes[u]
					}
				}
				for(let u=0;u<nodes.length;u++)
				{
					if(currentNode.level == nodes[u].level && nodes[u].id!=currentNode.id)
					{
						if(nodes[u].x>currentNode.x)
						{
							nodes[u].x += range
						}
						else
						{
							nodes[u].x -= range
						}
					}
				}
			}
			//find out parent max&min point
			for(let i=0;i<parentIDs.length;i++)
			{
				//based on same level nodes
				for(let u=0;u<nodes.length;u++)
				{
					if(parentIDs[i].min==0 && nodes[u].source == parentIDs[i].id)
					{
						parentIDs[i].min = nodes[u].x
					}
					if(parentIDs[i].id == nodes[u].source && nodes[u].x>parentIDs[i].max)
					{
						parentIDs[i].max = nodes[u].x
					}
					if(parentIDs[i].id == nodes[u].source && nodes[u].x<parentIDs[i].min)
					{
						parentIDs[i].min = nodes[u].x
					}
				}
				// adjust same level nods
				for(let u=0;u<nodes.length;u++)
				{
					if(nodes[u].source != parentIDs.id && nodes[u].level == currentLevel)
					{
						let parentNode = {}
						let currentParentNode = {}
						let range = (parentIDs[i].max-parentIDs[i].min)/2
						
						for(let y=0;y<nodes.length;y++)
						{
							if(nodes[y].id==nodes[u].source)
							{
								parentNode = nodes[y]
							}
							if(nodes[y].id==parentIDs[i].id)
							{
								currentParentNode = nodes[y]
							}
						}
						if(parentNode.x<currentParentNode.x)
						{
							nodes[u].x -= range
						}
						if(parentNode.x>currentParentNode.x)
						{
							nodes[u].x += range
						}
					}
				}
			}
			//readjust max&min based on adjusted same level nodes
			for(let i=0;i<parentIDs.length;i++)
			{
				parentIDs[i].min = 0
				parentIDs[i].max = 0
				for(let u=0;u<nodes.length;u++)
				{
					if(parentIDs[i].min==0 && nodes[u].source == parentIDs[i].id)
					{
						parentIDs[i].min = nodes[u].x
					}
					if(parentIDs[i].id == nodes[u].source && nodes[u].x>parentIDs[i].max)
					{
						parentIDs[i].max = nodes[u].x
					}
					if(parentIDs[i].id == nodes[u].source && nodes[u].x<parentIDs[i].min)
					{
						parentIDs[i].min = nodes[u].x
					}
				}
			}
			// readjust parent nodes max&min based on final nodes
			for(let i=0;i<parentIDs.length;i++)
			{
				for(let u=0;u<current.length;u++)
				{
					let currentNode = {}
					for(let y=0;y<nodes.length;y++)
					{
						if(current[u].id==nodes[y].id)
						{
							currentNode = nodes[y]
							break
						}
					}
					if(currentNode.source == parentIDs[i].id)
					{
						if(current[u].max>parentIDs[i].max)
						{
							parentIDs[i].max = current[u].max
						}
						if(current[u].min<parentIDs[i].min)
						{
							parentIDs[i].min = current[u].min
						}
					}
				}
			}
			// move
			if(currentLevel!=0)
			{
				nodes = resetPosition(nodes, currentLevel-1, parentIDs)
			}
			return nodes
		}
		let nodes =[
				{id: '0', name: "开始", type: 'action', x: centerPoint, y: 10, level:0},
		]
		let subNodes = getSubNodes(this.state.flow, "0", 1, centerPoint)
		nodes = nodes.concat(subNodes)
		nodes.push({id: '-1', name: '结束', type: 'action', x: centerPoint, y: 10+lineHeight*(deepest+1)})
		if(deepest)
		{
			nodes = resetPosition(nodes,deepest,[])
		}
		result.nodes = nodes
		result.edges = getEdges(nodes)
		if(!result.edges.length)
		{
			result.edges.push({source: '0', target: '-1'})
		}
		
		for(let i=0;i<result.edges.length;i++)
		{
			if(result.edges[i].target=='-1')
			{
				for(let u=0;u<result.nodes.length;u++)
				{
					if(result.nodes[u].id==result.edges[i].source && result.nodes[u].level!=deepest)
					{
						result.nodes[u].y = (10+lineHeight*(deepest))
					}
				}
			}
		}
		result.plusNodes = getPlusNodes(result.nodes, result.edges)
		result.timesNodes = getTimesNodes(result.nodes)
		return result
	}
	render()
	{
		const result = this.getNodes()
		let nodes = result.nodes
		let edges = result.edges
		let	plusNodes = result.plusNodes
		let	timesNodes = result.timesNodes
		let width = result.width
		let height = result.height
		const Chart = createG2(chart => 
		{
			const nodesFormatter = (text, item)=>
			{
				for(let node of nodes)
				{
					if(node.id  == text)
					{
						if(node.name == "开始")
						{
							let contentHtml = '<div style="width:60px;margin:0 auto;text-align:center;height:30px;line-height:15px;">'
							contentHtml += '<span style="font-weight:bolder">开始</span>'
							contentHtml += '</div>'
							return contentHtml
						}
						if(node.name == "结束")
						{
							let contentHtml = '<div style="width:60px;margin:0 auto;text-align:center;height:30px;line-height:15px;">'
							contentHtml += '<span style="font-weight:bolder">结束</span>'
							contentHtml += '</div>'
							return contentHtml
						}
						if(node.type=='condition')
						{
							let contentHtml = '<div style="width:60px;margin:0 auto;text-align:center;height:30px;line-height:15px;">'
							contentHtml += '<span style="font-weight:bolder">审批条件</span>'
							contentHtml += '</div>'
							return contentHtml
						}
						else if (node.type=='action')
						{
							let contentHtml = '<div style="width:60px;margin:0 auto;text-align:center;height:30px;line-height:15px;">'
							contentHtml += '<span style="font-weight:bolder">审批流程</span>'
							contentHtml += '</div>'
							return contentHtml
						}
						break
					}
				}
			}
			// 自定义＋的图形
			G2.Shape.registShape('point', 'plus', 
			{
				drawShape : (cfg, group) =>
				{
					let x = cfg.x;
					let y = cfg.y;
					let shape = group.addShape('circle', 
					{
						attrs: 
						{
							x: x,
							y: y,
							r: 10,
							fillOpacity: 0.6,
							stroke: 'black',
							fill: '#fff'
						}
					})
					return shape;
				}
			})
			// 自定义chacha的图形
			G2.Shape.registShape('point', 'times', 
			{
				drawShape : (cfg, group) =>
				{
					let x = cfg.x;
					let y = cfg.y;
					let shape = group.addShape('circle', 
					{
						attrs: 
						{
							x: x,
							y: y,
							r: 8,
							fillOpacity: 0.6,
							stroke: 'red',
							fill: '#fff'
						}
					})
					return shape;
				}
			})
			// 自定义action的图形
			G2.Shape.registShape('point', 'action', 
			{
				drawShape : (cfg, group) =>
				{
					let x = cfg.x
					let y = cfg.y
					let width = 70
					let height = 30
					let shape = group.addShape('rect', {
						attrs: {
							x: x - width / 2,
							y: y - height / 2,
							width: width,
							height: height,
							fill: '#fff',
							stroke: '#EEEEEE'
						}
					})
					return shape
				}
			})
			const combine = (Command, x, y) => 
			{
				return Command + ' ' + x + ' ' + y
			}
			// 自定义condition 的图形
			G2.Shape.registShape('point', 'condition', 
			{
				drawShape: (cfg, group) => 
				{
					let x = cfg.x
					let y = cfg.y
					let width = 70
					let height = 30
					let path = ''
					let shape = group.addShape('rect', 
					{
						attrs: {
						x: x - width / 2,
						y: y - height / 2,
						width: width,
						height: height,
						fill: '#F3F3F3',
						stroke: '#E2E2E2' // 可以直接设置颜色 cfg.color，也可以使用映射
						}
					})
					return shape
				}
			})
			let Stat = G2.Stat
			// 不显示title
			chart.tooltip({
				title: null,
			})
			chart.axis(false)
			// x,y的范围是0-100
			// 因为边的统计函数生成的数据范围默认是0-1，所以需要设置范围是 0-100 统一起点、边的数据范围
			let defs = {
				x: {min: 0,max:100},
				y: {min: 0, max:100},
				'..x': {min: 0,max:100},
				'..y': {min: 0,max:100}
			}
			// 首先绘制 edges，点要在边的上面
			// 创建单独的视图
			let edgeView = chart.createView()
			edgeView.source(edges, defs)
			edgeView.coord().reflect()
			edgeView.axis(false)
			edgeView.tooltip(false)
			// Stat.link 方法会生成 ..x, ..y的字段类型，数值范围是 0-1
			edgeView.edge().position(Stat.link('source*target',nodes)).shape('vhv').color('#ccc')
			// 创建+单独的视图
			// 创建节点视图
			let nodeView = chart.createView()
			nodeView.coord().reflect() // 从上到下
			nodeView.axis(false)
			nodeView.source(nodes, defs)
			nodeView.point().position('x*y').color('steelblue').shape('type', (val) => {return val}).label('id', 
			{
						custom: true, // 表示使用自定义文本
						renderer: nodesFormatter,
						offset: -10,
						label: {
							fontSize: 4
						}
			})
			let plusView = chart.createView()
			plusView.coord().reflect() // 从上到下
			plusView.source(plusNodes, defs)
			plusView.point().position('x*y').color('steelblue').shape('type', (val) => {return val}).label('name', 
			{
				offset: 0,
				labelEmit: true
			})
			let timesView = chart.createView()
			timesView.coord().reflect() // 从上到下
			timesView.source(timesNodes, defs)
			timesView.point().position('x*y').color('steelblue').shape('type', (val) => {return val}).label('name', 
			{
				offset: 0,
				labelEmit: true,
			})
			chart.render()
			const deleteNode =(id,flow)=>
			{
				for(let i=0; i<flow.length;i++)
				{
					if(flow[i].id == id)
					{
						flow.splice(i,1)
						break
					}
				}
				for(let i=0;i < flow.length;i++)
				{
					if(flow[i].source == id)
					{
						flow = deleteNode(flow[i].id,flow)
						i=-1
					}
				}
				return flow
			}
			chart.on('plotclick',(ev)=>
			{
				if(ev.data)
				{
					let shape = ev.data.shape
					if(shape == 'plus')
					{
						this.setState({source:ev.data._origin.source})
						this.showModal()
					}
					else if(shape == "times")
					{
						let id = ev.data._origin.id
						let flow = this.state.flow 
						let source = ''
						for(let val of flow)
						{
							if(val.id == ev.data._origin.id)
							{	
								source = val.source
								break
							}
						}
						for(let i=0;i<flow.length;i++)
						{
							if(flow[i].source == source)
							{
								flow = deleteNode(flow[i].id,flow)
								i=-1
							}
						}
						this.setState({...this.state,flow:flow})
						this.props.onChange(flow)
					}
				}
			})
			chart.on('tooltipchange',(ev)=>
			{
				let currentNode = {}
				for(let node of this.state.flow)
				{
					if(node.id == ev.items[0].point._origin.id)
					{
						currentNode = node
						break
					}
				}
				switch(ev.items[0].point._origin.type)
				{
					case 'plus':
						ev.items.splice(0,1)
					break
					case 'action':
						if(ev.items[0].point._origin.id == '0' ||ev.items[0].point._origin.id == '-1')
						{
							ev.items.splice(0,1)
							break
						}
						ev.items.push({
							name:"类型",
							title: null,
							marker: true,
							value: "审批步骤"
						})
						let approvalWay = ''
						let level = ''
						switch(currentNode.approvalWay)
						{
							case 1:
								approvalWay = '按行政汇报对象层级'
								switch(currentNode.level)
								{
									case 1:
										level = "第"+currentNode.selectLevel+"固定层级"
										break
									case 2:
										level = "第"+currentNode.selectLevel+"向上层级"
										break
									case 3:
										level = "跳转至"+currentNode.selectLevel+"层级"
										break
								}
								ev.items.push({
									name:'审批方式',
									title: null,
									marker: true,
									value: approvalWay
								})
								ev.items.push({
									name:'层级',
									title: null,
									marker: true,
									value: level
								})
							break
							case 2:
								approvalWay = '按工作汇报对象层级'
								switch(currentNode.level)
								{
									case 1:
										level = "第"+currentNode.selectLevel+"固定层级"
										break
									case 2:
										level = "第"+currentNode.selectLevel+"向上层级"
										break
									case 3:
										level = "跳转至"+currentNode.selectLevel+"层级"
										break
								}
								ev.items.push({
									name:'审批方式',
									title: null,
									marker: true,
									value: approvalWay
								})
								ev.items.push({
									name:'层级',
									title: null,
									marker: true,
									value: level
								})
							break
							case 3:
								approvalWay = '指定审批对象'
								ev.items.push({
									name:'审批方式',
									title: null,
									marker: true,
									value: approvalWay
								})
								ev.items.push({
									name:'审批对象',
									title: null,
									marker: true,
									value: currentNode.approvalObject.name
								})
							break
							case 4:
								approvalWay = '指定审批字段'
								ev.items.push({
									name:'审批方式',
									title: null,
									marker: true,
									value: approvalWay
								})
								ev.items.push({
									name:'审批对象',
									title: null,
									marker: true,
									value: currentNode.approvalFields.value
								})
							break
						}
					break
					case 'condition':
						let fieldName = ''
						for(let field of this.props.fields)
						{
							if(currentNode.namespace == field.namespace)
							{
								fieldName = field.name
								break
							}
						}
						ev.items.push({
							name:"类型",
							title: null,
							marker: true,
							value: "条件分支"
						})
						if(currentNode.fieldType=='number')
						{
							ev.items.push({
									name:"条件",
									title: null,
									marker: true,
									value: fieldName +" "+ currentNode.operator+ ' ' + currentNode.fillNumber
							})
						}
						else
						{
							ev.items.push({
									name:"字段",
									title: null,
									marker: true,
									value: fieldName
							})
							let options = ""
							for(let option of currentNode.options)
							{
								if(options)
								{
									options+=","+option
								}
								else
								{
									options+=option
								}
							}
							ev.items.push({
									name:"选项",
									title: null,
									marker: true,
									value: options
							})
						}
					break
				}
				ev.items.splice(0,1)
			})
		})
		return(
			<div>
				<div style={{margin:'10px auto'}}>
					<Chart
								data={this.state.data}
								plotCfg={this.state.plotCfg}
								height={result.height}
								width={result.width}
								forceFit={false}
					/>
				</div>
				<AddView
					visible={this.state.visible}
					handleOk={this.handleOk}
					handleCancel={this.handleCancel}
					fields={this.props.fields}
				/>
			</div>
		)
	}
}
export default ChartView