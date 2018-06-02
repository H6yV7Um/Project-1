import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast,Grid,DatePicker,List} from 'antd-mobile';
import {injectReducer} from 'store/reducers';
import './style.scss';
import {browserHistory} from 'react-router'
import browserAttr from 'utils/browserAttr'
let className = `coursera-iframe`;
let ismobile = browserAttr.versions.mobile
class Iframe extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    static propTypes =
    {
        // 获取所有的courseralist
        certificateurl          : React.PropTypes.string,
    }
    render() {
        return   <div className={`${className}`}>
                    <div className = {`${className}-back`}>
                        <a
                            onClick={()=>this.props.gobackTrain()}
                        >
                            返回
                        </a>
                    </div>
                    <iframe src={`${this.props.certificateurl}`} width="100%" height={document.documentElement.clientHeight} frameBorder="0"></iframe>
                </div>
    }

}
const mapStateToProps = state => ({
})
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Iframe);