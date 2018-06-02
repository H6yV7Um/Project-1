import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import $ from 'jquery';
import {} from './action';
import './style.scss';
import Footer from './Footer'
class CourseraLayout extends Component {
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
        let className = 'TrainLayout';
        let componentClassName = className;
        return(
             <div className={componentClassName}>
                <div className={`${className}-body`} style={{paddingBottom: this.state.bodyPaddingBottom}}>
                    {this.props.children}
                </div>
                {/*<div className={`${className}-footer`}> <Footer /></div>*/}
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