import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import $ from 'jquery';
import {} from './action';
import './style.scss';
class CourseraLayout extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes =
    {
        
    }
    render() {
        return(
            <div >
                {this.props.children}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    reducer : state.courseraLayout
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseraLayout);