import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Show from 'components/Show';
import getSrc from 'utils/imgSrc';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import pattern from 'config/pattern';
import $ from 'jquery';

import {messageAdd} from './action';

import './style.scss';

class Problem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            background : 'show'
        };
    }

    componentWillUnmount() {
        this.changeTitle('');
    }

    isEmail = str => {
        let reg = pattern.EMAIL;
        return reg.test(str);
    }

    clear = () => {
        $(this.message).val('');
        $(this.email).val('');
    }

    changeTitle = title => {
        document.title = `${title}`;
    }

    submit = () => {
        $(this.dom).css('opacity','0.6');
        $(this.dom).css('marginTop','2px');
        setTimeout(()=> {
            $(this.dom).css('opacity','1');
            $(this.dom).css('marginTop','0');
        }, 80);
        // 提交
        let message = $.trim($(this.message).val()),
            email = $.trim($(this.email).val()),
            pre = `意见反馈:\n`,
            content = `${message}`,
            res = `${pre}${content}`,
            flag = false;
        if(email != '') {
            let [_email, _content] = [false, false];
            email && this.isEmail(email)? _email = true : Toast.info(<ToastContent type="fail" content={"请给小尼一个正确的邮箱吧"} />, 3, null, false);
            content != '' ? _content = true : Toast.info(<ToastContent type="fail" content={"请写一些给小尼的话吧"} />, 3, null, false);
            _email && _content ? flag = true : flag = false;
        }else{
            content != '' ? flag = true : Toast.info(<ToastContent type="fail" content={"请写一些给小尼的话吧"} />, 3, null, false);
        }
        this.clear();
        if(flag) {
            this.props.messageAdd(res, email);
            Toast.info(<ToastContent type="success" content={"谢谢你给小尼的建议!"} />, 3, null, false);
        }
    }

    render() {
        this.changeTitle('问题留言');

        return(
            <div className="Problem" >
                <img className="bg" src={getSrc('Advise/Problem/bj.png')} />
                <div className="container" style={{height : document.documentElement.clientHeight}}>

                    <div className="wrapper">
                        <Show
                            className={'background'}
                            hideStyle={{width : 680, height : 1070, marginLeft : 35, zIndex : 1, marginTop : 20}}
                            status={this.state.background}
                        >
                            <img className="show-img" src={getSrc('Advise/Problem/bg.png')} />
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 590, height : 380, marginLeft : 80, zIndex : 2, marginTop : 270}}
                            status={this.state.background}
                        >
                            <textarea name="message" className="message" ref={dom => this.message = dom}></textarea>
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 141, height : 33, marginLeft : 80, zIndex : 2, marginTop : 670}}
                            status={this.state.background}
                        >
                            <img className="show-img" src={getSrc('Advise/Problem/email.png')} />
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 590, height : 75, marginLeft : 80, zIndex : 2, marginTop : 722}}
                            status={this.state.background}
                        >
                            <input name="email" className="email" ref={dom => this.email = dom}></input>
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 461, height : 80, marginLeft : 146, zIndex : 1, bottom : 20}}
                            status={this.state.background}
                        >
                            <img className="show-img" src={getSrc('Advise/Problem/submit.png')} onClick={this.submit} ref={dom => this.dom = dom}/>
                        </Show>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.problem,
    publicReducer : state.wechatLoginLayout
})

const mapDispatchToProps = {
    messageAdd
}

export default store => ({
    path: 'advise/problem',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'problem', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Problem));
        })
    }
})
