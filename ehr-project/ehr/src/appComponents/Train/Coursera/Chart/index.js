import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd-mobile';
import './style.scss';
import echarts from 'echarts'
import $ from 'jquery';
import browserAttr from 'utils/browserAttr'
let ismobile = browserAttr.versions.mobile
class Chart extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
        this.height = ''
    }
    static propTypes =
    {
        data            : React.PropTypes.object,
        height          : React.PropTypes.number,
        onClick         : React.PropTypes.func,
    }
    componentDidMount() {
    	this.format(this.props.data)
    }
  	componentDidUpdate(prevProps, prevState) {
    	this.format(prevProps.data)
    }
  	format(data)
  	{
  		let myChart = echarts.init($(this.dom).get(0));
        myChart.setOption(data);
        myChart.on('click', (params) =>  {
    		this.props.onClick(params)
		});
  	}
    render()
    {
        let className = `component-chart`;
        let width = '100%'
        let height = this.props.height
        if(this.props.height>2000 && browserAttr.versions.ios)
        {
            height = document.documentElement.clientHeight-30
        }
        return <div
        			style={{
        				height: height,
        			}}
        			ref={dom => this.dom = dom}
        		>
        		</div>
    }
}
const mapStateToProps = state => ({
})
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);