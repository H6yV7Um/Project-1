import React, {Component, PropTypes} from 'react';
import { List, WhiteSpace, Button, Toast, Flex } from 'antd-mobile';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';
import ResumeIndex from 'appComponents/Wechat/Resume';
import ToastContent from 'components/ToastContent';
import {checkIn} from './action';

import './style.scss';

class GenerateQRCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetch : false,
            height : 'auto',
            link : null
        };

        // 数据异常
        this.errors = null;
        // 数据
        this.values = null;
        // 需要隐藏的表单项
        this.hideItems = ['gender','idcard','email','address','isduty','starttime','endtime','company','skills','duty','university','attenddate','graduatedate','education','profession'];
        this.readItems = ['link']
    }

    componentDidMount(){
        window.addEventListener('resize', this.onWindowResize)
    }

    componentWillMount() {
        this.setState({height : document.documentElement.clientHeight});
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.onWindowResize)
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
     *  生成二维码
     */
    generateQRCode = () => {
        if(this.values)
        {
            let SERVER = process.env.NODE_ENV == 'development' ? 'http://172.20.70.98:3002' : 'http://wechat-public.nibirutech.com',
                qrLink = `${SERVER}/personalcenter/qrcodes/`;
            qrLink += `${encodeURI(this.values.name)}/`;
            qrLink += `${encodeURI(this.values.phone)}/`;
            qrLink += `${encodeURI(this.values.position)}`
            // console.log(this.encodeURL(url));
            // console.log(hostname.replace('/fetch/app/koa/extends', ''))
            this.setState({link : encodeURI(qrLink)})
        }
        else if(this.errors)
        {
            this.showMessage('error', this.errors);
        }
    }

    /**
     * 预览
     */
    preview = () => {

    }

    /**
     * 将路径中的汉字转化为unicode编码
     */
    toUnicode = data => {
        if(data == '') return '请输入汉字';
        var str ='';
        for(var i=0;i<data.length;i++)
        {
            if(i == data.length - 1) {
                str+="\\u"+parseInt(data[i].charCodeAt(0),10).toString(16);
            }else{
                str+="\\u"+parseInt(data[i].charCodeAt(0),10).toString(16) + '\\';
            }
        }
        return str;
    }

    inputOnFocus = () => {
        this.setState({footer:'relative'})
    }

    // 动态拼接url参数
    joinUrlParams = (url, paramObj) => {
        let arr = [];
        url = `${url}?`;
        for(let key in paramObj) {
            url += `${key}=${paramObj[key]}&`;
        }
        arr = url.split('');
        arr.pop();
        return arr.join('');
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
            <div className="GenerateQRCode" style={{height : this.state.height}}>
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
                            link={this.state.link}
                            basicTitle={'姓名'}
                            contactTitle={'电话号码'}
                            positionPlaceholder={'请输入应聘岗位'}
                            onFocus={()=> {this.inputOnFocus()}}
                            onBlur={()=>{this.inputOnBlur()}}
                        />
                        <div className="footer">
                            <div className="btn-container">
                                <Flex>
                                    <Flex.Item>
                                        <Button
                                            className="btn"
                                            type="primary"
                                            onClick={()=>{this.generateQRCode()}}
                                        >
                                            生成二维码
                                        </Button>
                                    </Flex.Item>
                                    <Flex.Item>
                                        {
                                            this.state.isFetch ?
                                                <Button
                                                       className="btn"
                                                    type="primary"
                                                    onClick={()=>{this.preview()}}
                                                >
                                                    预览
                                                </Button>
                                                :
                                                <Button
                                                    className="btn"
                                                    type="primary"
                                                    disabled
                                                >
                                                    预览
                                                </Button>
                                        }
                                    </Flex.Item>
                                </Flex>
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
    reducer : state.generateqr,
    publicReducer : state.wechatLoginLayout
})

const mapDispatchToProps = {
    checkIn
}

export default store => ({
    path: 'personalcenter/generateqr',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'generateqr', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(GenerateQRCode))
        })
    }
})