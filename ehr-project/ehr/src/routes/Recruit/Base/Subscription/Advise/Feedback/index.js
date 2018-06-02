import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import ToastContent from 'components/ToastContent'
import Show from 'components/Show';;
import getSrc from 'utils/imgSrc';
import {injectReducer} from 'store/reducers';
import {getLocation} from 'utils/location';
import pattern from 'config/pattern';
import $ from 'jquery';

import {messageAdd} from './action';

import './style.scss';

class Feedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillUnmount() {
        this.changeTitle('');
    }

    changeTitle = title => {
        document.title = `${title}`;
    }

    isEmail = str => {
        let reg = pattern.EMAIL;
        return reg.test(str);
    }

    clear = () => {
        $(this.words).val('');
        $(this.position).val('');
        $(this.email).val('');
    }

    submit = () => {
        $(this.dom).css('opacity','0.6');
        $(this.dom).css('marginTop','2px');
        setTimeout(()=> {
            $(this.dom).css('opacity','1');
            $(this.dom).css('marginTop','0');
        }, 80);
        // 提交
        let position = $.trim($(this.position).val()),
            words = $.trim($(this.words).val()),
            email = $.trim($(this.email).val()),
            content = `想对我们说:\n${words}\n面试的岗位:${position}\n`,
            flag = true;
        let [_position, _words, _email] = [false, false, false];
        position != '' ? _position = true : Toast.info(<ToastContent type="fail" content={"请告诉小尼您面试的职位吧"} />, 3, null, false);
        words != '' ? _words = true : Toast.info(<ToastContent type="fail" content={"请写一些给小尼的话吧"} />, 3, null, false);
        if(email != '') {
            email && this.isEmail(email) ? _email = true : Toast.info(<ToastContent type="fail"
                                                                                    content={"请给小尼一个正确的邮箱吧"}/>, 3, null, false);
            _position && _words && _email ? flag = true : flag = false;
        }else{
            _position && _words ? flag = true : flag = false;
        }
        this.clear();
        if(flag) {
            this.props.messageAdd(content, email);
            Toast.info(<ToastContent type="success" content={"谢谢你给小尼的建议!"} />, 3, null, false);
        }
    }

    render() {
        this.changeTitle('求职体验反馈');

        return(
            <div className="Feedback" >
                <img className="bg" src={getSrc('Advise/Problem/bj.png')} />
                <div className="container" style={{height : document.documentElement.clientHeight}}>
                    <div className="wrapper">
                        <Show
                            className={'background'}
                            hideStyle={{width : 680, height : 1070, marginLeft : 35, zIndex : 1, marginTop : 20}}
                            status={this.state.background}
                        >
                            <img className="show-img" src={getSrc('Advise/Feedback/bg.png')} />
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 215, height : 33, marginLeft : 80, zIndex : 2, marginTop : 320}}
                            status={this.state.background}
                        >
                            <img className="show-img" src={getSrc('Advise/Feedback/words.png')} />
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 590, height : 190, marginLeft : 80, zIndex : 2, marginTop : 380}}
                            status={this.state.background}
                        >
                            <textarea name="words" className="text-area" ref={dom => this.words = dom}></textarea>
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 217, height : 34, marginLeft : 80, zIndex : 2, marginTop : 600}}
                            status={this.state.background}
                        >
                            <img className="show-img" src={getSrc('Advise/Feedback/position.png')} />
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 590, height : 75, marginLeft : 80, zIndex : 2, marginTop : 660}}
                            status={this.state.background}
                        >
                            <input name="position" className="text" ref={dom => this.position = dom}></input>
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 141, height : 33, marginLeft : 80, zIndex : 2, marginTop : 760}}
                            status={this.state.background}
                        >
                            <img className="show-img" src={getSrc('Advise/Feedback/email.png')} />
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 590, height : 75, marginLeft : 80, zIndex : 2, marginTop : 820}}
                            status={this.state.background}
                        >
                            <input name="email" className="text" ref={dom => this.email = dom}></input>
                        </Show>
                        <Show
                            className={'background'}
                            hideStyle={{width : 461, height : 80, marginLeft : 146, zIndex : 5, bottom : 20}}
                            status={this.state.background}
                        >
                            <img className="show-img" src={getSrc('Advise/Feedback/submit.png')} onClick={this.submit} ref={dom => this.dom = dom}/>
                        </Show>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.feedback,
    publicReducer : state.wechatLoginLayout
})

const mapDispatchToProps = {
    messageAdd
}

export default store => ({
    path: 'advise/feedback',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'feedback', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Feedback));
        })
    }
})
