import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd-mobile';
import './style.scss';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.timer = ''
    }
    static propTypes =
    {
        placeholder            : React.PropTypes.string,
        onChange          	   : React.PropTypes.func,
        value                  : React.PropTypes.string,
        onFocus               : React.PropTypes.func,
        search               : React.PropTypes.func,
    }

    componentWillUnmount() {
        if(this.timer)
        {
            clearTimeout(this.timer)
        }
    }
    render()
    {
        let className = `component-search`;
        let timer = false
        let i = 0
        return(
            <div className={className} >
            	<div className= {`${className}-icon`}>
	            	<Icon 
	            		type="search" 
	            		size="md"
	            		style={{color: '#9F9F9F'}}
	            	/>
            	</div>
                <input
					className={`${className}-input`}
					placeholder={this.props.placeholder}
                    value={this.props.value}
                    onFocus={()=>this.props.onFocus()}
                    onBlur={()=>this.props.onBlur()}
					onChange={(e)=>{
                        clearTimeout(this.timer)
						let value = e.target.value
                        this.props.onChange(value)
                        this.timer  = setTimeout(()=>{
                            this.props.search(value)
                        },500)
					}}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Search);