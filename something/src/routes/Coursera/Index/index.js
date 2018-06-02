import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast,Grid} from 'antd-mobile';
import {injectReducer} from 'store/reducers';
import $ from 'jquery';
import {} from './action';
import './style.scss';
import getSrc from 'utils/imgSrc';
import {browserHistory} from 'react-router'
let className = `Coursera-Index`;
const data = [
	{icon:getSrc(`Coursera/field.png`),text:'提交证书',url:'/coursera/field'},
	{icon:getSrc(`Coursera/table.png`),text:'所有证书',url:'/coursera/table'}
]
class Index extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes =
    {

    }
    render() {
    	let logo = getSrc(`Coursera/logo.png`)
    	return 	<div className={`${className}`}>
	    			<Grid data={data}
				      	columnNum={3}
				      	activeStyle={false}
				      	hasLine={false}
				      	renderItem={dataItem => (
					        <div style={{ padding: '12.5px' }}>
					          <img 
					          	src={dataItem.icon} 
					          	style={{ width: '50px', height: '50px' }}
					          	onClick={()=>{
					          		browserHistory.push(`${dataItem.url}`)
					          	}}
					          />
					          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
					            <span>{dataItem.text}</span>
					          </div>
					        </div>
				      	)}
				    />
				    <div className="footer">
						<img
							src={`${logo}`}
						/>
				    </div>
				</div>
    }
}
const mapStateToProps = state => ({
    reducer : state.index
})
const mapDispatchToProps = {
}
export default store => ({
    path : 'index',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'index', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index))
        })
    }
})