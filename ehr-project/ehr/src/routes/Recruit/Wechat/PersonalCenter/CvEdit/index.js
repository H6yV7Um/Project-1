import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {injectReducer} from 'store/reducers';
import {connect} from 'react-redux';
import {Button, Toast} from 'antd-mobile';
import WechatRegister from 'appComponents/Wechat/Register';
import Icon from 'components/Icon';
import ToastContent from 'components/ToastContent';
import getSrc from 'utils/imgSrc';
import {addCv, getCv, updateCv, getJob} from './action';

import './style.scss';


class CvEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current : 0,
            height : document.documentElement.clientHeight,
            isFetch : false,
            hideItems : null,
            isAdd : false,
            isShowMessage : false,
            isFirstAdd :  false,
            confirmModel : false
        }

        this.error = null;
        this.values = null;
        this.hideItems = ['link', 'willingposition'];
        this.code = null;
        this.cvData = null;
    }

    componentWillMount() {
        // 获取职位列表
        this.props.getJob();
        this.changeTitle('tap4fun-修改我的简历');
        this.props.getCv(this.props.publicReducer.userInfo.openid)
        this.setState({
            hideItems : this.first
        })
    }

    componentWillUnmount() {
        this.changeTitle('');
    }

    formateDate = date => {
        if(typeof date != 'undefined' && typeof date != 'string') {
            let res = date.format('l').split('');
            let str = [];
            let result = null;
            res.map(v => {
                str.push(v.replace(/[\u4e00-\u9fa5]/, '-'));
            });
            str.pop();
            result = str.join('');
            return result;
        }
    }

    changeTitle = title => {
        document.title = `${title}`;
    }


    showMessage = (type, content) => {
        let res = null;
        switch (type) {
            case 'success':
                res = content || '面试官已经收到您的消息'+"\r\n"+'请在大厅就坐等待面试!';
                Toast.info(<ToastContent type="success" content={res} />, 2, null, false);
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
            if(typeof this.values.attenddate != "string") {
                this.values.attenddate = this.formateDate(this.values.attenddate);
            }
            if(typeof this.values.graduatedate != "string") {
                this.values.graduatedate = this.formateDate(this.values.graduatedate);
            }
            if(typeof this.values.starttime != "string") {
                this.values.starttime = this.formateDate(this.values.starttime);
            }
            if(typeof this.values.endtime != "string") {
                this.values.endtime = this.formateDate(this.values.endtime);
            }
            this.cvData = Object.assign(this.values, this.cvData);
            if(this.props.reducer.cv) {
                this.props.updateCv(this.props.publicReducer.userInfo.openid,this.cvData, () => {
                    this.showMessage('success', '更新成功');
                    setTimeout(() => {
                        browserHistory.push('/recruit/wechat/personalcenter/cv')
                    }, 2000)
                });
            }
        }
        else if(this.errors)
        {
            this.showMessage('error', this.errors);
        }
    }

    判断是否有改动
    isModify = () => {

    }

    render() {
        let layout = null,
            jobs = [];

        // 格式化职位列表数据
        if(this.props.reducer.jobs) {
            this.props.reducer.jobs.map(v => {
                let data = {
                    label: v.name,
                    value: v.name
                }
                jobs.push(data);
            });
        }

        return(
            <div className="Subscription-CvEdit" style={{height : this.state.height}}>
                {
                    this.props.reducer.cv ?
                        <WechatRegister
                            data={this.props.reducer.cv}
                            hideItems={['gender']}
                            setErrors={errors => this.errors = errors}
                            setValues={values => this.values = values}
                            jobs={jobs}
                            className={"lists"}
                        />
                        :
                        null

                }
                <div className="confirm-btn-container">
                    <Button type={'primary'} onClick={() => {
                        this.submit()
                    }}><Icon className="icon" type="paper-plane" style={{color: '#fff'}}><span style={{color: '#fff'}}>   更新简历</span></Icon></Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.cvedit,
    publicReducer : state.wechatLoginLayout
})

const mapDispatchToProps = {
    addCv, getCv, updateCv, getJob
}

export default store => ({
    path : 'personalcenter/cvedit',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'cvedit', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(CvEdit));
        })
    }
})
