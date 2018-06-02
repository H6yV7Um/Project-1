import React, {Component, PropTypes} from 'react';
import { List, WhiteSpace, Button, Toast } from 'antd-mobile';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';
import ResumeIndex from 'appComponents/Wechat/Resume';
import ToastContent from 'components/ToastContent';
import {checkIn} from './action';

import './style.scss';

class CheckIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonStatus : 'ready',
            height : 'auto'
        };


        // 数据异常
        this.errors = null;
        // 数据
        this.values = null;
        // 需要隐藏的表单项
        this.hideItems = ['gender','idcard','email','address','isduty','starttime','endtime','company','skills','duty','university','attenddate','graduatedate','education','profession','link'];
    }

    componentDidMount(){
        window.addEventListener('resize', this.onWindowResize)
    }

    componentWillMount() {
        this.changeTitle('tap4fun-面试签到');
        this.setState({height : document.documentElement.clientHeight});
    }

    componentWillUnmount(){
        this.changeTitle('');
        window.removeEventListener('resize', this.onWindowResize)
    }

    changeTitle = title => {
        document.title = `${title}`;
    }

    showMessage = (type, content) => {
        let res = null;
        switch (type) {
            case 'success':
                res = content || '面试官已经收到您的消息'+"\r\n"+'请在大厅就坐等待面试!';
                Toast.info(<ToastContent type="success" content={res} />, 6, null, false);
                setTimeout(() => {
                    window.location.reload();
                },6000);
                break;
            case 'error':
                res = content || '网络开小差了!请刷新后重试!';
                Toast.info(<ToastContent type="fail" content={res} />, 2, null, false);
                break;
        }
    }

    /**
     *  提交
     */
    submit = () => {
        if(this.values)
        {
            this.props.checkIn(
                this.values.name,
                this.values.phone,
                this.values.position,
                () => {this.showMessage('success')},
                () => {this.showMessage('error')});
        }
        else if(this.errors)
        {
            this.showMessage('error', this.errors);
        }
    }

    inputOnFocus = () => {
        this.setState({footer:'relative'})
    }

    inputOnBlur = () => {
        setTimeout(() => {
            this.setState({footer:'absolute'})
        }, 10)
    }

    onWindowResize = () => {
        this.setState({height : document.documentElement.clientHeight})
    }

    render() {
        return(
            <div className="CheckIn" style={{height : this.state.height}}>
                <div className="logo-container">
                    <div className="logo">
                        <img src={getSrc("PersonalCenter/CheckIn/logo.png")}/>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="container">
                        <ResumeIndex
                            hideItems={this.hideItems}
                            setErrors={errors => this.errors = errors}
                            setValues={values => this.values = values}
                            workTitle={'应聘岗位'}
                            className={'lists'}
                            isShowItemTitle={false}
                            basicTitle={'姓名'}
                            contactTitle={'电话号码'}
                            positionPlaceholder={'请输入应聘岗位'}
                            onFocus={()=> {this.inputOnFocus()}}
                            onBlur={()=>{this.inputOnBlur()}}
                        />
                        <div className="footer">
                            <div className="btn-container">
                                <Button
                                    className="btn"
                                    type="primary"
                                    onClick={()=>{this.submit()}}
                                >
                                    确认签到
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg">
                    <img src={getSrc("PersonalCenter/CheckIn/bg.png")}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.checkin,
    publicReducer : state.baseLayout
})

const mapDispatchToProps = {
    checkIn
}

export default store => ({
    path: 'personalcenter/checkin',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'checkin', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(CheckIn))
        })
    }
})