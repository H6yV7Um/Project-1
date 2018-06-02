import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import {Pagination} from 'antd';
import {} from './action';
import './style.scss';
class Coursera extends Component {
    constructor(props) {
        super(props);
        this.state={
            bodyPaddingBottom : 0
        }
    }
    static propTypes =
    {
        
    }
    render() {
        let className = 'layoutCoursera';
        let componentClassName = className;
        return(
             <div className={componentClassName}>
                <div className={`${className}-body`} style={{paddingBottom: this.state.bodyPaddingBottom}}>
                    {this.props.children}
                </div>
                 <div className={`${className}-pagination`}><Pagination/></div>
             </div>
        )
    }
}
const mapStateToProps = state => ({
    reducer : state.layoutCoursera
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Coursera);